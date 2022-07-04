
import ProgressIndicatorPlugin from "../core/ProgressIndicatorPlugin";

export default class TestProgressIndicatorPlugin extends ProgressIndicatorPlugin {
    get minHeight() {
        return 0;
    }

    get minHeightHover() {
        return 50;
    }

    drawForeground(context, width, height, isHover) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `12px Arial`;
        context.textAlign = "left";
        context.fillText("foreground text", 100, 10);
    }

    drawBackground(context, width, height, isHover) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `12px Arial`;
        context.textAlign = "right";
        context.fillText("background text", width - 2, 10);
    }
}

