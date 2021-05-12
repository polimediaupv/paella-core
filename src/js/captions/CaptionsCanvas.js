
import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import 'paella-core/styles/CaptionCanvas.css';

export default class CaptionCanvas extends DomClass {
    constructor(player,parent) {
        const attributes = {
            "class": "captions-canvas"
        };
        super(player, { tag: 'div', attributes, parent });

        this._captionsContainer = createElementWithHtmlText(`
            <div class="captions-container">Test caption</div>`, this.element);

        this._captions = [];
    }

    load() {
        // TODO: Load captions plugins

    }

    addCaptions(captions) {
        this._captions.push(captions);
    }

    getCaptions({ label, index, lang }) {
        if (label === undefined && index === undefined) {
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
        const captions = this.getCaptions(searchOptions);
        
        // TODO: Implement this
    }
}