import CanvasButtonPlugin from "../core/CanvasButtonPlugin";

import TestIcon from "paella-core/icons/screen.svg";

export default class CanvasButtonPluginTest extends CanvasButtonPlugin {
    async load() {
        this.icon = TestIcon;
    }

    async action() {
        alert("Test canvas button");
    }
}