
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
  
  async load() {
    this.icon = myPluginIcon;
  }
}
```



