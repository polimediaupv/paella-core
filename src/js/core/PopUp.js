import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';

import 'paella-core/styles/PopUp.css';

import defaultMinimizeIcon from 'paella-core/icons/minimize-3.svg';

const g_popUps = [];

function placePopUp(player, anchorElement, contentElement) {
	if (anchorElement) {
		const { top, left, right, bottom, width, height } = anchorElement.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;
		const scroll =  document.body.scrollTop;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;
		
		const containerBounds = player.containerElement.getBoundingClientRect();

		// Decide where to attach the popup depending on the anchor position
		contentElement.style.overflow = "auto";
		contentElement.style.left = "";
		contentElement.style.right = "";
		contentElement.style.bottom = "";
		contentElement.style.top = "";
		contentElement.style.width = "";
		contentElement.style.height = "";
		contentElement.classList.remove("static-position");
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

function getDragAction(rect,click,titleHeight,resizeable) {
	const topBorder = 10;
	const leftBorder = 10;
	const rightBorder = 10;
	const bottomBorder = 10;

	const left = click.left - rect.x;
	const top = click.top - rect.y;
	const right = rect.width - left;
	const bottom = rect.height - top;

	switch (true) {
	case left <= leftBorder && top <= topBorder && resizeable:
		return 'RESIZE_NW';
	case left <= leftBorder && bottom <= bottomBorder && resizeable:
		return 'RESIZE_SW';
	case left <= leftBorder && resizeable:
		return 'RESIZE_W';
	case right <= rightBorder && top <= topBorder && resizeable:
		return 'RESIZE_NE';
	case right <= rightBorder && bottom <= bottomBorder && resizeable:
		return 'RESIZE_SE';
	case right <= rightBorder && resizeable:
		return 'RESIZE_E';
	case top <= topBorder && resizeable:
		return 'RESIZE_N';
	case bottom <= bottomBorder && resizeable:
		return 'RESIZE_S';
	case top <= topBorder + titleHeight:
		return 'MOVE';
	default:
		return '';
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
	
	constructor(player, parent, anchorElement = null, contextObject = null, modal = true, moveable = false, resizeable = false) {
		const attributes = {
			"class": modal ? "popup-container" :  "popup-container no-modal"
		};

		moveable = moveable || resizeable;
		const minimizeButton = player.getCustomPluginIcon("paella-core","dock-popup") || defaultMinimizeIcon;
		const children = `
		<div class="popup-content${ resizeable ? " resizeable" : "" }${ moveable ? " moveable" :  " fixed" }">
			<div class="border-top-left"></div><div class="border-top-center"></div><div class="border-top-right"></div>
			<div class="title-bar">
				<div class="title-bar-content"></div>
				<button class="dock-button"><i>${minimizeButton}</i></button>
			</div>
			<div class="center-container"></div>
			<div class="border-bottom-left"></div><div class="border-bottom-center"></div><div class="border-bottom-right"></div>
		</div>
		`;
		super(player,{ attributes, children, parent });
		this._lastFocusElement = document.activeElement;
		this._modal = modal;
		this._contextObject = contextObject;
		this._dragActionData = null;
		this._moveable = moveable || resizeable;
		this._resizeable = resizeable;

		this._id = Symbol(this);
		g_popUps.push(this);

		const dockButton = this.element.getElementsByClassName("dock-button")[0];
		dockButton.addEventListener('click', evt => {
			this.dock();
		});
		
		this.element.addEventListener("click", () => {
			this.hide();	
		});
		
		this._contentElement = this.element.getElementsByClassName("popup-content")[0];
		this._centerContainer = this.element.getElementsByClassName("center-container")[0];
		this._titleBar = this.element.getElementsByClassName("title-bar")[0];

		this._centerContainer.addEventListener("mousedown", evt => {
			console.log("Click on center container")
			evt.stopPropagation();
		});

		this._contentElement.addEventListener("mousedown", (event) => {
			if (this.moveable || this.resizeable) {
				this._element.style.pointerEvents = "all";
				this._moved = true;
				// Make static the current position and size of the pop up window
				const rect = this._contentElement.getBoundingClientRect();
				this._contentElement.classList.add("static-position");
				this._contentElement.style.top = rect.top;
				this._contentElement.style.left = rect.left;
				this._contentElement.style.width = rect.width;
				this._contentElement.style.height = rect.height;

				// We don't know the actual size of the title bar by CSS, so we have 
				// to adjust the height of the container inline
				const titleRect = this._titleBar.getBoundingClientRect();
				const titleBarHeight = titleRect.height;
				this._centerContainer.style.height = `calc(100% - var(--popup-resizeable-border) * 2 - ${titleBarHeight}px)`;
	
				const initialPosition = {
					left: event.clientX,
					top: event.clientY
				};
				this._dragActionData = {
					popUp: this,
					action: getDragAction(rect, initialPosition, titleBarHeight, this._resizeable),
					event,
					initialPosition
				}
			}
			event.stopPropagation();
		});

		this.element.addEventListener("mouseup", evt => {
			this._element.style.pointerEvents = "";
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
				// TODO: Check minimum size
				if (this._dragActionData.action === 'MOVE') {
					this._contentElement.style.top = `${ rect.top + offset.top }px`;
					this._contentElement.style.left = `${ rect.left + offset.left }px`;
				}
				else if (this._dragActionData.action === 'RESIZE_N') {
					this._contentElement.style.height = `${ rect.height - offset.top}px`;
					this._contentElement.style.top = `${ rect.top + offset.top }px`;
				}
				else if (this._dragActionData.action === 'RESIZE_NE') {
					this._contentElement.style.height = `${ rect.height - offset.top}px`;
					this._contentElement.style.top = `${ rect.top + offset.top }px`;
					this._contentElement.style.width = `${ rect.width + offset.left}px`;
				}
				else if (this._dragActionData.action === 'RESIZE_E') {
					this._contentElement.style.width = `${ rect.width + offset.left}px`;
				}
				else if (this._dragActionData.action === 'RESIZE_SE') {
					this._contentElement.style.width = `${ rect.width + offset.left}px`;
					this._contentElement.style.height = `${ rect.height + offset.top}px`;
				}
				else if (this._dragActionData.action === 'RESIZE_S') {
					this._contentElement.style.height = `${ rect.height + offset.top}px`;
				}
				else if (this._dragActionData.action === 'RESIZE_SW') {
					this._contentElement.style.height = `${ rect.height + offset.top}px`;
					this._contentElement.style.width = `${ rect.width - offset.left}px`;
					this._contentElement.style.left = `${ rect.left + offset.left}px`;
				}
				else if (this._dragActionData.action === 'RESIZE_NW') {
					this._contentElement.style.width = `${ rect.width - offset.left}px`;
					this._contentElement.style.left = `${ rect.left + offset.left}px`;
					this._contentElement.style.height = `${ rect.height - offset.top}px`;
					this._contentElement.style.top = `${ rect.top + offset.top }px`;
				}
				else if (this._dragActionData.action === 'RESIZE_W') {
					this._contentElement.style.width = `${ rect.width - offset.left}px`;
					this._contentElement.style.left = `${ rect.left + offset.left}px`;
				}
			}
		});

		this._contentElement.addEventListener("mouseup", (evt) => {
			this._dragActionData = null;
			this._element.style.pointerEvents = "";
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

	dock() {
		this._moved = false;
		this._centerContainer.style.height = "";
		this.hide();
		this.show();
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

	get centerContainer() {
		return this._centerContainer;
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

	get titleBar() {
		return this._titleBar;
	}

	set title(titleData) {
		this._title = titleData;
		this._titleBar.classList.remove("not-empty");
		const titleBarContent = this._titleBar.getElementsByClassName('title-bar-content')[0];
		if (titleData !== null && titleData instanceof Element) {
			titleBarContent.innerHTML = "";
			titleBarContent.appendChild(titleData);
			this._titleBar.classList.add("not-empty");
		}
		else if (titleData !== null) {
			titleBarContent.innerHTML = "";
			titleBarContent.innerHTML = titleData;
			this._titleBar.classList.add("not-empty");
		}
	}

	get title() {
		return this._title;
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
		this.centerContainer.innerHTML = "";
		if (typeof(domElement) === "string") {
			this._popupContent = createElementWithHtmlText(domElement, this.centerContainer);
		}
		else {
			this._popupContent = domElement;
			this.centerContainer.appendChild(domElement);	
		}
	}
	
	show(parent = null, parentPopUp = null) {
		if (this._anchorElement && !this._moved) {
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