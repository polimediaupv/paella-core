# Progress indicator plugin (paella-core >= 1.2)

They allow content to be drawn on the playback bar. For this purpose, two canvases are used, which are accessed by all plugins in a shared way. One canvas is located below the video progress indicator, while the other is located above it. These canvases are called background canvas and foreground canvas respectively.

The playbar plugins contain two drawing functions for each canvas. Note that other plugins may have previously drawn content, so no delete operations should be performed. We can't assume that the context will come with a certain configuration, so we must always specify all the characteristics of the operations (colours, text fonts, line sizes, etc.).

```js
export default class MyProgressIndicatorPlugin extends ProgressIndicatorPlugin {

    drawForeground(context, width, height, isHover) {
        context.fillStyle = 'green';
        context.fillRect(2, 2, width - 4, 2);
    }

    drawBackground(context, width, height, isHover) {
        context.fillStyle = 'green';
        context.fillRect(2, height - 6, width - 4, 2);
    }
}
```

The draw methods of the canvas plugins will be called every time an event occurs that changes the size of the playbar. If we want to force a redraw from a plugin, we can call the `requestUpdate()` function of the plugin itself, or the `requestUpdateCanvas()` function of the `progressIndicator` object. The second case can occur when we have plugins of other types that interact with progress bar plugins. For example: we can have a button that saves a timestamp in the video, which would be a plugin of type button, and with a PropgressIndicatorPlugin plugin we would draw these timestamps.

```js
// Request update from a plugin instance
export default class OtherProgressIndicatorPlugin extends ProgressIndicatorPlugin {

    ...

    init() {
        this.player.bindEvent(Events.PLAY, () => this.requestUpdate());
    }
}

...

// Request update using the player instance
...
player.playbackBar.progressIndicator.requestUpdateCanvas();
```

## Progress bar size

We can use a progress indicator plugin to modify the size of the playback bar. The progress bar plugins contains two properties that define the minimum height of the playback bar when the mouse cursor is outside and inside the bar:

```js
export default class OtherProgressIndicatorPlugin extends ProgressIndicatorPlugin {
    get minHeight() { return 30; }

    get minHeightHover() { return 40; }
}
```

You can use these APIs to, for example, draw a visitor graph over the playback bar. You can use `minHeightHover` to enlarge the size of the bar when the mouse hovers over it.

