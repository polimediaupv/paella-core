## HTML video plugin (paella-core >= 1.15)

It allows to play HTML 5 videos in multiple formats. This plugin allows you to specify a series of video files, with their associated mime type, so that the browser can determine which one is most appropriate for playback.

This plugin is designed to conform as closely as possible to the specifications of the HTML 5 standard for video, so that the list of videos received by the plugin will be transformed into standard HTML tags:

**Video manifest data:**

```json
{
    "html": [
        {
            "src": "video1.mp4",
            "mimetype": "video/mp4"
        },
        {
            "src": "video1.webm",
            "mimetype": "video/webm"
        },
        {
            "src": "video1.ogv",
            "mimetype": "video/ogg"
        }
    ]
}
```

**Generated video player:**

```html
<video>
    <source src="video1.mp4" type="video/mp4">
    <source src="video1.webm" type="video/webm">
    <source src="video1.ogv" type="video/ogg">
</video>
```

This plugin is based on the [`Mp4VideoFormat`](mp4_video_plugin.md) plugin, and for this reason has the same limitations in terms of support for multiple video bitrates and multiple audio tracks. For this reason, it also does not support `enable/disable` APIs. To work with multiple qualities and multiple audios, you can use the `hls` format, by means of the plugin [paella-hls-video-plugin](https://githjub.com/polimediaupv/paella-hls-video-plugin).


## Configuration

To recognise HTML videos, you need to activate the plugin in the settings.

```json
{
    "plugins": {
        ...
        "es.upv.paella.htmlVideoFormat": {
            "enabled": true,
            "order": 1
        },
        ...
    }
}
```

If there is more than one stream type in a stream within the video manifest that is compatible with the current configuration, the plugin whose value in the `order` attribute is lower will be used. For more information, see the [video format plugins](video_plugins.md) documentation.


## Video manifest format

```json
{
  ...
  "streams": [
    {
      "sources": {
        "html": [
          {
            "src": "video1.mp4",
            "mimetype": "video/mp4",
          },
          {
            "src": "video1.webm",
            "mimetype": "video/webm",
          },
          {
            "src": "video1.ogv",
            "mimetype": "video/ogg",
          }
        ]
      }
    }
  ]
}
```



The format identifier is `html`. Each element of the array contains a reference to a video file. These files will be added as `<source>` tags in the same order in which they appear in the array. As specified by the standard, the browser will use the first video it recognizes from the list, so videos should be added in order of preference.

- **src:** Absolute URL or relative path to the video manifest file, which indicates the location of the video file corresponding to the source.
- **mimetype:** the mimetype format. It is possible to add more than one mime type in the array by adding the compression codec to this information. For example, we can have two webm videos with different encoding (vp8 and vp9, for example).

```json
"html": [
    {
        "src": "video1_vp9.webm",
        "mimetype": "video/webm; codecs=\"vp9\""
    },
    {
        "src": "video1.mp4",
        "mimetype": "video/mp4; codecs=\"vc1.42E01E, mp4a.40.2\"""
    },
    {
        "src": "video1_vp8.webm",
        "mimetype": "video/webm; codecs=\"vp8\""
    },
    {
        "src": "video1.ogv",
        "mimetype": "video/ogg; codecs=\"theora, vorbis\""
    }
]
```