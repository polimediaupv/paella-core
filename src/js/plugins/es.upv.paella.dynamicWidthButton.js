import ButtonPlugin from "../core/ButtonPlugin";
import PaellaCorePlugins from "./PaellaCorePlugins";

import testIcon from 'paella-core/icons/screen.svg';

export default class DynamicWidthButtonTest extends ButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async load() {
        this.icon = testIcon;
        this.title = "Dynamic width button";
    }

    get dynamicWidth() {
        return true;
    }

    async action() {
        if (!this.player.isFullscreen) {
            await this.player.enterFullscreen();
        }
        else {
            await this.player.exitFullscreen();
        }
    }
}