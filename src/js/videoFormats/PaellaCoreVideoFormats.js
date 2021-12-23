import PluginModule from "../core/PluginModule";
import packageData from "../../../package.json";

export default class PaellaCoreVideoFormats extends PluginModule {
    get moduleName() {
        return "paella-core default video formats";
    }

    get moduleVersion() {
        return packageData.version;
    }
}