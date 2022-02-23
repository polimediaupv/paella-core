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

        this._enabled = true;
    }

    async play() { 
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.play();
        }
        else {
            this._disabledProperties.paused = false;
        }
    }
    
    async pause() {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.pause();
        }
        else {
            this._disabledProperties.paused = true;
        }
    }

    async duration() {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.duration;
        }
        else {
            return this._disabledProperties.duration;
        }
    }

    get currentTimeSync() {
        if (this._enabled) {
            return this.ready ? this.video.currentTime : -1;
        }
        else {
            return this.ready ? this._disabledProperties.currentTime : -1;
        }
    }
    
    async currentTime() {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.currentTimeSync;
        }
        else {
            return this._disabledProperties.currentTime;
        }
    }

    async setCurrentTime(t) {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.currentTime = t;
        }
        else {
            this._disabledProperties.currentTime = t;
            return t;
        }
    }

    async volume() {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.volume;
        }
        else {
            return this._disabledProperties.volume;
        }
    }

    async setVolume(v) {
        if (this._enabled) {
            await this.waitForLoaded();
            if (v === 0) {
                this.video.setAttribute("muted", true);
            }
            else {
                this.video.removeAttribute("muted");
            }
            return this.video.volume = v;
        }
        else {
            this._disabledProperties.volume = v;
            return v;
        }
    }

    async paused() {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.paused;
        }
        else {
            return this._disabledProperties.paused;
        }
    }

    async playbackRate() {
        if (this._enabled) {
            await this.waitForLoaded();
            return await this.video.playbackRate;
        }
        else {
            return this._disabledProperties.playbackRate;
        }
    }

    async setPlaybackRate(pr) {
        if (this._enabled) {
            await this.waitForLoaded();
            return this.video.playbackRate = pr;
        }
        else {
            this._disabledProperties.playbackRate = pr;
            return pr;
        }
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
        if (this._enabled) {
            await this.waitForLoaded();
            return { w: this.video.videoWidth, h: this.video.videoHeight };
        }
        else {
            return { w: this._disabledProperties.videoWidth, h: this._disabledProperties.videoHeight };
        }
    }

    saveDisabledProperties(video) {
        this._disabledProperties = {
            duration: video.duration,
            volume: video.volume,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            playbackRate: video.playbackRate,
            paused: video.paused
        }
    }

    // This function is called when the player loads, and it should
    // make everything ready for video playback to begin.
    async loadStreamData(streamData) {
        this.player.log.debug("es.upv.paella.mp4VideoFormat: loadStreamData");

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
        });

        await this.waitForLoaded();

        this.saveDisabledProperties(this.video);

        
        this.player.log.debug(`es.upv.paella.mp4VideoFormat (${ this.streamData.content }): video loaded and ready.`);
    }

    async enable() {
        this.player.log.debug("video.enable()");
        // TODO: Enable video
        // this._enabled = false;
        //this.saveDisabledProperties(this.video);
        // this._enabled = false;
        // TODO: configure timeout to update current time
    }

    async disable() {
        if (this.isMainAudio) {
            this.player.log.debug("video.disable() - the video is not disabled because it is the main audio source.");
        }
        else {
            this.player.log.debug("video.disable()");
            // TODO: Disable video
            // this._enabled = false;
        }
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