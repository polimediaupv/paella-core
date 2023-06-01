import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';

import 'paella-core/styles/PopUp.css';

const g_popUps = [];

function placePopUp(player, anchorElement, contentElement) {
	if (anchorElement) {
		const { top, left, right, bottom, width, height } = anchorElement.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;
		const scroll =  document.body.scrollTop;

		// TODO: use the viewContainer element
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;
		
		const containerBounds = player.containerElement.getBoundingClientRect();

		
		// Decide where to attach the popup depending on the anchor position
		contentElement.style.overflow = "auto";
		contentElement.style.display = "table";
		contentElement.style.left = "";
		contentElement.style.right = "";
		contentElement.style.bottom = "";
		contentElement.style.top = "";
		if (viewportCenterX>centerX && viewportCenterY<=centerY) {
			// bottom left
			const b = viewportHeight - (bottom - height);
			contentElement.style.left = `${ left }px`;
			contentElement.style.bottom = `${ b }px`;
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
			contentElement.style.bottom = `${ b }px`;
			contentElement.style.maxHeight = `calc(100vh - ${ b }px - 10px)`;
		}
	}
}

function enableHidePopUpActionContainer(player) {
	if (!player.__hidePopUpActionContainer) {
		player.__hidePopUpActionContainer = createElementWithHtmlText('<div class="hide-popup-action-container"></div>');
		player.videoContainer.element.appendChild(player.__hidePopUpActionContainer);
		player.__hidePopUpActionContainer.style.position = "absolute";
		player.__hidePopUpActionContainer.style.left = "0px";
		player.__hidePopUpActionContainer.style.top = "0px";
		player.__hidePopUpActionContainer.style.right = "0px";
		player.__hidePopUpActionContainer.style.bottom = "0px";
		player.__hidePopUpActionContainer.style.zIndex = 500;
		player.__hidePopUpActionContainer.addEventListener("click", evt => {
			PopUp.HideAllPopUps(false);
			evt.stopPropagation();
		});
	}
	player.__hidePopUpActionContainer.style.display = "block";
}

function disableHidePopUpActionContainer(player) {
	if (player.__hidePopUpActionContainer) {
		player.__hidePopUpActionContainer.style.display = "none";
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

	static Contains(element) {
		return g_popUps.some(popUp => {
			return popUp.element.contains(element);
		})
	}
	
	static HideAllPopUps(onlyModal = true) {
		g_popUps.forEach(p => {
			if (onlyModal && p.isModal || !onlyModal) {
				p.hide();
			}
		});
	}

	static HideTopPopUp() {
		if (g_popUps.length) {
			let topPopUp = null;
			g_popUps.slice().reverse().some(popUp => {
				if (popUp.isVisible) {
					topPopUp = popUp;
				}
				return topPopUp !== null;
			});
			topPopUp?.hide();
		}
	}

	static Unload() {
		g_popUps.forEach(p => {
			p.removeFromParent();
		});
		g_popUps.slice(0);
	}

	static HideNonAncestors(popup) {
		g_popUps.forEach(otherPopUp => {
			if (popup.isParent && !popup.isParent(otherPopUp)) {
				otherPopUp.hide();
			}
		});
	}
	
	constructor(player, parent, anchorElement = null, contextObject = null, modal = true) {
		const attributes = {
			"class": modal ? "popup-container" :  "popup-container no-modal"
		};
		
		const children = `
		<div class="popup-content"></div>
		`;
		super(player,{ attributes, children, parent });
		this._lastFocusElement = document.activeElement;
		this._modal = modal;
		this._contextObject = contextObject;
		this._dragActionData = null;

		this._moveable = false;
		this._resizeable = false;

		this._id = Symbol(this);
		g_popUps.push(this);
		
		this.element.addEventListener("click", () => {
			this.hide();	
		});
		
		this._contentElement = this.element.getElementsByClassName("popup-content")[0];

		this._contentElement.addEventListener("mousedown", (event) => {
			if (this.moveable || this.resizeable) {
				// Make static the current position and size of the pop up window
				const rect = this._contentElement.getBoundingClientRect();
				this._contentElement.style.boxSizing = "border-box";
				this._contentElement.style.userSelect = "none";
				this._contentElement.style.top = rect.top;
				this._contentElement.style.left = rect.left;
				this._contentElement.style.width = rect.width;
				this._contentElement.style.height = rect.height;
				this._contentElement.style.position = "absolute";
	
				this._dragActionData = {
					popUp: this,
					action: "MOVE",
					event,
					initialPosition: {
						left: event.clientX,
						top: event.clientY
					}
				}
			}
			event.stopPropagation();
		});

		this.element.addEventListener("mouseup", evt => {
			if (this.moveable || this.resizeable) {
				this._dragActionData = null;
			}
		})

		this.element.addEventListener('mousemove', evt => {
			if (this._dragActionData) {
				const offset = {
					left: evt.clientX - this._dragActionData.initialPosition.left,
					top: evt.clientY - this._dragActionData.initialPosition.top
				};
				this._dragActionData.initialPosition =  {
					left: evt.clientX,
					top: evt.clientY
				};
				const rect = this._contentElement.getBoundingClientRect();
				this._contentElement.style.top = `${ rect.top + offset.top }px`;
				this._contentElement.style.left = `${ rect.left + offset.left }px`;
				console.log(offset);
			}
		});

		this._contentElement.addEventListener("mouseup", (evt) => {
			this._dragActionData = null;
			evt.stopPropagation();
		});

		this._contentElement.addEventListener("click", evt => {
			evt.stopPropagation();
		})
		
		this._anchorElement = anchorElement; 
		if (anchorElement) {
			placePopUp(player, anchorElement, this.contentElement);
		}
		this._parentPopUp = null;
		this.hide();
	}

	get lastFocusElement() {
		return this._lastFocusElement;
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

	get parentPopUp() {
		return this._parentPopUp;
	}

	get moveable() {
		return this._moveable;
	}

	get resizeable() {
		return this._resizeable;
	}
	
	isParent(otherPopUp) {
		if (otherPopUp === this) {
			return true;
		}
		else if (this.parentPopUp === null) {
			return false;
		}
		else if (this.parentPopUp === otherPopUp) {
			return true;
		}
		else {
			return this.parentPopUp.isParent(otherPopUp);
		}
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
		PopUp.HideNonAncestors(this);
		enableHidePopUpActionContainer(this.player);
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
			super.hide();
			if (this.lastFocusElement) {
				this.lastFocusElement.focus();
			}
		}
		if (!g_popUps.some(p => p.isVisible)) {
			disableHidePopUpActionContainer(this.player);
		}
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