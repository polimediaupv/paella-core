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

**`logLevel`**: Allows you to set the default logging level. For more information see the documentation on the [logging API](log.md). Note that the correct way to debug errors using the logger is to use the logLevel URL parameter.

**`repositoryUrl`**: Sets the URL of the manifest file repository for the videos. This attribute is related to `manifestFileName`.

**`manifestFileName`**: Set the filename of the video manifest that `paella-core` will attempt to load. By default, if the predefined manifest search functions are not modified, the path to the manifest files will be defined by the `repositoryUrl` attribute, followed by the video identifier and the manifest file name. For example, if `repositoryUrl` is `"videos"`, the video identifier is `"video_0"` and `manifestFileName` is `"data.json"`, the path paella-core will search for is `"videos/video_0/data.json"`. To modify the manifest file resolution method, see the documentation on [paella-core initialization](initialization.md).

**`ui`** (paella-core >= 1.45): General configuration options for the user interface:

- **`hideUITimer`** (paella-core >= 1.45): Sets the time for hiding the playback bar. The time elapses from the moment the user stops moving the mouse over the player. Note that there are exceptions that cause the playback bar not to be hidden, for example, when the mouse cursor is over the playback bar.
- **`hideOnMouseLeave`** (paella-core >= 1.45): If true, the user interface is hidden when the mouse leave the player container. This action has the same restrictions as the `hideUITimer`, for example, the user interface will not be hidden when a pop up is open. 

**`progressIndicator`** (paella-core >= 1.2): Sets the visual configuration parameters for the progress indicator. These parameters are elements that would be very complicated to define using CSS. For more information, see the documentation on [progress indicator customisation](progress_indicator_customization.md).

- **`showTotal`**: Show or hide the total duration of the video in the progress indicator. If `false` only the current time of the video is shown. If `true`, the following is displayed: `[current_time] / [total_time]`.
- **`parentContainer`**: Indicates the container where the progress indicator will be displayed, which can be in two places:
    + `"progressIndicator"`: Displayed above the video progress bar.
    + `"buttonArea"`: It is displayed in the button bar, below the progress indicator.
- **`side`:** Used to configure whether the progress indicator will be displayed on the left or on the right side of the container selected in the previous parameter. If displayed in the `buttonArea` it will be placed after the buttons on the left side, or before the buttons on the right side. Possible values are `left` and `right`.
- **`visible`:** Allows you to hide the progress indicator. In this case the current time of the video will not be displayed. If we hide the progress indicator, we can choose other methods of displaying it, for example by using plugins. Possible values are `true` or `false`.
- **`showHandler`:** Allows you to show or hide a progress indicator handle button. The layout of the button depends entirely on CSS styling, but by default it is a round dot. Possible values are `true` or `false`.
- **`hideHandlerOnMouseOut`**: In case the above value is `true`, this parameter allows to select whether the handler is hidden when the mouse cursor is not over the playback bar. Possible values are `true` or `false`.
- **`showRemainingProgress`**: Allows you to configure whether a different colour will be displayed in the playback bar, which fills in the remaining time of the video. If this value is `false`, then the remaining time will be displayed transparent (the background colour of the playback bar will be displayed).)
- **`inlineMode`**: Allows to display the playbar in the center of the playbar, between the buttons. This setting is more suitable when we have few plugins active, because it reduces the overall height of the playback bar.

**`preferences`** (paella >= 1.19): Manages the `paella-core` user preference system. User preferences can be managed via a specific API that can be used by plugins and certain parts of the library. These settings allow you to set where these preferences will be stored. For more information, see the [user preferences API](preferences.md) documentation.

- `sources`: Stores the configuration of each data source for the preferences. The keys are the name of the data source, and the value are the settings for that data source.
    +  `cookie`: Preference settings for using cookies as a data source.
        * `consentType`: This is the type of cookie that will be used to store preferences via the cookie consent API.
    + `dataPlugin`: Preferences for using data plugins as data source for preferences. For more information, see the [documentation on data plugins](data_plugins.md).
        * `context`: Data context for use with data plugins.
- `currentSource`: Sets the data source for storing preferences. The possible values of this attribute are the keys defined in the `sources` object.


**`videoContainer`**: Sets the configuration options related to the video container.

- `multiStreamMaxDesyncTime` (paella-core >= 1.46.2): Maximum multi stream video desynchronization time, measured in seconds. If two multi stream videos have a `currentTime` difference greater than this value, `paella-core` will try to synchronize them by executing an `setCurrentTime()` on the unsynchronized videos. The main video against which the synchronization is measured is the one marked with the `mainAudio` tag. If the value is too low, problems with cuts or interruptions may occur. The default value is 0.2. If there are lag or freeze issues with videos that have more than one stream, try increasing the maximum desynchronization time of the videos.
- `overPlaybackBar` (paella-core >= 1.4): If `true`, the video container will be placed above the playbar. In other words, the playbar will have an area reserved for its display, so it will never hide the video container. If `false`, the playbar will be superimposed on the video container.
- `restorePlaybackRate` (paella-core >= 1.5): If true, user settings for playback speed will be stored in the preferences.
- `restoreVolume` (paella-core >= 1.5): If true, user settings for volume will be stored in the preferences.
- `restoreVideoLayout` (paella-core 1.19): saves the settings on video layout restoration.
    + `enabled`: If `true`, the last video layout selected by the user will be restored, if available.
    + `global`: Sets whether the video layout restoration settings are video specific or global. If `true`, the setting is global, so the video layout will be restored for all videos. If `false` the layout will only be restored for the video ID on which the user has changed the layout.
- `restoreLastTime` (paella-core >= 1.18): Sets whether to remember the last known time instant for a particular video, in case it is reloaded.
    + `enabled`: If `true`, the last known time instant for the video will be remembered.
    + `remainingSeconds`: Used to prevent the current instant of time from being restored, whenever there are less than `remainingSeconds` seconds left in the video.
- `dynamicLayout`: Dynamic layouts inherit many properties from the video container, so a section has been added in the configuration to control them.
    + `landscapeVerticalAlignment`: defines the vertical alignment of videos when they are in landscape format. Possible values are `align-bottom`, `align-center` and `align-top`.
    + `portraitHorizontalAlignment`: defines the horizontal alignment of videos when they are in portrait format. Possible values are `align-left`, `align-center` and `align-right`.

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

