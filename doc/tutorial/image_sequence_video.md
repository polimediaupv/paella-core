# Sequence of images as video stream

paella-core incorporates a video format plugin that is able to emulate a video stream from a sequence of images. This format can be used to save bandwidth, especially if we are replacing a video that is actually a presentation based on static frames.

A very common use case is in classes where mainly the whiteboard is used, but in addition there is a support in the form of a slide presentation. In these cases, the video of the presenter focuses on the whiteboard, and the video of the presentation is usually a capture of frames from a PowerPoint or similar, which hardly changes, since the main content of the explanation is on the whiteboard itself. Many times we have found that these types of classes only use one or two transparencies every 5 or 10 minutes of explanation. This is a perfect candidate to use a sequence of images instead of a video.

A second interesting use case is to use a sequence of images to support an audio. In the previous tutorial we saw how `paella-core` is able to play an audio file, using the preview image of the video manifest as the video image. We can greatly improve the user experience by including an image presentation to accompany the audio.

In both use cases we proceed in the same way: we add an auxiliary `presentation` stream containing the image sequence. In this tutorial we are going to focus on adding an image stream to a presenter video.

Videos based on image streams have a limitation: they can only be used if there is a main stream that functions as `mainAudio`, either an audio or a video stream.

## Enable plugins

We need the video by image sequence plugin. As it belongs to `paella-core` and we have already imported all plugins from this package, we will only need to enable it in the configuration:

**settings.json**

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.imageVideoFormat": {
            "enabled": true
        },
        ...
    }
}
```

Now we will add a new video manifest containing a video of the presenter and another video with the sequence of images of the presentation:

**public/repo/video-and-images/data.json**

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
								"src": "https://repository.paellaplayer.upv.es/dual-video-audio/slides/3d90109c-9608-44c1-8660-fce3f216d716/presentation_cut.jpg"
							},
							{
								"time": 751,
								"src": "https://repository.paellaplayer.upv.es/dual-video-audio/slides/598bd2ba-4fef-4886-884e-0ab82176f13d/presentation_cut.jpg"
							},
							{
								"time": 0,
								"src": "https://repository.paellaplayer.upv.es/dual-video-audio/slides/7dc22bee-14f3-442c-8f0d-30d8b68c8604/presentation_cut.jpg"
							},
							{
								"time": 363,
								"src": "https://repository.paellaplayer.upv.es/dual-video-audio/slides/d3194d9b-8f65-403b-a639-9de4311a283b/presentation_cut.jpg"
							}
						],
						"count": 4,
						"duration": 909,
						"res": {
							"w": 1024,
							"h": 768
						}
					}
				]
			},
			"content":"presentation"
		},
        {
			"sources": {
				"hls": [
					{
						"src": "https://streaming.upv.es/paellaplayerdemo/_definst_/smil:belmar-hls/belmar/playlist.m3u8",
						"mimetype": "video/mp4"
					}
				]
			},
			"content":"presenter",
            "role": "mainAudio"
		}
    ]
}
```

The image sequence stream data are as follows:

- mimetype: the format of the images
- count: number of images in the sequence
- duration: duration of the sequence
- res: resolution of the images
- frames: an array of objects with the list of the images. Each image must contain the following attributes:
    * time: the instant of time in which this image appears
    * src: the URL of the image file


Run the player with `npm run dev` and test the video using the following URL: [http://localhost:5173/?id=audio-and-images](http://localhost:5173/?id=audio-and-images).

Previous tutorial: [Audio streams](audio_streams.md)
Next tutorial: [Using standard HTML player if the video is compatible](native_player.md)