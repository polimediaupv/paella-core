# Data plugins

`paella-core` incorporates a system for reading and writing information independent of the data source. It is used within `paella-core` and also by some plugins. On the one hand, the `Paella` class contains an API for reading and writing data. On the other hand, it provides a communication interface with the backend that can be extended through plugins.

In this chapter we will learn how to configure data plugins to store user preferences.

## Configuration

The `paella-core` data API allows read, write and delete operations. When doing an operation it is given two pieces of data to identify the plugin we want to use:

- context: is a text string used to identify the data plugin we want to use to perform the operation.
- identifier: is a parameter that identifies the data to be written. Generally an object is used that can contain more information, for example, the identifier of the video. This identifier depends on the type of data to be stored, but generally an object of type `{ id: "video_identifier" }` is used.

Let's understand this better with an example. `paella-core` includes a default data plugin that stores data in the browser's local storage. It is called `en.upv.paella.cookieDataPlugin` because in the first versions the data was stored in a cookie. We will use this plugin to store the state of the player: global parameters such as audio volume or playback speed will be stored, and other parameters specific to each video, such as the last known instant of playback time.

### Enable data plugin

The first thing we have to do to use plugins is to activate them, so we will activate the default `paella-core` data plugin. In the plugin configuration you set the context for which the plugin will be used. The context names are free: any text string can be used. Just keep in mind that there will be another part of the configuration where we will have to specify the same context name to link the entity that is going to make use of the data API, with the data plugin that we want to be used. We are going to see this in a much simpler way with an example.

Vamos a utilizar el plugin de datos para almacenar las preferencias del reproductor, así que utilizaremos el nombre de contexto `preferences`. Y el plugin que vamos a activar es `es.upv.paella.cookieDataPlugin`, así que la configuración quedará como sigue:

```json
{
    "plugins": {
        "es.upv.paella.cookieDataPlugin": {
            "enabled": true,
            "context": [
                "default",
                "preferences"
            ]
        }
    }
}
```

### Configure preferences

The context name `default` is a special case. This name is reserved for use when no context is specified when using data plugins. Basically you must add it in the data plugin you want to be used by default.

We have already registered the data plugin, so now we are going to configure the entity that will consume that plugin. In this case we are going to configure the player preferences system.

```json
{
    ...
    "preferences": {
        "sources": {
            "dataPlugin": {
                "context": "preferences"
            }
        },
        "currentSource": "dataPlugin"
    }
    ...
}
```

The `paella-core` preference system is used to store user preference data through a specific API. It can be configured with several different data sources, which is the `sources` attribute of the configuration. By means of the `currentSource` attribute we indicate which of the data sources we want to use. Even if we have only one data source configured, it is mandatory to set the `currentSource` value.

Inside `sources > dataPlugin` we have the data source configuration. This configuration is specific to the type of data source, and in this case the only configuration parameter we have is `context`, which corresponds to the context of the data plugin where we want to save the preferences. You can learn more about the user preference system in [this document](../preferences.md).


### Video playback settings

With this step we have already configured the preferences system. The last thing we have to do is to activate the saving of user preferences. The preferences we want to configure are all video related (volume, playback speed, video layout and last known time instant). For this reason they are found in the configuration under the `videoContainer` section:

```json
{
    "videoContainer": {
        "restorePlaybackRate": true,
        "restoreVolume": true,
        "restoreVideoLayout": {
            "enabled": true,
            "global": true
        },
        "restoreLastTime": {
            "enabled": true,
            "remainingSeconds": 5
        }
    }
}
```

To save the volume and playback speed we only need to activate the `restorePlaybackRate` and `restoreVolume` attributes. For the other two parameters there is more to configure:

`restoreVideoLayout`: the `enabled` attribute indicates if we want to restore this configuration. The `global` attribute is used to decide if we want to save the video layout for any video (`global=true`) or only for the specific video where the layout has been changed (`global=false`).
`restoreLastTime`: this preference setting only works for each specific video. The `remainingSeconds` attribute is used to set a time value at which reloading the video will start playback from the beginning. In the example above, if there are less than 5 seconds left in the video, reloading the video will start playback from the beginning.


