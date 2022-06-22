import PopUpButtonPlugin from '../core/PopUpButtonPlugin';
import { createElementWithHtmlText } from '../core/dom';

import screenIcon from '../../icons/screen.svg';

export default class TestPopUpButtonPlugin extends PopUpButtonPlugin {

    get popUpType() { return "timeline"; }

    async getContent() {
		const content = createElementWithHtmlText('<p>Pop Up Button Plugin Content 1</p>');
		return content;
	}

    async load() {
        this.icon = screenIcon;
        this.title = "1";
    }
}
