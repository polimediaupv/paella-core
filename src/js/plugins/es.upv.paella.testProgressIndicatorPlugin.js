
import ProgressIndicatorPlugin from "../core/ProgressIndicatorPlugin";
import PaellaCorePlugins from "./PaellaCorePlugins";

export default class TestProgressIndicatorPlugin extends ProgressIndicatorPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    get minHeight() {
        return 20;
    }

    get minHeightHover() {
        return 50;
    }

    drawForeground(context, width, height, isHover, scale) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `${12 * scale}px Arial`;
        context.textAlign = "left";
        context.fillText("foreground text", 100 * scale, (height / 2 + 5) * scale);
    }

    drawBackground(context, width, height, isHover, scale) {
        context.fillStyle = "rgba(230, 230, 230)";
        context.font = `${12 * scale}px Arial`;
        context.textAlign = "right";
        context.fillText("background text", (width - 2) * scale, (height / 2 + 5) * scale);
    }
}

