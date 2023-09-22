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

To start, let's create a new video manifest of type HLS. Add the file `public/repo/hls-dual/data.json`:

```json
{
	"streams": [
		{
			"sources": {
				"hls": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar_16_9_hls/SCREEN.m3u8",
						"mimetype": "video/mp4"
					}
				]
				
			},
			"content":"presentation"
		},
		{
			"sources": {
				"hls": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar_16_9_hls/PRESENTER.m3u8",
						"mimetype": "video/mp4"
					}
				]
			},
			"content":"presenter",
			"role":"mainAudio"
		}
	]
}
```

The HLS plugin has more configuration options than others, as it includes some more configuration options, and it also allows you to add configuration options from the hlsjs library:

```json
{
	...
	"plugins": {
		...
		"es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 0,
            "audioTrackLabel": "name",
            "enableCache": true,
            "forceNative": false,
            "forceNativeForIOS": false,
            "hlsConfig": {
            },
            "corsConfig": {
                "withCredentials": false,
                "requestHeaders": {
                    "Access-Control-Allow-Credentials": false
                }
            }
        },
		...
	}
}
```

The `hlsConfig` and `corsConfig` options are used to configure the hlsjs options. More information on this topic can be found in [the official library documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning).

For more information on HLS configuration settings, please [refer to the plugin documentation](../hls_video_plugin.md).


## HLS Live

The playback of HLS live streams is identical to the playback of time-shifted videos, so it is possible to play live videos using the HLS plugin that we have seen in the previous section.

However, it is very complicated to configure hlsjs to optimally play live and delayed video simultaneously. This is especially so for low latency live video.

To solve this, `paella-core` includes a second plugin for HLS. Internally it works the same, but being two different plugins it allows to set one configuration for live video and another for delayed video:

**video manifest:**

```json
{
	"streams": [
		{
			"sources": {
				// Use hlsLive key, instead of hls
				"hlsLive": [
					{
						...
					}
				],
				...	
			}
		},
		...
	]
}
```

**configuration:**

```json
{
	...
	"plugins": {
		...
		// HLS video
		"es.upv.paella.hlsVideoFormat": {
            ...
		},
		// HLS live stream videos
		"es.upv.paella.hlsLiveVideoFormat": {
            ...
		},
		...
	}
}
```



## Images

The image-based video format is useful for transparency-based presentation videos. Instead of specifying a video stream, this format defines a sequence of images associated with an instant of time. Generally, this format greatly reduces bandwidth and processing requirements over the same option using a video stream, especially when the slide refresh rate is not very high.

En el vídeo manifest, el stream de imágenes se forma mediante un array que contiene objetos con la siguiente información:

```json
"image": [
	{
		"mimetype": "image/jpeg",
		"frames": [
			{
				"time": 0,
				"src": "image_frame_0.jpg",
			},
			{
				"time": 1,
				"src": "image_frame_1.jpg",
			},
			...
			{
				"time": n,
				"src": "image_frame_n.jpg",
			}
		],
		"count": n,
		"duration": 123,
		"res": {
			"w": 1920,
			"h": 1080
		}
	}
]
```

Inside the array `image` there can be more elements, where each of them refers to an image resolution. This `image` array would be placed inside the `sources` object for that element of the video manifest, in the same way as we do with `hls` or `mp4`:

```json
{
	"streams": [
		{
			"sources": {
				"image": [ ... ],
				"mp4": [ ... ]
			},
			"content": "presenter"
		},
		{
			"sources": {
				"hls": [ ... ],
				"content": "presentation",
				"role": "mainAudio"
			}
		}
	]
}
```

Remember that if there is more than one plugin configured that is compatible with the stream, then the one with the highest priority will be used, taking into account the `order` attribute of the configuration. For example, in the video manifest above, the `presenter` stream has images defined for the images plugin, but it also has an mp4 stream defined. In this case, if we want to take advantage of the lower bandwidth needed for the images plugin, the player configuration would have to establish that the images plugin is higher priority than the mp4 plugin.

```json
{
	"plugins": {
		"es.upv.paella.imageVideoFormat": {
            "enabled": true,
            "order": 0
        },
		"es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 1,
			// other hls configuration options	
        },
		"es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 2
        },
		...
	}
}
```

Activate the images plugin, following the example above, and then create a new file in `public/repo/images/data.json`:

```json
{
	"streams": [
		{
			"sources": {
				"image": [
					{
						"mimetype": "image/jpeg",
						"frames": [
							{
								"time": 854,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/3d90109c-9608-44c1-8660-fce3f216d716/presentation_cut.jpg"
							},
							{
								"time": 751,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/598bd2ba-4fef-4886-884e-0ab82176f13d/presentation_cut.jpg"
							},
							{
								"time": 0,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/7dc22bee-14f3-442c-8f0d-30d8b68c8604/presentation_cut.jpg"
							},
							{
								"time": 363,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/d3194d9b-8f65-403b-a639-9de4311a283b/presentation_cut.jpg"
							}
						],
						"count": 4,
						"duration": 909,
						"res": {
							"w": 1442,
							"h": 1080
						}
					},
					{
						"mimetype": "image/jpeg",
						"frames": [
							{
								"time": 854,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/403de1df-aa66-44c0-b600-7683acf249b8/presentation_cut.jpg"
							},
							{
								"time": 751,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/73a6564c-b2d6-4896-b0f1-38129dde2c85/presentation_cut.jpg"
							},
							{
								"time": 0,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/46561b90-85b3-4ad7-a986-cdd9b52ae02b/presentation_cut.jpg"
							},
							{
								"time": 363,
								"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/4505b6d9-8a0c-4809-ade3-840e743188ed/presentation_cut.jpg"
							}
						],
						"count": 4,
						"duration": 909,
						"res": {
							"w": 320,
							"h": 240
						}
					}
				]
			},
			"content":"presentation"
		},
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1920",
							"h": "1080"
						}
					}
				]
			},
			"content":"presenter",
			"role": "mainAudio"
		}
	],
	...
}
```

**IMPORTANT NOTE:** `paella-core` needs at least one real video or audio stream to play a video. It will not be possible to define a video that only consists of a sequence of images, it will be necessary to add another stream with a real video or audio-only stream. Audio-only streams will be discussed later.

## Configuration example

In the following example configuration the highest priority plugin is set to be the image plugin, followed by `hls` (along with `hlsLive`), `mp4` and `html`. This option gives priority to the image format because generally no image-based streams will be defined for any video that is not based on a transparency presentation. Then set the HLS format as it supports more options, e.g. multiple quality streams. Finally the mp4 and html format are left with the same priority, because they are equivalent in terms of efficiency.

```json
	"plugins": {
		...
		"es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 2
        },

        "es.upv.paella.htmlVideoFormat": {
            "enabled": true,
            "order": 2
        },

        "es.upv.paella.imageVideoFormat": {
            "enabled": true,
            "order": 0
        },

        "es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 1,
            "audioTrackLabel": "name",
            "enableCache": true,
            "forceNative": false,
            "forceNativeForIOS": false,
            "hlsConfig": {
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
            "order": 1,
            "audioTrackLabel": "name",
            "enableCache": true,
            "forceNative": false,
            "hlsConfig": {
            },
            "corsConfig": {
                "withCredentials": false,
                "requestHeaders": {
                    "Access-Control-Allow-Credentials": false
                }
            }
        },
		...
	}
```


Previous tutorial: [Video frame thumnail preview](video_frames_preview.md)
Next tutorial: [Quality selector plugin](quality_selector.md)

