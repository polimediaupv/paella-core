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