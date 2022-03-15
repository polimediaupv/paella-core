# HLS Live video plugin

It is implemented from [hls video plugin](hls-video-plugin.md). The difference is that this plugin responds to streams labeled `hlsLive` from [video manifest](video_manifest.md). In addition, the hls live plugin does not support setting the initial video quality, as this setting usually gives problems with low latency videos.

## Video Manifest

The configuration in the video manifest is identical to that of the `hls` streams, only the label changes to `hlsLive`:

```json
{
  ...
  "streams": [
    {
      "sources": {
        "hlsLive": [
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

## Motivation

Separating the m3u8 video streams from the live m3u8 streams allows to have different configurations for both plugins. So, if we want to optimize the live videos for low latency, we can specify that configuration in the hlsLive plugin, as some configuration parameters can be counterproductive with respect to the normal m3u8 video.

**config.json**:

```json
{
    ...
    "es.upv.paella.hlsVideoFormat": {
        "enabled": true,
        "order": 0,
        "hlsConfig": {
            
   >>> Set here the configuration for standard HLS video
            "maxBufferLength": 10
        },
        "corsConfig": {
            "withCredentials": false,
            "requestHeaders": {
                "Access-Control-Allow-Credentials": false
            }
        }
    },
    "es.upv.paella.hlsLiveVideoFormat": {
        "enabled": true,
        "order": 0,
        "hlsConfig": {
    >>> Set here the configuration for live low latency HLS video

            "enableWorker": true,
            "maxBufferLength": 1,
            "liveBackBufferLength": 0,
            "liveSyncDuration": 0,
            "liveMaxLatencyDuration": 5,
            "liveDurationInfinity": true,
            "highBufferWatchdogPeriod": 1
            
        },
        "corsConfig": {
            "withCredentials": false,
            "requestHeaders": {
                "Access-Control-Allow-Credentials": false
            }
        }
    },
}
```

## HLS low latency

Paella supports HLS Low Latency by using the `hls.js` libraray. You only need to configure your streaming server to support it. See hls.js low latency [support project](https://github.com/video-dev/hls.js/projects/7).

You can check your stream in the [hls.js demo page](https://hls-js.netlify.app/demo/). If the streams works in this demo, it will work on paella.

If you use [wowza streaming server](https://www.wowza.com/), you can follow this [guide](wowza-configure-hls-low-latency.md) to configure HLS Low latency.


## More information and FAQ

See the document about the [hls video plugin](hls-video-plugin.md) for more information.
