import PlayerResource from './PlayerResource';
import pluginRequireContext from '../../../plugin_directories';
import PluginModule from './PluginModule';

export function importPlugins(player,context) {
    const config = player.config;
    context.keys().forEach(key => {
        const module = context(key);
        const PluginClass = module.default;
        const pluginInstance = new PluginClass(player, config, key.substring(2,key.length - 3));
        if (pluginInstance instanceof Plugin) {
            const type = pluginInstance.type;
            player.__pluginData__.pluginClasses[key] = PluginClass;
            player.__pluginData__.pluginInstances[type] = player.__pluginData__.pluginInstances[type] || [];
            player.__pluginData__.pluginInstances[type].push(pluginInstance);
        }
        else if (pluginInstance instanceof PluginModule) {
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

    // Sort the plugins
    for (const type in player.__pluginData__.pluginInstances) {
        player.__pluginData__.pluginInstances[type].sort((a,b) => a.order - b.order);
        player.__pluginData__.pluginInstances[type].forEach(p => player.log.debug(`type: ${type}, name: ${p.name}`));
    }
}

export function unregisterPlugins(player) {
    delete player.__pluginData__;
}

export function getPluginsOfType(player,type) {
    return player.__pluginData__?.pluginInstances[type];
}

export async function loadPluginsOfType(player,type,onLoad=null,onPreload=null) {
    if (typeof(onPreload) !== "function") {
        onPreload = async function(plugin) {
            return await plugin.isEnabled();
        }
    }

    player.__pluginData__.pluginInstances[type]?.forEach(async (plugin) => {
        
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
    })
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