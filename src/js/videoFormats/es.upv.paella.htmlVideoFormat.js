import { getFileExtension, resolveResourcePath, supportsVideoType } from "../core/utils";
import VideoPlugin, { Video } from "../core/VideoPlugin";
import PaellaCoreVideoFormats from "./PaellaCoreVideoFormats";

export class HtmlVideo extends Video {
    constructor(player, parent, isMainAudio, config) {
        super('video', player, parent);
        this._config = config || {};

        const crossorigin = this._config.crossOrigin ?? "";
        this.element.setAttribute("playsinline","");
        if (crossorigin !== false) {
            this.element.setAttribute("crossorigin",crossorigin);
        }

        this.isMainAudio = isMainAudio;

        // Autoplay is required to play videos in some browsers
        this.element.setAttribute("autoplay","");
        this.element.autoplay = true;

        // The video is muted by default, to allow autoplay to work
        if (!isMainAudio) {
            this.element.muted = true;
        }

        this._videoEnabled = true;
    }

    async play() { 
        if (this._videoEnabled) {
            try {
                await this.waitForLoaded();
                return this.video.play();
            }
            catch (e) {
                // Prevent AbortError exception
            }
        }
        else {
            this._disabledProperties.paused = false;
        }
    }
    
    async pause() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.pause();
        }
        else {
            this._disabledProperties.paused = true;
        }
    }

    async duration() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.duration;
        }
        else {
            return this._disabledProperties.duration;
        }
    }

    get currentTimeSync() {
        if (this._videoEnabled) {
            return this.ready ? this.video.currentTime : -1;
        }
        else {
            return this._disabledProperties.currentTime;
        }
    }
    
    async currentTime() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.currentTimeSync;
        }
        else {
            return this._disabledProperties.currentTime;
        }
    }

    async setCurrentTime(t) {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.currentTime = t;
        }
        else {
            this._disabledProperties.currentTime = t;
            return t;
        }
    }

    async volume() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.volume;
        }
        else {
            return this._disabledProperties.volume;
        }
    }

    async setVolume(v) {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            if (v === 0) {
                this.video.setAttribute("muted", "");
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
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.paused;
        }
        else {
            return this._disabledProperties.paused;
        }
    }

    async playbackRate() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return await this.video.playbackRate;
        }
        else {
            return this._disabledProperties.playbackRate;
        }
    }

    async setPlaybackRate(pr) {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.playbackRate = pr;
        }
        else {
            this._disabledProperties.playbackRate = pr;
            return pr;
        }
    }

    async getQualities() {

    }

    async setQuality(/* q */) {
    }

    get currentQuality() {
        return 0;
    }

    async getDimensions() {
        if (this._videoEnabled) {
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
            paused: video.paused,
            currentTime: video.currentTime
        }
    }

    async loadStreamData(streamData = null) {
        this._streamData = this._streamData || streamData;
        this.player.log.debug("es.upv.paella.htmlVideoFormat: loadStreamData");

        this._sources = streamData.sources.html;
        this._currentQuality = 0;

        if (!this.isMainAudioPlayer) {
            this.video.muted = true;
        }

        this._sources.forEach(({ src, mimetype }) => {
            src = resolveResourcePath(this.player, src);
            const source = document.createElement('source');
            source.src = src;
            source.type = mimetype;
            this.video.appendChild(source);
        });

        this._endedCallback = this._endedCallback || (() => {
            if (typeof(this._videoEndedCallback) == "function") {
                this._videoEndedCallback();
            }
        });
        this.video.addEventListener("ended", this._endedCallback);

        // It's necessary to play the video because some browsers don't update the
        // readyState property until the video is played.
        try {
            await this.video.play();
        }
        catch (err) {
            // Prevent AbortError exception
        }
        await this.waitForLoaded();

        this.player.log.debug(`es.upv.paella.htmlVideoFormat (${ this.streamData.content }): video loaded and ready.`);
        this.saveDisabledProperties(this.video);
    }

    async clearStreamData() {
        this.video.src = "";
        this.video.removeEventListener("ended", this._endedCallback);
        this.video.removeEventListener("loadeddata", this._handleLoadedCallback);
        this._ready = false;
    }

    get isEnabled() {
        return this._videoEnabled;
    }

    async enable() {
        this._videoEnabled = true;
    }

    async disable() {
        if (this.isMainAudio) {
            this.player.log.debug("video.disable() - the video is not disabled because it is the main audio source.");
        }
        else {
            this._videoEnabled = false;
        }

        return this._videoEnabled;
    }

    waitForLoaded() {
        return new Promise((resolve,reject) => {
            if (this.video.readyState>=2) {
                this._ready = true;
            }

            if (this.ready) {
                resolve();
            }
            else {
                this._handleLoadedCallback = evt => {
                    if (this.video.readyState>=2) {
                        this.video.pause();
                        this._ready = true;
                        resolve();
                    }
                }
                this.video.addEventListener("loadeddata", this._handleLoadedCallback);
            }
        })
    }
}

export default class HtmlVideoPlugin extends VideoPlugin {
    getPluginModuleInstance() {
        return PaellaCoreVideoFormats.Get();
    }
    
    get name() {
		return super.name || "es.upv.paella.htmlVideoFormat";
	}

    get streamType() {
        return "html";
    }

    async isCompatible(streamData) {
        const { html } = streamData.sources;
        return html && html.some(videoData => supportsVideoType(videoData.mimetype));
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new HtmlVideo(this.player, playerContainer, isMainAudio, this.config);
    }

    getCompatibleFileExtensions() {
        return ["m4v","mp4","ogg","webm","ogv"];
    }

    getManifestData(fileUrls) {
        const getMimeType = (url) => {
            switch (getFileExtension(url)) {
            case 'mp4':
            case 'm4v':
                return 'video/mp4';
            case 'webm':
                return 'video/webm';
            case 'ogg':
            case 'ogv':
                return 'video/ogg';
            default:
                return null;
            }
        }
        return {
            html: fileUrls.map(url => ({
                src: url,
                mimetype: getMimeType(url)
            }))
        }
    }
}