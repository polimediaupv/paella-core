import PlayerResource from './PlayerResource';

export default class Plugin extends PlayerResource {
    constructor(player, name) {
        super(player);
        this._name = name;
    }

    getPluginModuleInstance() {
        return null;
    }

    get config() { return this._config; }

    get type() { return "none"; }

    get order() { return this._config?.order || 0; }
    
    get description() { return this._config?.description || ""; }

    get name() { return this._name; }

    async isEnabled() {
        return this.config?.enabled;
    }

    async load() {

    }

    async unload() {

    }
}