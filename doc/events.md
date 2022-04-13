# Events

## Using events from ES6 module

Paella Player launches a series of events during its operation that can be captured from different parts of the code to trigger certain behaviors. For this purpose, the Events object and the triggerEvent and bindEvent functions are provided:

```javascript
import { Events, bindEvent } from 'paella-core';

...

// `player` contains our Paella Player instance
bindEvent(player, Events.PLAY, () => console.log("The video is playing"), false);
```

You can also create your own events. The event type identifier is any text string, however you should use some kind of prefix to avoid collisions with other event names. The paella player core events all follow the `paella:*` pattern, and are all published in the `Events` object, which exports the `paella-core` package, as shown in the code above.

**es.upv.paella.example.myPlugin.js:**

```javascript
import { triggerEvent } from 'paella-core';

export const MyEvents = {
  TRIGGER_ACTION: "myplugin:triggerAction"
}

export default class MyButton extends ButtonPlugin {
  ...
  async action() {
    triggerEvent(this.player, MyEvents.TRIGGER_ACTION, { param1: 1, param2: "2" });
  }
}
```

```javascript
import { MyEvents } from 'es.upv.paella.example.myPlugin.js';
import { bindEvent } from 'paella-core';
...
bindEvent(playerInstance, MyEvents.TRIGGER_ACTION, (params) => {
  console.log("Trigger action");
  console.log(params);
}, false);
```

## Using events from Paella Player instance

It is possible to register a function as a response to an event directly using the Paella Player instance..

```javascript
var player = __player_instances__[0];
player.bindEvent(player.Events.TRIMMING_CHANGED, (eventData) => {
  console.log("The video trimming has changed");
  console.log(eventData);
}, false);
```

**Note:** Please note that the preferred API for triggering events is the ES6 module API. The paella.bindEvent() function is only recommended for debugging tasks from the web browser development tools console.


## Events and player life cycle

In certain types of applications, especially on SPA websites, it is possible that the paella player instance may be loaded and unloaded several times. For example, if we want to load a different video without having to reload the page, we will have to make use of the lifecycle functions to unload the player and then reload it again. See more info about [paella player life cicle in this document](life_cycle.md).

In the case of player reloading, two cases may occur, as far as events are concerned:

- The registered event must be removed when the player is reloaded: if the code in which we are registering the event is going to be automatically re-executed when the player is reloaded, then that event has to be cleared when the player is unloaded. Otherwise, the event will re-register again each time the reload occurs. For example, if the event is registered in the `load()` method of a plugin, since that code will be executed again when the player is reloaded.
- The registered event must persist when the player is reloaded: if the code where the event is registered is not going to be called automatically at the time of reloading, we want it to be maintained after reloading the player. For example, in the following code snippet we register an event in the code that builds the player instance. This code will only execute once, so we will want the event to hold if the player is reloaded.

```js
let paella = new Paella('player-container', initParams);

paella.bindEvent(
  Events.PLAYER_LOADED,
  () => player.log.debug("====== Player loaded ======="),
  false   // The event must not be deleted when reloading the player.
);

await paella.loadManifest();
```

The last parameter in `player.bindEvent` and `bindEvent` functions indicates if the event must be removed on player unload. The default value is `true`, because it is usually more advisable to interact with paella core APIs from plugins, and in this case events should always be cleared if a reload occurs.

```js
import { bindEvent } from 'paella-core';
...
bindEvent(playerInstance, eventName, callback, unloadOnReload = true);
```

```js
playerInstance.bindEvent(eventName, callback, unloadOnReload = true);
```

## Predefined events

**`PLAY`:** Thrown when the method [`videoContainer.play()`](video_container.md) is called. It does not receive parameters.

**`PAUSE`:** Triggered when calling the method [`videoContainer.pause()`](video_container.md). It does not receive parameters.

**`STOP`:** Triggered when [`videoContainer.stop()`](video_container.md) method is called. It does not receive parameters.

**`ENDED`:** Triggered when the video ends. It does not receive parameters.

**`SEEK`:** Triggered when the method [`videoContainer.setCurrentTime()`](video_container.md) is called. It receives the following parameters:

- `prevTime`: time instant before executing the `seek` action.
- `newTime`: new time instant.

**`FULLSCREEN_CHANGED`:** It is triggered when the `fullscreen` state changes. It receives as parameter:

- `status (true | false)`: the status to change to.

**`VOLUME_CHANGED`:** Triggered when calling the method [`videoContainer.setVolume()`](video_container.md). It receives as parameter:

- `volume [0..1]`: The volume that has been set.

**`TIMEUPDATE`:** It is triggered during the video playback, every certain time, typically every 250 ms. The event is also sent when changes occur in the timeline, while the video is paused, for example, when the time instant is manually changed using the function [`videoContainer.setCurrentTime()`](video_container.md) Receives as parameter:

- `currentTime`: the new time instant.

**`TRIMMING_CHANGED`:** Triggered when the function [`videoContainer.setTrimming()`](video_container.md) is called. It receives as parameters the new soft trimming data:

- `enabled (true | false)`
- `start`: soft trimming start time
- `end`: soft trimming end time

**`CAPTIONS_CHANGED`:** Triggered when captions are added to the video using the [`captionCanvas`](captions.md) API. It receives as parameter:

- `captions`: the array with all available captions, including the one just added, which will be the last element of that array.

**`BUTTON_PRESS`:** It is launched when the user presses a button of type [ButtonPlugin](button_plugin.md) or a button of a [video layout](video_layout.md). It receives as parameter:

- `plugin`: the instance of the plugin that triggered the event.
- `playoutStructure` (only for buttons in a [video layout](video_layout.md)): the structure of the layout containing the button that triggered the event.

**`SHOW_POPUP`:** It is triggered when a [popup](popup_button_plugin.md) is displayed, either a modal popup or a timeline popup. It receives as parameters:

- `popUp (PopUp | TimeLinePopUp)`: the instance of the popup that has been opened.
- `plugin`: the plugin that triggered the event.

**`HIDE_POPUP`:** fired when a [popup](popup_button_plugin.md) is hidden, either a modal popup or a timeline popup. It receives as parameters:

- `popUp (PopUp | TimeLinePopUp)`: the instance of the popup that has been closed.
- `plugin`: the plugin that triggered the event.

**`MANIFEST_LOADED`:** fired when the video manifest is loaded and processed. if video loading is lazy, this is the last event to be triggered until the user plays the video.

**`STREAM_LOADED`:** fired when the video streams are processed, but before the user interface is loaded.

**`PLAYER_LOADED`:** fired when the user interface is loaded.

**`RESIZE`:** fired during window resizing. The event will be fired several times while the user is resizing.

**`RESIZE_END`:** is fired when the user has resized the window. The event is generated one second after the user finishes resizing the browser window.

**`LAYOUT_CHANGED`:** is fired when the user changes the video layout.

**`PLAYBACK_RATE_CHANGED`**: is fired when the user changes the playback rate. It receives as parameter the new playback rate: `{ newPlaybackRate }`

**`VIDEO_QUALITY_CHANGED`**: is fired when the video quality is changed.

**`HIDE_UI`**: during video playback, the user interface is hidden after a certain period of time. This event is triggered at the moment when the user interface is hidden.

**`SHOW_UI`**: when the user interface is hidden during playback, it is shown again in response to any user action (click, mouse movement, key press, etc.). This event is triggered when the UI is visible again.
 