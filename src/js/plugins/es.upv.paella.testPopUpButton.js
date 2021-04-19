import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';

import screenIcon from 'paella-core/icons/screen.svg';

export default class TestPopUpButtonPlugin extends PopUpButtonPlugin {

    get popUpType() { return "timeline"; }

    async load() {
        this.icon = screenIcon;
    }
}
