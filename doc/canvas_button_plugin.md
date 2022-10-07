# Canvas Button Plugin

Allows you to add buttons in the video canvas area (see [Video Canvas Plugin documentation](video_canvas_plugin.md)).

In addition to using a Canvas Button Plugin, it is also possible to add buttons to videos using a [video layout plugin](video_layout.md). Although both are the same types of buttons, with the same features, these plugins are not similar:

- Throughout a video layout it is possible to add several buttons, which should be related to the layout itself. For example, in a layout with two videos, we could use a button to minimize one video and maximize the other.
- A CanvasButtonPlugin only allows to add one button to each video container. If we want several buttons, we will need several plugins. In this sense it works very similar to the [button plugins](button_plugin.md).

Los plugins de botón de canvas de vídeo no están relacionados con los plugins de botón normales, y esto es debido a que tienen algunas diferentias importantes:

- At the user experience level, this type of buttons are associated to a specific content. For example, if in our platform we have the video types `presenter` and `presentation`, when adding a button to a video canvas we have to decide if we want to associate the button to one content, the other or both. It is also important to note that this type of buttons should not be used to perform actions that are not associated with that particular content.
- Canvas buttons can only include icons without text and have a static size design, while generic buttons can contain icon, text or both, and can also be of variable size.

## Example

```js
import { CanvasButtonPlugin } from 'paella-core';

import MyCanvasButtonIcon from 'icons/my-canvas-button-icon.svg';

export default class MyCanvasButtonPlugin extends CanvasButtonPlugin {
    async load() {
        this.icon = MyCanvasButtonIcon;
    }

    async action() {
        alert("Test Canvas Button");
    }
}
```

## Configuration

The configuration parameters can be set through the plugin configuration, but we can also set predefined values to some of these parameters through the API. 

**`content`:** an array with the content related with the button. This value can only be set through configuration, as it will largely depend on the contents of the portal. The button will be added to the canvas of the videos that match one of the contents of this array.

```json
{
    "content": [
        "presenter",
        "presentation"
    ]
}
```

**`ariaLabel`:** is the accessibility label to be placed on the button. It is possible to set a default value to be used if the label has not been added in the configuration.

```json
{
    "ariaLabel": "Test video canvas plugin"
}
```

```js
export default class MyCanvasButtonPlugin extends CanvasButtonPlugin {
    getAriaLabel() {
        return "Default aria label";
    }
}
```

**`tabIndex`:** is the tab index that the button will have. The default value is obtained from the `paella-core` tabIndex handler, but we can also modify this behavior using the plugin API:

```json
{
    "tabIndex": 10
}
```

```js
import { getNextTabIndex, CanvasButtonPlugin } from 'paella-core';

export default class MyCanvasButtonPlugin extends CanvasButtonPlugin {
    getTabIndex() {
        // This is the default implementation
        return getNextTabIndex(this.player);
    }
}
```

**`description`:** is the text used for the `title` attribute of the button, which will be displayed when the mouse cursor is left over the button for a few seconds. This value can be set in configuration, and it is also possible to set the default value using the API:


```json
{
    "description": "My canvas button"
}
```

```js
export default class MyCanvasButtonPlugin extends CanvasButtonPlugin {
    getDescription() {
        return "The default description of my canvas button";
    }
}
```

**`side`:** this parameter is the same as the one used in the generic button plugins, and indicates on which side of the video canvas the button will be placed. This value can only be set in the plugin configuration. By default, buttons are placed on the left side of the video canvas. Valid values for this configuration are `left`, `center` and `right`.

```json
{
    "side": "left"
}
```

