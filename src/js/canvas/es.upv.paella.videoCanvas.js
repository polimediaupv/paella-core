import CanvasPlugin, { Canvas } from 'paella-core/js/core/CanvasPlugin';

export class VideoCanvas extends Canvas {
    constructor(player, videoContainer) {
        super('div', player, videoContainer);
    }

    async loadCanvas(player) {
        player.element.style.width = "100%";
        player.element.style.height = "100%";
    }
}

export default class VideoCanvasPlugin extends CanvasPlugin {
    get canvasType() { return "video"; }

    isCompatible(stream) {
        if (!Array.isArray(stream.canvas) || stream.canvas.length === 0) {
            // By default, the default canvas is HTML video canvas
            return true;
        }
        
        return super.isCompatible(stream);
    }

    getCanvasInstance(videoContainer) {
        return new VideoCanvas(this.player, videoContainer);
    }
}
