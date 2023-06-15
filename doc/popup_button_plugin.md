
# Popup button plugin

It is a special type of [button plugin](button_plugin.md) that displays a popup window when clicked. The operation is much simpler than in the case of button type plugins, because you only have to specify the content of the popup, by overwriting the `async getContent()` method:



```javascript
import {
  PopUpButtonPlugin,
  createElementWithHtmlText
} from 'paella-core';
import myPluginIcon from 'icons/my-plugin-icon.svg';

export default class MyPupUpPlugin extends PopUpButtonPlugin {
  async getContent() {
    const content = createElementWithHtmlText("<p>Pop Up Button Plugin</p>");
    return content;
  }

  get popUpType() {
    return "modal"; // "modal", "timeline" or "no-modal"
  }

  async load() {
    this.icon = myPluginIcon;
  }
}
```

`get popUpType()`: Defines the type of pop up that the button will display:

- "modal": The pop up is displayed as a modal area, which is hidden when the user clicks out of it. It will be displayed next to the button, and the position of the pop up relative to the button will depend on the available gap in the window.
- "no-modal": The pop up is displayed in the same way as the "modal" one, but you can still interact with the player. To hide a "no-modal" pop up, the user must to click the button again.
- "timeline": The pop up is displayed above the timeline, and measures the full width of the timeline. The height will depend on the content of the pop up.

(paella-core >= 1.20) You can override this property with the plugin configuration, using the `popUpType` property:

```json
{
  "plugins": {
    ...
    "es.upv.paella.myPopUpPlugin": {
      "enabled": true,
      "popUpType": "modal"
      ...
    }
  }
}
```

## Reload content

In general, the pop up content is only generated once, although it is sometimes reloaded due to changes in the player state. If the content needs to be reloaded, the `refreshContent` property of the plugin can be used to reload the content the next time it is generated. This property causes the content to reload the next time the user presses the plugin button.

```javascript
import { 
    PopUpButtonPlugin,
    Events,
    bindEvent
} from 'paella-core';

export default class FrameControlButtonPlugin extends PopUpButtonPlugin {
  ... 

  async load() {
    bindEvent(this.player, Events.TRIMMING_CHANGED, (evt) => {
      this.refreshContent = true;
    });
  }
}

```

## Parent pop ups

The `parentContainer` property of the configuration can be used to place the button in another container. For more information, see the documentation of [ButtonPlugin](button_plugin.md) and [ButtonGroupPlugin](button_group_plugin.md). In the case that the button is placed in another pop up (for example, grouping it in a ButtonGroupPlugin), we will have a configuration in which a child pop up can be opened from a button placed in a parent pop up.

The `closeParentPopUp` property determines whether the parent pop up window should be closed when the child pop up is closed. The value of this attribute is obtained from the plugin configuration. The default value is `false`, but you can change the default value overriding the `getCloseParentPopUp()` function:

```js
class MyPopUpPlugin extends PopUpPlugin {
  ...
  getCloseParentPopUp() {
    return true;  // close parent pop up by default
  }
  ...
}
```

Note that in this case, the value defined in the configuration file will take preference over the value returned by the `getCloseParentPopUp()` function. If you want to prevent the user from using the configuration to set this property, you can override the `closeParentPopUp` attribute itself.


```js
class MyPopUpPlugin extends PopUpPlugin {
  ...
  get closeParentPopUp() {
    return true;  // close parent pop up and prevent other configuration
  }
  ...
}
```

## Pop ups as floating windows (paella-core >= 1.38.0)

### How does the floating window mode work?

There are a number of options to make pop ups behave like windows that the user can move or resize. Generally, pop up plugins and their derivatives ([MenuButtonPlugin](menu_button_plugin.md) and [ButtonGroupPlugin](button_group_plugin.md)) will work fine with window mode options enabled, but some particular pop up plugins may require modifications to make the content display correctly in windowed mode. This can cause problems especially when the window resizing option is activated.

To address potential issues that may occur with pop up content, a specific CSS class is added to the window container when the pop up is in floating window mode. This way we can identify when the pop up elements are in windowed mode.

A pop up acquires its size properties from its content. The position is set from the element that opened the pop up, which in this case would be the plugin button. When the user clicks on any of the areas to move or resize the window, these properties of size and position become static, so that the window starts from an initial position and size identical to what it was when it was a pop up. For this reason, when the pop up becomes a floating window, the `.static-position` class is added:

```css
/* Example extracted from es.upv.paella.findCaptionsPlugin in paella-basic-plugins library*/

/* Pop up mode: restrict element width to 400px */
.center-container .search-results p {
    max-width: 400px;
    user-select: none;
}

/* Window mode: the window size is statically set in element.style and is
   selected by the user. There is no need to restrict this element width
 */
 .popup-content.static-position .search-results p {
    max-width: unset;
}
```

Once the pop up has been transformed into a floating window, it is possible to convert it back to pup up using the `dock` button, so we have to keep in mind that the content of the pop up can change alternatively from pop up mode to floating window mode and vice versa.

### Enable floating window mode

To make a pop up behave like a window we can use several properties that are related to this behavior.

`moveable (boolean)`: Defines whether the pop up can be moved by the user. By default, this option is `false`.

`resizeable (boolean)`: Defines whether the size of the pop up can be changed by the user. If a pop up is resizeable, then it is also moveable, although the previous property is set to `false`. By default, this option is `false`.

`closeActions (object)`: Defines the possible actions to close the pop up window. In any case, a pop up can always be closed by clicking on the button that opened it. These options are independent of `moveable` and `resizeable`.

- `closeButton`: If `true`, a `close` button with an X will be displayed in the title bar of the pop up, and we can close it by clicking on it. If `false` this button will not appear. By default, this option is `false`.
- `clickOutside`: If `true`, the pop up will close when clicking outside of it, or when opening another pop up that is not a descendant of it. If `false`, we can only close the pop up by clicking the button that opened it, or by clicking the close button, if enabled. By default, this option is `true`.

IMPORTANT: It is possible to make a pop up become a window when the type is `non-modal`. If the type is `non-modal`, we may see strange behavior with the close window options, so it is not recommended to enable this option. Pop ups of type `timeline` cannot be converted to floating windows.

These properties can be set in the configuration, or overwritten in the class to establish default settings, or to force a certain value:

```js
// Example: force a pop-up to always behave as a floating window
// regardless of what is set in the configuration
export default class MyPopUpWindowPlugin extends PopUpButtonPlugin {
  ...
  get moveable() {
		return true;
	}

	get resizeable() {
		return true;
	}

	get closeActions() {
		return {
      clickOutside: false,
			closeButton: true
		}
	}
}
```

```js
// Example: modify the default behavior, but allow to change the settings in the configuration
export default class MyPopUpWindowPlugin extends PopUpButtonPlugin {
  ...
  get moveable() {
		return this.config.moveable ?? true;
	}

	get resizeable() {
		return this.config.resizeable ?? true;
	}

	get closeActions() {
    const clickOutside = this.config.closeActions?.clickOutside ?? false;
    const closeButton = this.config.closeActions?.closeButton ?? true;
		return {
      clickOutside,
			closeButton
		}
	}
}
```

## Custom css class

It is possible to add a custom CSS class to the pop up container. This is useful, for example, to modify default CSS properties of the pop up window, but in a way that only affects your plugin. The custom class can be set via configuration:

```json
"es.upv.paella.myPopUpWindowPlugin": {
  ...
  "customPopUpClass": "my-plugin"
}
```

However, as this parameter can affect CSS styles, it is usually best to define it by overwriting the pop up class:

```js
export default class MyPopUpWindowPlugin extends PopUpButtonPlugin {
  ...
  get customPopUpClass() {
		return "my-plugin";
	}
}
```

Another common design pattern is to define custom configuration properties, and then return the custom class based on this:

```json
"es.upv.paella.myPopUpWindowPlugin": {
  ...
  "bluePopUpBackground": true
}
```

```js
export default class MyPopUpWindowPlugin extends PopUpButtonPlugin { 
  ...
  get customPopUpClass() {
		return this.config.bluePopUpBackground && "blue-background";
	}
}
```

```css
.popup-container.blue-background .popup-content {
    background-color: rgba(0, 0, 255, 0.8);
}
```

