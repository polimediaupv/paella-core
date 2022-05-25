import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';

export class AudioOnlyVideo extends Video {
    constructor(player, parent) {
        super('audio', player, parent);
    }

    async play() {

    }

    async pause() {

    }

    async duration() {

    }

    get currentTimeSync() {

    }

    async currentTime() {

    }

    async setCurrentTime() {

    }

    async volume() {

    }

    async setVolume(v) {

    }

    async paused() {

    }

    async playbackRate() {

    }

    async setPlaybackRate(pr) {

    }

    // getQualities(), setQuality(q), get currentQuality(): audio format does not support multiquality

    async getDimensions() {
        // Get dimensions from thumbnail
    }

    async loadStreamData() {

    }
}

export default class AudioVideoPlugin extends VideoPlugin {
    get streamType() {
        return "audio"; // TODO: Check this in paella 6 manifest
    }

    isCompatible(streamData) {
        // TODO: Check this in paella 6 manifest
        return streamData.sources.audio !== null;
    }

    async getVideoInstance(playerContainer) {
        return new AudioVideoPlugin(this.player, playerContainer);
    }
}

