import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import { resolveResourcePath } from 'paella-core/js/core/utils';
import PaellaCoreVideoFormats from './PaellaCoreVideoFormats';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';

let video = null;

export function supportsVideoType(type) {
    if (!type) return false;
    if (!video) {
        video = document.createElement("video");
    }

    let canPlay = video.canPlayType(type);
    if (canPlay === "maybe" || canPlay === "probably") {
        return true;
    }
    else if (/video\/mp4/i.test(type)) {
        canPlay = video.canPlayType("video/mp4");
        return canPlay === "maybe" || canPlay === "probably";
    }
}

export class Mp4Video extends Video {
    constructor(player, parent, isMainAudio, config) {
        super('video', player, parent);
        this._config = config || {};

        const crossorigin = this._config.crossOrigin ?? "";
        this.element.setAttribute("playsinline","");
        if (crossorigin !== false) {
            this.element.setAttribute("crossorigin",crossorigin);
        }

        this.isMainAudio = isMainAudio;

        // The video is muted by default, to allow autoplay to work
        if (!isMainAudio) {
            this.element.muted = true;
        }

        this._videoEnabled = true;
    }

    async play() { 
        if (this._videoEnabled) {
            await this.waitForLoaded();
            return this.video.play();
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
        if (!this._qualities) {
            this._qualities = this._sources.map((src, i) => new VideoQualityItem({
                index: i,
                label: `${src.res.w}x${src.res.h}`,
                shortLabel: `${src.res.h}p`,
                width: src.res.w,
                height: src.res.h,
                src: src.src,
            }));
        }

        return this._qualities;
    }

    get qualityChangeNeedsPause() {
      return true;
    }

    async setQuality(q) {
        if (!(q instanceof VideoQualityItem)) {
            throw new Error('Invalid parameter setting video quality');
        }

        this.player.log.debug(`org.opencast.paella.mp4MultiQualityVideoFormat: Change video quality to ${q.shortLabel}`);

        // Clear data, set the `src` attribute to the new video file and then
        // set some values to previous values.
        const currentTime = this.video.currentTime;
        const playbackRate = this.video.playbackRate;
        this.clearStreamData();
        this.video.autoplay = true;
        this.video.src = q.src;
        this.video.currentTime = currentTime;
        this.video.playbackRate = playbackRate;
        this.video.addEventListener('ended', this._endedCallback);
        this._currentQuality = q.index;

        // Wait for the `canplay` event to know that the video has loaded sufficiently.
        await new Promise(resolve => {
            const f = () => {
                this._ready = true;
                this.video.autoplay = false;
                this.video.pause();
                this.video.removeEventListener('canplay', f);
                resolve(null);
            };
            this.video.addEventListener('canplay', f);
        });
    }

    get currentQuality() {
        return this._qualities[this._currentQuality];
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

    // This function is called when the player loads, and it should
    // make everything ready for video playback to begin.
    async loadStreamData(streamData = null) {
        this._streamData = this._streamData || streamData;
        this.player.log.debug("es.upv.paella.mp4VideoFormat: loadStreamData");

        this._sources = null;
        this._currentQuality = 0;

        this._sources = streamData.sources.mp4;
        this._sources.sort((a,b) => {
            return Number(a.res.w) - Number(b.res.w);
        });


        // Select a fitting initial quality
        const screenRes = [window.screen.width, window.screen.height]
            .map(x => x * window.devicePixelRatio);
        let screenMin = Math.min(screenRes[0], screenRes[1]);
        let screenMax = Math.max(screenRes[0], screenRes[1]);

        // This is the test recommended by MDN:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        //
        // Of course, ideally one wouldn't have to look at the user agent string
        // at all and would get the information one wants via different means.
        // But for what we want to query, there are no different means. The
        // `devicePixelRatio` helps only marginally. Network speed information
        // API is still unstable. Since this is only the initial quality and
        // this test works well the vast majority of times, it makes sense to
        // just use it. We use something between 720p and 1080p as resolution
        // target. The YouTube app seems to use 720p as default.
        const isMobile = /Mobi/i.test(window.navigator.userAgent);
        if (isMobile) {
            screenMin = Math.max(screenMin, 900);
            screenMax = Math.max(screenMin, 1600);
        }

        // Find the largest video that still fully fits inside the screen. The
        // array is already sorted in ascending order. Note that we only
        // compare the minimums and maximums to not run into landscape vs.
        // portrait mode problems. Ideally, we would change the quality when
        // the device is turned, but that would be way more involved.
        let quality = 0;
        for (let i = 1; i < this._sources.length; i += 1) {
            const src = this._sources[i];
            const srcMin = Math.min(src.res.w, src.res.h);
            const srcMax = Math.max(src.res.w, src.res.h);
            if (srcMin <= screenMin && srcMax <= screenMax) {
                quality = i;
            }
        }

        this._currentQuality = quality;
        this._currentSource = this._sources[this._currentQuality];

        if (!this.isMainAudioPlayer) {
            this.video.muted = true;
        }

        if (this._initialVolume) {
            this.video.volume = this._initialVolume;
            if (this._initialVolume === 0) {
                this.video.muted = true;
            }
        }
        
        // Set `autoplay` as this improves loading the video, for some reason.
        this.video.setAttribute("autoplay","");
        this.video.autoplay = true;
        const wasMuted = this.video.muted;
        this.video.muted = true;
        this.video.src = resolveResourcePath(this.player, this._currentSource.src);
        this._endedCallback = this._endedCallback || (() => {
            if (typeof(this._videoEndedCallback) == "function") {
                this._videoEndedCallback();
            }
        });
        this.video.addEventListener("ended", this._endedCallback);

        // Wait until the video has loaded to play at least a bit.
        await new Promise(resolve => {
            const f = () => {
                this.video.removeEventListener('canplay', f);
                this.video.autoplay = false;
                this.video.muted = wasMuted;
                this.video.pause();
                resolve();
            };
            this.video.addEventListener('canplay', f);
        });

        this.player.log.debug(`es.upv.paella.mp4VideoFormat (${ this.streamData.content }): video loaded and ready.`);
        this.saveDisabledProperties(this.video);
    }

    async clearStreamData() {
        this.video.src = "";
        this.video.removeEventListener("ended", this._endedCallback);
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
            if (this.ready) {
                resolve();
            }
            else {
                const startWaitTimer = () => {
                    this._waitTimer && clearTimeout(this._waitTimer);
                    this._waitTimer = null;
                    if (this.video.error) {
                        reject(new Error(this.player.translate("Error loading video: $1. Code: $2 $3", [this.video.src, this.video.error, this.video.error.message])));
                    }
                    else if (this.video.readyState >= 2) {
                        this._ready = true;
                        resolve();
                    }
                    else {
                        this._waitTimer = setTimeout(() => startWaitTimer(), 100);
                    }
                }

                startWaitTimer();
            }
        })
    }
}

export default class Mp4VideoPlugin extends VideoPlugin {
    getPluginModuleInstance() {
        return PaellaCoreVideoFormats.Get();
    }
    
    get name() {
		return super.name || "es.upv.paella.mp4VideoFormat";
	}

    get streamType() {
        return "mp4";
    }

    isCompatible(streamData) {
        const { mp4 } = streamData.sources;
        return mp4 && supportsVideoType(mp4[0]?.mimetype);
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new Mp4Video(this.player, playerContainer, isMainAudio, this.config);
    }
    
    getCompatibleFileExtensions() {
        return ["m4v","mp4"];
    }

    getManifestData(fileUrls) {
        return {
            mp4: fileUrls.map(url => ({
                src: url,
                mimetype: 'video/mp4'
            }))
        };
    }
}
