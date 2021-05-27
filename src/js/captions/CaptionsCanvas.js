
import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import { loadCaptionsPlugins } from 'paella-core/js/captions/CaptionsPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';

import 'paella-core/styles/CaptionCanvas.css';

export default class CaptionCanvas extends DomClass {
    constructor(player,parent) {
        const attributes = {
            "class": "captions-canvas"
        };
        super(player, { tag: 'div', attributes, parent });

        this._captionsContainer = createElementWithHtmlText(`
            <div class="captions-container"></div>`, this.element);

        this._captions = [];

        this.hide();

        this._currentCaptions = null;

        const timeChanged = evt => {
            const time = evt.currentTime || evt.newTime || 0;
            if (this._currentCaptions) {
                const cue = this._currentCaptions.getCue(time);
                this._captionsContainer.innerHTML = "";
                cue && cue.captions.forEach(c => {
                    this._captionsContainer.innerHTML += c;
                    this._captionsContainer.innerHTML += '<br/>';
                });
            }
        };

        bindEvent(this.player, Events.TIMEUPDATE, timeChanged);
        bindEvent(this.player, Events.SEEK, timeChanged);
    }

    load() {
        loadCaptionsPlugins(this.player);
    }

    addCaptions(captions) {
        this._captions.push(captions);
        triggerEvent(this.player, Events.CAPTIONS_CHANGED, { captions: this._captions });
    }

    get captions() {
        return this._captions;
    }

    getCaptions({ label, index, lang }) {
        if (label === undefined && index === undefined && lang === undefined) {
            throw Error("Could not find captions: you must specify the label, the index or the language");
        }

        if (index !== undefined) {
            return this._captions[index];
        }
        else {
            return this._captions.find(c => {
                if (label !== undefined) {
                    return c.label === label;
                }
                else if (lang !== undefined) {
                    return c.language === lang;
                }
            });
        }
    }

    enableCaptions(searchOptions) {
        this._currentCaptions = this.getCaptions(searchOptions);
        this.show();
    }

    disableCaptions() {
        this._currentCaptions = null;
        this.hide();
    }
}