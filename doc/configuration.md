# Configuration

## General options

**`accessibility`** (paella-core >= 1.24): Accessibility options

- **`clickWithSpacebar`**: If `true`, the spacebar will function as a click action. This can be disabled by setting the attribute to `false` as the spacebar key is used in many players as a play/pause shortcut. In any case, the `return` key will always function as a click action.

**`buttonGroups`** (paella-core >= 1.22): Controls the generation of button groups. A button group is a plugin for grouping buttons within a drop-down panel ([more info here](button_group_plugin.md)).

Using the `buttonGroups` array it is possible to define new button groups without having to implement a plugin. You only need to have an image in `svg` format in the same path where the configuration file is located in order to create button groups using this section.

For more information, please refer to the documentation on [button groups](button_group_plugin.md), in particular the section "Create button groups from configuration".

**`cookieConsent`** (paella-core >= 1.8): Defines the cookie consent settings required by the European General Data Protection Regulation, to be used when using paella-core's internal cookie APIs. For more information, see the documentation on [cookie consent API](cookie_consent.md).

**`defaultAudioStream`**: In multi stream videos, defines which is the default audio stream, in case one is not explicitly defined in the [video manifest](video_manifest.md).

**`defaultLanguage`** (paella-core >= 1.23): Defines a default language to use, if the browser language does not match any of the dictionary languages.

**`defaultLayout`**: Indicates the default layout for videos. This is where you set the `content` value. For more information, see the documentation on [video layouts](video_layout.md).

**`defaultVideoPreview`** (paella-core 1.11) and **`defaultVideoPreviewPortrait`** (paella-core 1.12): Indicates the preview image in landscape or portrait mode, respectively. Both attributes are paths to images, relative to the location of the configuration file. Whenever one of these two images is specified, the `preview` attribute of the [video manifest](video_manifest.md) becomes optional.

**`fallbackId`** (paella-core >= 1.8): Specifies a default video identifier to be used in case one is not specified. For more information see the [initialization](initialization.md) documentation.


TODO: complete this document 

**`logLevel`**: "INFO",

**`manifestFileName`**: "data.json",

**`progressIndicator`**: {
    **`showTotal`**: true,
    **`parentContainer`**: "progressIndicator",
    **`side`**: "left",
    **`visible`**: true,
    **`showHandler`**: true,
    **`hideHandlerOnMouseOut`**: true,
    **`showRemainingProgress`**: true
},

**`preferences`**: {
    **`currentSource`**: "dataPlugin",
    **`sources`**: {
        **`cookie`**: {
            **`consentType`**: "necessary"
        },
        **`dataPlugin`**: {
            **`context`**: "preferences"
        }
    }
},

**`repositoryUrl`**: "repository",


**`videoContainer`**: {
    **`overPlaybackBar`**: true,

    **`restorePlaybackRate`**: true,
    **`restoreVolume`**: true,
    **`restoreVideoLayout`**: {
        **`enabled`**: true,
        **`global`**: true
    },
    **`restoreLastTime`**: {
        **`enabled`**: true,
        **`remainingSeconds`**: 5
    }
},

## Plugins

The `plugins` attribute is an object where each key corresponds to the unique identifier of a plugin, and its value is an object with the configuration of that plugin. For example:

```json
{
    ...
    "plugins": {
        "es.upv.paella.playPauseButton": {
            "enabled": true,
            "order": 1,
            ... other settings
        }
    }
}
```

The common attributes for all plugins are:

**`enabled`**: By default plugins are disabled. For a plugin to load, this option must be added to `true`.

**`order`**: Indicates the order in which the plugin will be loaded within that plugin type. The order is incremental. If there are two plugins with the same order and they are of the same type, the order in which they will be loaded is not defined, so this situation should be avoided.

There are many other configuration options specific to each plugin type. For all of them, please refer to the [documentation for the specific plugin type](plugins.md).

