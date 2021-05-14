
import { timeToSeconds, secondsToTime } from 'paella-core/js/core/utils';

export default class Captions {
    get cues() {
        return this._cues;
    }

    get label() {
        return this._label;
    }

    get language() {
        return this._lang;
    }

    set label(l) {
        this._label = l;
    }

    set language(l) {
        this._lang = l;
    }

    constructor(label = "", lang = "") {
        this._cues = [];
        this._label = label;
        this._lang = lang;
    }

    addCue({ label = "", start, end, captions }) {
        const cue = {
            label
        };

        if (typeof(captions) === "string") {
            cue.captions = [captions];
        }
        else if (Array.isArray(captions)) {
            cue.captions = captions;
        }
        else {
            throw Error("Invalid cue caption format: must be an array of strings or a string");
        }

        if (typeof(start) === "string") {
            cue.start = timeToSeconds(start);
            cue.startString = start;
        }
        else if (typeof(start) === "number") {
            cue.start = start;
            cue.startString = secondsToTime(start);
        }
        else {
            throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
        }

        if (typeof(end) === "string") {
            cue.end = timeToSeconds(end);
            cue.endString = end;
        }
        else if (typeof(end) === "number") {
            cue.end = end;
            cue.endString = secondsToTime(end);
        }
        else {
            throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
        }

        this._cues.push(cue);
        return cue;
    }

    getCue(instant) {
        if (typeof(instant) === "string") {
            instant = timeToSeconds(instant);
        }
        else if (typeof(instant) !== "number") {
            throw Error("Invalid time instant format getting cue");
        }

        let result = null;
        this._cues.some(cue => {
            if (instant>=cue.start && instant<=cue.end) {
                result = cue;
                return true;
            }
        });
        return result;
    }
}
