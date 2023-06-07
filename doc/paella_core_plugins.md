# paella-core plugins

paella-core includes the following plugins as standard. In this document, you can check the standard paella-core plugins example configuration and their basic description. Note that you may want to change some configuration settings in order to tune up your player setup. For example, you may want to modify the plugin order or disable some plugins.

To get more information about the Paella Player plugin system, check [this document](plugins.md).



## Video layouts

To see how to configure video layouts, see [this document](video_layout.md)

### `es.upv.paella.singleVideo`:

Video layout for single streams.

```json
"es.upv.paella.singleVideo": {
  "enabled": true,
  "dualVideoContentIds": [
      "presenter-presentation-dynamic",
      "presenter-2-presentation-dynamic",
      "presenter-presenter-2-dynamic",
      "presenter-presentation",
      "presenter-2-presentation",
      "presenter-presenter-2"
  ],
  "validContent": [
    { 
      "id": "presenter", 
      "content": ["presenter"], 
      "icon": "present-mode-2.svg", 
      "title": "Presenter" },
    { 
      "id": "presentation", 
      "content": ["presentation"], 
      "icon": "present-mode-1.svg", 
      "title": "Presentation" },
    { 
      "id": "presenter-2", 
      "content": ["presenter-2"], 
      "icon": "present-mode-1.svg", 
      "title": "Presentation" }
  ],
  "tabIndexStart": 20
}
```

The `dualVideoContentIds` attribute is used to identify which are the valid `content-id` we want to use to switch to dual video mode. This layout includes a button that allows switching to dual mode, and these content-id are used to know which dual layout is the preferred one to use. For this reason the attribute is a list: the first valid content-id of the list will be used.

Custom plugin icons:

- `iconSideBySide`

### `es.upv.paella.singleVideoDynamic`:

Dynamic video layout for single streams.

```json
"es.upv.paella.singleVideoDynamic": {
  "enabled": true,
  "dualVideoContentIds": [
      "presenter-presentation-dynamic",
      "presenter-2-presentation-dynamic",
      "presenter-presenter-2-dynamic",
      "presenter-presentation",
      "presenter-2-presentation",
      "presenter-presenter-2"
  ],
  "validContent": [
    { 
      "id": "presenter", 
      "content": ["presenter"], 
      "icon": "present-mode-2.svg", 
      "title": "Presenter" },
    { 
      "id": "presentation", 
      "content": ["presentation"], 
      "icon": "present-mode-1.svg", 
      "title": "Presentation" },
    { 
      "id": "presenter-2", 
      "content": ["presenter-2"], 
      "icon": "present-mode-1.svg", 
      "title": "Presentation" }
  ],
  "tabIndexStart": 20
}
```

The configuration options for this plugin are the same as for the static single video plugin.

Custom plugin icons:

- `iconSideBySide`


### `es.upv.paella.dualVideo`:

Video layout for dual stream videos.

```json
"es.upv.paella.dualVideo": {
  "enabled": true,
  "validContent": [
    { 
      "id": "presenter-presentation", 
      "content": ["presenter","presentation"], 
      "icon": "present-mode-3.svg", 
      "title": "Presenter and presentation" 
    },
    { 
      "id": "presenter-2-presentation", 
      "content": ["presenter-2","presentation"], 
      "icon": "present-mode-3.svg", 
      "title": "Presenter and presentation" 
    },
    { 
      "id": "presenter-presenter-2", 
      "content": ["presenter","presenter-2"], 
      "icon": "present-mode-3.svg", 
      "title": "Presenter and presentation" 
    }
  ],
  "tabIndexStart": 20
}
```

Custom plugin icons:

- `iconRotate`
- `iconMaximize`
- `iconClose`
- `iconSwitchSide`
- `iconMinimize`
- `iconSideBySide`

### `es.upv.paella.dualVideoDynamic`:

Dynamic video layout for dual stream videos.

```json
{
  "es.upv.paella.dualVideoDynamic": {
    "enabled": true,
    "validContent": [
      { "id": "presenter-presentation-dynamic", "content": ["presentation","presenter"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
      { "id": "presenter-2-presentation-dynamic", "content": ["presenter-2","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
      { "id": "presenter-presenter-2-dynamic", "content": ["presenter","presenter-2"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" }
    ],
    "tabIndexStart": 20,
    "pipContentIds": [
      "presenter-presentation-pip",
      "presenter-2-presentation-pip",
      "presenter-presentation-2-pip"
    ],
    "allowSwitchSide": false
  }
}
```

The `pipContentIds` attribute is used to enable direct switching to a dual stream layout for PiP mode. The valid content-ids of the PiP layout we want to switch to will be placed inside. If the array is empty or not present, the PiP mode switch button will not be displayed.

The `allowSwitchSide` attribute is used to show or hide the button that reverses the position of the videos. Because this is a side-by-side layout, changing the order of the videos may not be relevant, so the option is given to not show this button.

Custom plugin icons:

- `iconMaximize`
- `iconSideBySide`
- `iconSwitchSide`
- `iconClose`



### `es.upv.paella.dualVideoPiP`:

Video layout to show dual stream videos in picture-in-piture mode.

```json
"es.upv.paella.dualVideoPiP": {
    "enabled": true,
    "validContent": [
      { "id": "presenter-presentation-pip", "content": ["presenter","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
      { "id": "presenter-2-presentation-pip", "content": ["presenter-2","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
      { "id": "presenter-presenter-2-pip", "content": ["presenter","presenter-2"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" }
    ],
    "dualVideoContentIds": [
      "presenter-presentation-dynamic",
      "presenter-2-presentation-dynamic",
      "presenter-presenter-2-dynamic",
      "presenter-presentation",
      "presenter-2-presentation",
      "presenter-presenter-2"
    ],
    "tabIndexStart": 20
},
```

The `dualVideoContentIds` attribute is used to allow direct switching to a different dual stream layout. If the array is empty or not present, the switch to side by side mode button will not be displayed.

Custom plugin icons:

- `iconMaximize`
- `iconSideBySide`
- `iconSwitchSide`
- `iconClose`


### `es.upv.paella.tripleVideo`:

Video layout for triple stream videos

```json
 "es.upv.paella.tripleVideo": {
    "enabled": true,
    "validContent": [
      {
        "id": "presenter-presenter-2-presentation", 
        "content": ["presenter","presenter-2","presentation"], 
        "icon": "present-mode-4.svg", 
        "title": "Presenter and presentation"
      },
      {
        "id": "presenter-2-presenter-3-presentation",
        "content": ["presenter-2","presenter-3","presentation"],
        "icon": "present-mode-4.svg", 
        "title": "Presenter and presentation"
      }
    ],
    "tabIndexStart": 20
  },
```

## Video formats

They enable playback of different video formats. More information about video format plugins can be found in [this document](video_plugin.md).



### `es.upv.paella.imageVideoFormat`:

Allows to use a list of images as a video stream. You can see the video manifest and plugin configuration in [this document](image_video_plugin.md).

```json
"es.upv.paella.imageVideoFormat": {
  "enabled": true,
  "order": 2
},
```



### `es.upv.paella.mp4VideoFormat`:

Basic plugin to playback standard mp4 streams. You can see the video manifest and detailed plugin configuration in [this document](mp4_video_plugin.md).

```json
"es.upv.paella.mp4VideoFormat": {
  "enabled": true,
  "order": 1
}
```



### `es.upv.paella.hlsVideoFormat`:

Adds compatibility to playback [HLS m3u8 streams](https://developer.apple.com/streaming/). If you plan to use m3u8 streams, please, see the detailed documentation of the hlsVideoFormat plugin in [this document](hls-video-format.md). In our experience, 99% of the problems related with HLS streams are related with the plugin, the encoding or the m3u8 stream configuration.

```json
"es.upv.paella.hlsVideoFormat": {
  "enabled": true,
  "order": 0,
  "hlsConfig": {
    "maxBufferLength": 40
  },
  "corsConfig": {
    "withCredentials": false,
    "requestHeaders": {
      "Access-Control-Allow-Credentials": false
    }
  }
}
```

* `hlsConfig`: this object is supplied to the hls.js library configuration. If you want to tune up the hls plugin behavior, check the hls.js library settings.
* `corsConfig`: here you can change the settings in the Ajax request to get the HLS playlist chunks.



## Button plugins

### `es.upv.paella.playPauseButton`:

This is the only functional [button plugin](button_plugin.md) in paella-core. As the name suggests, it is the play/pause button displayed in the playback bar.

```json
"es.upv.paella.playPauseButton": {
  "enabled": true,
  "order": 1,
  "container": "playbackBar",
  "side": "left"
}
```

Icon customization data:

- `play`
- `pause`
- `replay`



## Video Canvas

To see how video canvas plugins works, see [this document](canvas_plugin.md)

### `es.upv.paella.videoCanvas`:

Is the more basic video canvas plugin, and allows to display a video stream using an standard html tag, such as `video` or `img`

```json
"es.upv.paella.videoCanvas": {
  "enabled": true,
  "order": 1
}
```

## Shortcuts

### `es.upv.paella.defaultShortcuts`:

Handles the default paella-core keyboard shortcuts. Check the [shortcuts plugin for more information](key_shortcuts.md).

```json
"es.upv.paella.cookieDataPlugin": {
  "enabled": true
}
```


Custom plugin icons: keyboard shortcuts show some messages and icons with the [VideoContainerMessage](video_container_message.md) API. These are the identifiers to customize them:

- `volumeMuteIcon`
- `volumeLowIcon`
- `volumeMidIcon`
- `volumeHighIcon`




## Data plugins

Check [this document](data_plugins.md) to get more info about paella player data plugins

### `es.upv.paella.cookieDataPlugin`:

It allows to store information in cookies, using the [paella player data API](data_plugins.md).

```json
"es.upv.paella.cookieDataPlugin": {
  "enabled": true,
  "order": 0,
  "context": ["default","trimming"]
}
```



## Captions plugins

This kind of plugins allows to include captions using the [captions API](captions.md). You can see more information about captions plugins in [this document](captions_plugins.md).

```json
"es.upv.paella.vttManifestCaptionsPlugin": {
  "enabled": true
}
```

Specifically, this plugin gets the subtitle information of the video from the [video manifest](video_manifest.md). The `captions` section is used, where an array of objects with the following properties is defined:

- **`url`:** URL of the subtitle file. This plug-in only recognizes subtitle files in the [`vtt`](https://www.w3.org/wiki/VTT_Concepts).
- **`lang`:** captions language. This attribute does not need to be a standardized language code, it is only the unique identifier that will differentiate this subtitle file from a different one. For example, `en_UK`, `en` or `en-auto`.
- **`text`:** Descriptive text string of the subtitle file. This text should make it easy for the user to identify the subtitles. For example `English (UK)`, `English` or `English (automatic)`.
- **`format`:** This is the format of the subtitle file. This plugin only recognizes `vtt` format files. All the fields in this section of the video manifest are generic, so using other plugins that recognize different formats, this field will help `paella-core` identify which plugin to use to load the subtitles.




