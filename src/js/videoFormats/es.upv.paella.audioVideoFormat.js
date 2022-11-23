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

function asyncLoadAudio(player, audio, src) {
    return new Promise((resolve, reject) => {
        audio.oncanplay = () => resolve();
        audio.onerror = () => reject(new Error(player.translate("Error loading audio: $1", [src])));
        audio.src = resolveResourcePath(player, src);
        resolve();
    });
}


export class AudioOnlyVideo extends Video {
    constructor(player, parent, isMainAudio) {
        super('audio', player, parent);

        this.isMainAudio = isMainAudio;
        this._ready = false;
    }

    get streamType() { return "audio"; }

    waitForLoaded() {
        return new Promise(resolve => {
            const waitReady = () => {
                if (this._ready) {
                    resolve();
                }
                else {
                    setTimeout(waitReady, 100);
                }
            }
    
            waitReady();
        })
    }

    async play() {
        await this.waitForLoaded();
        this.audio.play();
    }

    async pause() {
        await this.waitForLoaded();
        this.audio.pause();
    }

    async duration() {
        await this.waitForLoaded();
        return this.audio.duration;
    }

    get currentTimeSync() {
        return this.audio?.currentTime || 0;
    }

    async currentTime() {
        await this.waitForLoaded();
        return this.audio.currentTime;
    }

    async setCurrentTime(t) {
        await this.waitForLoaded();
        this.audio.currentTime = t;
    }

    async volume() {
        await this.waitForLoaded();
        return this.audio.volume;
    }

    async setVolume(v) {
        await this.waitForLoaded();
        this.audio.volume = v;
    }

    async paused() {
        await this.waitForLoaded();
        return this.audio.paused;
    }

    async playbackRate() {
        await this.waitForLoaded();
        return this.audio.playbackRate;
    }

    async setPlaybackRate(pr) {
        await this.waitForLoaded();
        this.audio.playbackRate = pr;
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
        this._previewImage.style.width = '100%';

        this._source = streamData.sources.audio && streamData.sources.audio[0];
        if (!this._source) {
            throw new Error("Invalid source in audio only video stream");
        }

        if (!this.isMainAudioPlayer) {
            throw new Error("Audio only video stream must be main audio player. Check the role property at video manifest");
        }

        await asyncLoadAudio(this.player, this.audio, this._source.src);
        this._ready = true;

        this.parent.appendChild(this._previewImage);
    }
}

export default class AudioVideoPlugin extends VideoPlugin {
    get streamType() {
        return "audio";
    }

    isCompatible(streamData) {
        return streamData.sources.audio != null;
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new AudioOnlyVideo(this.player, playerContainer, isMainAudio);
    }

    getCompatibleFileExtensions() {
        return ["m4a","mp3"];
    }

    getManifestData(fileUrls) {
        return {
            audio: fileUrls.map(url => ({
                src: url
            }))
        };
    }
}

