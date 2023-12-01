import { getFileExtension, resolveResourcePath } from "../core/utils";
import VideoPlugin from "../core/VideoPlugin";
import { Mp4Video, supportsVideoType } from "./es.upv.paella.mp4VideoFormat";
import PaellaCoreVideoFormats from "./PaellaCoreVideoFormats";

export class HtmlVideo extends Mp4Video {
    constructor(player, parent, isMainAudio) {
        super(player, parent, isMainAudio);
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

        await this.waitForLoaded();

        this.player.log.debug(`es.upv.paella.htmlVideoFormat (${ this.streamData.content }): video loaded and ready.`);
        this.saveDisabledProperties(this.video);
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
        return new HtmlVideo(this.player, playerContainer, isMainAudio);
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