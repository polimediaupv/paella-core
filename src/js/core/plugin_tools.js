import pluginRequireContext from '../../../plugin_directories';

import ButtonGroupPlugin from './ButtonGroupPlugin';

function importPlugin(player, pluginClass, pluginInstance, PluginClass) {
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
        player.__pluginData__.pluginClasses[pluginClass] = PluginClass;
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
}

export function importPlugins(player,context) {
    const config = player.config;
    context.keys().forEach(key => {
        const module = context(key);
        const PluginClass = module.default;
        const pluginInstance = new PluginClass(player, config, key.substring(2,key.length - 3));
        importPlugin(player, key, pluginInstance, PluginClass);
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
    // TODO: create button group instances
    const { buttonGroups } = config;
    // For each button group in config
    
    if (buttonGroups) {
        buttonGroups.forEach((btnData,i) => {
            //      Create a instance of ButtonPlugin
            const name = `button_group_${i}`;
            const buttonGroupConfig = { plugins:{} };
            buttonGroupConfig.plugins[name] = btnData;
            const instance = new ButtonGroupPlugin(player, buttonGroupConfig, name);
            console.log(instance);
            //      Configure the button icon: import the svg file and extract as HTML
            //console.log(buttonGroupConfig)
            importPlugin(player, instance.type, instance, `ButtonGroupPlugin${i}`);
        }) 
        //      Add the plugin with importPlugin function. The PluginClass must be unqiue: ButtonGroupPlugin1, ButtonGroupPlugin2...
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
