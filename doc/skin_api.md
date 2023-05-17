
# Skins (paella-core >= 1.32)

The customization of the `paella-core` user interface is done in three ways:

- By configuration: there are elements that can be customized via configuration options, such as the playback bar or the video container.
- By including CSS files using the `loadStyle` and `unloadStyle` APIs of the [`utils`](utils.md) package.
- By using [custom icons](plugin_icon_customization.md)

You can learn more about all this in the following documents:

- [Customization](customization.md)
- [Configuration](configuration.md)
- [Playback bar](playback_bar.md)
- [Button plugins](button_plugin.md)
- [Button group plugins](button_group_plugin.md)
- [Progress indicator customization](progress_indicator_customization.md)
- [Playback bar](playback_bar.md)
- [Styles](styles.md)

The skin APIs allow you to define a set of files with which to customize all possible aspects of the player's design, and upload and download them with one call.

## Skin package

Skin packages contain at least one skin configuration file, and additionally other files that are specified in the skin definition. The skin definition file is a `json` file with the following structure:

```json
{
    "styleSheets": [
        "style.css"
    ],
    "configOverrides": {
        "progressIndicator": {
            "inlineMode": true
        },
        "videoContainer": {
            "overPlaybackBar": true
        }
    },
    "icons": [
        {
            "plugin": "es.upv.paella.playPauseButton",
            "identifier": "play",
            "icon": "play-icon.svg"
        }
    ]
}
```

The skin definition file is divided into three sections:

- `styleSheets`: an array containing the list of style sheet files to be included when the skin is loaded. The file paths included here are relative to the skin definition file. From `paella-core` version 1.33, this array can also contain an embedded CSS file instead of a file name.
- `configOverrides`: is a json with the same properties as the main configuration file. It should be noted that in this section it is possible to include any configuration option, and not only those related to the user interface. For example: it is possible to define plugins configuration. The elements defined in this section overwrite any attribute that also exists in the main configuration file. It is important to note that configuration attributes of type array overwrite the entire array defined in the configuration, i.e. they are not added to the main array, but replaced.
- `icons`: is an array with the list of custom icons, in the form of objects with attributes `plugin`, `identifier` and `icon`. Starting in `paella-core` version 1.33, The `icon` attribute can contain either a filename, with URL relative to the skin definition file, or an icon defined by text in SVG format. For more information, see the [icon customization API](plugin_icon_customization.md) documentation. The file paths included here are relative to the skin definition file.



## Skin API

The skin APIs are accessible through the paella player instance, through the `paella.skin` object. Internally, the `paella.skin` object stores all the necessary information of the skin package loaded, so that the player can access these resources when needed, at the time of loading.

The loading of a skin has to be done before loading the video manifest (see paella-core life cycle documentation), but the skin manager takes care of reloading the player if necessary, so we can load in any of the three valid paella-core states: `UNLOADED`, `MANIFEST` and `LOADED`.

Only one skin can be loaded at any given time. If a skin is loaded while another one is loaded, the previous one will be unloaded first. Once a skin is loaded, it is possible to unload it so that the player is left with its predefined style configuration.

The `paella.skin` API includes only two functions for uploading and downloading a skin:

- `async loadSkin(skinUrl)`:  Loads a skin package from its URL. If the player is not in `UNLOADED` state, the video will be reloaded.
- `unloadSkin()`: Unload the current skin resources. If the player is not in `UNLOADED` state, the video will be reloaded.


```js
...
const paella = new Paella('player-container', initParams)

paella.skin.loadSkin("skins/default/default.json");

paella.loadManifest()
    .then(() => console.log("Player loaded"))
    .catch(err => console.error(err));
```

## Skin definition object (paella-core >= 1.33)

You can use a JavaScript object instead of a JSON URL as skin definition. The content of the skin definition object is identical to that of the skin definition file, with one exception: a skin definition object must have CSS style definitions and icons defined in an embedded form.

```js
let skinDefinition = {
    styleSheets: [
        `:root {
            --main-fg-color: #F9FAFB;
            --main-bg-color: #1F2937;
            --main-bg-color-hover: #1F2937;
            --main-bg-gradient: #1F2937;
            --secondary-bg-color-hover: #1F2937;
            --highlight-bg-color: #3073B8;
            --highlight-bg-color-hover: #3a8bdd;
            --base-video-rect-background-color: #9CA3AF;
        }`
    ],
    configOverrides: {
        progressIndicator: {
            inlineMode: true
        },
        videoContainer: {
        }
    },
    icons: [
        {
            plugin: "es.upv.paella.playPauseButton",
            identifier: "play",
            icon: "<svg viewBox=\"0 0 16 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.520812 0.122289C0.841885 -0.0530018 1.23305 -0.0389906 1.54076 0.158822L15.5408 9.15882C15.827 9.34282 16 9.65974 16 10C16 10.3403 15.827 10.6572 15.5408 10.8412L1.54076 19.8412C1.23305 20.039 0.841885 20.053 0.520812 19.8777C0.199739 19.7024 0 19.3658 0 19V1C0 0.634194 0.199739 0.297579 0.520812 0.122289ZM2 2.83167V17.1683L13.1507 10L2 2.83167Z\" /></svg>"
        }
    ]
}

paella.skin.loadSkin(skinDefinition);
```
