import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUp from 'paella-core/js/core/PopUp';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';

export default class PopUpButtonPlugin extends ButtonPlugin {
	async action() {
		await this.showPopUp();
	}
	
	async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content</p>');
		return content;
	}

	get popUpType() {
		return "modal"; // or "timeline"
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
			if (this.popUpType === "modal") {
				this._popUp = new PopUp(this.player, parentContainer, this.button);
			}
			else if (this.popUpType === "timeline") {
				this._popUp = new TimeLinePopUp(this.player);
			}
			const content = await this.getContent();
			this._popUp.setContent(content);
		}
		else if (this.popUpType === "timeline" && this._popUp.isVisible) {
			this._popUp.hide();
		}
		else {
			this._popUp.show(parentContainer);
		}
	}
}
