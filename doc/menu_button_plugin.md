
# Menu button plugin

It is a special type of [PopUpButtonPlugin](popup_button_plugin.md) that implements a menu. The menu options are specified by overriding the `async getMenu()` method.

```javascript
import { MenuButtonPlugin } from 'paella-core';

export default class MyMenuButtonPlugin extends MenuButtonPlugin {
  async getMenu() {
    const items = [
      { id: 0, title: "Option 1" },
			{ id: 1, title: "Option 2" },
			{ id: 2, title: "Option 3" },
			{ id: 3, title: "Option 4" },
			{ id: 4, title: "Option 5" }
    ]
    return items;
  }
}
```



Each menu item returned in the `async getMenu()` method can contain the following elements:

- **id (required):** This is a unique identifier of the menu item that cannot be repeated in any of the other items. The data type is indifferent.
- **title:** is the text that will be displayed in the button and in the accessibility options.
- **icon:** the icon of the menu item, which must be a vector image in SVG format.

To load the SVG icons, besides using Webpack, it is possible to use a Paella Player utility that loads the icon and makes it ready to be added as a DOM element:

```javascript
import { utils } from 'paella-core';

...

const icon = await utils.loadSvgIcon(iconPath);
```



## Button action

When the user selects a menu item the plugin is informed by calling the `itemSelected(itemData,menuItems)` method, which we can override to handle the action:

```javascript
...
  itemSelected(itemData,menuItems) {
    console.log(`Item selected with identifier ${itemData.id}`);
  }
}
```

The `itemData` argument is the menu item that was returned in the `async getMenu()` function. The `menuItems` argument is the menu items, with their current settings.

When a menu item is selected, it will remain open. To close it, the `closeMenu()` function must be called explicitly:

```javascript
...
  itemSelected(itemData,menuItems) {
    console.log(`Item selected with identifier ${itemData.id}`);
  	this.closeMenu();
  }
}

```



## Menu type

We can create three different types of menus:

- `"check"`: each menu item works like a check box, i.e. clicking on it will check or uncheck it depending on its status.
- `"radio"`: each menu item works like a radio button, i.e. clicking on it will select it, and if another item is selected, it will be deselected.

- `"button"`: each menu item will function as a button, i.e. no menu item is checked or unchecked in any case.

For all the above types of button the `itemSelected(itemData,menuItems)` function will be called. The selected items will include the `selected: true` attribute in the `itemData` parameter, and in the corresponding element of the `menuItems` array.

To determine the menu type, we override the `buttonType()` method, returning the string `"check"`, `"radio"` or `"button"`:

```javascript
buttonType() {
  return "radio";
}
```





