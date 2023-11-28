import { DomClass, createElementWithHtmlText } from "./dom";

export const VideoContainerMessagePosition = Object.freeze({
    TOP_LEFT: "topLeft",
    TOP_MIDDLE: "topMiddle",
    TOP_RIGHT: "topRight",
    CENTER_LEFT: "centerLeft",
    CENTER_MIDDLE: "centerMiddle",
    CENTER_RIGHT: "centerRight",
    BOTTOM_LEFT: "bottomLeft",
    BOTTOM_MIDDLE: "bottomMiddle",
    BOTTOM_RIGHT: "bottomRight"
});

const createMessageContainer = (icon, text, timeout, cssClass, parent) => {
    cssClass = cssClass || "";
    timeout = timeout || 1000;
    const result = createElementWithHtmlText(`
        <div class="message-content ${ cssClass }">
            ${ icon ? `<i class="icon">${ icon }</i>` : "" }
            ${ text ? `<p class="text">${ text }</p>` : "" }
        </div>
    `);

    parent.innerHTML = "";
    parent.appendChild(result);
    if (parent.timer) {
        clearTimeout(parent.timer);
        parent.timer = null;
    }
    parent.timer = setTimeout(() => {
        parent.removeChild(result);
    }, timeout);
    return result;
}

export default class VideoContainerMessage extends DomClass {
    constructor(player, parent) {
        const attributes = { "class": "video-container-message" };
        super(player, { attributes, parent });
            
        this._topLeftContainer = createElementWithHtmlText(`<div class="container top-left"></div>`, this.element);
        this._topMiddleContainer = createElementWithHtmlText(`<div class="container top-middle"></div>`, this.element);
        this._topRightContainer = createElementWithHtmlText(`<div class="container top-right"></div>`, this.element);
        this._centerLeftContainer = createElementWithHtmlText(`<div class="container center-left"></div>`, this.element);
        this._centerMiddleContainer = createElementWithHtmlText(`<div class="container center-middle"></div>`, this.element);
        this._centerRightContainer = createElementWithHtmlText(`<div class="container center-right"></div>`, this.element);
        this._bottomLeftContainer = createElementWithHtmlText(`<div class="container bottom-left"></div>`, this.element);
        this._bottomMiddleContainer = createElementWithHtmlText(`<div class="container bottom-middle"></div>`, this.element);
        this._bottomRightContainer = createElementWithHtmlText(`<div class="container bottom-right"></div>`, this.element);
    }

    show({ icon = null, text = "", timeout = 1000, position = VideoContainerMessagePosition.CENTER_MIDDLE, cssClass = "" }) {
        switch (position) {
        case VideoContainerMessagePosition.TOP_LEFT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._topLeftContainer]);
            break;
        case VideoContainerMessagePosition.TOP_MIDDLE:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._topMiddleContainer]);
            break;
        case VideoContainerMessagePosition.TOP_RIGHT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._topRightContainer]);
            break;
        case VideoContainerMessagePosition.CENTER_LEFT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._centerLeftContainer]);
            break;
        case VideoContainerMessagePosition.CENTER_MIDDLE:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._centerMiddleContainer]);
            break;
        case VideoContainerMessagePosition.CENTER_RIGHT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._centerRightContainer]);
            break;
        case VideoContainerMessagePosition.BOTTOM_LEFT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._bottomLeftContainer]);
            break;
        case VideoContainerMessagePosition.BOTTOM_MIDDLE:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._bottomMiddleContainer]);
            break;
        case VideoContainerMessagePosition.BOTTOM_RIGHT:
            createMessageContainer.apply(this, [icon, text, timeout, cssClass, this._bottomRightContainer]);
            break;
        }        
    }
}
