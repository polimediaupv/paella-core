import { getNextTabIndex } from "./ButtonPlugin";
import UserInterfacePlugin from "./UserInterfacePlugin";
import { CanvasButtonPosition } from "./CanvasPlugin";
import { loadPluginsOfType } from "./Plugin";

export function getCanvasButtonPlugin(plugin) {
    return {
        icon: plugin.icon,
        position: plugin.position,
        title: plugin.description,
        ariaLabel: plugin.ariaLabel,
        click: async () => {
            await plugin.action();
        }
    }
}

export async function getCanvasButtons(player, video) {
    const result = [];
    await loadPluginsOfType(player, "canvasButton",
        async (plugin) => {
            player.log.debug(` Canvas button plugin: ${ plugin.name }`);
            result.push(plugin);
        });

    return result.filter(plugin => {
            // TODO: check if this is working
            return plugin.content.indexOf(video.content) !== -1;
        })
        .map(plugin => {
            return getCanvasButtonPlugin(plugin);
        })
}


export default class CanvasButtonPlugin extends UserInterfacePlugin {
    get type() { return "canvasButton" }

    get content() {
        return this._config.content || ["presenter"];
    }

    get ariaLabel() {
        return this._config.ariaLabel || this.getAriaLabel();
    }

    getAriaLabel() {
        return "";
    }

    get tabIndex() {
        return this.config.tabIndex || this.getTabIndex();
    }

    getTabIndex() {
        return getNextTabIndex(this.player);
    }

    get description() {
        return this.config.description || this.getDescription();
    }

    getDescription() {
        return "";
    }

    get icon() {
        return this._icon;
    }

    set icon(icon) {
        this._icon = icon;
    }

    get side() {
        return this.config?.side || "left";
    }

    get position() {
        switch (this.side) {
        case 'left':
            return CanvasButtonPosition.LEFT;
        case 'center':
            return CanvasButtonPosition.CENTER;
        case 'right':
            return CanvasButtonPosition.RIGHT;
        default:
            throw new Error(`Invalid CanvasButtonPlugin side set: ${ this.side }`);
        }
    }

    async action() {
        this.player.log.warn(`Action not implemented in canvas button plugin ${ this.name }`);
    }
}