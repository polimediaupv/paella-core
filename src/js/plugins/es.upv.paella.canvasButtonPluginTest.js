import CanvasButtonPlugin from "../core/CanvasButtonPlugin";

import TestIcon from "paella-core/icons/screen.svg";

export default class CanvasButtonPluginTest extends CanvasButtonPlugin {
    get name() {
		return super.name || "es.upv.paella.canvasButtonPluginTest";
	}

    get name() {
        return super.name || "es.upv.paella.canvasButtonPluginTest";
    }
    
    async load() {
        this.icon = TestIcon;
    }

    async action(content, videoPlayer, videoCanvas, canvasPlugin) {
        console.log(`Content: ${ content }`);
        console.log(videoPlayer);
        console.log(videoCanvas);
        console.log(canvasPlugin);
        //this.player.playbackBar.enabled = !this.player.playbackBar.enabled;
    }
}