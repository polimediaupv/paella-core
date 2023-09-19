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

To enable these plugins, let's start with the easy part: the zoom buttons. We only have four properties to add: `enabled`, `side`, `order` and `content`. The `side` attribute simply controls whether the button will be aligned to the left, center or right of the canvas. If we want to control the order in which the buttons appear, we can do it with the `order` attribute. The `content` attribute is used to specify in which video canvas we want to show the buttons. We can show it in one or in several. In the following example the zoom buttons are shown only in the videos corresponding to the `presenter` content.

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
            "canvas": ["video"]  << used by default
        }
    ]
}
```

The `canvas` property in the stream is an array. This is because we can have different types of VideoCanvas, and a video may be displayed on different types of canvas. The type of canvas is related to the type of video content. We can have two videos with the same encoding format, but internally represent two different things. For example: a video in 360º format can have the same format as a normal video, but when viewing it we will have to make certain conversions so that it is represented correctly. This will be discussed in more depth in other tutorials.

The thing to understand here is that a VideoCanvas plugin is designed for a specific type of canvas. In our case, in `paella-core` we have the default canvas plugin, which we have configured in the first tutorial, and now we are going to configure another plugin to zoom the video. In this case, both plugins are used for `video` type canvas.

In this case, both plugins are eligible to be used. If we keep both plugins active, we will have to specify the order in which we want both plugins to be loaded. Another option would be to keep only the zoom VideoCanvas activated, because then there would be only one possibility to choose plugin. But there are cases in which it is possible that a video plugin is not eligible, and it is convenient to have a secondary option that always works. Imagine that a particular video stream is of very low quality. In this case, the canvas video plugin might determine that the video is too low resolution to zoom in on, and therefore it would be disabled for the current video. In that case we would use the default video plugin which has no zoom.

In summary: to activate several VideoCanvas plugins that work on the same type of canvas (in our case, `video`), we have to set the priority so that the plugins we want to use in a preferred way are loaded first.

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.videoCanvas": {
            "enabled": true,
            "order": 1
        },

        "es.upv.paella.zoomPlugin": {
            "enabled": true,
            "order": 0
        },
        ...
    }
}
```

If you load the new player, you will see that the zoom buttons are now enabled on the video corresponding to the presenter.

Previous tutorial: [Create custom plugin](create_custom_plugin.md)
Next tutorial: [Video 360](video_360.md)
