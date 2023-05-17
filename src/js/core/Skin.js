import { mergeObjects, unloadStyle } from "./utils";
import PlayerState from "./PlayerState";
import { removeFileName } from "./utils";
import { joinPath } from "./utils";
import { loadStyle } from "./utils";

// The following functions should be called only by a paella-core instance
export function overrideSkinConfig(config) {
    if (this._skinData?.configOverrides) {
        mergeObjects(config, this._skinData.configOverrides);
    }
}

async function checkLoadSkinStyleSheets() {
    if (this._skinData?.styleSheets) {
        const p = [];
        this._skinData.styleSheets.forEach(css => {
            if (/\{.*/.test(css)) {
            }
            else if (this._externalResourcesAllowed) {
                const cssPath = joinPath([this._skinUrl, css]);
                p.push(new Promise(async resolve => {
                    await loadStyle(cssPath, false);
                    resolve();
                }));
            }
            else {
                throw new Error("No external resources allowed loading skin object");
            }
        });
        await Promise.allSettled(p);
    }
}

export async function loadSkinStyleSheets() {
    this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [];
    if (this._skinData?.styleSheets) {
        const p = [];
        this._skinData.styleSheets.forEach(css => {
            if (/\{.*/.test(css)) {
                p.push(new Promise(resolve => {
                    const style = document.createElement('style');
                    style.innerHTML = css;
                    this.player.__skinStyleSheets__.push(style);
                    document.head.appendChild(style);
                    resolve();
                }))
            }
            else {
                const cssPath = joinPath([this._skinUrl, css]);
                p.push(new Promise(async resolve => {
                    const link = await loadStyle(cssPath);
                    this.player.__skinStyleSheets__.push(link);
                    resolve();
                }))
            }
        });
        await Promise.allSettled(p);
    }
}

export function unloadSkinStyleSheets() {
    this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [];
    this.player.__skinStyleSheets__.forEach(link => {
        unloadStyle(link);
    });
    this.player.__skinStyleSheets__ = [];
}

export async function checkLoadSkinIcons() {
    if (Array.isArray(this._skinData?.icons)) {
        await Promise.all(this._skinData.icons.map(({ plugin, identifier, icon }) => {
            return new Promise(async (resolve,reject) => {
                const div = document.createElement('div');
                div.innerHTML = icon;
                if (div.children[0] && div.children[0].tagName === 'svg') {
                    // Embedded icon     
                }
                else if (this._externalResourcesAllowed) {
                    const iconFullUrl = joinPath([this._skinUrl, icon]);
                    const req = await fetch(iconFullUrl);
                    if (req.ok) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Skin icon not found at URL '${ iconFullUrl }'`));
                    }
                }
                else {
                    throw new Error("No external resources allowed loading skin object");
                }
            })
        }))
    }
}

export async function loadSkinIcons() {
    if (Array.isArray(this._skinData?.icons)) {
        await Promise.all(this._skinData.icons.map(({ plugin, identifier, icon }) => {
            return new Promise(async (resolve,reject) => {
                const div = document.createElement('div');
                div.innerHTML = icon;
                if (div.children[0] && div.children[0].tagName === 'svg') {
                    this.player.addCustomPluginIcon(plugin, identifier, icon);
                    resolve();
                }
                else {
                    const iconFullUrl = joinPath([this._skinUrl, icon]);
                    const req = await fetch(iconFullUrl);
                    if (req.ok) {
                        const iconData = await req.text();
                        this.player.addCustomPluginIcon(plugin, identifier, iconData);
                        resolve();
                    }
                    else {
                        reject(new Error(`Skin icon not found at URL '${ iconFullUrl }'`));
                    }
                }
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

    async loadSkin(skinParam) {
        if (typeof(skinParam) === "string") {
            // load skin data from url to this._skinData
            this._skinUrl = removeFileName(skinParam);
            this._externalResourcesAllowed = true;
            const req = await fetch(skinParam);
            if (!req.ok) {
                throw new Error(`Error loading skin from URL ${skinParam}`);
            }
            this._skinData = await req.json();
        }
        else if (typeof(skinParam) === "object") {
            this._skinUrl = "";
            this._externalResourcesAllowed = false;
            this._skinData = skinParam;
        }

        try {
            // check skinData object
            await checkLoadSkinStyleSheets.apply(this);
            await checkLoadSkinIcons.apply(this);
            
            // If the player status is loaded, reload the player
            if (this._player.state === PlayerState.LOADED ||
                this._player.state === PlayerState.MANIFEST)
            {
                this._player.reload();
            }
        }
        catch (err) {
            this._skinUrl = "";
            this._externalResourcesAllowed = true;
            this._skinData = {};
            throw err;
        }
    }

    unloadSkin() {
        // Unload custom icons
        if (Array.isArray(this._skinData?.icons)) {
            this._skinData?.icons.forEach(({ plugin, identifier }) => {
                this.player.removeCustomPluginIcon(plugin, identifier);
            });
        }

        this._skinUrl = null;
        this._skinData = {};

        if (this._player.state === PlayerState.LOADED ||
            this._player.state === PlayerState.MANIFEST)
        {
            this._player.reload();
        }
    }
}