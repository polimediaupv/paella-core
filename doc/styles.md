# Styles

The paella core styles are designed to make it possible to define, in a simple way, some aspects such as background colors, highlight colors or text and icon colors.

For this purpose, paella core colors are defined by CSS variables. By defining a stylesheet that rewrites these variables, it is possible to quickly change the colors of the player.

## Load styles

It is possible to define skins for paella core easily by adding style sheets at the end of the header.

```js
const head = document.getElementsByTagName("head")[0];
head.insertAdjacentHTML(
    "beforeend",
    '<link rel="stylesheet" href="custom-colors.css" />' 
);
```

It is important to do the loading of stylesheets at runtime, as this is the only way to ensure that the styles we add have higher priority over the predefined ones in paella-core and plugins. There is a function in the paella-core utilities that allows you to load stylesheets from JavaScript code asynchronously:

```js
import { utils } from 'paella-core';

...

await utils.loadStyle('custom-paella-styles.css');
```

## CSS variables

```css
:root {
    --main-fg-color: white;
    --main-bg-color: rgba(0,0,0,0.8);
    --main-bg-color-hover: rgb(0,0,0);
    --secondary-bg-color: rgb(32,32,32);
    --secondary-bg-color-hover: rgba(32,32,32,0.8);
    --highlight-bg-color: #A00;
    --highlight-bg-color-hover: red;
    --main-bg-gradient: linear-gradient(0deg, rgba(32,32,32,1) 0%, rgba(32,32,32,0.49531687675070024) 72%, rgba(32,32,32,0.08355217086834732) 100%);
    --main-border-color: rgba(125,125,125,0.4);
    --video-container-background-color: #e4e4e4;
    --base-video-rect-background-color: #8a8a8a;
}

```

## Modify default styles

You can override the default `paella-core` styles by using the function described in the *Load styles* section `utils.loadStyle()`. Otherwise, to modify more complex aspects of the styles, proceed as you would with any website: use the browser's development tools to find out which styles you need to redefine.

