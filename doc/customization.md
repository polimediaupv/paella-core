
# Design

This document summarises and outlines all issues relating to the design and customisation of the player's appearance.

## Position of the buttons

You can get more info in the following documents:

- [Button plugins](button_plugin.md)
- [Button groups](button_group_plugin.md)

## Colors and styles

If you want to modify the colour schemes or other style sheet properties, see the following document:

- [Styles](styles.md)

To modify styles from `paella-core` or any of its plugins, a function is provided in the utility package that allows us to load stylesheets dynamically, and so we make sure that these new styles overwrite the existing ones:

```js
import { utils } from 'paella-core';
...
await utils.loadStyle('custom-paella-styles.css');
```

On the other hand, `paella-core` defines a set of CSS variables that you can use to modify the player's default colour scheme. For example, to modify the main foreground and background colour:

```css
:root {
    --main-fg-color: black;
    --main-bg-color: rgba(250,250,250,0.8);
    --main-bg-color-hover: rgb(200,200,200);
}
```

The full list of predefined CSS variables can be found in the [Styles](styles.md) document.


## Icons

Plugin icons are the responsibility of the individual plugins, and cannot be modified externally. They are embedded within the code of each plugin library via `SVG` files, which are not only vectorial, but also allow the fill colours of the elements to be defined by the style sheets. For this reason, it is also not possible to use bitmaps as icons. More information on this can be found in the document on [Button plugins](button_plugin.md).

However, many plugin libraries export their plugin classes. If so, the names of these classes will be specified in the documentation of each library. In this case, we can define a derived plugin to override the button implementation.

```js
// Note: this is an example. Check the actual `paella-basic-plugins` repository
// documentation to get more info about the exported plugin classes. 
import { VolumePlugin } from 'paella-basic-plugins';

import MyIcon from '../icons/my-volume-icon.svg';

export default class MyVolumePlugin extends VolumePlugin {
    async load() {
        super.load();
        this.icon = MyIcon;
    }    
}
```

You can read more about plugin customization in [this document](exported_plugins.md).

