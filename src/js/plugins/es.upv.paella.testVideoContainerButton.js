import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';


import screenIcon from 'paella-core/icons/screen.svg';

export default class VideoContainerButtonPlugin extends MenuButtonPlugin {
    async load() {
        this.icon = screenIcon;
        this.title = "tx";
    }

    get titleSize() {
        return "medium";
    }

    async getMenu() {
        console.log("Get menu");

		const items = [
			{ id: 0, title: "Option 1" },
			{ id: 1, title: "Option 2" },
			{ id: 2, title: "Option 3" },
			{ id: 3, title: "Option 4" },
			{ id: 4, title: "Option 5" }
		];
		return items;
	}

    itemSelected(itemData) {
        if (itemData.id === 0) {
            // The next time the user press the button icon, the menu will be regenerated
            this.refreshContent = true;
        }
    }

    get buttonType() {
        return "radio";
    }
}