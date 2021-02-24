
import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';
import volumeMuteIcon from 'paella-core/icons/volume-mute.svg';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

export default class TestPlugin extends MenuButtonPlugin {
    get icon() { return volumeMuteIcon; }
    
    async getMenu() {
        const items = [
            { id: 0, title: "Option 1", selected: true },
            { id: 1, title: "Option 2" },
            { id: 2, title: "Option 3" },
            { id: 3, title: "Option 4", selected: true },
            { id: 4, title: "Option 5" }
        ];
        return items;
    }
    
    get buttonType() {
        return "radio";
    }
    
    itemSelected(itemData, menuItems) {
        console.log("Item selected: " + itemData.id);
        console.log(menuItems);
    }
}
