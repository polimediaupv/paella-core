# Audio canvas plugin

It is used to play streams containing audio only. This canvas is designed to work together with the [audio-only stream plugin](audio_video_plugin.md).

This canvas is used to place the preview image defined in the metadata section of the [video manifest](video_manifest.md), which is a required data. If the video manifest does not contain this data, an exception will be thrown.

## Configuration

**config.json:**

```json
{
    "plugins" : {
        ...
        "es.upv.paella.audioCanvas": {
            "enabled": true,
            "order": 1
        }
    }
}
```
