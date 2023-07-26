import pluginRequireContext from '../../../plugin_directories';
import paellaPlugins from '../../../paella_plugins';
import { loadSvgIcon, joinPath } from './utils';
import ButtonGroupPlugin from './ButtonGroupPlugin';
import { mergeObjects } from './utils';

export const createPluginInstance = (PluginClass, player, name, staticConfig = {}) => {
    const instance = new PluginClass(player, name);
    // The name defined by the instance has a higher priority than the name obtained through the file name
    name = instance.name || name;
    if (!name) {
        player.log.warn(`The instance of the ${PluginClass.name} plugin cannot be created because it is being loaded explicitly and does not have the name property implemented.`)
        return null;
    }
    else {
        if (player.config.plugins && player.config.plugins[name]) {
            mergeObjects(staticConfig, player.config.plugins[name]);
        }
        instance._config = staticConfig;
        return instance;
    }
}

function importPlugin(player, pluginClass, pluginInstance, PluginClass, overwrite = false) {
    const type = pluginInstance.type;
    let currentInstance = -1;
    if (player.__pluginData__.pluginInstances[type] &&
        player.__pluginData__.pluginInstances[type].find((registeredPlugin,i) => {
            if (registeredPlugin.name === pluginInstance.name) {
                currentInstance = i;
                return true;
            }
        }) &&
        !overwrite)
    {
        player.log.info(`Plugin ${pluginInstance.name} of type ${type} already registered.`);
        return;        
    }
    player.__pluginData__.pluginClasses[pluginClass] = PluginClass;
    player.__pluginData__.pluginInstances[type] = player.__pluginData__.pluginInstances[type] || [];
    if (currentInstance !== -1) {
        player.__pluginData__.pluginInstances[type].splice(currentInstance, 1);    
    }
    player.__pluginData__.pluginInstances[type].push(pluginInstance);
}

export function importSinglePlugin(player,pluginData) {
    let PluginClass = null;
    let config = { enabled: true };
    if (typeof(pluginData) === "function") {
        PluginClass = pluginData;
    }
    else if (typeof(pluginData) === "object"
        && typeof(pluginData.plugin) === "function")
    {
        PluginClass = pluginData.plugin;
        config = pluginData.config;
    }

    if (!PluginClass) {
        player.log.warn("Error importing plugin with explicit import API. Check the 'plugins' array at init params");
    }
    else {
        const pluginInstance = createPluginInstance(PluginClass, player, null, config);
        if (!pluginInstance) {
            player.log.warn(`Unable to create an instance of the plugin ${PluginClass.name}`);
        }
        else {
            const className = pluginInstance.constructor.name;
            importPlugin(player, className, pluginInstance, PluginClass, true);
        }
    }
}

export function importPlugins(player,context) {
    const config = player.config;
    context.keys().forEach(key => {
        const module = context(key);
        const pluginName = key.substring(2,key.length - 3);
        if (config.plugins[pluginName]) {
            const PluginClass = module.default;
            const pluginInstance = createPluginInstance(PluginClass, player, pluginName, {});
            importPlugin(player, key, pluginInstance, PluginClass, false);
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

    // Single plugin import. The single plugin import API has higher priority than 
    // the pluginContext API. Plugins that have been loaded with this API will not be loaded
    // with the pluginContext API.
    [
        ...paellaPlugins,
        ...player.initParams.plugins
    ].forEach(pluginData => {
            importSinglePlugin(player, pluginData);
        });

    // TODO: pluginContext API will be deprecated soon
    // Import plugins
    pluginRequireContext.forEach(ctx => importPlugins(player, ctx));
    // Custom plugins
    player.initParams.customPluginContext.forEach(ctx => importPlugins(player, ctx));

    // Button Groups
    const { buttonGroups } = config;
    if (buttonGroups) {
        buttonGroups.forEach((btnData,i) => {
            // Create a instance of ButtonPlugin
            const name = `button_group_${i}`;
            const instance = createPluginInstance(ButtonGroupPlugin, player, name, btnData);
            instance._iconPath = joinPath([player.configResourcesUrl, btnData.icon]);
            importPlugin(player, instance.type, instance, `ButtonGroupPlugin${i}`, false);
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
