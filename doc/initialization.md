# Initialization

## 1. Create Paella Player instance with basic initialization
### 1.1. Load player

```javascript
const initParams = {};
const paella = new Paella('container-id', initParams);
paella.load()
    .then(() => console.log("Initialization done"))
    .catch(e => console.error(e));
```

### 1.2. Lazy load

To load the minimum amount of data needed to present the video thumbnail, you can load the player in two steps. The `load()` function used in the previous section is implemented like this:

```javascript
async load() {
    await this.loadManifest();
    await this.loadPlayer();
}
```

If you only call `loadManifest()`, paella will only load the manifest and the plugins of type `preload`, which will leave the player ready for the user to complete the load when clicked. At that point the 'loadPlayer()` will be called.:

```javascript
const paella = new Paella('container-id');
paella.loadManifest()
    .then(() => console.log("Initialization done"))
    .catch(e => console.error(e));
```

## 2. Initialization parameters

```javascript
const initParams = {
    // Initialiation attributes
    configResourcesUrll: 'config/',    // Location of resources to be configured in the config.json file
    configUrl: 'config/config.json',    // Used by the default loadConfig function
    repositoryUrl: 'repository',    // URL to locate the video manifests (see getManifestUrl)
    manifestFileName: 'data.json',     // manifest file name (can be overrided in config.json)

    // Initialization callbacks
    loadConfig: [default_load_config_function],      // overrides the config.json file load
    getVideoId: [default_video_id_function],     // get the video identifier
    getManifestUrl: [default_manifest_url_function],    // get the video manifest url
    getManifestFileUrl: [default_manifest_file_url_function],   // get the full manifest file url
    loadVideoManifest: [default_load_video_manifest_function],   // get the manifest file content
    getCookieConsentFunction: [default_get_cookie_consent_function],    // get cookie consent preferences function
    getCookieDescriptionFunction: [default_get_cookie_description_function],    // get cookie description function
  
  	customPluginContext: [],	// an array of require.context() function call results

    customLoader: [Loader]  // a custom loader class
} 
```

### 2.1. Default initialization functions

The default initialization functions are located at `src/core/initFunctions`.

```javascript
import { defaultLoadConfigFunction,
        defaultGetVideoIdFunction,
        defaultGetManifestUrlFunction,
        defaultGetManifestFileUrlFunction,
        defaultLoadVideoManifestFunction } from 'paella-core';

```

default load config funciton:

```javascript
export async function defaultLoadConfigFunction(configUrl,player) {
    player.log.debug("Using default configuration loading function.");
    const response = await fetch(configUrl);
    return response.json();
}
```

default video id function

```javascript
import { utils } from 'paella-core';
const { getUrlParameter } = utils;


export async function defaultGetVideoIdFunction(config,player) {
    player.log.debug("Using default getVideoId function");
    return getUrlParameter("id");
}
```

default manifest url function

```javascript
import { utils } from 'paella-core';
const { joinPath } = utils;

// repoUrl: the value specified in initParams.repositoryUrl
// videoId: the video identifier returned by initParams.getVideoId()
export async function defaultGetManifestUrlFunction(repoUrl,videoId,config,player) {
    player.log.debug("Using default getManifestUrl function");
    return joinPath([repoUrl,videoId]);
}
```

default manifest file URL function

```javascript
export async function defaultGetManifestFileUrlFunction(manifestUrl,manifestFileName,config,player) {
    player.log.debug("Using default getManifestFileUrl function");
    return joinPath([manifestUrl,manifestFileName]);
}
```

default manifest file content function

```javascript
export async function defaultLoadVideoManifestFunction(videoManifestUrl,config,player) {
    player.log.debug("Using default loadVideoManifest function");
    const response = await fetch(videoManifestUrl);
    return response.json();
}
```

default cookie consent function

```javascript
export const defaultGetCookieConsentCallback = (type) => {
    return false;
}
```

default get cookie description function 

```javascript
export const defaultGetCookieDescriptionCallback = (cookieObject) => {
    return cookieObject.description;
}
```

Note: you can learn more about the cookie consent functions [in this document](cookie_consent.md).

## 2.2. Plugin context

Paella Player can load plugins that are located in several directories. This loading is done during initialization. Using the `customPluginContext` attribute, which is an array formed by the result of a special Webpack function: `require.context()`. 

`require.context()` is used to get the compilable files from a directory. Since Webpack has to execute this function at compile time, the directory specified must be a static string. Based on this call, Paella Player will load the files located in these directories.

To learn more about the use of plugins, see [this document](plugins.md).

```javascript
const initParams = {
  customPluginContext: [
    require.context("./plugins", true, /\.js/)
  ]
}
```

## 2.3. Loader

You can customize the default loader using the `customLoader` attribute. To do it, you must to create a custom `Loader` class, and specify it in this attribute. See how to do it in [this document](loader.md).

## 2.4. Default preview image (paella-core >= 1.11)

The preview image metadata is required in the ([video manifest](video_manifest.md)). However, it is possible to define a default image, in case the video manifest does not contain a defined one. If a preview image is defined, then an exception will not be thrown in case the `preview` metadata is not included in the manifest, but simply a warning log will be displayed in the console.

It is possible to define a preview image in two places:

- The configuration file: using the `defaultVideoPreview` attribute.

```json
{
    "defaultVideoPreview": "http://myserver.com/default_image.jpg",
    ...
}
```

- The `initParams` object.

```js
const initParams = {
    defaultVideoPreview: 'http://myserver.com/default_image.jpg',
    ...
};

const player = new Paella('player-container', initParams);
...
```

If the image is defined in both places, then the value defined in the configuration file has higher priority.

The URL of the image works differently if it is absolute or relative:

- If the URL is relative, the image will be searched for in the manifest video folder. For example, if the video manifest is `http://myserver.com/myvideo/data.json`, and the preview image is `images/default_preview.jpg`, the final URL will be `http://myserver.com/myvideo/images/default_preview.jpg`.
- If the URL is absolute or is relative to the site root, then that URL will be used without change.

