import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';

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
            player.__timeLinePopUp.current.hide(true);
            player.__timeLinePopUp.current = tmpCurrentPopup;
        }
    }

    static ShowUserInterface(player) {
        setupPlayerInstance(player);
        if (player.__timeLinePopUp.current) {
            player.__timeLinePopUp.current.show(true);
        }
    }

    static Unload(player) {
        if (!player.__timeLinePopUp) return;
        if (player.__timeLinePopUp.current) {
            player.__timeLinePopUp.current.removeFromParent();
        }
        player.__timeLinePopUp.popUps.forEach(p => {
            p.removeFromParent();
        });
        player.__timeLinePopUp.popUps.slice(0);
        delete player.__timeLinePopUp;
    }

    constructor(player, contextObject = null) {
        setupPlayerInstance(player);

        const attributes = {
            "class": "timeline-popup-content"
        };

        const parent = player.containerElement;

        super(player, { attributes, parent });

        this._contextObject = contextObject;

        // Hide other pop ups
        player.__timeLinePopUp.popUps.forEach(p => p.hide());
        
        this._id = Symbol(this);
        player.__timeLinePopUp.popUps.push(this);

        player.__timeLinePopUp.current = this;

        triggerEvent(this.player, Events.SHOW_POPUP, {
            popUp: this,
            plugin: this.contextObject
        });
    }

    get contextObject() {
        return this._contextObject;
    }

    show(uiTimerTriggered = false) {
        if (this.isVisible) {
            return;
        }

        // Hide other pop ups
        this.player.__timeLinePopUp.popUps.forEach(p => p.hide());
        super.show();
        this.player.__timeLinePopUp.current = this;
        if (!(uiTimerTriggered === true)) {
            triggerEvent(this.player, Events.SHOW_POPUP, {
                popUp: this,
                plugin: this.contextObject
            });
        }
    }

    hide(uiTimerTriggered = false) {
        if (!this.isVisible) {
            return;
        }

        super.hide();
        this.player.__timeLinePopUp.current = null;
        if (!(uiTimerTriggered === true)) {
            triggerEvent(this.player, Events.HIDE_POPUP, {
                popUp: this,
                plugin: this.contextObject
            });
        }
    }

    setContent(content) {
        if (content) {
            this.element.innerHTML = "";
            this.element.appendChild(content);
        }
    }
}
