import Plugin, { loadPluginsOfType } from 'paella-core/js/core/Plugin';

export async function loadCaptionsPlugins(player) {
    const enabledCaptionsPlugins = [];
    await loadPluginsOfType(player, "captions", async (plugin) => {
        enabledCaptionsPlugins.push(plugin);
        const captions = await plugin.getCaptions()
        captions.forEach(captions => {
            player.captionsCanvas.addCaptions(captions);
        });
    });

    enabledCaptionsPlugins.forEach(async plugin => {
        const captions = await plugin.getCaptions();
        captions.forEach(c => player.captionsCanvas.addCaptions(c));
    });
}

export default class CaptionsPlugin extends Plugin {
    get type() { return "captions"; }
    
    async load() {
        console.log("load captions plugin");
    }

    async getCaptions() {
        console.warn(`CaptionsPlugin ${this.name}: getCaptions() is not implemented.`);
        return [];
    }
}
