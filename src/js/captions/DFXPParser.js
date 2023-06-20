import Captions from "./Captions";
import { timeToMilliseconds } from "../core/utils";

export function parseDFXP(player, text) {
    const captions = {};


    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/xml');

    Array.from(doc.getElementsByTagName('div')).forEach(div => {
        const lang = div.getAttribute('xml:lang') || "unknonw";
        captions[lang] = captions[lang] || new Captions(player.translate(lang), lang);
        
        Array.from(div.getElementsByTagName('p')).forEach(p => {
            const begin = timeToMilliseconds(p.getAttribute('begin'))
            captions[lang].addCue({
                label: `caption_${p.getAttribute('xml:id') || begin}`,
                start: begin / 1000,
                end: timeToMilliseconds(p.getAttribute('end')) / 1000,
                captions: p.innerHTML
            });
        })
    })
    

    return captions;
}

export default class DFXPParser {
    constructor(player, text = "") {
        this.player = player;
        this._text = text;
        this._captions = parseDFXP(this.player, text);
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this._captions = parseDFXP(text);
    }

    get captions() {
        return this._captions;
    }
}