# UserInterfacePlugin

It is the base class of all plugins that add functionality through user interaction. 



```js
import { UserInterfacePlugin } from 'paella-core';

export default class MyUIPlugin extends UserInterfacePlugin {
  async getDictionaries() {
    return {
      es: {
        "Hello": "Hola"
      },
      de: {
        "Hello": "Hallo"
      }
    }
  }
}
```



A plugin of this type is not able to perform any function by itself, they only provide the `getDictionaries()` function that we can use to add dictionaries for translation of text strings used in the plugin. This function can be implemented in any of the classes that extend `UserInterfacePlugin`.

[ButtonPlugin](button_plugin.md)

[ButtonGroupPlugin](button_group_plugin.md)

[MenuButtonPlugin](menu_button_plugin.md)

[PopUpButtonPlugin](popup_button_plugin.md)

[VideoLayout](video_layout.md)

