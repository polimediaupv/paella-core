import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

let g_pluginModule = null;

export default class PaellaCoreLayouts extends PluginModule {
    static Get() {
        if (!g_pluginModule) {
            g_pluginModule = new PaellaCoreLayouts();
        }
        return g_pluginModule;
    }
    
    get moduleName() {
        return "paella-core default video layouts";
    }

    get moduleVersion() {
        return packageData.version;
    }
}