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

        this._id = Symbol(this);
        g_popUps.push(this);
    }

    show() {
        console.log("Show");
        super.show();
    }

    hide() {
        console.log("Hide");
        super.hide();
    }

    setContent(content) {
        if (content) {
            this.element.appendChild(content);
        }
    }
}
