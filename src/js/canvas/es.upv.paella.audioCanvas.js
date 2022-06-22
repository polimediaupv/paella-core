import CanvasPlugin, { Canvas } from '../core/CanvasPlugin';

export class AudioCanvas extends Canvas {
    constructor(player, videoContainer) {
        super('div', player, videoContainer);
        this.element.classList.add("image-canvas");
    }

    async loadCanvas(player) {
        player.element.style.width = "100%";
        player.element.style.height= "100%";
    }
}

export default class AudioCanvasPlugin extends CanvasPlugin {
    get canvasType() { return 'audio'; }

    getCanvasInstance(videoContainer) {
        return new AudioCanvas(this.player, videoContainer);
    }
}
