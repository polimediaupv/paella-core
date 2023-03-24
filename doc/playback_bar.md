# Playback bar

The playbar is the user interface component that is displayed at the bottom of the player container, and provides the space to house the timeline bar and buttons that are added to the player via [button plugins](button_plugin.md).

The `playbackBar` object is accessible through the paella core instance, but note that this object will only be accessible after the video loading is complete:

```js
...
const player = new Paella('my-player-container', initData);
player.playbackBar  // undefined

player.bindEvent(player.Events.PLAYER_LOADED, () => {
    player.playbackBar  // Ok
});

player.loadManifest()
    .then(() => console.log("Manifest loaded))
    .catch(err => console.error(err));
```

The playback bar object only contains a public accessible API that allows you to enable or disable it:

**`playbackBar.enable` (read/write, `paella-core >= 1.10.x`):** Enables or disables the playback bar. Disabling the playback bar causes it to be hidden in the user interface, but internally it will continue to function: the status of the timeline will be updated and the plugins it contains will remain active.

The following code snippet shows how to configure the player to disable the playback bar. Note that the last parameter of `bindEvent` is set to `false`, because we don't want the player to unregister this event if the player is unloaded with the `async player.unload()` API. For more information on the `bindEvent` function, see the documentation on [events](events.md).

```js
player.bindEvent(player.Events.PLAYER_LOADED, () => {
    player.playbackBar.enabled = false;
}, false);
```

## Progress indicator visibility (paella-core >= 1.25)

On some occasions we may want to modify the visibility of the video progress indicator, for example in live broadcasts. The progress indicator provides several functions to control the visibility of the timeline and the current time indicator of the video:

- **`playbackBar.progressIndicator.hideProgressContainer()`:** Hides the progress indicator bar.
- **`playbackBar.progressIndicator.hideProgressTimer()`:** Hides the current timer text.
- **`playbackBar.progressIndicator.hideTimeLine()`:** Hides the progress indicator bar and the current time text.
- **`playbackBar.progressIndicator.showProgressContainer()`:** Shows the progress indicator bar.
- **`playbackBar.progressIndicator.showProgressTimer()`:** Shows the current time text.
- **`playbackBar.progressIndicator.showTimeLine()`:** Shows the progress indicator bar and the current time text.

## Customization

You can customize several elements of the playback and progress indication using CSS styles and the player configuration. Check [here how to customize it](progress_indicator_customization.md).

