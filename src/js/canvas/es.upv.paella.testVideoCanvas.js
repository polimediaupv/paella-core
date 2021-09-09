import CanvasPlugin, { Canvas } from 'paella-core/js/core/CanvasPlugin';

export class TestVideoCanvas extends Canvas {
    constructor(player, videoContainer) {
        super('div', player, videoContainer);
    }

    async loadCanvas(player) {
        const parent = this.parent;
        // Test zoom
        player.element.style.width = "200%";
        player.element.style.height = "200%";
        player.element.style.top = "-25%";
        player.element.style.left = "-25%";
        player.element.style.position = "absolute";

        this.element.style.overflow = "hidden";
        this.element.style.position = "relative";

        this.player.log.debug("test video canvas");
    }
}

export default class TestVideoCanvasPlugin extends CanvasPlugin {
    get canvasType() { return "video"; }

    async isEnabled() {
        this.player.log.debug("TestVideoCanvasPlugin");
        return super.isEnabled();
    } 
    isCompatible(stream) {
        if (!Array.isArray(stream.canvas) || stream.canvas.length === 0) {
            return true;
        }

        return super.isCompatible(stresm);
    }

    getCanvasInstance(videoContainer) {
        return new TestVideoCanvas(this.player, videoContainer);
    }
}