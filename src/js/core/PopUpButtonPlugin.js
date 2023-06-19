import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUp from 'paella-core/js/core/PopUp';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';

function resolvePopUpType() {
	const types = ["modal","timeline","no-modal"];
	const warnMsg = () => this.player.log.warn(`Invalid popUpType set in "${this.name}" plugin. Alowed types are "modal", "timeline" and "no-modal"`);
	if (types.indexOf(this.config.popUpType) !== -1) {
		return this.config.popUpType;
	}
	else if (types.indexOf(this.popUpType) !== -1) {
		if (this.config.popUpType) {
			warnMsg();
		}
		return this.popUpType;
	}
	else {
		warnMsg();
		return "modal";
	}
}

export default class PopUpButtonPlugin extends ButtonPlugin {
	constructor() {
		super(...arguments);

		this._refreshContent = true;
	}

	set refreshContent(c) { this._refreshContent = c; }

	get refreshContent() { return this._refreshContent; }

	get closeParentPopUp() { return this.config.closeParentPopUp || this.getCloseParentPopUp(); }

	getCloseParentPopUp() {
		return false;
	}

	async action() {
		await this.showPopUp();
	}
	
	get parentPopUp() {
		return this._parentPopUp;
	}

	set parentPopUp(p) {
		this._parentPopUp = p;
	}

	get popUp() {
		return this._popUp;
	}

	get menuTitle() {
		return this.config.menuTitle || null;
	}

	get moveable() {
		return this.config.moveable ?? false;
	}

	get resizeable() {
		return this.config.resizeable ?? false;
	}

	get customPopUpClass() {
		return this.config.customPopUpClass ?? "";
	}

	get closeActions() {
		const clickOutside = this.config.closeActions?.clickOutside ?? true
		const closeButton = this.config.closeActions?.closeButton ?? false;
		return {
			clickOutside,
			closeButton
		}
	}

	async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content</p>');
		return content;
	}

	get popUpType() {
		return this.config.popUpType || "modal"; // "timeline" or "no-modal"
	}
	
	hidePopUp() {
		if (this.closeParentPopUp) {
			PopUp.HideAllPopUps(false);
		}
		else if (this._popUp) {
			this._popUp.hide();
		}
	}
	
	async showPopUp() {
		const parentContainer = this.player.isFullscreen ? this.player.containerElement : document.body;
		
		if (!this._popUp) {
			this._popUp = null;
			const type = resolvePopUpType.apply(this);
			if (type === "modal" || type === "no-modal") {
				const { clickOutside, closeButton } = this.closeActions;
				this._popUp = new PopUp(this.player, parentContainer, this.button, this, type === "modal", this.moveable, this.resizeable, this.customPopUpClass);
				this._popUp.setCloseActions({ clickOutside, closeButton });
			}
			else if (type === "timeline") {
				this._popUp = new TimeLinePopUp(this.player, this);
			}
			const content = await this.getContent();
			this._popUp.title = this.menuTitle;
			this._popUp.setContent(content);
			this._popUp.show(parentContainer, this._parentPopUp);
			this.refreshContent = false;
		}
		else if (this.popUpType === "timeline" && this._popUp.isVisible) {
			this._popUp.hide();
		}
		else if (this._popUp.isVisible) {
			this._popUp.hide();
		}
		else {
			if (this.refreshContent) {
				const content = await this.getContent();
				this._popUp.setContent(content);
				this.refreshContent = false;
			}
			this._popUp.show(parentContainer, this._parentPopUp);
		}
	}
}
