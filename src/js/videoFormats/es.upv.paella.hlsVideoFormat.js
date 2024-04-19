import { HtmlVideo } from './es.upv.paella.htmlVideoFormat';
import VideoPlugin from '../core/VideoPlugin';
import VideoQualityItem from '../core/VideoQualityItem';
import AudioTrackData from "../core/AudioTrackData";
import Events, { triggerEvent } from "../core/Events";

import PaellaCoreVideoFormats from "./PaellaCoreVideoFormats";

// import Hls from "hls.js";

export const defaultHlsConfig = {
    autoStartLoad: true,
    startPosition : -1,
    capLevelToPlayerSize: true,
    debug: false,
    defaultAudioCodec: undefined,
    initialLiveManifestSize: 1,
    maxBufferLength: 6,
    maxMaxBufferLength: 6,
    maxBufferSize: 600*1000*1000,
    maxBufferHole: 0.5,
    lowBufferWatchdogPeriod: 0.5,
    highBufferWatchdogPeriod: 3,
    nudgeOffset: 0.1,
    nudgeMaxRetry : 3,
    maxFragLookUpTolerance: 0.2,
    enableWorker: true,
    enableSoftwareAES: true,
    manifestLoadingTimeOut: 10000,
    manifestLoadingMaxRetry: 1,
    manifestLoadingRetryDelay: 500,
    manifestLoadingMaxRetryTimeout : 64000,
    startLevel: undefined,
    levelLoadingTimeOut: 10000,
    levelLoadingMaxRetry: 4,
    levelLoadingRetryDelay: 500,
    levelLoadingMaxRetryTimeout: 64000,
    fragLoadingTimeOut: 20000,
    fragLoadingMaxRetry: 6,
    fragLoadingRetryDelay: 500,
    fragLoadingMaxRetryTimeout: 64000,
    startFragPrefetch: false,
    appendErrorMaxRetry: 3,
    enableWebVTT: true,
    enableCEA708Captions: true,
    stretchShortVideoTrack: false,
    maxAudioFramesDrift : 1,
    forceKeyFrameOnDiscontinuity: true,
    abrEwmaFastLive: 5.0,
    abrEwmaSlowLive: 9.0,
    abrEwmaFastVoD: 4.0,
    abrEwmaSlowVoD: 15.0,
    abrEwmaDefaultEstimate: 500000,
    abrBandWidthFactor: 0.95,
    abrBandWidthUpFactor: 0.7,
    minAutoBitrate: 0
};

const defaultCorsConfig = {
    withCredentials: true,
    requestHeaders: {
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With",
        "Access-Control-Allow-Origin": "http://localhost:8000",
        "Access-Control-Allow-Credentials": "true"
    }
}

export const HlsSupport = {
    UNSUPPORTED: 0,
    MEDIA_SOURCE_EXTENSIONS: 1,
    NATIVE: 2
};


let g_hlsLib = null;

export async function getHlsLib() {
    if (!g_hlsLib) {
        console.debug("Loading HLS.js");
        const module = await import("hls.js");
        g_hlsLib = module.default;
    }
    return g_hlsLib;
}

export async function getHlsSupport(forceNative = false) {
    const Hls = await getHlsLib();

    const video = document.createElement("video");
    if (video.canPlayType('application/vnd.apple.mpegurl') && forceNative) {
        return HlsSupport.NATIVE;
    }
    else if (Hls.isSupported()) {
        return HlsSupport.MEDIA_SOURCE_EXTENSIONS;
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        return HlsSupport.NATIVE;
    }
    else {
        return HlsSupport.UNSUPPORTED;
    }
}



const loadHls = async (player, streamData, video, config, cors) => {
    const Hls = await getHlsLib();

    if (cors.withCredentials) {
        config.xhrSetup = function(xhr,url) {
            xhr.withCredentials = cors.withCredentials;
            for (const header in cors.requestHeaders) {
                const value = cors.requestHeaders[header];
                xhr.setRequestHeader(header, value);
            }
        }
    }

    config.autoStartLoad = true;

    const hls = new Hls(config);
    const hlsStream =   streamData?.sources?.hls?.length>0 &&
                        streamData.sources.hls[0];

    return [hls, new Promise((resolve,reject) => {
        let autoQualitySet = false;

        hls.on(Hls.Events.LEVEL_SWITCHED, (evt, data) => {
            player.log.debug(`HLS: quality level switched to ${data.level}`);
            if (!autoQualitySet) {
                hls.currentLevel = -1;
                autoQualitySet = true;
            }
            triggerEvent(player, Events.VIDEO_QUALITY_CHANGED, {});
        });

        hls.on(Hls.Events.ERROR, (event,data) => {
            if (data.fatal) {
                switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
                        reject(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available"));
                    }
                    else {
                        player.log.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover");
                        hls.startLoad();
                    }
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    player.log.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover");
                    hls.recoverMediaError()
                    break;
                default:
                    hls.destroy();
                    reject(Error("hlsVideoFormat: Fatal error. Can not recover"));
                }
            }
            else {
                player.log.warn('HLS: error');
                player.log.warn(data.details);
            }
        });

        hls.on(Hls.Events.LEVEL_SWITCHING, () => {
            player.log.debug("HLS media attached");
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            player.log.debug("HLS media attached");
        });

        hls.on(Hls.Events.MEDIA_DETACHING, () => {
            player.log.debug("HLS media detaching");
        });

        hls.on(Hls.Events.MEDIA_DETACHED, () => {
            player.log.debug("HLS media detached");
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            player.log.debug("HLS manifest parsed");
            hls.startLoad(-1);
        });

        const rand = Math.floor(Math.random() * 100000000000);
        const url = hlsStream.src + (config.enableCache ? 
            (/\?/.test(hlsStream.src) ? `&cache=${rand}` : `?cache=${rand}`)
            : "");
        hls.loadSource(url);
        hls.attachMedia(video);

        let ready = false;
        hls._videoEventListener = () => {
            ready = true;
            resolve();
        };
        video.addEventListener("canplay", hls._videoEventListener);

        // There are some kind of bug in HLS.js that causes that some
        // streams are not loaded until calling video.play()
        // This is a workaround for this problem
        setTimeout(() => {
            if (!ready) {
                video.play();
            }
        }, 1000);
    })];
}

export class HlsVideo extends HtmlVideo {
    constructor(player, parent, config, isMainAudio) {
        super(player, parent, isMainAudio, config);
        
        this._config = this._config || {
            audioTrackLabel: config.audioTrackLabel || 'name',
            enableCache: config.enableCache || false
        }
        for (const key in defaultHlsConfig) {
            this._config[key] = defaultHlsConfig[key];
        }

        for (const key in config.hlsConfig) {
            this._config[key] = config.hlsConfig[key];
        }

        this._cors = {};
        for (const key in defaultCorsConfig) {
            this._cors[key] = defaultCorsConfig[key];
        }

        for (const key in config.corsConfig) {
            this._cors[key] = config.corsConfig[key];
        }

        this._ready = false;
        this._autoQuality = true;
        this._forceNative = config.forceNative || false;
    }

    get autoQuality() {
        return this._autoQuality;
    }

    get forceNative() {
        return this._forceNative;
    }

    async loadStreamData(streamData) {
        const hlsSupport = await getHlsSupport(this.forceNative);
        if (hlsSupport === HlsSupport.NATIVE) {
            streamData.sources.mp4 = streamData.sources.hls;
            const result = await super.loadStreamData(streamData);
            const tracks = await this.getAudioTracks();
            this._currentAudioTrack = tracks.find(track => track.selected);
            this._autoQuality = new VideoQualityItem({
                label: "auto",
                shortLabel: "auto",
                index: -1,
                width: 1,
                height: 1,
                isAuto: true
            });
            // Initialize current quality
            this._currentQuality = this._autoQuality;
            this.saveDisabledProperties(this.video);
            this._endedCallback = this._endedCallback || (() => {
                if (typeof(this._videoEndedCallback) == "function") {
                    this._videoEndedCallback();
                }
            });
            this.video.addEventListener("ended", this._endedCallback);
            return result;
        }
        else {
            this.player.log.debug("Loading HLS stream");

            const hlsStream = streamData?.sources?.hls?.length && streamData.sources.hls[0];
            this._config.audioTrackLabel = hlsStream?.audioLabel || this._config.audioTrackLabel;
            const [hls, promise] = await loadHls(this.player, streamData, this.video, this._config, this._cors);
            this._hls = hls;
            await promise;
            this.video.pause();

            this._autoQuality = new VideoQualityItem({
                label: "auto",
                shortLabel: "auto",
                index: -1,
                width: 1,
                height: 1,
                isAuto: true
            });
            // Initialize current quality
            this._currentQuality = this._autoQuality;

            // Initialize current audio track
            const tracks = await this.getAudioTracks();
            this._currentAudioTrack = tracks.find(track => track.selected);
            this.saveDisabledProperties(this.video);
            this._endedCallback = this._endedCallback || (() => {
                if (typeof(this._videoEndedCallback) == "function") {
                    this._videoEndedCallback();
                }
            });
            this.video.addEventListener("ended", this._endedCallback);
        }
    }

    async duration() {
        if (this._videoEnabled) {
            await this.waitForLoaded();
            let duration = this.video.duration;
            if (duration === Infinity) {
                duration = this._hls?.liveSyncPosition || 0;
            }
            return duration;
        }
        else {
            return this._disabledProperties.duration;
        }
    }

    async waitForLoaded() {
        const hlsSupport = await getHlsSupport(this.forceNative);
        if (hlsSupport === HlsSupport.NATIVE) {
            return super.waitForLoaded();
        }
        else {
            await (new Promise((resolve,reject) => {
                const checkReady = () => {
                    // readyState === 2: HAVE_CURRENT_DATA. Data is available for the current playback
                    // position, but not enought to actually play more than one frame. In firefox, the
                    // video returns readyState === 2 when the video reaches the end, so the correct
                    // comparision here is >= instead of >
                    if (this.video.readyState >= 2) {
                        this._ready = true;
                        resolve();
                    }
                    else {
                        setTimeout(() => checkReady(), 200);
                    }
                }
                checkReady();
            }));
        }
    }

    async getQualities() {
        const q = [];
        q.push(this._autoQuality);
        const hlsSupport = await getHlsSupport(this.forceNative);

        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            this._hls.levels.forEach((level, index) => {
                q.push(new VideoQualityItem({
                    index: index, // TODO: should be level.id??
                    label: `${level.width}x${level.height}`,
                    shortLabel: `${level.height}p`,
                    width: level.width,
                    height: level.height
                }));
            });

            q.sort((a,b) => a.res.h-b.res.h);
        }

        return q;
    }

    async setQuality(q) {
        const hlsSupport = await getHlsSupport(this.forceNative);

        if (!this._videoEnabled) {
            return;
        }

        if (!(q instanceof VideoQualityItem)) {
            throw Error("Invalid parameter setting video quality. VideoQualityItem object expected.");
        }
        
        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            this._currentQuality = q;
            this._hls.currentLevel = q.index;
        }
        else {
            this.player.log.warn("Could not set video quality of HLS stream, because the HLS support of this browser is native.");
        }
    }

    get currentQuality() {
        return this._currentQuality;
    }

    async supportsMultiaudio() {
        await this.waitForLoaded();
        const hlsSupport = await getHlsSupport(this.forceNative);

        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            return this._hls.audioTracks.length > 1;
        }
        else if (hlsSupport === HlsSupport.NATIVE) {
            return this.video.audioTracks?.length > 1;
        }
        else {
            return false;
        }
    }

    async getAudioTracks() {
        await this.waitForLoaded();

        const audioTrackLabel = this._config.audioTrackLabel || 'name';
        const hlsSupport = await getHlsSupport(this.forceNative);

        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            const result = this._hls.audioTracks.map(track => {
                return new AudioTrackData({
                    id: track.id,
                    name: track[audioTrackLabel],
                    language: track.lang,
                    selected: this._hls.audioTrack === track.id
                });
            });
            return result;       
        }
        else if (hlsSupport === HlsSupport.NATIVE) {
            const result = Array.from(this.video.audioTracks).map(track => {
                return new AudioTrackData({
                    id: track.id,
                    name: track.label,
                    language: track.language,
                    selected: track.enabled
                });
            });
            return result;
        }
        else {
            return null;
        }
    }

    async setCurrentAudioTrack(newTrack) {
        await this.waitForLoaded();

        const tracks = await this.getAudioTracks();
        const selected = tracks.find(track => track.id === newTrack.id);
        const hlsSupport = await getHlsSupport(this.forceNative);
        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS && selected) {
            this._hls.audioTrack = selected.id;
        }
        else if (hlsSupport === HlsSupport.NATIVE && selected) {
            Array.from(this.video.audioTracks).forEach(track => {
                if (track.id === selected.id) {
                    track.enabled = true;
                }
                else {
                    track.enabled = false;
                }
            })
        }
        this._currentAudioTrack = selected;
        return selected;
    }

    get currentAudioTrack() {
        return this._currentAudioTrack;
    }

    async clearStreamData() {
        // See loadHls function
        this.video.removeEventListener("canplay", this._hls._videoEventListener);
        this.video.src = "";
        this._hls.destroy();
        this._ready = false;
    }
}

export default class HlsVideoPlugin extends VideoPlugin {
    getPluginModuleInstance() {
        return PaellaCoreVideoFormats.Get();
    }
    
    get name() {
		return super.name || "es.upv.paella.hlsVideoFormat";
	}

    get streamType() {
        return "hls";
    }

    async isCompatible(streamData) {
        const { hls } = streamData.sources;
        return hls && await getHlsSupport();
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new HlsVideo(this.player, playerContainer, this.config, isMainAudio);
    }

    getCompatibleFileExtensions() {
        return ["m3u8"];
    }

    getManifestData(fileUrls) {
        return {
            hls: fileUrls.map(url => ({
                src: url,
                mimetype: 'video/mp4'
            }))
        };
    }
}