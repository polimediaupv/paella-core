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

**`playbackBar.enable` (read/write):** Enables or disables the playback bar. Disabling the playback bar causes it to be hidden in the user interface, but internally it will continue to function: the status of the timeline will be updated and the plugins it contains will remain active.

The following code snippet shows how to configure the player to disable the playback bar. Note that the last parameter of `bindEvent` is set to `false`, because we don't want the player to unregister this event if the player is unloaded with the `async player.unload()` API. For more information on the `bindEvent` function, see the documentation on [events](events.md).

```js
player.bindEvent(player.Events.PLAYER_LOADED, () => {
    player.playbackBar.enabled = false;
}, false);
```

## Customization

You can customize several elements of the playback and progress indication using CSS styles and the player configuration. Check [here how to customize it](progress_indicator_customization.md).

