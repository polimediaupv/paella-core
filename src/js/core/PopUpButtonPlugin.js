import ButtonPlugin from './ButtonPlugin';
import { createElementWithHtmlText } from './dom';

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
		if (!this.player.playbackBar.popUp.isHidden) {
			this.player.playbackBar.popUp.hide();
		}
	}
	
	async showPopUp() {
		if (this.player.playbackBar.popUp.isHidden) {
			const content = await this.getContent();
			this.player.playbackBar.popUp.show({
				title: this.menuTitle,
				content,
				attachRight: this.popUpType === "timeline" || this.side === "right",
				attachLeft: this.popUpType === "timeline" || this.side === "left",
				parent: this.parentPopUp
			});
		}
		else {
			this.player.playbackBar.popUp.hide();
		}
	}
}
