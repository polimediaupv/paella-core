import PopUpButtonPlugin from '../core/PopUpButtonPlugin';
import { createElementWithHtmlText } from '../core/dom';
import PaellaCorePlugins from './PaellaCorePlugins';

import screenIcon from '../../icons/screen';

export default class TestPopUpButton2Plugin extends PopUpButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
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
