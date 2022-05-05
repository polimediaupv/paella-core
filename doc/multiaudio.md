# Multiple audio tracks

This document details `paella-core` support for video playback with multiple audio tracks.

## Compatibility

`paella-core` supports multiple audio tracks through the [`StreamProvider`](stream_provider.md) APIs. However, the underlying video technology being used to play the stream must also support multiple audio tracks. For example, the audio track APIs for `.mp4` files are supported by some browsers, but not all, and for that reason the [`mp4` video plugin](mp4-video-plugin.md) does not support multiple audio tracks: the player behaviour would not be the same in all browsers. However, the `hls` video format does allow the use of video streams with multiple audio tracks, so the [hls-video-plugin.md](hls-video-plugin.md) does implement this feature.

## Integration with multi track audio

The integration between the underlying video technology and the `paella-core` APIs for selecting the active audio tracks is done in the implementation of the [video format plugins](video_plugin.md). Specifically, within the API of a video format plugin, the `async supportsMultiaudio()` function must be implemented, which returns a bool value indicating whether the video has multiple audio tracks. In this case, if the format supports multiple audio tracks, this function will return `true` or `false` depending on whether the particular video stream we are playing has multiple audio tracks. If the underlying technology does not support multiple audio tracks, this function will always return `false`, and the rest of the multiple audio API functions will remain unimplemented.

See the documentation on [video plugins](video_plugin.md) to learn more about integrating multiple audio tracks into a video plugin.

## Video manifest

As you can see in more detail in the document [video_maniofest.md](video_maniofest.md), if the video has several streams, only one of them can contain an audio track. The rest of the videos will have the audio muted. This is due to limitations on certain platforms. For example, on most mobile platforms, it is not possible to play two videos simultaneously if both have audio.

The stream that is responsible for providing the audio will be the main audio stream, and we use the `"role": "mainAudio"` attribute to indicate this. If we have several videos with audio tracks, we will obviously have to mark as `mainAudio` the stream that supports multi-track audio technology, in case they are streams of different types.

## Handle multiple audio tracks

The easiest way to handle multiple audio tracks is via the `es.upv.paella.audioSelector` plugin, within the `paella-basic-plugins` plugin library ([npm](https://www.npmjs.com/package/paella-basic-plugins), [git](https://github.com/polimediaupv/paella-basic-plugins/)). To access these functions programmatically, you can use the APIs of the [StreamProvider](stream_provider.md) object.

## Additional information

- [HLS video plugin](hls-video-plugin.md) for information about multiaudio in HLS.
- [Using ffmpeg to generate an HLS with multiple audio tracks](ffmpeg-multiple-audio-tracks-hls.md).