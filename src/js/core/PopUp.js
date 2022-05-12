import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';

import 'paella-core/styles/PopUp.css';

const g_popUps = [];

function placePopUp(player, anchorElement, contentElement) {
	if (anchorElement) {
		const { top, left, right, bottom, width, height } = anchorElement.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;
		const scroll =  + document.body.scrollTop;

		// TODO: use the viewContainer element
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;
		
		const containerBounds = player.containerElement.getBoundingClientRect();

		
		// Decide where to attach the popup depending on the anchor position
		contentElement.style.overflow = "auto";
		contentElement.style.display = "table";
		if (viewportCenterX>centerX && viewportCenterY<=centerY) {
			// bottom left
			const b = viewportHeight - (bottom - height);
			contentElement.style.left = `${ left }px`;
			contentElement.style.bottom = `${ b - scroll }px`;
			contentElement.style.maxHeight = `calc(100vh - ${ b }px - 10px)`;
		}
		else if (viewportCenterX>centerX && viewportCenterY>centerY) {
			// top left quadrant
			contentElement.style.left = `${ left }px`;
			contentElement.style.top = `${ top + height + scroll }px`;
			contentElement.style.maxHeight = `calc(100vh - ${ top + height }px - 10px)`;
		}
		else if (viewportCenterX<=centerX && viewportCenterY>centerY) {
			// top right quadrant
			contentElement.style.right = `${ viewportWidth - right }px`;
			contentElement.style.top = `${ top + height + scroll }px`;
			contentElement.style.maxHeight = `calc(100vh - ${ top + height }px - 10px)`;
		}
		else if (viewportCenterX<=centerX && viewportCenterY<=centerY) {
			// bottom right quadrant
			const b = viewportHeight - (bottom - height);
			contentElement.style.right = `${ viewportWidth - right }px`;
			contentElement.style.bottom = `${ b - scroll }px`;
			contentElement.style.maxHeight = `calc(100vh - ${ b }px - 10px)`;
		}
	}
}

export default class PopUp extends DomClass {
	static GetPopUps() {
		return g_popUps;
	}
	
	static IsSomePopUpVisible() {
		return g_popUps.some(p => p.isVisible);
	}
	
	static GetPopUp(id) {
		return g_popUps.find(p => p.id === id);
	}
	
	static HideAllPopUps(onlyModal = true) {
		g_popUps.forEach(p => {
			if (onlyModal && p.isModal || !onlyModal) {
				p.hide();
			}
		});
	}

	static Unload() {
		g_popUps.forEach(p => {
			p.removeFromParent();
		});
		g_popUps.slice(0);
	}
	
	constructor(player, parent, anchorElement = null, contextObject = null, modal = true) {
		const attributes = {
			"class": modal ? "popup-container" :  "popup-container no-modal"
		};
		
		const children = `
		<div class="popup-content"></div>
		`;
		super(player,{ attributes, children, parent });
		this._modal = modal;
		this._contextObject = contextObject;

		this._id = Symbol(this);
		g_popUps.push(this);
		
		this.element.addEventListener("click", () => {
			this.hide();	
		});
		
		this._contentElement = this.element.getElementsByClassName("popup-content")[0];
		
		this._anchorElement = anchorElement; 
		if (anchorElement) {
			placePopUp(player, anchorElement, this.contentElement);
		}

		this.hide();
	}

	get isModal() {
		return this._modal;
	}

	get contextObject() {
        return this._contextObject;
    }
	
	get id() {
		return this._id;
	}
	
	// This is the popup window
	get contentElement() {
		return this._contentElement;
	}
		
	// This is the content element you set with setContent()
	get content() {
		return this._popupContent;
	}
	
	setContent(domElement) {
		this.contentElement.innerHTML = "";
		if (typeof(domElement) === "string") {
			this._popupContent = createElementWithHtmlText(domElement, this.contentElement);
		}
		else {
			this._popupContent = domElement;
			this.contentElement.appendChild(domElement);	
		}
	}
	
	show(parent = null, parentPopUp = null) {
		if (this._anchorElement) {
			placePopUp(this.player, this._anchorElement, this.contentElement);
		}
		if (parent) {
			this.setParent(parent);
		}
		this._parentPopUp = parentPopUp;
		if (parentPopUp) {
			parentPopUp.addChild(this);
		}
		super.show();
		triggerEvent(this.player, Events.SHOW_POPUP, {
			popUp: this,
			plugin: this.contextObject
		});
	}

	hide() {
		if (this.isVisible) {
			if (this._children) {
				this._children.forEach(child => child.hide());
			}
			if (this._parentPopUp) {
				this._parentPopUp.removeChild(this);
			}
			triggerEvent(this.player, Events.HIDE_POPUP, {
				popUp: this,
				plugin: this.contextObject
			});
		}
		super.hide();
	}

	// Child popUp management
	addChild(childPopUp) {
		this._children = this._children || [];
		if (!this._children.find(child => child === childPopUp)) {
			this._children.push(childPopUp);
		}
	}

	removeChild(childPopUp) {
		if (this._children) {
			this._children = this._children.filter(child => child !== childPopUp);
		}
		
	}

	destroy() {
		const index = g_popUps.indexOf(this);
		if (index !== -1) {
			g_popUps.splice(index,1);
			this.removeFromParent();
		}
	}
}