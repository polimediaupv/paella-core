import VideoPlugin, { Video } from '../core/VideoPlugin';
import { resolveResourcePath, supportsVideoType } from '../core/utils';
import PaellaCoreVideoFormats from './PaellaCoreVideoFormats';
import { HtmlVideo } from './es.upv.paella.htmlVideoFormat';
export class Mp4Video extends HtmlVideo {
    constructor(player, parent, isMainAudio, config) {
        super(player, parent, isMainAudio, config);
    }

    // This function is called when the player loads, and it should
    // make everything ready for video playback to begin.
    async loadStreamData(streamData = null) {
        this._streamData = this._streamData || streamData;
        this.player.log.debug("es.upv.paella.mp4VideoFormat: loadStreamData");

        if (!this._currentSource) {
            this._sources = null;
            this._currentQuality = 0;
    
            this._sources = streamData.sources.mp4;
            this._sources.sort((a,b) => {
                return Number(a.res.w) - Number(b.res.w);
            });
            this._currentQuality = this._sources.length - 1;
            this._currentSource = this._sources[this._currentQuality];
        }

        if (!this.isMainAudioPlayer) {
            this.video.muted = true;
        }

        if (this._initialVolume) {
            this.video.volume = this._initialVolume;
            if (this._initialVolume === 0) {
                this.video.muted = true;
            }
        }
        
        this.video.src = resolveResourcePath(this.player, this._currentSource.src);
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
        
        this.player.log.debug(`es.upv.paella.mp4VideoFormat (${ this.streamData.content }): video loaded and ready.`);
        this.saveDisabledProperties(this.video);
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