import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';

import testIcon from 'paella-core/icons/screen.svg';

export default class NonInteractiveButton extends ButtonPlugin {
    async load() {
        this.icon = testIcon;
        this.title = "aa"
    }

    get interactive() {
        return false;
    }
}
