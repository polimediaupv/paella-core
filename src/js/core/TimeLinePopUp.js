import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import 'paella-core/styles/TimeLinePopUp.css';

function setupPlayerInstance(player) {
    if (!player.__timeLinePopUp) {
        player.__timeLinePopUp = {
            popUps: [],
            current: null
        }
    }
}

export default class TimeLinePopUp extends DomClass {
    static HideUserInterface(player) {
        setupPlayerInstance(player);
        if (player.__timeLinePopUp.current) {
            const tmpCurrentPopup = player.__timeLinePopUp.current;
            player.__timeLinePopUp.current.hide();
            player.__timeLinePopUp.current = tmpCurrentPopup;
        }
    }

    static ShowUserInterface(player) {
        setupPlayerInstance(player);
        if (player.__timeLinePopUp.current) {
            player.__timeLinePopUp.current.show();
        }
    }

    constructor(player) {
        setupPlayerInstance(player);

        const attributes = {
            "class": "timeline-popup-content"
        };

        const parent = player.containerElement;

        super(player, { attributes, parent });

        // Hide other pop ups
        player.__timeLinePopUp.popUps.forEach(p => p.hide());
        
        this._id = Symbol(this);
        player.__timeLinePopUp.popUps.push(this);

        player.__timeLinePopUp.current = this;
    }

    show() {
        // Hide other pop ups
        this.player.__timeLinePopUp.popUps.forEach(p => p.hide());
        super.show();
        this.player.__timeLinePopUp.current = this;
    }

    hide() {
        super.hide();
        this.player.__timeLinePopUp.current = null;
    }

    setContent(content) {
        if (content) {
            this.element.appendChild(content);
        }
    }
}
