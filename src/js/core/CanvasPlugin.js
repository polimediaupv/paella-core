import Plugin, { getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/Plugin';
import { DomClass } from 'paella-core/js/core/dom';
import { createElement, createElementWithHtmlText } from './dom';

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

export const CanvasButtonPosition = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
};

const addButton = function({
    icon,
    tabIndex,
    ariaLabel,
    title,
    className,
    position = CanvasButtonPosition.CENTER,
    click
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
    const btn = createElementWithHtmlText(`
        <button ${attributes}><i class="button-icon" style="pointer-events: none">${ icon }</i></button>
    `);
    this.buttonsArea.appendChild(btn);
    btn.addEventListener('click', (evt) => {
        click(evt);
        evt.stopPropagation();
        return false;
    });
    return btn;
}

export const addVideoCanvasButton = (layoutStructure, canvas, video) => {
    const plugin = layoutStructure.plugin;
    const buttons = plugin.getVideoCanvasButtons(layoutStructure, video.content, video, canvas);
    buttons.forEach(btnData => {
        addButton.apply(canvas, [btnData]);
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
        const canvas = stream?.canvas?.length>0 && stream.canvas[0];
        return canvas === this.canvasType;
    }

    getCanvasInstance(videoContainer) {
        throw Error(`${this.name} canvas plugin: getCanvasInstance() not implemented`);
    }
}
