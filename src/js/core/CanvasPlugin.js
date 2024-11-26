import Plugin from 'paella-core/js/core/Plugin';
import { getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/plugin_tools';
import { DomClass } from 'paella-core/js/core/dom';
import { createElement, createElementWithHtmlText } from './dom';
import { getCanvasButtons } from './CanvasButtonPlugin';

import "../../css/VideoCanvas.css";

const g_enabledCanvasPlugins = [];
export async function loadCanvasPlugins(player) {
    await loadPluginsOfType(player, "canvas", (plugin) => {
        g_enabledCanvasPlugins.push(plugin);
    });
}

export async function unloadCanvasPlugins(player) {
    g_enabledCanvasPlugins.slice(0);
}

export function getCanvasPlugin(player, stream) {
    if (g_enabledCanvasPlugins.length === 0) {
        throw Error("No canvas plugins loaded. Note that `loadCanvasPlugins()` must to be called before use `getCanvasPlugins()`");
    }
    let plugin = null;

    g_enabledCanvasPlugins.some(p => {
        if (p.isCompatible(stream)) {
            plugin = p;
            return true;
        }
    });

    return plugin;
}

export const CanvasButtonPosition = Object.freeze({
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
});

const addButton = function({
    icon,
    tabIndex,
    ariaLabel,
    title,
    className,
    position = CanvasButtonPosition.CENTER,
    click,
    content,
    name
}) {
    if (!icon) {
        throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'icon' attribute.");
    }
    if (!click) {
        throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'click' function.");
    }
    let attributes = `class="align-${position}${ className ? " " + className : ""}"`;
    if (ariaLabel) {
        attributes += ` aria-label="${ariaLabel}"`;
    }
    if (title) {
        attributes += ` title="${title}"`;
    }
    if (tabIndex !== undefined) {
        attributes += ` tabindex="${tabIndex}"`;
    }
    if (name !== undefined) {
        attributes += ` name="${name}"`;
    }
    const btn = createElementWithHtmlText(`
        <button ${attributes}><i class="button-icon" style="pointer-events: none">${ icon }</i></button>
    `);
    this.buttonsArea.appendChild(btn);
    btn.addEventListener('click', async (evt) => {
        evt.stopPropagation();
        await click(content);

        // We remove the focus on the button click event, because otherwise the user
        // interface will never be hidden.
        // We use pageX and pageY to differentiate the origin of the click: if it was produced
        // by a keyboard action, then we do not remove the focus so as not to hinder accessibility.
        if (evt.pageX !== 0 && evt.pageY !== 0) {
            document.activeElement.blur();
        }
        
        return false;
    });
    return btn;
}

export const addVideoCanvasButton = async (player, layoutStructure, canvas, video, content) => {
    const plugin = layoutStructure.plugin;
    let tabIndexStart = plugin.tabIndexStart;
    const externalButtons = await getCanvasButtons(player, video);
    const buttonElements = [];
    const buttons = [...externalButtons,
        ...plugin.getVideoCanvasButtons(layoutStructure, video.content, video, canvas)];
    buttons.forEach(btnData => {
        btnData.tabIndex = tabIndexStart++;
        btnData.content = content;
        const btn = addButton.apply(canvas, [btnData]);
        buttonElements.push(btn);
    });
    
    return buttonElements;
}

export const setTabIndex = (player, layoutStructure, buttons) => {
    let { tabIndexStart } = layoutStructure.plugin;
    buttons.sort((b1,b2) => {
        const b1Left = b1.getBoundingClientRect().left;
        const b2Left = b2.getBoundingClientRect().left;
        return b1Left - b2Left;
    }).forEach(btn => {
        btn.setAttribute("tabindex",tabIndexStart++);
    })
}

export class Canvas extends DomClass {
    constructor(tag, player, parent) {
        super(player, { tag, parent });
        this.element.className = "video-canvas";

        this._userArea = null;

        this._buttonsArea = createElementWithHtmlText(`
        <div class="button-area">
        </div>
        `, this.element);
    }

    async loadCanvas(player) {
        throw Error(`${this.name}: loadCanvas() not implemented`);
    }

    get userArea() {
        if (!this._userArea) {
            this._userArea = document.createElement('div');
            this._userArea.className = "user-area";
            this.element.appendChild(this._userArea);
        }
        return this._userArea;
    }

    get buttonsArea() {
        return this._buttonsArea;
    }

    showButtons() {
        this.buttonsArea.style.display = null;
    }

    hideButtons() {
        this.buttonsArea.style.display = "none";
    }
}

export default class CanvasPlugin extends Plugin {
    get type() { return "canvas"; }

    get canvasType() { return ""; }

    isCompatible(stream) {
        if (Array.isArray(stream?.canvas)) {
            return stream.canvas.indexOf(this.canvasType) !== -1;
        }
        else {
            return stream.canvas === this.canvasType;
        }
    }

    getCanvasInstance(videoContainer) {
        throw Error(`${this.name} canvas plugin: getCanvasInstance() not implemented`);
    }
}
