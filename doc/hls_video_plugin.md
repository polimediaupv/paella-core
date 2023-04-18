# hls video plugin

Adds compatibility to playback [HLS m3u8 streams](https://developer.apple.com/streaming/). This plugin uses the library [hls.js](https://github.com/video-dev/hls.js/) to playback m3u8 streams in browsers that supports [Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API), including those that can play m3u8 streams nativelly. The only exception is those browsers that can play m3u8 and are not compatible with Media Source Extensions, such as the iPhone browsers.



## Configuration

To tune up the configuration of the player, you may check the [hls.js configuration options](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning). You can set these options using the plugin configuration in `config.json` file, with the `hlsConfig` attribute.

The configuration callbacks cannot be specified, but in practice the only callback we may need to configure is `xhrSetup`, in case we want to modify the options in the Ajax request to get the stream chunks. To solve this, the `corsConfig` attribute allows to modify these parameters. If `corsConfig.withCredentials` is `true`, then the headers defined in `requestHeaders` will be added. The HLS plugin includes a mechanism that prevents the browser to use cache in the main `m3u8` playlist file. This mechanism works by adding a `cache=random_number` parameter to the URL of the `m3u8` file request. You can use the `disableCache` parameter to disable this mechanism.

(paella-core >= 1.20) In iPadOS and macOS, using Safari, if the `forceNative` attribute is set to `true`, this plugin will bypass `hls.js` in favor of the native HLS player provided by the browser. Please note that on iPadOS and iOS, due to limitations imposed by Apple in the app store, all third-party browsers are required to use the `WebKit` framework for web rendering, which in practice makes all third-party browsers on this platform behave the same as Safari. Note that the native HLS plugin in Safari does not support many of the features supported by the HLS version, such as manual selection of playback quality. Apple does not provide any method to do these things natively, so it is recommended to use the `hls.js` player whenever possible.


```json
"es.upv.paella.hlsVideoFormat": {
  "enabled": true,
  "order": 0,
  "audioTrackLabel": "name",
  "disableCache": false,
  "forceNative": false,
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

### crossorigin (paella-core >= 1.28)

By default, the `crossorigin` attribute of the HTML video is added without content:

```html
...
<video crossorigin >
  ...
</video>
```

If any other value needs to be configured, the `crossOrigin` configuration parameter can be used:

```json
{
    "plugins": {
        ...
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1,
            "crossOrigin": "user-credentials"
        },
        ...
    }
}
```

To prevent the `crossorigin` attribute from being added to the `<video>` element, you can set the configuration value to `false`.:

```json
"es.upv.paella.mp4VideoFormat": {
    "enabled": true,
    "order": 1,
    "crossOrigin": false
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

- [Using ffmpeg to generate an HLS with multiple audio tracks](ffmpeg_multiple_audio_tracks_hls.md)
- [Using wowza and SMIL files to generate an HLS with multiple audio tracks](wowza_multiple_audio_tracks_smil.md).

### About `audioTrackLabel` setting

The `paella-core` APIs allow selecting the active audio track, as well as displaying information about that track to the user. Tags are included within the m3u8 playlist for this purpose:

```m3u8
...
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="aac",LANGUAGE="es",NAME="Spanish",DEFAULT=YES,AUTOSELECT=YES,URI="chunklist_w777901138_b105768_ao_sles_t64U3BhbmlzaA==.m3u8?cache=96104139164"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="aac",LANGUAGE="en",NAME="English",DEFAULT=NO,AUTOSELECT=YES,URI="chunklist_w777901138_b105768_ao_slen_t64RW5nbGlzaA==.m3u8?cache=96104139164"
```

By default, the data with which the audio track is identified is `"NAME"`. However, it is possible to configure which data we want to use to obtain the language label. It is possible to choose between the following labels:

- `name`: corresponds to the `"NAME"` field in the `m3u8` file.
- `lang`: corresponds to the `"LANGUAGE"` field in the `m3u8` file.
- `groupId`: corresponds to the `"GROUP-ID"` field in the `m3u8` file.

To customise this tag we can use the plugin configuration, or the [video manifest](video_manifest.md). The video manifest configuration value will take precedence over the plugin configuration, if both are present.

**Video manifest:**

```json
{
  ...
  "streams": [
    {
      "sources": {
        "hls": [
          {
            "src": "https://mywowzaserver.com/video/playlist.m3u8",
            "mimetype": "video/mp4",
            "audioLabel": "name" <<== customize audioLabel
          }
        ]
      }
    }
  ]
}
```

**Plugin configuration:**

```json
"es.upv.paella.hlsVideoFormat": {
  "enabled": true,
  "audioTrackLabel": "name",
  ...
}
```

If you have generated an m3u8 playlist following the instructions in the previous section ([Using ffmpeg to generate an HLS with multiple audio tracks](ffmpeg_multiple_audio_tracks_hls.md)), you may have encountered the problem that FFMPEG ignores the track names specified on the command line. It is possible to edit the playlist file afterwards to modify the track names, but you can also use the `audioTrackLabel` property to get the track names from another field, such as the language.



## Troubleshooting

In our experience, 99% of the problems with HLS streams are related to the configuration of the `hls.js` library and, above all, to the configuration of the streaming server and video codec. Apart from this, the HLS plugin is native for those platforms that do not support Media Source Extensions, but supports HLS nativelly (that is, all browsers in iOS for iPhone and iPod Touch).

Taking this into account:

* If you have problems in iOS browsers: it doesn't matter in which browser you have problems, since due to App Store policies all browsers use the system's rendering engine and video codecs. So in practice all browsers work the same. In this case, your problem is in the video codec or streaming server configuration. Nothing can be changed change in Paella Player to solve this kind of issues, because HLS is managed by the brower itself.
* If you have problems in other browsers: check the [hls.js documentation](https://github.com/video-dev/hls.js) to see what features of HLS are supported. Also check the HLS specifications and recommendations for video encoding. Note that not all browsers support all codecs. Some problems may be fixed changing the hls.js configuration.
* Please note that, although it is theoretically possible to view live video streams using the `hlsVideoFormat` plugin, it is very likely to have problems in some browsers. If you have problems with live streams, or especially low latency streams, be sure to use the `hlsLiveVideoFormat` plugin by replacing the `hls` tag with `hlsLive` in the video manifest (see the documentation of [hls live video plugin here](hls_live_video_plugin.md)).
* If you have problems playing videos using authentication, set the `disableCache` parameter to `false` in the configuration. This mechanism prevents the browser from using the cache with `m3u8` files, and does so by adding a random parameter in the URL of the playlist file. This can cause problems with some streaming servers when getting authenticated videos.

Some helpful resources:

- [Default Chunklist configuration from stream server leads to problems to high latency users when playing double videos](https://github.com/polimediaupv/paella-core/issues/18)
- [Searching in HLS streams via Firefox in Paella 7.x hangs](https://github.com/polimediaupv/paella-core/issues/13)
- [hls.js test page](https://hls-js.netlify.app/demo/)




