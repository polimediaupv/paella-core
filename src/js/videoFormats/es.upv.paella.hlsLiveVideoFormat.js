import Hls from 'hls.js';

import { HlsVideo, getHlsSupport, HlsSupport, defaultHlsConfig } from './es.upv.paella.hlsVideoFormat';
import VideoPlugin from 'paella-core/js/core/VideoPlugin';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';

const hlsSupport = getHlsSupport();

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
    const hlsStream =   streamData?.sources?.hlsLive?.length>0 &&
                        streamData.sources.hlsLive[0];
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

export class HlsLiveVideo extends HlsVideo {
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
            // Initialize current quality
            this._currentQuality = this._autoQuality;

            // Initialize current audio track
            const tracks = await this.getAudioTracks();
            this._currentAudioTrack = tracks.find(track => track.selected);
        }
    }
}

export default class HlsLiveVideoFormat extends VideoPlugin {
    get streamType() {
        return "hlsLive";
    }

    isCompatible(streamData) {
        const { hlsLive } = streamData.sources;
        return hlsLive && hlsSupport;
    }

    async getVideoInstance(playerContainer, isMainAudio) {
        return new HlsLiveVideo(this.player, playerContainer, this.config, isMainAudio);
    }
}
