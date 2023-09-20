# Exported plugins

This document details the plugin classes that are exported from `paella-core`. These plugins can be extended to redefine features, without losing the basic functionality.

## How to use

To extend or modify a plugin feature, you can import the exported plugin class from `paella-core` library, and use it to define a new plugin, as described at [paella-core plugins](plugins.md) document:

```js
import { PlayPauseButtonPlugin } from 'paella-core';

export default class MyPlayPauseButtonPlugin extends PlayPauseButtonPlugin {
    // Define custom play/pause button plugin features
}
```

Remember that you must to define a new property at the `config.json` file that matches your new plugin file name, and that the file name must be unique, because it is used as unique identifier.

## Plugins exported by `paella-core` library

### Button

**es.upv.paella.playPauseButton:** exported as `PlayPauseButtonPlugin`

### Video format

**es.upv.paella.hlsVideoFormat:** exported as `HlsVideoFormatPlugin` (paella-core 1.44)

**es.upv.paella.mp4VideoFormat:** exported as `Mp4VideoFormatPlugin` (paella-core 1.44)

**es.upv.paella.imageVideoFormat:** exported as `ImageVideoFormatPlugin` (paella-core 1.44)

**es.upv.paella.audioVideoFormat:** exported as `AudioVideoPlugin` (paella-core 1.44)

The above list corresponds to the video plugins. In addition to this, the classes that implement the video formats are also exported  (paella-core 1.5):

**HlsVideo**, **Mp4Video**, **ImageVideo**, **AudioOnlyVideo**

The following utilities are also exported for HLS support (paella-core 1.44):

```js
const HlsSupport = {
    UNSUPPORTED: 0,
    MEDIA_SOURCE_EXTENSIONS: 1,
    NATIVE: 2
}
```

`getHlsSupport(forceNative)`: Returns the HLS support for the current browser, which can be any of the values of `HlsSupport`.

`defaultHlsConfig()`: Returns the minimum default configuration for `hls.js`.

### Video layout

**es.upv.paella.singleVideo:** exported as `SingleVideoLayoutPlugin`

**es.upv.paella.dualVideo:** exported as `DualVideoLayoutPlugin`

**es.upv.paella.dualVideoDynamic:** exported as `DualVideoDynamicLayoutPlugin`

**es.upv.paella.tripleVideo:** exported as `TripleVideoLayoutPlugin`

### Shortcuts

**es.upv.paella.defaultShortcuts:** exported as `DefaultKeyShortcutsPlugin`

### Captions

**es.upv.paella.vttManifestCaptionsPlugin:** exported as `VttManifestCaptionsPlugin`

### Video Canvas

**es.upv.paella.videoCanvas:** exported as `VideoCanvasPlugin`. This plugin also exports the `VideoCanvas` class, that implements the `Canvas` class created with the `VideoCanvasPlugin` factory method. See [video canvas plugin](canvas_plugin.md) documentation to get more information about the Canvas API. 

## Other library plugins

You can consult the list of plugins exported by other libraries in the `README.md` file of each repository:

- [paella-basic-plugins](https://github.com/polimediaupv/paella-basic-plugins)

- [paella-slide-plugins](https://github.com/polimediaupv/paella-slide-plugins)

- [paella-zoom-plugin](https://github.com/polimediaupv/paella-zoom-plugin)

- [paella-user-tracking](https://github.com/polimediaupv/paella-user-tracking)

