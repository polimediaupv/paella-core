
import PlayerResource from "./PlayerResource";

export default class PluginModule extends PlayerResource {
    get moduleName() {
        this.player.log.warn(`Incomplete player module definition: '${ __filename }.moduleName'`);
        return "-";
    }

    get moduleVersion() {
        this.player.log.warn(`Incomplete player module definition: '${ __filename }.moduleVersion'`);
        return "0.0.0";
    }
}
