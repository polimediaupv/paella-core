
import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';
import { loadCaptionsPlugins } from 'paella-core/js/captions/CaptionsPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';

import 'paella-core/styles/CaptionCanvas.css';

const containerSizeClasses = [
    { maxWidth: 400, className: 'size-s' },
    { maxWidth: 600, className: 'size-m' },
    { maxWidth: 900, className: 'size-l' },
    { maxWidth: 1100, className: 'size-xl' },
    { className: 'size-xxl' }
];
const getContainerSizeClass = (size) => {
    return containerSizeClasses
        .find(item => item.maxWidth && item.maxWidth>=size || item.maxWidth === undefined).className
}

export default class CaptionCanvas extends DomClass {
    constructor(player,parent) {
        const attributes = {
            "class": "captions-canvas visible-ui"
        };
        super(player, { tag: 'div', attributes, parent });

        this._captionsContainer = createElementWithHtmlText(`
            <div class="text-container">
            </div>
        `, this.element);
        
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
                cue ? this._captionsContainer.style.display = null : this._captionsContainer.style.display = 'none';
                this.resize();
            }
        };

        bindEvent(this.player, Events.TIMEUPDATE, timeChanged);
        bindEvent(this.player, Events.SEEK, timeChanged);
        bindEvent(this.player, Events.RESIZE, () => this.resize());
        bindEvent(this.player, Events.SHOW_UI, () => this.element.classList.add('visible-ui'));
        bindEvent(this.player, Events.HIDE_UI, () => this.element.classList.remove('visible-ui'));
    }

    async load() {
        await loadCaptionsPlugins(this.player);
    }

    unload() {        
    }

    resize() {
        const sizeClass = getContainerSizeClass(this._captionsContainer.clientWidth);
        containerSizeClasses.forEach(c => this.element.classList.remove(c.className));
        this.element.classList.add(sizeClass);
    }

    addCaptions(captions) {
        this._captions.push(captions);
        triggerEvent(this.player, Events.CAPTIONS_CHANGED, { captions: this._captions });
    }

    get captions() {
        return this._captions;
    }

    get currentCaptions() {
        return this._currentCaptions;
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