
# Paella object

The `Paella` object is a mediator that groups all the `paella-core` APIs. It is created by the programmer, directly from the `paella-core.Paella` class, or indirectly, starting from a custom class descending from `paella-core.Paella`.:

```js
// Create a paella object, directly from the Paella class
import { Paella } from 'paella-core';
const myPlayer = new Paella(...)
```

```js
// Create a paella object, using a customized Paella class
import { Paella } from 'paella-core';

class MyPaellaClass extends Paella {
    ...
}

const myPlayer = MyPaellaClass(...)
```

## The `__paella_instances__` object

Each time a `Paella` object is created, it is registered in the global object `__paella_instances__`. This is an array containing all instances of `Paella` type objects that have been created in the current window.

It is very important to note that this object should only be used for debugging purposes, to invoke `paella-core` APIs through the debug terminal of the browser. Never use this object in code.

```js
>> __paella_instances__[0].version
"1.0.50"
```

## Initialization

See the documentation about [paella-core initialization](initialization.md).

## Properties

**`version`** (read): returns the version of `paella-core`. This property is usually rewritten in player implementations by extending the `paella` class, to return more information about `paella-core` versions, plugins and player implementation. For example, in the [reference implementation of `paella-player`](https://github.com/polimediaupv/paella-player), this property is redefined as follows:

```js
import { Paella } from 'paella-core';
import packageData from '../package.json';

...

class PaellaPlayer extends Paella {
    get version() {
        const player = packageData.version;
        const coreLibrary = super.version;
        const pluginModules = this.pluginModules.map(m => `${ m.moduleName }: ${ m.moduleVersion }`);
        return {
            player,
            coreLibrary,
            pluginModules
        };
    }
}
```

**`pluginModules`** (read): Returns information about the plugin modules that have been registered in the player.

```js
__paella_instances__[0].pluginModules.forEach(module => {
    console.log(module.moduleName);
    console.log(module.moduleVersion);
})
```

**`log`** (read): Returns the [`paella-core` log object](log.md).

**`ready`** (read): Returns `true` if the player is loaded and ready to play a video. See the documentation about [`paella-core` life cycle](life_cycle.md) for more information. 

**`state`** (read): Returns the current player state. See the documentation about [`paella-core` life cycle](life_cycle.md) for more information.

**`stateText`** (read): Returns the current player state name. See the documentation about [`paella-core` life cycle](life_cycle.md) for more information.

**`Events`** (read): Returns the `Events` object, containing all the available event types. See the documentation about [events](events.md) for more information.

**`hideUiTime`** (read/write): Set or get the amount of seconds that must elapse without user interaction, while the video is playing, to hide the user interface.
    
**`containerSize`** (read): Returns the player container size (`{ w: X, h: Y}`) in pixels.

**`containerElement`** (read): Returns the player container dom element.

**`configLoaded`** (read): Returns `true` if the configuration has been loaded.

**`videoManifestLoaded`** (read): Returns `true` if the video manifest has been loaded.

**`videoLoaded`** (read): Returns `true` if all the video streams has been loaded.

**`playerLoaded`** (read): Returs `true` when the player is fully loaded.

**`configResourcesUrl`** (read): Returns the URL of the configuration resource files. Some configuration options depends on third party files, for example, the configuration of the [video layout plugins](video_layout.md). Those files are placed in this URL.
    
**`configUrl`** (read): Returns the configuration file URL.

**`config`** (read): Returns the configuration file object.

**`videoId`** (read): Returns the current video identifier.

**`repositoryUrl`** (read): Base URL where the video repository is located, for example "repository/"

**`manifestUrl`** (read): Returns the base URL where the video manifest file is located, for example "repository/[video_id]"

**`manifestFileName`** (read): Returns the video manifest file name, for example "data.json"

**`manifestFileUrl`** (read): Returns the full path of the video manifest, for example "repository/[video_id]/data.json"

**`videoManifest`** (read): Returns the video manifest file content (data.json)

**`previewContainer`** (read): Returns the preview container DOM element. This container can be null if the video is fully loaded.

**`videoContainer`** (read): Returns the [video container](video_container.md) object.

**`playbackBar`** (read): returns the [playback bar](playback_bar.md) object. This object is responsible for handling the loading of button plugins found in the playback bar. It also updates of the playback status bar and slide thumbnails. The APIs of this object are private and should not be used, as they may vary within a single version of `paella-core`. The playback bar functions can be modified via [plugins](plugins.md), and its appearance via [CSS style modifications](styles.md).

**`captionsCanvas`** (read): Returns the [caption canvas object](captions.md). This object is used to get information about the available captions, and enable/disable the captions of the video.

**`data`** (read): Returns the `Data` object. See the documentation of the [`paella-core` data APIs](data_plugins.md) for more information.

**`isFullscreen`** (read): Returns `true` if the player is in full screen state.

## Methods

### Translation APIs:

See [the documentation about localization](localization.md) to get more information:

**`translate(word)`:** Translate a word. It returns the translated word in the current language, or the same word if it is not found in the dictionary.

**`setLanguage(lang)`:** Sets the current language.

**`getLanguage()`:** Gets the current language

**`addDictionary(lang,dict)`:** Adds a dictionary for `lang` language.

### Event API:

**`bindEvent(eventName, fn, unregisterOnUnload = true)`:** Bind the event `eventName` to the `fn` function. The `unregisterOnUnload` parameter is used to determine if the `fn` event must be unregistered in the case of a player unload. See the [`paella-core` life cycle](life_cycle.md) and [events](events.md) documentation to get more information.

### Shortucts

**`getShortcuts()`:** Returns the current keyboard shortcuts registered by [shortcut plugins](key_shortcuts.md)

### Plugins API

**`getPlugin(identifier, type = null)`:** Returns the plugin instance with the identifier `identifier`. If the `type` parameter is not `null`, it restricts the search to plugins of the specified type. Note that, if they are more than one instance of `paella-core` loaded, this function can return different plugins for each instance. For example, some plugins are loaded only if the video manifest meets certain requirements. See the documentation about [`plugins`](plugins.md) to get more information.

### Life cycle functions

See documentation about [`paella-core` life cycle for more information about the following APIs](life_cycle.md):

**`async loadManifest()`/`async loadUrl(url)`**

**`async loadPlayer()`**

**`async load()`**

**`async unload()`**

**`async unloadManifest()`**

**`async unloadPlayer()`**

**`async reload(onUnloadFn = null)`**

### The Load URL API

The `loadUrl(url, options = {})` function allows to generate a video manifest automatically from the input parameters. The generated manifest will depend on the file extension of the URLs, so the URLs used must include a compatible video file name. The video manifest will be generated using the active video format plugins. For more information, see the [documentation on video format plugins](video_plugin.md).

This function, at the lifecycle level, works the same as `loadManifest()`, with the difference that instead of loading a video manifest, it generates it internally. The rest of the lifecycle functions will be used as if we had called `loadManifest()`.

**`url (string,[string])`:** The first parameter is an URL or an array of URLs is passed in case we want to load a multi stream video. The first URL must correspond with the video that contains the audio track.
**`options (object)`:** Contains the data from the metadata section. If nothing is specified, it will be automatically generated from the streams, but note that the duration field will not be a valid value, and this may cause problems with some plugins. To omit the `preview` metadata it is important to set a default preview image, or else the function will generate an exception.

- `title`
- `duration`
- `preview`

### User interface functions

**`async resize()`:** If you manually resize the video container element, you must call this function to update some player user interface elements.
    
**`async hideUserInterface()`** Hides the user interface elements. If the user interacts with the player in any way (e.g. by moving the mouse over it) the user interface will be shown again, once the `hideUiTime` is elapsed (see the paella object properties in this document).
    
**`async showUserInterface()`** Shows the user interface elements.

### Playback functions

Generally the video playback functions are accessed through the `videoContainer` object (see the paella player object properties earlier in this document). However, when the video has not been loaded because the player is in `MANIFEST_LOADED` state (see documentation about the [paella player life cycle](life_cycle.md)), the `videoContainer` object is not available. For this reason, the `paella` object provides some playback functions that are convenient to use, instead of using the `videoContainer` object.

**`async play()`:** starts or resumes video playback. If the player is in the `MANIFEST_LOADED` state, it ends loading automatically before starting playback.

**`async pause()`** pauses the video, if the player is fully loaded.

**`async paused()`** returns `true` if the video is paused or not loaded, or `false` is the video is playing.

**`async stop()`** stops the video, if the player is fully loaded.

### Fullscreen API functions

**`async isFullScreenSupported()`** Returns `true` if the browser supports the `fullscreen` feature.
    
**`async enterFullscreen()`** Enter in fullscreen mode.

**`async exitFullscreen()`** Exit from fullscreen mode.


