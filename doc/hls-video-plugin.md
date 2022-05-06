# hls video plugin

Adds compatibility to playback [HLS m3u8 streams](https://developer.apple.com/streaming/). This plugin uses the library [hls.js](https://github.com/video-dev/hls.js/) to playback m3u8 streams in browsers that supports [Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API), including those that can play m3u8 streams nativelly. The only exception is those browsers that can play m3u8 and are not compatible with Media Source Extensions, such as the iPhone browsers.



## Configuration

To tune up the configuration of the player, you may check the [hls.js configuration options](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning). You can set these options using the plugin configuration in `config.json` file, with the `hlsConfig` attribute.

The configuration callbacks cannot be specified, but in practice the only callback we may need to configure is `xhrSetup`, in case we want to modify the options in the Ajax request to get the stream chunks. To solve this, the `corsConfig` attribute allows to modify these parameters. If `corsConfig.withCredentials` is `true`, then the headers defined in `requestHeaders` will be added.

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



## Video Manifest

```json
{
  ...
  "streams": [
    {
      "sources": {
        "hls": [
          {
	          "src": "https://url.to/your/playlist.m3u8",
	          "mimetype": "video/mp4",
	          "res": {
	            "w": "1920",
	            "h": "1080"
	          }
          }
        ]
      },
      "content": "presenter",
      "role": "mainAudio"
    }
  ]
}
```

The format identifier is `hls`. The array can contain only one element, if it contains more than one, the rest will be ignored.

* **src:** Absolute or relative URL to the `.m3u8` playlist file.
* **mimetype:** The mimetype of the original mp4 file. This parameter is currently not used.
* **res:** The resolution of the highest quality stream in `.m3u8` stream. This parameter is currently not used.


## Multiple audio tracks

Paella can play `hls` files with multiple audio tracks. The easiest way to select which audio track to play is via the `es.upv.paella.audioSelector` plugin, within the `paella-basic-plugins` plugin library ([npm](https://www.npmjs.com/package/paella-basic-plugins), [git](https://github.com/polimediaupv/paella-basic-plugins/)).

- [Using ffmpeg to generate an HLS with multiple audio tracks](ffmpeg-multiple-audio-tracks-hls.md)

## Troubleshooting

In our experience, 99% of the problems with HLS streams are related to the configuration of the `hls.js` library and, above all, to the configuration of the streaming server and video codec. Apart from this, the HLS plugin is native for those platforms that do not support Media Source Extensions, but supports HLS nativelly (that is, all browsers in iOS for iPhone and iPod Touch).

Taking this into account:

* If you have problems in iOS browsers: it doesn't matter in which browser you have problems, since due to App Store policies all browsers use the system's rendering engine and video codecs. So in practice all browsers work the same. In this case, your problem is in the video codec or streaming server configuration. Nothing can be changed change in Paella Player to solve this kind of issues, because HLS is managed by the brower itself.
* If you have problems in other browsers: check the [hls.js documentation](https://github.com/video-dev/hls.js) to see what features of HLS are supported. Also check the HLS specifications and recommendations for video encoding. Note that not all browsers support all codecs. Some problems may be fixed changing the hls.js configuration.
* Please note that, although it is theoretically possible to view live video streams using the `hlsVideoFormat` plugin, it is very likely to have problems in some browsers. If you have problems with live streams, or especially low latency streams, be sure to use the `hlsLiveVideoFormat` plugin by replacing the `hls` tag with `hlsLive` in the video manifest (see the documentation of [hls live video plugin here](hls-live-video-plugin.md)).

Some helpful resources:

- [Default Chunklist configuration from stream server leads to problems to high latency users when playing double videos](https://github.com/polimediaupv/paella-core/issues/18)
- [Searching in HLS streams via Firefox in Paella 7.x hangs](https://github.com/polimediaupv/paella-core/issues/13)
- [hls.js test page](https://hls-js.netlify.app/demo/)




