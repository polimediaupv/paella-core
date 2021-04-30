# Canvas plugins

## Define a CanvasPlugin

```javascript
import { CanvasPlugin, Canvas } from 'paella-core';

// Canvas implementation
export class VideoCanvas extends Canvas {
    constructor(player, videoContainer) {
        super('div', player, videoContainer);
    }

    async loadCanvas(player) {
        player.element.style.width = "100%";
        player.element.style.height = "100%";
    }
}

// Canvas plugin definition
export default class VideoCanvasPlugin extends CanvasPlugin {
    get canvasType() { return "video"; }

    isCompatible(stream) {
        if (!Array.isArray(stream.canvas) || stream.canvas.length === 0) {
            // By default, the default canvas is HTML video canvas
            return true;
        }
        
        return super.isCompatible(stream);
    }

    getCanvasInstance(videoContainer) {
        return new VideoCanvas(this.player, videoContainer);
    }
}
```



The above code corresponds to the most basic canvas plugin: `VideoCanvasPlugin`, which implements the video via an HTML `<video>` element.



### Canvas implementation

When the [StreamProvider](stream_provider.md) loads the video streams into the video container, by default a `<video>` element containing the video player is created. Once the video is loaded, for which a plugin of type [VideoPlugin](video_plugin.md) is used, the `loadCanvas()` function is called. In this function we can make the transformations that we consider relevant, which can be from modifying the style of the `<video>` element to replacing it with a WebGL `<canvas>`.



### Canvas plugin

The canvas plugin integrates with the [paella player plugins](plugins.md) system and is responsible for deciding if the plugin is compatible with a given stream, and for creating the instance of the canvas implementation. As many canvas will be created as many streams are visible in the video, and to determine if the canvas is compatible, the `canvas` attribute of the stream obtained from the [video manifest](video_manifest.md) will be used.



`get canvasType()`: returns the label that must match with the `canvas` attribute in the stream, at the video manifest.

`isCompatible(stream)`: returns `true` or `false` depending on the stream `canvas` attribute. You can use this function to determine the compatibility of the stream in a more complex way. The default implementation will use the `get canvasType()` attribute.

`getCanvasInstance(videoContainer)`: returns the canvas implementation. This function will be called when Paella Player determines that this canvas type is appropriate, using the `isCompatible()` function and the `get canvasType()` attribute.