import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUp from 'paella-core/js/core/PopUp';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';

export default class PopUpButtonPlugin extends ButtonPlugin {
	constructor() {
		super(...arguments);

		this._refreshContent = true;
	}

	set refreshContent(c) { this._refreshContent = c; }

	get refreshContent() { return this._refreshContent; }

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

	async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content</p>');
		return content;
	}

	get popUpType() {
		return "modal"; // "timeline" or "no-modal"
	}
	
	hidePopUp() {
		if (this._popUp) {
			this._popUp.hide();
		}
	}
	
	async showPopUp() {
		const parentContainer = this.player.isFullscreen ? this.player.containerElement : document.body;
		
		if (!this._popUp) {
			this._popUp = null;
			if (this.popUpType === "modal" || this.popUpType === "no-modal") {
				this._popUp = new PopUp(this.player, parentContainer, this.button, this, this.popUpType === "modal");
			}
			else if (this.popUpType === "timeline") {
				this._popUp = new TimeLinePopUp(this.player, this);
			}
			const content = await this.getContent();
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
