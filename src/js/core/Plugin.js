import PlayerResource from './PlayerResource';
import pluginRequireContext from '../../../plugin_directories';

export function importPlugins(player,context) {
    const config = player.config;
    context.keys().forEach(key => {
        const module = context(key);
        const PluginClass = module.default;
        const pluginInstance = new PluginClass(player, config, key.substring(2,key.length - 3));

        // A note about not using `instanceof` in this section of code
        // You cannot use `pluginInstance instanceof Plugin` because Babel changes the names of the classes when transpiling,
        // and then this code will stop working when using from the distribution version of paella-core outside this library.
        // This code is not 100% safe if you don't follow the plugin implementation rules,
        // but if the documentation is followed correctly it should work without problems:
        // - Plugins are defined in separate folders.
        // - The folders contain only plugins or module definitions.
        // - In plugins, the `type` attribute of a plugin always has to return a type.
        // - In module definitions, the `moduleName` attribute always has to return something. 
        // - A module definition must never contain an attribute with the name `type`.
        if (pluginInstance.type) {
            const type = pluginInstance.type;
            player.__pluginData__.pluginClasses[key] = PluginClass;
            player.__pluginData__.pluginInstances[type] = player.__pluginData__.pluginInstances[type] || [];
            player.__pluginData__.pluginInstances[type].push(pluginInstance);
        }
        else if (pluginInstance.moduleName) {
            const name = pluginInstance.moduleName;
            const version = pluginInstance.moduleVersion;
            player.log.debug(`Plugin module imported: '${ name }': v${ version }`);
            player.__pluginModules = player.__pluginModules || [];
            player.__pluginModules.push(pluginInstance);
        }
    });
}

export function registerPlugins(player) {
    const config = player.config;
    player.__pluginData__ = player.__pluginData__ || {
        pluginClasses: [],
        pluginInstances: {}
    };

    // If the s_pluginClasses array is not empty, the plugins have already been registered
    if (player.__pluginData__.pluginClasses.length !== 0) return;

    // Import plugins
    pluginRequireContext.forEach(ctx => importPlugins(player, ctx));
    // Custom plugins
    player.initParams.customPluginContext.forEach(ctx => importPlugins(player, ctx));

    player.log.debug("Plugins have been registered:")
}

export function unregisterPlugins(player) {
    delete player.__pluginData__;
}

export function getPluginsOfType(player,type) {
    return player.__pluginData__?.pluginInstances[type];
}

export async function loadPluginsOfType(player,type,onLoad=null,onPreload=null) {
    // Sort plugins
    player.__pluginData__.pluginInstances[type].sort((a,b) => a.order - b.order);
    player.__pluginData__.pluginInstances[type].forEach(p => player.log.debug(`type: ${type}, name: ${p.name}`));

    if (typeof(onPreload) !== "function") {
        onPreload = async function(plugin) {
            return await plugin.isEnabled();
        }
    }

    for (const i in player.__pluginData__.pluginInstances[type]) {
        const plugin = player.__pluginData__.pluginInstances[type][i];
        const enabled = await onPreload(plugin);
        if (enabled) {
            if (plugin.__uiPlugin) {
                const dictionaries = await plugin.getDictionaries();
                if (typeof(dictionaries) === "object") {
                    for (const lang in dictionaries) {
                        const dict = dictionaries[lang];
                        player.addDictionary(lang,dict);
                    }
                }
            }
            
            if (typeof(onLoad) === "function") {
                await onLoad(plugin);
            }
            await plugin.load();
        }
    }
}

export async function unloadPluginsOfType(player,type) {
    player.__pluginData__.pluginInstances[type]?.forEach(async plugin => {
        await plugin.unload();
    })
}

export default class Plugin extends PlayerResource {
    constructor(player,config,name) {
        super(player);
        this._name = name;
        this._config = config.plugins[this.name];
    }

    get config() { return this._config; }

    get type() { return "none"; }

    get order() { return this._config?.order || 0; }
    
    get description() { return this._config?.description || ""; }

    get name() { return this._name; }

    async isEnabled() {
        return this.config?.enabled;
    }

    async load() {

    }

    async unload() {

    }
}