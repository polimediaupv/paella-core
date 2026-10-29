
import PlayerResource from './PlayerResource';

// Elements that can execute scripts or load active/external content. They are
// removed entirely from any HTML string before it is inserted into the DOM.
const FORBIDDEN_ELEMENTS = ['script', 'iframe', 'object', 'embed', 'base', 'meta', 'link'];

// Attributes that can hold a URL. Their value is checked for dangerous protocols.
const URL_ATTRIBUTES = ['href', 'xlink:href', 'src', 'action', 'formaction', 'background', 'poster'];

// Removes whitespace and control/zero-width characters that are commonly inserted
// (e.g. "java\tscript:") to bypass protocol filters. The parser has already decoded
// HTML entities in attribute values, so only literal characters need to be stripped.
// eslint-disable-next-line no-control-regex -- control characters are stripped on purpose to defeat filter-bypass tricks
const stripBlankChars = (value) => value.replace(/[\u0000-\u0020\u00a0\u1680\u2000-\u200f\u2028\u2029\u202f\u205f\u3000\ufeff]/g, '');

// Matches javascript:, vbscript: and data:text/html protocols at the start of a URL.
const DANGEROUS_PROTOCOL = /^(?:javascript:|vbscript:|data:text\/html)/i;

// Sanitizes an HTML string, removing any content that could lead to script
// execution (XSS). Parsing is done inside an inert <template> so that no
// resources are loaded and no event handlers (e.g. img onerror) fire while the
// markup is being cleaned. Returns the cleaned markup as a string.
export function sanitizeHtml(htmlText) {
    if (typeof htmlText !== 'string' || htmlText === '') {
        return '';
    }

    const template = document.createElement('template');
    template.innerHTML = htmlText;

    const walk = (root) => {
        // Iterate over a static copy because we mutate the tree while walking.
        Array.from(root.children).forEach(element => {
            const tagName = element.tagName ? element.tagName.toLowerCase() : '';
            if (FORBIDDEN_ELEMENTS.includes(tagName)) {
                element.remove();
                return;
            }

            // Remove dangerous attributes.
            Array.from(element.attributes).forEach(attr => {
                const name = attr.name.toLowerCase();
                // Inline event handlers (onclick, onerror, onload, ...).
                if (name.startsWith('on')) {
                    element.removeAttribute(attr.name);
                    return;
                }
                // URL attributes pointing to a dangerous protocol.
                if (URL_ATTRIBUTES.includes(name) && DANGEROUS_PROTOCOL.test(stripBlankChars(attr.value))) {
                    element.removeAttribute(attr.name);
                    return;
                }
            });

            walk(element);
        });
    };

    walk(template.content);

    return template.innerHTML;
}

export function createElement({tag='div',attributes={},children="",innerText="",parent=null}) {
    const result = document.createElement(tag);
    result.innerText = innerText;
    for (let key in attributes) {
        result.setAttribute(key, attributes[key]);
    }
    result.innerHTML = sanitizeHtml(children);
    if (parent) {
        parent.appendChild(result);
    }
    return result;
}

export function createElementWithHtmlText(htmlText,parent = null) {
    const tmpElem = document.createElement('div');
    tmpElem.innerHTML = sanitizeHtml(htmlText);
    const result = tmpElem.children[0];
    if (parent && result) {
        parent.appendChild(result);
    }
    return result;
}

export class DomClass extends PlayerResource {
    constructor(player, {tag='div',attributes=[],children="",parent=null}) {
        super(player);
        this._element = createElement({ tag, attributes, children, parent });

        // Add a getter as a shortcut to the DOM element tag
        Object.defineProperty(this, tag, {
            get: () => this._element
        });
    }

    get element() {
        return this._element;
    }

    get parent() {
        return this._element.parentElement;
    }

    hide() {
        this.element.style.display = "none";
    }

    show(showMode = "block") {
        this.element.style.display = showMode;
    }

    get isVisible() {
        const style = window.getComputedStyle(this.element);
        return  style.display !== "none" &&
                style.display !== "";
    }

    setAttribute(name,value) {
        this._element.setAttribute(name,value);
    }

    removeFromParent() {
        this._element.parentElement?.removeChild(this._element);
    }

    setParent(parent) {
        this.removeFromParent();
        parent.appendChild(this._element);
    }
}
