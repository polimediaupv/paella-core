
import Captions from 'paella-core/js/captions/Captions';
import { WebVTTParser as Parser } from "webvtt-parser";

export function parseWebVTT(text, parser) {
    const captions = new Captions();
    
    if (text !== "") {
        const result = parser.parse(text);
        result.cues.forEach(cue => {
            captions.addCue({
                label: cue.text,
                start: cue.startTime,
                end: cue.endTime,
                captions: [cue.text]
            })
        });
    }

    return captions;
}

export default class WebVTTParser {
    constructor(text = "") {
        this._text = text;
        this._parser = new Parser();
        this._captions = parseWebVTT(text, this._parser);
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this._captions = parseWebVTT(text, this._parser);
    }

    get captions() {
        return this._captions;
    }
}

