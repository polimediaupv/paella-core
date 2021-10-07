
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

import 'paella-core/styles/MenuButton.css';

export default class MenuButtonPlugin extends PopUpButtonPlugin {
	
	async getContent() {
		const content = createElementWithHtmlText(`<ul class="menu-button-content"></ul>`);
		
		const menuItems = await this.getMenu();
		this._menuItems = menuItems;
		let radioItemChecked = false;
		let firstItem = null;
		menuItems.forEach(item => {
			const itemElem = createElementWithHtmlText(`<li class="menu-button-item"></li>`, content);
			let className = "";
			if (this.buttonType === "button") {
				className = "menu-item-type-button";
			}
			else if (this.buttonType === "check") {
				className = "menu-item-type-button" + (item.selected ? " selected" :  "");
			}
			else if (this.buttonType === "radio") {
				className = "menu-item-type-button";
				if (!radioItemChecked && item.selected) {
					className += " selected";
					radioItemChecked = true;
				}
			}
			let itemContent = "";
			
			//item.icon ? item.icon : item.title;
			if (item.icon && item.title && this.showTitles) {
				itemContent = `
				<i class="menu-icon">${ item.icon }</i>
				<span class="menu-title">${ item.title }</span>
				`;
			}
			else if (item.icon) {
				itemContent = `
				<i class="menu-icon">${ item.icon }</i>
				`;
			}
			else if (item.title) {
				itemContent = `
				<span class="menu-title">${ item.title }</span>
				`;
			}
			
			const itemButton = createElementWithHtmlText(`
				<button class="${ className }" aria-label="${ item.title }">${ itemContent }</button>`
				, itemElem);
			if (!firstItem) {
				firstItem = itemButton;
			}
			item.buttonElement = itemButton;
			itemButton._itemData = item;
			itemButton.addEventListener("click", (evt) => {
				if (this.buttonType === "check") {
					evt.target._itemData.selected = !evt.target._itemData.selected;
					evt.target._itemData.selected ?
						evt.target.classList.add("selected") :
						evt.target.classList.remove("selected");
				}
				else if (this.buttonType === "radio") {
					this.menuItems.forEach(i => {
						i.selected = false;
						i.buttonElement.classList.remove("selected");
					});
					evt.target._itemData.selected = !evt.target._itemData.selected;
					evt.target._itemData.selected ?
						evt.target.classList.add("selected") :
						evt.target.classList.remove("selected");
				}
				this.itemSelected(evt.target._itemData, this._menuItems);
				evt.stopPropagation();
				
				if (this.buttonType !== "check") {
					this.closeMenu();
				}
			});
			
			// Remove "width" and "height" options from `svg` if is set to any percentage
			const svgs = itemButton.getElementsByTagName("svg");
			if (svgs.length>0) {
				/\%$/.test(svgs[0].getAttribute("width")) && svgs[0].removeAttribute("width");
				/\%$/.test(svgs[0].getAttribute("height")) && svgs[0].removeAttribute("height");
			}
		});
		
		setTimeout(() => {
			firstItem.focus();
		}, 50);

		return content;
	}
	
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
		return "button";	
	}
	
	itemSelected(itemData,menuItems) {
		console.warn(`MenuButtonPlugin (${ this.name }): itemSelected() function not implemented.`);
	}
	
	closeMenu() {
		this._popUp.hide();
	}

	async showPopUp() {
		// Refresh popup content to set focus on the first menu item
		this.refreshContent = true;
		await super.showPopUp();
	}
}
