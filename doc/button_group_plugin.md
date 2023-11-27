# Button group plugin


It is a specific type of [PopUpButtonPlugin](popup_button_plugin.md) that allows to group several plugins of type button or of types derived from this one, in a pop up that is displayed when activating the plugin.

In the plugin configuration a container name is specified using the `groupName` attribute. This container name will be used as `parentContainer` in those plugins that we want to group under this container. Finally, `menuTitle` is an optional attribute with which we can add a title that appears before the buttons that will be grouped in this plugin. The text included in this attribute will be translated using the localization API.:

```json
{
    "es.upv.paella.testButtonGroupPlugin": {
        "enabled": true,
        "groupName": "testButtonGroup",
        "side": "right",
        "menuTitle": "Menu title"
    }
}
```

The `menuTitle` attribute is obtained from the `menuTitle` property of the plugin. If we want to define a title that cannot be modified in the configuration, it is enough to redefine this attribute in the plugin definition itself. This API is available from paella-core 1.6:

```js
export default class MyMenuPlugin extends MenuButtonPlugin {
    ...
    get menuTitle() {
        return "My Menu Title";
    }
}
```


The buttons that we want to group inside the new group, will use the value of `groupName` as `parentContainer`. In addition, in the `description` attribute we can add a detailed description of the button, which will be displayed next to it in the pop up of the button group:

```json
{
    ...
    "es.upv.paella.testVideoContainerButton": {
        "enabled": true,
        "side": "left",
        "parentContainer": "testButtonGroup",
        "description": "Test menu plugin"
    },
    ...
}
```

In general, a plugin of type Button Group only implements the icon specification, but it is possible to customize the behavior of any other function of its parent classes, which in this case is [PopUpButtonPlugin](popup_button_plugin.md):

```javascript
import { ButtonGroupPlugin } from 'paella-core';

import ScreenIcon from '../icons/screen';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    async load() {
        this.icon = ScreenIcon;
    }
}
```

## Create button groups from configuration (paella-core>=1.22)

From version 1.22 of `paella-core` it is possible to create new button plugin instances directly from the configuration file. This way, it is not necessary to extend a class to create a button group.

Button groups are defined in the configuration, in the `buttonGroups` section:

```json
{
    ...
    "buttonGroups": [
        {
            "enabled": true,
            "groupName": "options",
            "description": "Configuration options",
            "icon": "settings-icon.svg",
            "order": 4,
            "side": "right",
            "tabIndex": 10,
            "parentContainer": "playbackBar"
        }
    ],
    ...
}
```

Each element of the `buttonGroups` array is the configuration options of a ButtonGroup instance that will be created dynamically. In addition to these options, we also add the `icon` property, which is used to specify the icon we want to use for the button that will display the pop-up with the options.

The icon must be a file in `svg` format, and will be looked for in a path relative to the location of the settings file. In the example above, the icon `settings-icon.svg` will be looked for in the same path as the configuration file.



## Customization

Although the behavior of the button group menu is similar to that of the [menu plugins](menu_button_plugin.md), their styles are not the same. This is because in this way we can specify different styles for button groups and menus.

The structure of the button menu items is as follows (this example shows a group containing two buttons):

```html
<div class="button-group">
    <!-- Group title -->
    <div class="button-group-title">Group title</div>

    <!-- First button -->
    <div class="button-plugin-wrapper">
        <div class="button-plugin-container">
            <!-- Button content. See documentation about button plugins -->
        </div>

        <!-- Button description -->
        <a class="button-description">Button description</a>
    </div>

    <!-- Second button -->
    <div class="button-plugin-wrapper">
        <div class="button-plugin-container">
            <!-- Button content. See documentation about button plugins -->
        </div>

        <!-- Button description -->
        <a class="button-description">Test menu plugin</a>
    </div>
</div>
```

### Examples

**Customize the title**

```css
.button-group-title {
    font-family: Helvetica;
    font-size: 15px;
}
```

**Customize button size**

```css
.button-group .button-plugin-container button {
    width: 50px;
    height: 50px;
}
```

**Customize button colors**

```css
.button-group .button-plugin-container button {
	background: none;
}

.button-group button:hover {
	background-color: #FF8822;
}

.button-group button:active {
	background-color: #EE7700;
}
```

**Add separator to menu items**

```css
.button-group .button-plugin-wrapper {
    border-bottom: 1px dotted white;
}
```