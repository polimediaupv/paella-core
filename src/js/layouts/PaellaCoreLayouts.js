import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

export default class PaellaCoreLayouts extends PluginModule {
    get moduleName() {
        return "paella-core default video layouts";
    }

    get moduleVersion() {
        return packageData.version;
    }
}