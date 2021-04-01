
export default class VideoQualityItem {
    constructor({ src, label, shortLabel, width = -1, height = -1, bitrate = -1 }) {
        this._src = src;
        this._label = label;
        this._shortLabel = shortLabel;
        this._res = {
            w: width,
            h: height
        }
        this._bitrate = bitrate;
    }

    get src() { return this._src; }
    get label() { return this._label; }
    get shortLabel() { return this._shortLabel; }
    get res() { return this._res; }
    get bitrate() { return this._bitrate; }

    get quality() {
        if (this._res.w !== -1 && this._res.h !== -1) {
            return this._res.w * this._res.h;
        }
        else {
            return this._bitrate;
        }
    }

    compare(other) {
        return other.quality - this.quality;
    }
}
