
import Plugin from "./Plugin";

export default class ProgressIndicatorPlugin extends Plugin {
    get type() {
        return "progressIndicator";
    }

    get minHeight() {
        return 0;
    }

    get minHeightHover() {
        return 0;
    }

    drawForeground(context, width, height) {

    }

    drawBackground(context, width, height) {
        
    }

    requestUpdate() {
        this.player.playbackBar.progressIndicator.requestUpdateCanvas();
    }
}
