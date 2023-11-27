import PopUpButtonPlugin from '../core/PopUpButtonPlugin';
import { createElementWithHtmlText } from '../core/dom';
import PaellaCorePlugins from './PaellaCorePlugins';

import screenIcon from '../../icons/screen';

export default class TestPopUpButtonPlugin extends PopUpButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
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
