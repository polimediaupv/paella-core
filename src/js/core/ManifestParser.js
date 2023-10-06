
export default class ManifestParser {
    constructor(manifestData, player) {
        this._player = player;
        this._videoManifest = JSON.parse(JSON.stringify(manifestData));

        this._metadata = this._videoManifest.metadata || {};
        this._streams = {};
        this._frameList = {};
        this._trimming = this._videoManifest.trimming;
        this._captions = this._videoManifest.captions;
        this._visibleTimeLine = this._videoManifest.visibleTimeLine;

        function getNativeSource() {
            if (this.streams.length !== 1) {
                return null;
            }
            if (this.isAudioOnly) {
                return this.audioOnlySource.src;
            }
            const stream = this.streams[0];
            const source = stream.sources.mp4 || stream.sources.hls || stream.sources.hlsLive;
            if (!source) {
                return null;
            }
            const video = document.createElement('video');
            if (stream.sources.mp4 && 
                stream.sources.mp4.length &&
                video.canPlayType(stream.sources.mp4[0].mimetype || "video/mp4") === "probably"
                )
            {
                return stream.sources.mp4[0].src;
            }
            const hls = stream.sources.hls || stream.sources.hlsLive;
            if (hls &&
                hls.length &&
                video.canPlayType(hls[0].mimetype || "application/vnd.apple.mpegurl") !== "" &&
                /safari/i.test(navigator.userAgent))    // HLS native only on Safari
            {
                return hls[0].src;
            }
            return null;
        }

        this._streams = {
            streams: this._videoManifest.streams,
            get contents() {
                return this.streams.map(s => s.content);
            },
            getStream(content) {
                return this.streams.find(s => s.content === content);
            },
            getSourceTypes(content) {
                const stream = this.getStream(content);
                return stream && Object.keys(stream.sources) || null;
            },
            getCanvasTypes(content) {
                const stream = this.getStream(content);
                return stream ? stream.canvas || ["video"] : null;
            },
            get isAudioOnly() {
                // Check if the manifest only contains audio streams
                const content = this.contents.length === 1 && this.contents[0];
                const canvasTypes = content && this.getCanvasTypes(content) || [];
                const streams = this.getStream(content);
                return canvasTypes.length === 1 && 
                    canvasTypes[0] === "audio" &&
                    streams.sources.audio && streams.sources.audio.length > 0;
            },
            get audioOnlySource() {
                if (!this.isAudioOnly) {
                    return null;
                }
                return this.getStream(this.contents[0]).sources.audio[0];
            },
            get isNativelyPlayable() {
                return getNativeSource.apply(this) !== null;
            },
            get nativeSource() {
                return getNativeSource.apply(this);
            }
        };

        if (this._videoManifest.frameList &&
            !Array.isArray(this._videoManifest.frameList) &&
            typeof(this._videoManifest.frameList) === "object" &&
            typeof(this._videoManifest.frameList.targetContent) === "string" &&
            Array.isArray(this._videoManifest.frameList.frames)) 
        {
            this._frameList = this._videoManifest.frameList;
        }
        else if (Array.isArray(this._videoManifest.frameList)) {
            this._frameList = {
                targetContent: null,
                frames: this._videoManifest.frameList
            }
        }

        this._frameList.getImage = (time, ignoreTrimming = false) => {
            if (this._player?.videoContainer && this._player._videoContainer.isTrimEnabled && !ignoreTrimming) {
                time += this._player.videoContainer.trimStart;
            }
            else if (!this._player?._videoContainer && !ignoreTrimming) {
                console.warn("frameList.getImage(): player instance is null. The trimming information will be ignored.");
            }

            return [...this._frameList.frames]
                .sort((a,b) => b.time - a.time)
                .find(f => f.time < time)
        }

        Object.defineProperty(this._frameList, "isEmpty", {
            get() {
                return Array.isArray(manifestData.frameList) && manifestData.frameList.length === 0 ||
                        !manifestData.frameList;
            }
        });


        Object.freeze(this._metadata);
        Object.freeze(this._streams);
        Object.freeze(this._trimming);
        Object.freeze(this._captions);
    }

    get metadata() {
        return this._metadata;
    }

    get streams() {
        return this._streams;
    }

    get frameList() {
        return this._frameList;
    }

    get captions() {
        return this._captions;
    }

    get trimming() {
        return this._trimming;
    }

    get visibleTimeLine() {
        return this._visibleTimeLine;
    }
}