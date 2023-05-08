import { mergeObjects } from "./utils";
import PlayerState from "./PlayerState";
import { removeFileName } from "./utils";
import { joinPath } from "./utils";

// The following functions should be called only by a paella-core instance
export function overrideSkinConfig(config) {
    if (this._skinData?.configOverrides) {
        mergeObjects(config, this._skinData.configOverrides);
    }
}

export function loadSkinStyleSheets() {
    if (this._skinData?.styleSheets) {
        // TODO: load style sheets
    }
}

export async function loadSkinIcons() {
    if (Array.isArray(this._skinData?.icons)) {
        await Promise.allSettled(this._skinData.icons.map(({ plugin, identifier, icon }) => {
            return new Promise(async resolve => {
                const path = joinPath([this._skinUrl, icon]);
                const req = await fetch(path);
                const iconData = await req.text();
                this.player.addCustomPluginIcon(plugin, identifier, iconData);
                resolve();
            })
        }));
    }
}


export default class Skin {
    constructor(player) {
        this._player = player;
    }

    get player() {
        return this._player;
    }

    async loadSkin(skinUrl) {
        // load skin data from url to this._skinData
        this._skinUrl = removeFileName(skinUrl);
        const req = await fetch(skinUrl);
        if (!req.ok) {
            throw new Error(`Error loading skin from URL ${skinUrl}`);
        }
        this._skinData = await req.json();

        // load stylesheets
        // load icons

        // If the player status is loaded, reload the player
        if (this._player.state === PlayerState.LOADED ||
            this._player.state === PlayerState.MANIFEST)
        {
            this._player.reload();
        }
    }
}