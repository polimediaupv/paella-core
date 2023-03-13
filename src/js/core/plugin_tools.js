import pluginRequireContext from '../../../plugin_directories';
import { loadSvgIcon, joinPath } from './utils';
import ButtonGroupPlugin from './ButtonGroupPlugin';

function importPlugin(player, pluginClass, pluginInstance, PluginClass) {
    const type = pluginInstance.type;
    player.__pluginData__.pluginClasses[pluginClass] = PluginClass;
    player.__pluginData__.pluginInstances[type] = player.__pluginData__.pluginInstances[type] || [];
    player.__pluginData__.pluginInstances[type].push(pluginInstance);
}

export function importPlugins(player,context) {
    const config = player.config;
    context.keys().forEach(key => {
        const module = context(key);
        const pluginName = key.substring(2,key.length - 3);
        if (config.plugins[pluginName]) {
            const PluginClass = module.default;
            const pluginInstance = new PluginClass(player, config, pluginName);
            importPlugin(player, key, pluginInstance, PluginClass);
        }
        // Check if it is a plugin module
        else if (/^[a-z0-9]+$/i.test(pluginName)) {
            const ModuleClass = module.default;
            const moduleInstance = new ModuleClass(player);
            const name = moduleInstance.moduleName;
            const version = moduleInstance.moduleVersion;
            player.log.debug(`Plugin module imported: ${ name }: v${ version }`);
            player.__pluginModules = player.__pluginModules || [];
            player.__pluginModules.push(moduleInstance);
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

    // Button Groups
    const { buttonGroups } = config;
    if (buttonGroups) {
        buttonGroups.forEach((btnData,i) => {
            //      Create a instance of ButtonPlugin
            const name = `button_group_${i}`;
            const buttonGroupConfig = { plugins:{} };
            buttonGroupConfig.plugins[name] = btnData;
            const instance = new ButtonGroupPlugin(player, buttonGroupConfig, name);
            instance._iconPath = joinPath([player.configResourcesUrl, btnData.icon]);
            importPlugin(player, instance.type, instance, `ButtonGroupPlugin${i}`);
        }) 
    }

    player.log.debug("Plugins have been registered:")
}

export function unregisterPlugins(player) {
    delete player.__pluginData__;
}

export function getPluginsOfType(player,type) {
    return player.__pluginData__?.pluginInstances[type] || [];
}

export async function loadPluginsOfType(player,type,onLoad=null,onPreload=null) {
    if (!player.__pluginData__.pluginInstances[type]) {
        player.log.info(`There are no defined plugins of type '${type}'`);
        return;
    }
    
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
