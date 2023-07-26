import MenuButtonPlugin from "../core/MenuButtonPlugin";

import TestIcon from "../../icons/close.svg";

import PaellaCorePlugins from "./PaellaCorePlugins";

export default class TestMenuTitleElement extends MenuButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async load() {
        this.icon = TestIcon;
    }

    get menuTitle() {
        const title = document.createElement('h2');
        title.innerHTML = "Test title element";
        return title;
    }

    async getMenu() {
        const title = document.createElement('p');
        title.innerHTML = "Element item";
        const items = [
			{ id: 0, title: "Option 1" },
			{ id: 1, title: "Option 2" },
			{ id: 2, title: "Option 3" },
			{ id: 3, title: "Option 4" },
			{ id: 4, title: "Option 5" },
            { id: 5, title }
		];
		return items;
    }

    itemSelected(itemData,menuItem) {
        this.player.log.info(`TestMenuTitleElement ${ this.name }`);
    }
}
