import Plugin, { getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/Plugin';
import { DomClass } from 'paella-core/js/core/dom';

const g_enabledCanvasPlugins = [];
export async function loadCanvasPlugins(player) {
    await loadPluginsOfType(player, "canvas", (plugin) => {
        g_enabledCanvasPlugins.push(plugin);
    });
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

        this._userArea = null;
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
