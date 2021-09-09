import Plugin, { loadPluginsOfType } from 'paella-core/js/core/Plugin';

export async function loadCaptionsPlugins(player) {
    const enabledCaptionsPlugins = [];
    await loadPluginsOfType(player, "captions", async (plugin) => {
        enabledCaptionsPlugins.push(plugin);
        const captions = await plugin.getCaptions()
        const captionsCanvas = player.captionsCanvas;
        captions.forEach(async captions => {
            captionsCanvas.addCaptions(captions);
        });
    });

    enabledCaptionsPlugins.forEach(async plugin => {
        const captions = await plugin.getCaptions();
        const captionsCanvas = player.captionsCanvas;
        captions.forEach(c => captionsCanvas.addCaptions(c));
    });
}

export default class CaptionsPlugin extends Plugin {
    get type() { return "captions"; }
    
    async load() {
        this.player.log.debug("load captions plugin");
    }

    async getCaptions() {
        this.player.log.warn(`CaptionsPlugin ${this.name}: getCaptions() is not implemented.`);
        return [];
    }
}
