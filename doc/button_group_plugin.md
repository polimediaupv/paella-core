# Button group plugin

It is a specific type of [PopUpButtonPlugin](popup_button_plugin.md) that allows to group several plugins of type button or of types derived from this one, in a pop up that is displayed when activating the plugin.

In the plugin configuration a container name is specified using the `groupName` attribute. This container name will be used as `parentContainer` in those plugins that we want to group under this container:

```json
{
    "es.upv.paella.testButtonGroupPlugin": {
        "enabled": true,
        "groupName": "testButtonGroup",
        "side": "right"
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

import ScreenIcon from 'paella-core/icons/screen.svg';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    async load() {
        this.icon = ScreenIcon;
    }
}
```
