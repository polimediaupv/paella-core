
export default class VideoQualityItem {
    constructor({ label, shortLabel, isAuto = false, index = 0, src = "", width = -1, height = -1, bitrate = -1 }) {
        this._label = label;
        this._shortLabel = shortLabel;
        this._index = index;
        this._src = src;
        this._res = {
            w: width,
            h: height
        }
        this._bitrate = bitrate;
        this._isAuto = isAuto;
    }

    get label() { return this._label; }
    get shortLabel() { return this._shortLabel; }
    get index() { return this._index; }
    get src() { return this._src; }
    get res() { return this._res; }
    get bitrate() { return this._bitrate; }
    get isAuto() { return this._isAuto; }

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
