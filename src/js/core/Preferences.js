
import PlayerResource from "./PlayerResource";
import { setCookieIfAllowed, getCookie } from "./utils";

const g_defaultPreferences = '{ "global": {}, "videos": {} }';

async function load() {
    switch (this.source.name) {
    case "cookie":
        try {
            return JSON.parse(getCookie("preferences"));
        }
        catch (err) {
            return JSON.parse(g_defaultPreferences);
        }
    case "dataPlugin":
        break;
    }
}

async function save(data) {
    switch (this.source.name) {
    case "cookie":
        setCookieIfAllowed(this.player, this.source.consentType, "preferences", JSON.stringify(data));
        break;
    case "dataPlugin":
        break;
    }
}

export default class Preferences extends PlayerResource {
    constructor(player) {
        super(player);
        const { currentSource, sources } = player.config.preferences || {
            currentSource: "cookie",
            sources: {
                cookie: {
                    consentType: "necessary"
                }
            }
        };
        this.source = sources[currentSource];
        this.source.name = currentSource;
        this._loaded = false;

        if (!this.source) {
            throw Error("Invalid configuration in preferences. Check the configuration file.");
        }
    }

    async set(key, value, global = false) {
        const data = await load.apply(this);
        if (global) {
            data.global[key] = value; 
        }
        else {
            data.videos[this.player.videoId] = data.videos[this.player.videoId] || {};
            data.videos[this.player.videoId][key] = value;
        }
        await save.apply(this, [data]);
    }

    async get(key, global = false) {
        const data = await load.apply(this);
        if (global) {
            return data.global[key];
        }
        else {
            return data.videos[this.player.videoId][key];
        }
    }
}