# Customize icons

paella-core and its plugins use icons in various parts. To customize them there are special APIs that allow you to replace a predefined icon with a different one.

It is important to note that not all icons will be customizable. To change the icon of, for example, a third-party plugin, the plugin developer has had to integrate those customization APIs into their plugin. In addition, the plugin developer must also have specified the customization data for their icons.

In this chapter we will see how `paella-core` uses the icons and what is the method to replace them, when possible.

## Icons in `paella-core`

`paella-core` utiliza el exclusivamente el formato `svg` vectorial para los iconos. Cuando se utiliza un icono, en lugar de insertar la imagen con una etiqueta `<img>` o definirla como imagen de fondo, `paella-core` inserta el código XML del icono directamente en el árbol DOM. Esto permite definir el color del icono utilizando CSS.

For this reason, to change the color of the icons, it is not necessary to change the icon itself, but just change CSS properties. The easiest way is to change the `--main-fg-color` variable, as described in [the tutorial on customizing colors](customize_colors.md). But we can also modify the styles so that the icons use another color:

```css
/* Customize icon color in playback bar: */
.playback-bar .button-plugins button i svg {
    fill: green;
    color: green;
}

/* Customize icon color in button groups */
.button-group button i svg {
    fill: green;
    color: green;
}

/* Customize icon color video canvas */
.video-canvas .button-area button i svg {
    fill: green;
    color: green;
}
```

Of course, you can also change other icon properties:

```css
.playback-bar .button-plugins button i svg {
    fill: black;
    color: black;
    background-color: white;
    padding: 1px;
    border-radius: 3px;
}
```

Note that for these properties to work, the colors of the elements within the SVG file have to be defined at the root tag level of the SVG file. Therefore, the official recommendation is that SVG icons should not have color properties defined internally, so that the style colors can be used.

In the following icon, the root tag has a fill-color definition in the style. Therefore, this icon will not be affected by the `paella-core` style definitions. If we want to use the colors in the style, it is important to remove all these color and fill definitions.

```xml
...
<svg width="100%" height="100%" viewBox="0 0 36 34" style="fill: white; color: white;">
    <path d="M36,..."/>
</svg>
```

However, sometimes you may want to keep certain colors. For example, to define flags. For these cases the icons must define the fill and color styles, and generally these definitions will be maintained in each of the icon elements:

```xml
...
<svg width="100%" height="100%" viewBox="0 0 36 34">
    <path d="M36,..." style="fill: yellow; color: yellow;"/>
    <path d="M36,..." style="fill: blue; color: blue;"/>
</svg>
```

## Icon customization APIs

If changing the color of an icon is not enough and it is necessary to replace it, `paella-core` provides an API to do this task. It is divided into two parts:

### API for plugin developers

Allows to query if `paella-core` has a custom icon to use in the plugin. In this case, the plugin developer must use that icon instead of using the one that will be defined by default for his plugin. If the developer does not adapt the plugin to allow custom icons, then we can only modify it by extending the plugin in another class.

This part will be developed in detail later, when we learn how to create our own plugins. For the moment you only need to know from this part that:

- The plugin developer decides if he wants to integrate the icons with the customization APIs.
- For each icon, the plugin developer has to define a unique identifier and specify it in the documentation.

### Icon definition API

It is the API that allows to specify custom icons. To use it we need to know the identifier of the plugin that implements the icon, the icon identifier and an image in SVG format with the characteristics described at the beginning of this document. This information is usually included in the plugin documentation. For example, the following text is taken from the documentation of the `paella-basic-plugins` package, for the volume selector plugin:

#### Icon customization data:

- Plugin identifier: `es.upv.paella.volumeButtonPlugin`
- Icon names:
    + `volumeHighIcon`: maximum volume level.
    + `volumeMidIcon`: medium volume level.
    + `volumeLowIcon`: low volume level.
    + `volumeMuteIcon`: muted volume.

Create the following SVG files inside `public/icons` folder:

**volume_high.svg**

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Mesa-de-trabajo1" serif:id="Mesa de trabajo1" transform="matrix(0.125,0,0,0.125,0,0)">
        <rect x="0" y="0" width="512" height="512" style="fill:none;"/>
        <g id="volumeHighIcon">
            <g transform="matrix(4.89859e-16,8,-8,4.89859e-16,670.252,-65.0485)">
                <path d="M49.251,54.277C49.251,49.739 45.572,46.06 41.034,46.06C36.496,46.06 32.817,49.739 32.817,54.277L49.251,54.277Z"/>
            </g>
            <g transform="matrix(1,0,0,1,28.1589,7.22343)">
                <path d="M207.873,173.844L207.873,109.946C288.023,109.946 352.997,175.337 352.997,256C352.997,336.663 288.023,402.054 207.874,402.054L207.873,338.156C209.412,338.262 210.965,338.309 212.528,338.309C256.325,338.309 291.882,301.427 291.882,256C291.882,210.573 256.325,173.691 212.528,173.691C210.965,173.691 209.412,173.738 207.873,173.844Z"/>
            </g>
            <g transform="matrix(1.60452,0,0,1.60452,-97.5051,-147.534)">
                <path d="M207.873,155.16L207.873,109.946C288.023,109.946 352.997,175.337 352.997,256C352.997,336.663 288.023,402.054 207.874,402.054L207.873,356.84L212.528,356.962C266.25,356.962 309.865,311.722 309.865,256C309.865,200.278 266.25,155.038 212.528,155.038L207.873,155.16Z"/>
            </g>
            <g id="loudspeaker" transform="matrix(1,0,0,1,28.1589,7.22343)">
                <path d="M84,153.273L168.219,27.969C171.391,23.249 177.276,21.157 182.716,22.816C188.156,24.474 191.873,29.493 191.873,35.18C191.873,133.887 191.873,378.113 191.873,476.82C191.873,482.507 188.156,487.526 182.716,489.184C177.276,490.843 171.391,488.751 168.219,484.031L84,358.727L84,376.822L-3.037,376.822L-3.037,135.178L84,135.178L84,153.273Z"/>
            </g>
        </g>
    </g>
</svg>
```

**volume_mid.svg**

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Mesa-de-trabajo1" serif:id="Mesa de trabajo1" transform="matrix(0.125,0,0,0.125,0,0)">
        <rect x="0" y="0" width="512" height="512" style="fill:none;"/>
        <g id="volumeMidIcon">
            <g transform="matrix(4.89859e-16,8,-8,4.89859e-16,670.252,-65.0485)">
                <path d="M49.251,54.277C49.251,49.739 45.572,46.06 41.034,46.06C36.496,46.06 32.817,49.739 32.817,54.277L49.251,54.277Z"/>
            </g>
            <g transform="matrix(1,0,0,1,28.1589,7.22343)">
                <path d="M207.873,173.844L207.873,109.946C288.023,109.946 352.997,175.337 352.997,256C352.997,336.663 288.023,402.054 207.874,402.054L207.873,338.156C209.412,338.262 210.965,338.309 212.528,338.309C256.325,338.309 291.882,301.427 291.882,256C291.882,210.573 256.325,173.691 212.528,173.691C210.965,173.691 209.412,173.738 207.873,173.844Z"/>
            </g>
            <g id="loudspeaker" transform="matrix(1,0,0,1,28.1589,7.22343)">
                <path d="M84,153.273L168.219,27.969C171.391,23.249 177.276,21.157 182.716,22.816C188.156,24.474 191.873,29.493 191.873,35.18C191.873,133.887 191.873,378.113 191.873,476.82C191.873,482.507 188.156,487.526 182.716,489.184C177.276,490.843 171.391,488.751 168.219,484.031L84,358.727L84,376.822L-3.037,376.822L-3.037,135.178L84,135.178L84,153.273Z"/>
            </g>
        </g>
    </g>
</svg>
```

**volume_low.svg**

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Mesa-de-trabajo1" serif:id="Mesa de trabajo1" transform="matrix(0.125,0,0,0.125,0,0)">
        <rect x="0" y="0" width="512" height="512" style="fill:none;"/>
        <g id="volumeLowIcon">
            <g transform="matrix(4.89859e-16,8,-8,4.89859e-16,670.252,-65.0485)">
                <path d="M49.251,54.277C49.251,49.739 45.572,46.06 41.034,46.06C36.496,46.06 32.817,49.739 32.817,54.277L49.251,54.277Z"/>
            </g>
            <g id="loudspeaker" transform="matrix(1,0,0,1,28.1589,7.22343)">
                <path d="M84,153.273L168.219,27.969C171.391,23.249 177.276,21.157 182.716,22.816C188.156,24.474 191.873,29.493 191.873,35.18C191.873,133.887 191.873,378.113 191.873,476.82C191.873,482.507 188.156,487.526 182.716,489.184C177.276,490.843 171.391,488.751 168.219,484.031L84,358.727L84,376.822L-3.037,376.822L-3.037,135.178L84,135.178L84,153.273Z"/>
            </g>
        </g>
    </g>
</svg>
```

**volume_mute.svg**

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Mesa-de-trabajo1" serif:id="Mesa de trabajo1" transform="matrix(0.125,0,0,0.125,0,0)">
        <rect x="0" y="0" width="512" height="512" style="fill:none;"/>
        <g transform="matrix(1,0,0,1,28.1589,7.22343)">
            <g id="volumeMuteIcon">
                <path id="loudspeaker" d="M84,153.273L168.219,27.969C171.391,23.249 177.276,21.157 182.716,22.816C188.156,24.474 191.873,29.493 191.873,35.18C191.873,133.887 191.873,378.113 191.873,476.82C191.873,482.507 188.156,487.526 182.716,489.184C177.276,490.843 171.391,488.751 168.219,484.031L84,358.727L84,376.822L-3.037,376.822L-3.037,135.178L84,135.178L84,153.273Z"/>
            </g>
        </g>
    </g>
</svg>
```

In `main.js`, load the previous icons and use the plugin information to define the custom icons for the volume selector plugin. You can use the `utils.loadSvgIcon()` function from the `paella-core` utilities package to load the icons.

```js
import {
    ...
    utils
} from 'paella-core';
...
const [
    volumeHigh,
    volumeMid,
    volumeLow,
    volumeMute
] = await Promise.all([
    utils.loadSvgIcon('icons/volume_high.svg'),
    utils.loadSvgIcon('icons/volume_mid.svg'),
    utils.loadSvgIcon('icons/volume_low.svg'),
    utils.loadSvgIcon('icons/volume_mute.svg')
]);
...
```

Using the information in the `paella-basic-plugins` documentation, replace the plugin icons in the volume selector plugin using the `addCustomPluginIcon(pluginId,iconId,svgText)` api. This function must be called after executing `loadManifest()`:

```js
...
await player.loadManifest();

// Always call addCustomPluginIcon() after loadManifest()
player.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeHighIcon',volumeHigh);
player.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeMidIcon',volumeMid);
player.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeLowIcon',volumeLow);
player.addCustomPluginIcon('es.upv.paella.volumeButtonPlugin','volumeMuteIcon',volumeMute);
...
```

Previous tutorial: [Quality selector plugin](quality_selector.md)
Next tutorial: [Video manifest: captions](video_manifest_captions.md)