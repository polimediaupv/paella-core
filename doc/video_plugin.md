# Extend video formats

A video format is composed by two elements:

- A video player: adds the player to the Paella Player DOM tree, and implements the playback functions.
- A video plugin: it allows to register the video player as a plugin that can playback certain video format.

## Video player

```javascript
import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';

export class MyVideoPlayer extends Video {

    constructor(player, parent, isMainAudio) {
        super(player, {
            tag: 'video',   // Define here the DOM element type of the player
            parent
        });

        // if !isMainAudio you should mute the audio
        this.isMainAudio = isMainAudio;
    }

    // Implement the following functions and properties 
    async play() { ... }
    
    async pause() { ... }

    async duration() {... }

    async currentTime() { ... }

    async setCurrentTime(t) { ... }

    async volume() { ... }

    async setVolume(v) { ... }

    async paused() { ... }

    async playbackRate() { ... }

    async setPlaybackRate() { ... }

    async getQualities() { ... }

    async setQuality(q) { ... }

    get currentQuality() { ... }

    async getDimensions() { ... }
    
    async supportsMultiaudio() { ... }
    
    async getAudioTracks() { ... }
    
    async setCurrentAudioTrack(t) { ... }
    
    get currentAudioTrack() { ... }

    // This function is called when the player loads, and it should
    // make everything ready for video playback to begin.
    async loadStreamData(streamData) { ... }

    get isEnabled() { ... }

    async enable() { ... }

    async disable() { ... }
}

...
```

Some remarks about `Video` class:

- `getQualities()`: returns an array of `VideoQualityItem` objects, or an empty array if the video format does not support multi quality.
- To set a quality level, you must pass a `VideoQualityItem` from the above array to the `setQuality(q)` function.
- `getAudioTracks()` returns an array of `AudioTrackData` objects, or null if the video format does not support multi quality. More information on videos with multiple audio tracks can be found in [this document](multiaudio.md).
- To set an audio track, you must pass an `AudioTrackData` item of the above array to the `setCurrentAudioTrack(t)` function.
- `get currentAudioTrack()` returns the `AudioTrackData` object for the current audio track.

## Video plugin

```javascript
import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';

... MyVideoPlayer definition

export default class MyVideoPlugin extends VideoPlugin {
    get streamType() {
        return "streamType";
    }

    async isCompatible() {
        return true;
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        new MyVideoPlayer(this.player, playerContainer, isMainAudio);
    }
}
```

## Video plugin priorities

To determine the loading order of the video plugins, the `order` attribute of the configuration is used, so that if there are several plugins compatible with a stream, the one with the lowest value will be loaded first.

```json
{
    ...
    "plugins": {
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1,
        },
        "es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 0,
        },
    }
}
```

## The enable/disable video API

If we have more than one video stream in the video manifest, it is possible for the user to select a [layout](video_layout.md) of only one video. In this case, one of the two videos would be hidden. The enable/disable API is used to allow a video plugin to disable the downloading of data from a video when it is to be hidden, and enable it again when it is to be shown again.

This API is composed of two functions and one attribute:

- `isEnabled (read)`: it must return true or false depending on the current video status. This value must return the internal video status, that is handled by the other two functions of the API:
- `async enable()`: `paella-core` calls this plugin function when the video needs to be enabled. If we implement this API, we are responsible for returning a valid state in the `isEnabled` attribute.
- `async disable()`: `paella-core` calls this plugin function when the video needs to be disabled. If we implement this API, we are responsible for returning a valid state in the `isEnabled` attribute. Note that if the stream is the main audio, we may not want to disable it, as (depending on the underlying technology) we are likely to lose the audio as well. For example, if the stream is an `mp4` video, we can`t disable the video without also losing the audio.


## Load URL API (paella-core >= 1.11)

URL upload API allow you to upload videos without the need to set a manifest, directly through the URLs of the video files.

```js
await myPlayer.loadUrl([
    "presenter.mp4",
    "presentation.mp4"
]);
```

For more information, see the `loadUrl()` function of the [`Paella` class](paella_object.md).

Through this method, `paella-core` will be in charge of generating a valid manifest from the URLs. To generate the video manifest it is necessary that the video plugins include some extra information, since it is the video plugins that are in charge of generating the piece of the video manifest corresponding to the streams.

These functions are implemented in the video plugin optionally, but it is obviously mandatory to implement them if we want to provide URL upload support for a new video format.

Suppose we are developing a plugin for HTML5 video, supporting ogv and webm formats:

```js
...

export default class HTML5VideoPlugin extends VideoPlugin {
    get streamType() {
        return "html5Video";
    }

    async isCompatible() {
        return isChromiumOrMozilla();
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        new HTML5VideoPlayer(this.player, playerContainer, isMainAudio);
    }
}
```

To support the loading of this type of URLs we would have to implement the following functions:

- **`getCompatibleFileExtensions()`:** Returns the list of file extensions supported by the plugin in the stream information.
- **`getManifestData(fileUrls)`:** Devuelve el trozo de manifest correspondiente con el contenido de la propiedad `streams`.

```js
export default class HTML5VideoPlayer extends VideoPlugin {
    ...
    getCompatibleFileExtensions() {
        return ["mp4","m4v","ogg","ogv","webm"];
    }

    getManifestData(fileUrls) {
        return {
            html5Video: fileUrls.map(url => ({
                src: url,
                mimetype: getMimetype(url)
            }))
        }
    }
}
```
