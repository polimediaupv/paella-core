import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import 'paella-core/styles/TimeLinePopUp.css';

const g_popUps = [];
let g_currentPopUp = null;

export default class TimeLinePopUp extends DomClass {
    static HideUserInterface() {
        if (g_currentPopUp) {
            const tmpCurrentPopup = g_currentPopUp;
            g_currentPopUp.hide();
            // g_currentPopUp is set to null on hide, with this
            // line we restore the current popup
            g_currentPopUp = tmpCurrentPopup;
        }
    }

    static ShowUserInterface() {
        if (g_currentPopUp) {
            g_currentPopUp.show();
        }
    }

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

        g_currentPopUp = this;
    }

    show() {
        // Hide other pop ups
        g_popUps.forEach(p => p.hide());
        super.show();
        g_currentPopUp = this;
    }

    hide() {
        super.hide();
        g_currentPopUp = null;
    }

    setContent(content) {
        if (content) {
            this.element.appendChild(content);
        }
    }
}
