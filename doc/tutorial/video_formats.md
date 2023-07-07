# Video formats

To support different video formats we need two things: a plugin that implements the support, and a section in the video manifest to include the video data. It is interesting to support several video formats because they have different characteristics that we may want to prioritize depending on the case.

In this tutorial we will add several video formats to the video manifest example with dual stream. We will also learn how to modify the configuration to give more priority to one format than another.

## mp4

This is the format we are using so far. `paella-core` includes this plugin because it is the easiest to implement, but it also has a number of important drawbacks:

- It doesn't support different video quality levels or resolutions
- The browser must support the mp4 video format.
- Does not support live streams

De todos estos problemas, el inconveniente más grande es que el formato mp4 no siempre está soportado en todos los navegadores. En especial en entornos de código abierto, el formato mp4 puede no estar disponible, debido a que los codecs son privativos.


## HTML5

The HTML5 video plugin allows you to specify several video formats, and let the web browser select the most appropriate one. In the video manifest we specify a list of videos for each stream, and the video selection logic is done by the browser. Create a file in `public/repo/html5/data.json`:

**video manifest:**

```json
{
	"metadata": {
	},
	"streams": [
		{
			"sources": {
				"html": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4",
						"mimetype": "video/mp4"
					},
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.ogv",
						"mimetype": "video/ogg"
					},
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.webm",
						"mimetype": "video/webm"
					}
				]
			},
			"content":"presentation"
		},
		{
			"sources": {
				"html": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
						"mimetype": "video/mp4"
					},
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.ogv",
						"mimetype": "video/ogg"
					},
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.webm",
						"mimetype": "video/webm"
					}
				]
			},
			"role": "mainAudio",
            "content": "presenter"
		}
	]
}
```

If you try to play the video, you will see an error: **incompatible stream type**. This is because we have not activated the plugin. Add the html5 plugin configuration to the configuration file:

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.htmlVideoFormat": {
            "enabled": true
        },
        ...
    }
}
```

## HLS

The HLS (HTTP Live Streaming) format is becoming the new standard for web video. It is a video streaming protocol developed by Apple Inc. that allows transmission of video streams using the HTTP protocol. This has several advantages:

- It has no firewall problems because it uses the same port as the rest of the web.
- It can take advantage of the SSL protocol itself for security.
- It can be implemented using HTTP file servers.
- Supports dynamic quality change
- Supports multiple audio tracks


The implementation of the HLS plugin in `paella-core` is done using the [hls.js](https://github.com/video-dev/hls.js/) library. The operation of HLS is quite a bit more complex than HTML5 or mp4 video, so I recommend that you consult the documentation on [the HLS plugin](../hls_video_plugin.md). Many problems come from the video encoding or streaming server configuration itself, so it is important that you familiarize yourself with this documentation. We also have a document [on troubleshooting common problems in HLS with Wowza streaming server](../wowza_configure_hls_low_latency.md), and also we have documentation on [generate multiple audio tracks with ffmpeg for HLS](../ffmpeg_multiple_audio_tracks_hls.md).


## HLS Live

## Images


## Quality selector

