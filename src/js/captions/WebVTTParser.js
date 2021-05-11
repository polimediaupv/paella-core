
import { timeToSeconds } from 'paella-core/js/core/utils';

const TIMESTAMP = "(?:\\d*:){1,2}\\d*";
const CUE_TIMING = `(${TIMESTAMP})\\s*\\-\\->\\s*(${TIMESTAMP})`;

const re = {
    cueTiming: new RegExp(CUE_TIMING)
};

const parseCue = (line,i,lines) => {
    const result = re.cueTiming.exec(line);
    if (result) {
        const label = lines[i - 1];
        let captions = [];
        for (let j = 1; i+j<lines.length && lines[i+j] !== ''; ++j) {
            captions.push(lines[i+j]);
        }
        return {
            label: label,
            start: timeToSeconds(result[1]),
            end: timeToSeconds(result[2]),
            startString: result[1],
            endString: result[2],
            caption: captions
        };
    }
    return null;
}

export function parseWebVTT(text) {
    const result = {
        cues: []
    }
    
    if (text !== "") {
        text = text.replace(/\r\n/gm,"\n");
        text = text.replace(/\r/gm,"\n");

        text.split(/\n/).forEach((line,i,lines) => {
            let cue = parseCue(line,i,lines);
            if (cue) {
                result.cues.push(cue);
            }
        })
    }

    return result;
}

export default class WebVTTParser {
    constructor(text = "") {
        this._text = text;
        this._data = parseWebVTT(text);
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this._data = parseWebVTT(text);
    }

    get cues() {
        return this._data.cues;
    }
}

