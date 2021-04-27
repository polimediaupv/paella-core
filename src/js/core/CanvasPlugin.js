import Plugin, { getPluginsOfType } from 'paella-core/js/core/Plugin';
import { DomClass } from 'paella-core/js/core/dom';

export function getCanvasPlugin(player, stream) {
    let plugin = null;

    getPluginsOfType(player, "canvas").some(p => {
        if (p.isCompatible(stream)) {
            plugin = p;
            return true;
        }
    });

    return plugin;
}

export class Canvas extends DomClass {
    constructor(tag, player, parent) {
        super(player, { parent });
    }

    async loadCanvas(player) {
        throw Error(`${this.name}: loadCanvas() not implemented`);
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
