
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


