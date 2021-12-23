import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

export default class PaellaCoreDataPlugins extends PluginModule {
    get moduleName() {
        return "paella-core default data plugins";
    }

    get moduleVersion() {
        return packageData.version;
    }
}