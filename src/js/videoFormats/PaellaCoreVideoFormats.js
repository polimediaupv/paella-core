import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

let g_pluginModule = null;

export default class PaellaCoreVideoFormats extends PluginModule {
    static Get() {
        if (!g_pluginModule) {
            g_pluginModule = new PaellaCoreVideoFormats();
        }
        return g_pluginModule;
    }

    get moduleName() {
        return "paella-core default video formats";
    }

    get moduleVersion() {
        return packageData.version;
    }
}