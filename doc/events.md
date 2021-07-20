# Events

## Using events from ES6 module

Paella Player launches a series of events during its operation that can be captured from different parts of the code to trigger certain behaviors. For this purpose, the Events object and the triggerEvent and bindEvent functions are provided:

```javascript
import { Events, bindEvent } from 'paella-core';

...

// `player` contains our Paella Player instance
bindEvent(player, Events.PLAY, () => console.log("The video is playing"));
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
});
```



## Using events from Paella Player instance

It is possible to register a function as a response to an event directly using the Paella Player instance..

```javascript
var player = __player_instances__[0];
player.bindEvent(player.Events.TRIMMING_CHANGED, (eventData) => {
  console.log("The video trimming has changed");
  console.log(eventData);
});
```

**Note:** Please note that the preferred API for triggering events is the ES6 module API. The paella.bindEvent() function is only recommended for debugging tasks from the web browser development tools console.

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