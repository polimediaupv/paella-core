
import PopUpButtonPlugin from './PopUpButtonPlugin';
import { createElementWithHtmlText } from './dom';

const titleElement = (title) => title ? `<span class="menu-title">${title}</span>` : "";
const iconElement = (icon) => icon ? `<i class="menu-icon">${icon}</i>` : "";
const ariaLabel = (title) => title ? `aria-label="${title}"` : "";

const itemTypes = {
	button({ id = 0, title = null, icon = null, showTitle = true, allItems, plugin }) {
		const item = createElementWithHtmlText(`
			<button class="menu-button-item" ${ariaLabel(title)} data-id="${id}">
				${ iconElement(icon) }
				${ showTitle ? titleElement(title) : "" }
			</button>
		`);
		item.addEventListener("click", () => {
			const item = allItems.find(item => item.id === id);
			plugin.itemSelected(item, allItems);
		});

		return item;
	},

	input({ type, id = 0, title = null, icon = null, showTitle = true, onItemSelected, selectedItems }) {
		const selected = selectedItems[id] ?? false;
		const item = createElementWithHtmlText(`
			<label class="menu-button-item">
				<input type="${type}" ${ selected ? `checked` : "" } value="${id}" ${ariaLabel(title)} data-id="${id}">
				${ iconElement(icon) }
				${ showTitle ? titleElement(title) : "" }
			</label>
		`);
		item.querySelector("input").addEventListener("change", evt => onItemSelected(evt.target));
		return item;
	},

	check({ plugin, id = 0, title = null, icon = null, showTitle = true, allItems, selectedItems }) {
		return this.input({ type: "checkbox", id, title, icon, showTitle, selectedItems, onItemSelected: (target) => {
			const item = allItems.find(item => item.id === id);
			selectedItems[id] = target.checked;
			plugin.itemSelected(item, allItems);
		}});
	},

	radio({ plugin, id = 0, title = null, icon = null, showTitle = true, allItems, selectedItems }) {
		return this.input({ type: "radio", id, title, icon, showTitle, selectedItems, onItemSelected: (target) => {
			let item = null;
			selectedItems[id] = true;
			allItems.forEach(currentItem => {
				if (currentItem.id === id) {
					item = currentItem;
				}
				else {
					selectedItems[currentItem.id] = false;
				}
			});
			plugin.itemSelected(item, allItems);
		}});
	}
}

function getMenuItem(item, buttonType, container, allItems, selectedItems) {
	const itemElem = itemTypes[buttonType]({
		...item,
		plugin: this,
		allItems,
		selectedItems
	});
	container.appendChild(itemElem);
	return itemElem;
}

export default class MenuButtonPlugin extends PopUpButtonPlugin {
	
	get closeOnSelect() {
		if (this.config.closeOnSelect === undefined) {
			if (this.buttonType !== "check") {
				this.config.closeOnSelect = true;
			}
			else {
				this.config.closeOnSelect = false;
			}
		}
		return this.config.closeOnSelect;
	}

	setSelected(id, value) {
		if (this._selectedItems) {
			this._selectedItems[id] = value;
		}
	}

	async getContent() {
		const content = createElementWithHtmlText(`<fieldset class="menu-button-content"></fieldset>`);
		this._content = content;

		const title = this.menuTitle;
		const menuItems = await this.getMenu();
		this._menuItems = menuItems;
		let firstItem = null;
		
		if (!this._selectedItems) {
			this._selectedItems = {};
			// The `selected` property of the menu items is used to set the initial state. Once initialized, the
			// selection value is managed by the plugin and the `selected` property is ignored.
			this._menuItems.forEach(itemData => {
				if (itemData.selected !== undefined && itemData.selected !== null) {
					this._selectedItems[itemData.id] = itemData.selected;
				}
			});
		}

		const itemElems = menuItems.map(item => getMenuItem.apply(this, [item, this.buttonType(), content, menuItems, this._selectedItems]))
		firstItem = itemElems[0];
		
		setTimeout(() => {
			firstItem && firstItem.focus();
		}, 50);

		return content;
	}

	//get menuTitle() {
	//	return this.config.menuTitle || null;
	//}
	
	async getMenu() {
		const items = [
			{ id: 0, title: "Option 1" },
			{ id: 1, title: "Option 2" },
			{ id: 2, title: "Option 3" },
			{ id: 3, title: "Option 4" },
			{ id: 4, title: "Option 5" }
		];
		return items;
	}
	
	// Returns the menuItems with the current menu state
	get menuItems() {
		return this._menuItems;
	}
	
	// If showTitles is false, then the 'title' attribute of the menu
	// items is used only as aria-label.
	// If the menu item has no icon, then the `showTitles` property is ignored
	get showTitles() {
		return true;
	}
	
	buttonType() {
		// check, radio or button
		return "radio";	
	}
	
	itemSelected(itemData,menuItems) {
		this.player.log.warn(`MenuButtonPlugin (${ this.name }): itemSelected() function not implemented.`);
	}
	
	closeMenu() {
		this.player.playbackBar.popUp.hide();
	}

	async showPopUp() {
		// Refresh popup content to set focus on the first menu item
		this.refreshContent = true;
		await super.showPopUp();
	}
}
