import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

export default class PaellaCorePlugins extends PluginModule {
    get moduleName() {
        return "paella-core default plugins";
    }

    get moduleVersion() {
        return packageData.version;
    }
}