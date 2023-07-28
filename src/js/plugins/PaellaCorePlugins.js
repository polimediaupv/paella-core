import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

let g_pluginModule = null;

export default class PaellaCorePlugins extends PluginModule {
    static Get() {
        if (!g_pluginModule) {
            g_pluginModule = new PaellaCorePlugins();
        }
        return g_pluginModule;
    }

    get moduleName() {
        return "paella-core default plugins";
    }

    get moduleVersion() {
        return packageData.version;
    }
}