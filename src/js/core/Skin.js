import { mergeObjects } from "./utils";
import PlayerState from "./PlayerState";

export default class Skin {
    constructor(player) {
        this._player = player;
    }

    get player() {
        return this._player;
    }

    async loadSkin(skinUrl) {
        // TODO:
        // load skin data from url to this._skinData
        // load configuration overrides
        // load stylesheets
        // load icons

        // If the player status is loaded, reload the player
        if (this._player.state === PlayerState.LOADED) {
            this._player.reload();
        }
    }

    // This function is called from player instance to override the
    // default configuration options
    overrideConfig(config) {
        if (this._skinData?.configOverrides) {
            mergeObjects(config, this._skinData.configOverrides);
        }
    }
}