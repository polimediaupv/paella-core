# Video Container Message (paella-core >= 1.30)

It allows the display of short messages with icons on the screen, which disappear with a timer, in nine different zones. It is intended to provide quick information to the user in response to actions or events.

```js

import { VideoContainerMessagePosition } from 'paella-core';
import SvgIcon from "my-icon.svg";

...
// Show a message with icon for 3 seconds in the center of the video container
paella.videoContainer.message.show({
    icon: SvgIcon,
    text: "Message",
    timeout: 3000,
    position: VideoContainerPosition.CENTER_MIDDLE
});
```

## Icons and text

Both icon and text are optional, provided that one of the two is specified. The icon and text can also be presented at the same time, in which case the icon is displayed on top of the text.

## Positions

It is possible to display messages in nine different positions on the video container:

- `VideoContainerPosition.TOP_LEFT`
- `VideoContainerPosition.TOP_MIDDLE`
- `VideoContainerPosition.TOP_RIGHT`
- `VideoContainerPosition.CENTER_LEFT`
- `VideoContainerPosition.CENTER_MIDDLE`
- `VideoContainerPosition.CENTER_RIGHT`
- `VideoContainerPosition.BOTTOM_LEFT`
- `VideoContainerPosition.BOTTOM_MIDDLE`
- `VideoContainerPosition.BOTTOM_RIGHT`

## Custom CSS class

You can use the `cssClass` parameter to add custom CSS classes to the message:

```js
paella.videoContainer.message.show({
    text: "Hello World!",
    cssClass: "my-custom-class"
});
```

