# Video Canvas

Internally, `paella-core` differentiates the way a video is loaded from the way it is displayed in the browser. Although VideoCanvas were briefly mentioned in the [first tutorial](quick_start.md), so far we have only included the most basic VideoCanvas in the examples. In this tutorial we will look at this part in more depth, and include other types of VideoCanvas.

## Add zoom to videos

The VideoCanvas is used to add to the website the DOM element that will represent the video. At this point you may think that the only DOM element you can add is simply a `<video>`, but it is not that simple: this element does not allow us to do certain things, such as zooming.

We are going to install a plugin package that adds a new VideoCanvas and a series of buttons to allow zooming in the videos. First, install the `paella-zoom-plugin` package:

```sh
npm install --save paella-zoom-plugin
```

Now we add the plugins to the player. In this case we are only going to add three plugins: the VideoCanvas and two zoom buttons.

```js
...
import { 
    ZoomCanvasPlugin,
    CanvasZoomInButtonPlugin,
    CanvasZoomOutButtonPlugin
 } from 'paella-zoom-plugin';
 ...
 const initParams = {
    ...
    plugins: [
        ...
        ZoomCanvasPlugin,
        CanvasZoomInButtonPlugin,
        CanvasZoomOutButtonPlugin
    ],
```

## CanvasButtonPlugin

At this point it is very important to differentiate between two types of plugins that are very different, but can be confused by their name. We have added three plugins: `ZoomCanvasPlugin`, `CanvasZoomInButtonPlugin` and `CanvasZoomOutButtonPlugin`. The first one is a `CanvasPlugin`, which is the type of plugin we have already described, and the second two are a `CanvasButtonPlugin`.

A `CanvasButtonPlugin` is used to implement buttons, but instead of being placed in the playback bar, they are placed inside the video canvas. In the tutorial on video layouts we saw that video layouts can contain buttons that serve to modify the layout itself. A `CanvasButtonPlugin` is used to create buttons that are placed in this area of the canvas.

## Configuration

To enable these plugins, let's start with the easy part: the zoom buttons. We only have four properties to add: `enabled`, `side`, `order` and `content`. The `side` attribute simply controls whether the button will be aligned to the left, center or right of the canvas. If we want to control the order in which the buttons appear, we can do it with the `order` attribute.

```json
"es.upv.paella.canvasZoomInButtonPlugin": {
    "enabled": true,
    "side": "center",
    "content": ["presenter"],
    "order": 1
},
"es.upv.paella.canvasZoomOutButtonPlugin": {
    "enabled": true,
    "side": "center",
    "content": ["presenter"],
    "order": 0
}
```

With the video canvas plugin you have to do something else. Within the video manifest, each video stream has to specify the type of video canvas it can use. If nothing is said, the type of video canvas used for video streams is `video`:

**`data.json`**

```json
{
    ...
    "streams": [
        {
            "sources": {...},
            "content": "presenter",
            "canvas":["video"]  << used by default
        }
    ]
}
```

The `canvas` property in the stream is an array. This is because we may want a video to be able to run in several types of canvas. However, we will see this in detail later in another tutorial.


TODO: Under construction

