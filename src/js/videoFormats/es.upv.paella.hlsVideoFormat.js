import { Mp4Video, supportsVideoType } from "./es.upv.paella.mp4VideoFormat";
import VideoPlugin from 'paella-core/js/core/VideoPlugin';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';

import Hls from "hls.js";

const defaultHlsConfig = {
    autoStartLoad: true,
    startPosition : -1,
    capLevelToPlayerSize: true,
    debug: false,
    defaultAudioCodec: undefined,
    initialLiveManifestSize: 1,
    initialQualityLevel: 1,
    maxBufferLength: 30,
    maxMaxBufferLength: 600,
    maxBufferSize: 60*1000*1000,
    maxBufferHole: 0.5,
    lowBufferWatchdogPeriod: 0.5,
    highBufferWatchdogPeriod: 3,
    nudgeOffset: 0.1,
    nudgeMaxRetry : 3,
    maxFragLookUpTolerance: 0.2,
    liveSyncDurationCount: 3,
    liveMaxLatencyDurationCount: 10,
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

const HlsSupport = {
    UNSUPPORTED: 0,
    MEDIA_SOURCE_EXTENSIONS: 1,
    NATIVE: 2
};

const hlsSupport = (function getHlsSupport() {
    const video = document.createElement("video");
    if (Hls.isSupported()) {
        return HlsSupport.MEDIA_SOURCE_EXTENSIONS;
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        return HlsSupport.NATIVE;
    }
    else {
        return HlsSupport.UNSUPPORTED;
    }
})();

const loadHls = (player, streamData, video, config, cors) => {
    
    if (cors.withCredentials) {
        config.xhrSetup = function(xhr,url) {
            xhr.withCredentials = cors.withCredentials;
            for (const header in cors.requestHeaders) {
                const value = cors.requestHeaders[header];
                xhr.setRequestHeader(header, value);
            }
        }
    }

    const hls = new Hls(config);
    const hlsStream =   streamData?.sources?.hls?.length>0 &&
                        streamData.sources.hls[0];
    const isLiveStream = hlsStream.isLiveStream;
    const initialQualityLevel = config.initialQualityLevel !== undefined ? config.initialQualityLevel : 1;

    return [hls, new Promise((resolve,reject) => {
        hls.on(Hls.Events.LEVEL_SWITCHED, (evt, data) => {
            // TODO: Trigger quality changed event
            console.debug(`HLS: quality level switched to ${data.level}`)
        });

        hls.on(Hls.Events.ERROR, (event,data) => {
            if (data.fatal) {
                switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
                        reject(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available"));
                    }
                    else {
                        console.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover");
                        hls.startLoad();
                    }
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover");
                    hls.recoverMediaError()
                    break;
                default:
                    hls.destroy();
                    reject(Error("hlsVideoFormat: Fatal error. Can not recover"));
                }
            }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (!config.autoStartLoad) {
                hls.autoStartLoad();
            }

            hls.currentLevel = hls.levels.length>=initialQualityLevel ? initialQualityLevel : -1;
            setTimeout(() => hls.currentLevel = -1, 1000);

            resolve();
        });

        const rand = Math.floor(Math.random() * 100000000000);
        const url = hlsStream.src + (/\?/.test(url) ? `&cache=${rand}` : `?cache=${rand}`);
        hls.loadSource(url);
        hls.attachMedia(video);
    })];
}

export class HlsVideo extends Mp4Video {
    constructor(player, parent, config) {
        super(player, parent);
        
        this._config = {}
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
    }

    get autoQuality() {
        return this._autoQuality;
    }

    async loadStreamData(streamData) {
        if (hlsSupport === HlsSupport.NATIVE) {
            return super.loadStreamData(streamData);
        }
        else {
            console.debug("Loading HLS stream");

            const [hls, promise] = loadHls(this.player, streamData, this.video, this._config, this._cors);
            this._hls = hls;
            await promise;

            this._autoQuality = new VideoQualityItem({
                label: "auto",
                shortLabel: "auto",
                index: -1,
                width: 1,
                height: 1,
                isAuto: true
            });
            this._currentQuality = this._autoQuality;
        }
    }

    async waitForLoaded() {
        if (hlsSupport === HlsSupport.NATIVE) {
            return super.waitForLoaded();
        }
        else {
            await (new Promise((resolve,reject) => {
                const checkReady = () => {
                    if (this.video.readyState > 2) {
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

    async getDimensions() {
        await this.waitForLoaded();
        const video = this.video;
        return {
            w: video.videoWidth,
            h: video.videoHeight
        }
    }

    async getQualities() {
        const q = [];
        q.push(this._autoQuality);

        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            this._hls.levels.forEach((level, index) => {
                q.push(new VideoQualityItem({
                    index: level.id,
                    label: `${level.width}x${level.height}`,
                    shortLabel: `${level.height}p`,
                    index: index,
                    width: level.width,
                    height: level.height
                }));
            });

            q.sort((a,b) => a.res.h-b.res.h);
        }

        return q;
    }

    async setQuality(q) {
        if (!(q instanceof VideoQualityItem)) {
            throw Error("Invalid parameter setting video quality. VideoQualityItem object expected.");
        }
        
        if (hlsSupport === HlsSupport.MEDIA_SOURCE_EXTENSIONS) {
            this._currentQuality = q;
            this._hls.currentLevel = q.index;
        }
        else {
            console.warn("Could not set video quality of HLS stream, because the HLS support of this browser is native.");
        }
    }

    get currentQuality() {
        return this._currentQuality;
    }
}

export default class HlsVideoPlugin extends VideoPlugin {
    get streamType() {
        return "hls";
    }

    isCompatible(streamData) {
        const { hls } = streamData.sources;
        return hls && hlsSupport;
    }

    async getVideoInstance(playerContainer) {
        return new HlsVideo(this.player, playerContainer, this.config);
    }
}