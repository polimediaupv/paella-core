import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import 'paella-core/styles/TimeLinePopUp.css';

const g_popUps = [];

export default class TimeLinePopUp extends DomClass {
    constructor(player) {
        const attributes = {
            "class": "timeline-popup-content"
        };

        const parent = player.containerElement;

        super(player, { attributes, parent });

        // Hide other pop ups
        g_popUps.forEach(p => p.hide());
        
        this._id = Symbol(this);
        g_popUps.push(this);
    }

    show() {
        // Hide other pop ups
        g_popUps.forEach(p => p.hide());
        super.show();
    }

    hide() {
        super.hide();
    }

    setContent(content) {
        if (content) {
            this.element.appendChild(content);
        }
    }
}
