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

This is the only foreground colour that is defined. It is used to colour text and icons. The `paella-core` icons are defined using vector `svg` files precisely so that it is possible to colour the icons according to this variable. When designing SVG icons for `paella-core`, we have to take this into account: the icons must be monochrome to fit the defined style.


## Background colors

### `--main-bg-color`

### `--main-bg-color-hover`

### `--secondary-bg-color`

### `--secondary-bg-color-hover`

### `--highlight-bg-color`

### `--highlight-bg-color-hover`

### `--main-bg-gradient`

### `--video-container-background`

### `--base-video-rect-background-color`

## Border colors

### `--main-border-color`

### `--main-outline-color`