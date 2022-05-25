import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import { resolveResourcePath } from 'paella-core/js/core/utils';

function getAsyncImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", evt => {
            resolve(img);
        });
        img.addEventListener("error", evt => {
            reject(new Error("Could not load preview image. The preview image is required in audio only streams"));
        })
        img.src = src;
    });
}

export class AudioOnlyVideo extends Video {
    constructor(player, parent, isMainAudio) {
        super('audio', player, parent);

        this.isMainAudio = isMainAudio;
    }

    get streamType() { return "audio"; }

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
        return { 
            w: this._previewImage.width, 
            h: this._previewImage.height
        };
    }

    async loadStreamData(streamData = null) {
        this._streamData = this._streamData || streamData;
        this.player.log.debug("es.upv.paella.audioVideoFormat: loadStreamData");

        const previewSrc = this.player.videoManifest.metadata.preview;
        if (!previewSrc || previewSrc == null) {
            throw new Error("Invalid video manifest data: preview image is required");
        }
        this._previewImage = await getAsyncImage(previewSrc);

        this._source = streamData.sources.audio && streamData.sources.audio[0];
        if (!this._source) {
            throw new Error("Invalid source in audio only video stream");
        }

        if (!this.isMainAudioPlayer) {
            throw new Error("Audio only video stream must be main audio player. Check the role property at video manifest");
        }

        // TODO: set source
        this.audio.src = resolveResourcePath(this.player, this._source.src);
    }
}

export default class AudioVideoPlugin extends VideoPlugin {
    get streamType() {
        return "audio";
    }

    isCompatible(streamData) {
        return streamData.sources.audio !== null;
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new AudioOnlyVideo(this.player, playerContainer, isMainAudio);
    }
}

