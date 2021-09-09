import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

import screenIcon from 'paella-core/icons/screen.svg';

export default class TestPopUpButton2Plugin extends PopUpButtonPlugin {

    get popUpType() { return "timeline"; }

    async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content 2</p>');
		return content;
	}

    async load() {
        this.icon = screenIcon;
        this.title = "2";
        const captionsCanvas = this.player.captionsCanvas;
        this.player.log.debug(captionsCanvas);
    }
}
