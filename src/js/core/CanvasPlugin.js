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

export class Canvas extends DomClass {
    constructor(tag, player, parent) {
        super(player, { tag, parent });
        this.element.className = "video-canvas";

        this._userArea = null;

        this._buttonsArea = createElementWithHtmlText(`
        <div class="button-area">
        </div>
        `, this.element);

        // TODO: Test code, remove
        const btn1 = createElementWithHtmlText(`
        <button  class="align-left">test L</button>
        `, this._buttonsArea);
        const btn2 = createElementWithHtmlText(`
        <button  class="align-center">test C</button>
        `, this._buttonsArea);
        const btn3 = createElementWithHtmlText(`
        <button class="align-right">test R</button>
        `, this._buttonsArea);
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
