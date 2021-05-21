import { Mp4Video, supportsVideoType } from "./es.upv.paella.mp4VideoFormat";
import VideoPlugin from 'paella-core/js/core/VideoPlugin';

import Hls from "hls.js";

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

export class HlsVideo extends Mp4Video {
    constructor(player, parent) {
        super(player, parent);
    }

    async loadStreamData(streamData) {
        if (hlsSupport === HlsSupport.NATIVE) {
            return super.loadStreamData(streamData);
        }
        else {
            // TODO: Implement HLS support
            console.log(streamData);
        }
    }

    async waitForLoaded() {
        if (hlsSupport === HlsSupport.NATIVE) {
            return super.waitForLoaded();
        }
        else {
            // TODO: Implement HLS support
        }
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
        return new HlsVideo(this.player, playerContainer);
    }
}