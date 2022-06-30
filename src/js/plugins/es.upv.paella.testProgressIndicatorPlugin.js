
import ProgressIndicatorPlugin from "../core/ProgressIndicatorPlugin";

export default class TestProgressIndicatorPlugin extends ProgressIndicatorPlugin {
    get minHeight() {
        return 50;
    }

    get minHeightHover() {
        return 70;
    }

    drawForeground(context, width, height) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `${height}px Arial`;
        context.textAlign = "left";
        context.fillText("foreground text", 2, height);
    }

    drawBackground(context, width, height) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `${height}px Arial`;
        context.textAlign = "right";
        context.fillText("background text", width - 2, height);
    }
}

