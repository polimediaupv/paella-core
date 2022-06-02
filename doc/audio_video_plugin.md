# Audio video plugin

Allows playback of audio-only streams. To fill the video area in the player's playback view, the preview image defined in the [video manifest's](video_manifest.md) metadata is used. The preview image is a mandatory element of the video manifest, so if it is not defined, the plugin will generate an exception.

To use this plugin you need to have the [audio canvas plugin](audio_canvas_plugin.md) activated.

supported formats are those that the browser can play natively.

## Configuration

To recognise audio-only videos, you need to activate the plugin in the settings.

```json
{
    "plugins": {
        ...
        "es.upv.paella.audioVideoFormat": {
            "enabled": true,
            "order": 3
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
                "audio": [
                    {
                        "src": "audio/file/url.mp3"
                    }
                ]
            },
            "role": "mainAudio",
            "content": "presenter",
            "canvas": ["audio"]
        }
    ]
}
```

- Due to the `paella-core` specifications, an audio-only stream must necessarily have the `mainAudio` role. The `role` property is not mandatory, but you should check the document about the [Stream Provider](stream_provider.md) to make sure that the stream will be chosen as the main audio stream.
- For the same reason as the above, the video manifest can only contain one audio-only stream.
- The `content` of the stream can be any that match the [video layout plugins](video_layout.md) configuration.
- The canvas must be compatible with audio only streams. There is a predefined audio canvas in `paella-core` that can manage `audio` canvas, but you must be sure that [it is enabled in the configuration](audio_canvas_plugin.md). The default canvas used by `paella-core` is not compatible with audio only streams, so the `canvas` property is mandatory in audio only streams.

