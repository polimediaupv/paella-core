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
  ]
}
```



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
  ]
}
```

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
    ]
  },
```

## Video formats

They enable playback of different video formats. More information about video format plugins can be found in [this document](video_plugin.md).



### `es.upv.paella.imageVideoFormat`:

Allows to use a list of images as a video stream. You can see the video manifest and plugin configuration in [this document](image-video-plugin.md).

```json
"es.upv.paella.imageVideoFormat": {
  "enabled": true,
  "order": 2
},
```



### `es.upv.paella.mp4VideoFormat`:

Basic plugin to playback standard mp4 streams. You can see the video manifest and detailed plugin configuration in [this document](mp4-video-plugin.md).

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





