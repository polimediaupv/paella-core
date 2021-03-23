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