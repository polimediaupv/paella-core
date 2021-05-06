import Plugin, { loadPluginsOfType } from 'paella-core/js/core/Plugin';
import PlayerResource from 'paella-core/js/core/PlayerResource';

export class DataPlugin extends Plugin {
    get type() { return "data"; }

    get context() { return this.config.context || []; }

    async read(/* key */) {
        throw Error(`DataPlugin.read() not implemented in data plugin '${this.name}'`);
    }

    async write(/* key, data */) {
        throw Error(`DataPlugin.write() not implemented in data plugin '${this.name}'`);
    }

    async remove(/* key */) {
        throw Error(`DataPlugin.remove() not implemented in data plugin '${this.name}'`);
    }
}

export default class Data extends PlayerResource {
    constructor(player) {
        super(player);

        this._dataPlugins = {}

        loadPluginsOfType(this.player, "data", (plugin) => {
            plugin.context?.forEach(ctx => {
                this._dataPlugins[ctx] = this._dataPlugins[ctx] || [];
                this._dataPlugins[ctx] = plugin;
            });
        })
    }

    getDataPlugin(context) {
        const plugin =  this._dataPlugins[context] &&
                        this._dataPlugins[context].length > 0 &&
                        this._dataPlugins[context][0];
        if (!plugin) {
            throw Error(`No data plugin found for context '${context}'`);
        }
    }

    async read(context, key) {
        const p = this.getDataPlugin(context);
        const result = await p.read(key);
        return result;
    }

    async write(context, key, data) {
        const p = this.getDataPlugin(context);
        const result = await p.write(key, data);
        return result;
    }

    async remove(context, key) {
        const p = this.getDataPlugin(context);
        const result = await p.remove(key);
        return result;
    }
}

