import ButtonPlugin from "../core/ButtonPlugin";

import testIcon from 'paella-core/icons/screen.svg';

export default class DynamicWidthButtonTest extends ButtonPlugin {
    async load() {
        //this.icon = testIcon;
        this.title = "Dynamic width button";
    }

    get dynamicWidth() {
        return true;
    }
}