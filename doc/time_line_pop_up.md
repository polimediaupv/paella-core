# TimeLine pop up

The `TimeLinePopUp` class allows to display a horizontal container that is placed at the top of the timeline. It is intended to place content that is related or interacts with the time of the video: for example, it can be used to display a list of frames extracted from the video, and when clicking on one of them the time instant of the video is placed at the second in which that frame appears.

It should not be used to display other types of content: for other types of content it is more convenient to use the [PopUps](pop_up_api.md) API.

Note that you can use pop up plugins to launch TimeLinePopUp windows, and in most cases this will be sufficient. This API is only indicated if you have to invoke it manually from JavaScript code.

## Example

```js
import { TimeLinePopUp, createElementWithHtmlText } from 'paella-core'

...

const myPopUp = new TimeLinePopUp(player, null);
const content = createElementWithHtmlText(`
    <div>
        <h1>Hello World!</h1>
    </div>
`);
const closeButton = createElementWithHtmlText('<button>Close</button>', content);
closeButton.addEventListener('click', evt => myPopUp.hide());
myPopUp.setContent(content);
myPopUp.show();
```

## Constructor

The constructor receives only two parameters:

- player: instance of paella-core to which the pop up is associated.
- contextObject: object that invoked the pop up. Internally it is not used for anything else but to trigger the `Events.SHOW_POPUP` event, so that whoever catches that event can know who has triggered the call.

No parameters are set for position and size: the position will always be above the playback bar, while the size will be 100% of the width of the playback bar, and the height will be defined by the content.

## Methods

**`static Unload(player)`:**, **`static HideUserInterface(player)`** and **`static ShowUserInterface(player)`:** these are internal `paella-core` methods and should not be used.

**`static HideAll(player)`:** Hides all timeline pop ups that are currently displayed. Generally only one pop up is shown at a time, but the method has been added with this name because it is not excluded that in the future more than one can be shown. It receives as parameter the instance of `paella-core` to which the pop up is associated.

**`show(uiTimerTriggered = false)`:** Displays a pop up. The `uiTimerTriggered` parameter is used to inform if the `SHOW_POPUP` event has already been fired. If `true`, the event will not be fired again.

**`hide(uiTimerTriggered)`:** Hides the pop up. The `uiTimerTriggered` parameter is used for the same as in the case of the `show` method, but controls the `events.HIDE_POPUP` event.

**`setContent(content)`:** receives as parameter a DOM element to be used as pop up content. Calling `setContent()` removes any content that may have been previously present.



