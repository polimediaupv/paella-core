# Predefined plugins

## src/js/data

Data plugins. You can check the documentation on [data plugins here](data_plugins.md).

- `es.upv.paella.cookieDataPlugin.js`: A [data plugin](data_plugin.md) to store and load data from cookies.

## src/js/layouts

Layout plugins. You can check the documentation about [video layout plugins in this document](video_layout.md).

- `es.upv.paella.singleVideo.js`: Layout for videos with one or more streams.
- `es.upv.paella.dualVideo.js`: Layout for videos with two or more streams.
- `es.upv.paella.tripleVideo.js`: Layout for videos with three or more streams.

## src/js/videoFormats

Plugins to implement support for new video formats. Check the documentation about [video format plugins in this document](video_plugin.md).

- `es.upv.paella.hlsVideoFormat.js`: Support for m3u8 streams. Check the documentation about HLS video [in this document](hls-video-plugin.md).
- `es.upv.paella.hlsLiveVideoFormat.js`: This plugin extends the `hlsVideoFormat.js` plugin, and it is used to support special settings on live stream videos.
- `es.upv.paella.imageVideoFormat.js`: Support for virtual video composed by a list of images. You can check the documentation about this special video type in [this document](image-video-plugin.md)
- `es.upv.paella.mp4VideoFormat.js`: Support for progressive download video. Check the documentation about this format [here](mp4-video-plugin.md) 


## src/js/plugins

Other plugins

- `es.upv.paella.defaultShortcuts.js`: Defines the default keyboard shortcuts of the video player
- `es.upv.paella.playPauseButton.js`: Play and pause button.
- `es.upv.paella.vttManifestCaptionsPlugin.js`: Allows to load subtitles in `VTT` format statically defined in the [video manifest](video_manifest.md) file.

