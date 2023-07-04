# Customize colors

The easiest way to customise the `paella-core` colors is to use the CSS variables that are defined. You can redefine the color variables in a style sheet file, and load it using the `utils.loadStyle()` API, as described in [the previous tutorial](customize_playback_bar.md):

```js
import {
    ...
    utils
} from 'paella-core';

...
await player.loadManifest();

await utils.loadStyle('colors.css');
```

```css
:root {
    --highlight-bg-color: #00b306;
    --highlight-bg-color-hover: #629e64;
    --main-bg-color: rgba(0, 0, 0, 0.1);
    --main-bg-color: rgba(0, 0, 0, 0.3);
}
```

## Foreground colors

### `--main-fg-color`

This is the only foreground color that is defined. It is used to color text and icons. The `paella-core` icons are defined using vector `svg` files precisely so that it is possible to color the icons according to this variable. When designing SVG icons for `paella-core`, we have to take this into account: the icons must be monochrome to fit the defined style.


## Background colors

These are the colors that are used for the backgrounds of the player elements. As these are background colors, they should contrast well with `--main-fg-color`.

### `--main-bg-color`

This is the main background color for player windows and pop-ups. The main background color must be neutral.

### `--main-bg-color-hover`

Used as background color for components that interact with the mouse, e.g. menu items that can be selected. It is not used for elements that execute actions, such as buttons. Like `--main-bg-color` it must be a neutral color.


### `--secondary-bg-color`

It is an alternative background color to `--main-bg-color`. Its characteristics must be the same as `--main-bg-color`, in the sense that it has to be a neutral color and contrast to `--main-fg-color`, although a different shade can be used (e.g., a dark gray could be used for `--main-bg-color` and a brown for `--secondary-bg-color`).

### `--secondary-bg-color-hover`

It is the equivalent of `--main-bg-color-hover`, but in counterpart to `--secondary-bg-color`.

### `--highlight-bg-color`

Used as a background color for elements that need to stand out, e.g. a selected item in a list. It has to be a color that contrasts with `--main-fg-color`.

### `--highlight-bg-color-hover`

It is used as a background color in elements that the user has to interact with and that trigger actions, such as buttons. It must be a color that contrasts with `--main-fg-color`. It is recommended that it be a more saturated or intense color than `--highlight-bg-color`, since in some elements both colors will be used in combination.

### `--main-bg-gradient`

It is a background gradient that is used for some elements of the player. It can also be used by plugins for some elements. It is a vertical gradient with characteristics analogous to `--main-bg-color`. This color is used by default as the background of the playback bar.

### `--video-container-background`

It is the background color of the video container, which corresponds to the `video-container` element.

### `--base-video-rect-background-color`

This is the background color of the `base-video-rect` container. Not to be confused with `video-container`. `base-video-rect` is inside `video-container`, sometimes they may match in size, but sometimes they will be different sizes. See the documentation on [VideoContainer](../video_container.md) and [VideoLayout](../video_layout.md) for more information.

## Border colors

### `--main-border-color`

It is an auxiliary variable used to draw elements containing borders. `paella-core` only uses it in the popup where it shows the current time instant and the video thumbnail, but other plugins can use it as well. In its default configuration, this variable has the same value as `--highlight-bg-color-hover`.

### `--main-outline-color`

It is the color of the highlight border. It is used to mark elements that have the focus. For more information, see the tutorial on [Accessibility](accessibility.md).