import Plugin from '../core/Plugin';
import { bindEvent } from '../core/Events';

import { loadPluginsOfType } from '../core/Plugin';

export async function loadLogEventPlugins(player) {
    await loadPluginsOfType(player, "eventLog", async (plugin) => {
        plugin.events.forEach(event => {
            bindEvent(player, event, async (params) => {
                await plugin.onEvent(event, params);
            })
        })
    });
}

export async function unloadLogEventPlugins(player) {
    console.warn("unloadLogEventPlugins: not implemented");
}

export default class EventLogPlugin extends Plugin {
    get type() { return "eventLog"; }

    get events() {
        return [];
    }

    async onEvent(event, params) {
        console.warn(`${this.name}: onEvent() function is not overwritten.`)
    }
}
