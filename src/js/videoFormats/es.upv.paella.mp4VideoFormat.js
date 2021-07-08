import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import { resolveResourcePath } from 'paella-core/js/core/utils';

let video = null;

export function supportsVideoType(type) {
    if (!type) return false;
    if (!video) {
        video = document.createElement("video");
    }

    const canPlay = video.canPlayType(type);
    return canPlay === "maybe" || canPlay === "probably";
}

export class Mp4Video extends Video {
    constructor(player, parent, isMainAudio) {
        super('video', player, parent);
        this.element.setAttribute("playsinline","true");

        this.isMainAudio = isMainAudio;

        // Autoplay is required to play videos in some browsers
        this.element.setAttribute("autoplay","true");
        this.element.autoplay = true;

        // The video is muted by default, to allow autoplay to work
        if (!isMainAudio) {
            this.element.muted = true;
        }
    }

    async play() { 
        await this.waitForLoaded();
        return this.video.play();
    }
    
    async pause() {
        await this.waitForLoaded();
        return this.video.pause();
    }

    async duration() {
        await this.waitForLoaded();
        return this.video.duration;
    }

    get currentTimeSync() {
        return this.ready ? this.video.currentTime : -1;
    }
    
    async currentTime() {
        await this.waitForLoaded();
        return this.currentTimeSync;
    }

    async setCurrentTime(t) {
        await this.waitForLoaded();
        return this.video.currentTime = t;
    }

    async volume() {
        await this.waitForLoaded();
        return this.video.volume;
    }

    async setVolume(v) {
        await this.waitForLoaded();
        if (v === 0) {
            this.video.setAttribute("muted", true);
        }
        else {
            this.video.removeAttribute("muted");
        }
        return this.video.volume = v;
    }

    async paused() {
        await this.waitForLoaded();
        return this.video.paused;
    }

    async playbackRate() {
        await this.waitForLoaded();
        return await this.video.playbackRate;
    }

    async setPlaybackRate(pr) {
        await this.waitForLoaded();
        return this.video.playbackRate = pr;
    }

    async getQualities() {
        // TODO: implement this
    }

    async setQuality(/* q */) {
        // TODO: implement this
    }

    get currentQuality() {
        // TODO: implement this
    }

    async getDimensions() {
        await this.waitForLoaded();
        return { w: this.video.videoWidth, h: this.video.videoHeight };
    }

    // This function is called when the player loads, and it should
    // make everything ready for video playback to begin.
    async loadStreamData(streamData) {
        console.debug("es.upv.paella.mp4VideoFormat: loadStreamData");

        this._sources = null;
        this._currentQuality = 0;

        this._sources = streamData.sources.mp4;        
        this._currentQuality = this._sources.length - 1;
        this._currentSource = this._sources[this._currentQuality];

        if (!this.isMainAudioPlayer) {
            this.video.muted = true;
        }
        
        this.video.src = resolveResourcePath(this.player, this._currentSource.src);
        this.video.addEventListener("ended", () => {
            if (typeof(this._videoEndedCallback) == "function") {
                this._videoEndedCallback();
            }
        })

        await this.waitForLoaded();
        
        console.debug(`es.upv.paella.mp4VideoFormat (${ this.streamData.content }): video loaded and ready.`);
    }

    waitForLoaded() {
        return new Promise((resolve,reject) => {
            if (this.ready) {
                resolve();
            }
            else {
                const startWaitTimer = () => {
                    if (this.video.readyState >= 2) {
                        this.video.pause(); // Pause the video because it is loaded in autoplay mode
                        this._ready = true;
                        resolve();
                    }
                    else {
                        setTimeout(() => startWaitTimer(), 100);
                    }
                }

                startWaitTimer();
            }
        })
    }
}

export default class Mp4VideoPlugin extends VideoPlugin {
    get streamType() {
        return "mp4";
    }

    isCompatible(streamData) {
        const { mp4 } = streamData.sources;
        return mp4 && supportsVideoType(mp4[0]?.mimetype);
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new Mp4Video(this.player, playerContainer, isMainAudio);
    }
}