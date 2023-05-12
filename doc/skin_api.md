
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

- `styleSheets`: an array containing the list of style sheet files to be included when the skin is loaded. The file paths included here are relative to the skin definition file.
- `configOverrides`: is a json with the same properties as the main configuration file. It should be noted that in this section it is possible to include any configuration option, and not only those related to the user interface. For example: it is possible to define plugins configuration. The elements defined in this section overwrite any attribute that also exists in the main configuration file. It is important to note that configuration attributes of type array overwrite the entire array defined in the configuration, i.e. they are not added to the main array, but replaced.
- `icons`: is an array with the list of custom icons, in the form of objects with attributes `plugin`, `identifier` and `icon`. For more information, see the [icon customization API](plugin_icon_customization.md) documentation. The file paths included here are relative to the skin definition file.


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
