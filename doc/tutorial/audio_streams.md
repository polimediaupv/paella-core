# Audio streams

`paella-core` can play audio streams. However, as it is mainly a video player, it is possible to use an image as the presentation stream.

To play audio streams it will be necessary to enable two plugins. These plugins are already added, as they belong to the `paella-core` package, and we have imported all its plugins, so we only need to activate them.

To begin with, we will enable a special VideoCanvas for audio. This plugin basically adds an `<audio>` element to the DOM tree where the audio stream can be added. It is important to note that, as `paella-core` can only play one stream with audio simultaneously, in the video manifest we will have to set the audio stream with `role` = `mainAudio`.

Then we will enable the `en.upv.paella.audioVideoFormat` plugin, which will allow decoding audio streams and `mp3`, `aac` and other files, as long as the browser natively supports the format.

**settings.json:**

```json
{
    "plugins": {
        ...
        "es.upv.paella.audioVideoFormat": {
            "enabled": true
        },

        "es.upv.paella.audioCanvas": {
            "enabled": true,
            "order": 0
        },
        ...
    }
}
```

We add a new audio-only video manifest. If we define a video manifest that only has an audio stream, it is highly recommended to specify in that video manifest a preview image. If we don't, then the default image defined in the player can be used, but we have to keep in mind that `paella-core` when playing audio files, keeps the video playback area. This is because the intention of the player is to allow to play audio files occasionally, in an environment where there are mostly videos. Displaying an image as a replacement for the video improves the user experience, as the player maintains a more consistent appearance between the different video manifests.

**public/repo/audio-only/data.json:**

```json
{
	"metadata": {
		"duration": 909.13,
		"title": "Belmar 15 minutes (multiresolution)",
        "preview": "https://repository.paellaplayer.upv.es/dual-video-audio/slides/7dc22bee-14f3-442c-8f0d-30d8b68c8604/presentation_cut.jpg"
	},
	"streams": [
		{
			"sources": {
				"audio": [
					{
						"src": "https://repository.paellaplayer.upv.es/dual-video-audio/media/presenter-audio.m4a"
					}
				]
			},
			"role":"mainAudio",
			"content":"presenter",
            "canvas":["audio"]
		}
	]
}
```

Launch the debugger with `npm run dev` and load the player at URL [http://localhost:5173/?id=audio-only](http://localhost:5173/?id=audio-only)

Previous tutorial: [Video canvas: video 360](video_360.md)
Next tutorial: [Using a sequence of images as video](image_sequence_video.md)
