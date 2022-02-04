import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';


import screenIcon from 'paella-core/icons/screen.svg';

const wait = async (fn,t) => {
    return new Promise(r => {
        setTimeout(() => {
            fn();
            r();
        }, t);
    });
}

export default class VideoContainerButtonPlugin extends MenuButtonPlugin {
    async load() {
        this.icon = screenIcon;
        this.title = "tx";

        this.hide();

        wait(() => this.show(), 1000);
    }

    get titleSize() {
        return "medium";
    }

    get popUpType() {
        return "no-modal";
    }

    async getMenu() {
        const items = [
			{ id: 0, title: "Option 1" },
			{ id: 1, title: "Option 2" },
			{ id: 2, title: "Option 3" },
			{ id: 3, title: "Option 4" },
			{ id: 4, title: "Option 5" },
            { id: 0, title: "Option 6" },
			{ id: 1, title: "Option 7" },
			{ id: 2, title: "Option 8" },
			{ id: 3, title: "Option 9" },
			{ id: 4, title: "Option 10" }
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
        return "check";
    }
}