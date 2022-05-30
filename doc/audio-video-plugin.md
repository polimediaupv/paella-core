# Audio video plugin

Allows playback of audio-only streams. To fill the video area in the player's playback view, the preview image defined in the [video manifest's](video_manifest.md) metadata is used. The preview image is a mandatory element of the video manifest, so if it is not defined, the plugin will generate an exception.

To use this plugin you need to have the [audio canvas plugin](audio_canvas_plugin.md) activated.

supported formats are those that the browser can play natively.

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

