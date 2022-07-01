
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

    drawForeground(context, width, height, isHover) {

    }

    drawBackground(context, width, height, isHover) {

    }

    requestUpdate() {
        this.player.playbackBar.progressIndicator.requestUpdateCanvas();
    }
}
