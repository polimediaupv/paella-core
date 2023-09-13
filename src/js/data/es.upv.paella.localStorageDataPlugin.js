import { DataPlugin } from 'paella-core/js/core/Data';

import PaellaCoreDataPlugins from './PaellaCoreDataPlugins';

export default class LocalStorageDataPlugin extends DataPlugin {
    getPluginModuleInstance() {
        return PaellaCoreDataPlugins.Get();
    }

    get name() {
        return super.name || "es.upv.paella.localStorageDataPlugin";
    }
    
    serializeKey(context,params) {
        if (typeof(params) === "object") {
            params = JSON.stringify(params);
        }
        return `${context}|${params}`;
    }

    async read(context, keyParams) {
        const key = this.serializeKey(context, keyParams);
        let value = localStorage.getItem(key);
        try {
            value = JSON.parse(value);
        }
        catch (e) {}
        this.player.log.debug(`LocalStorageDataPlugin.read: ${key}`);
        return value;
    }

    async write(context, keyParams, data) {
        const key = this.serializeKey(context, keyParams);
        if (data && typeof(data) === "object") {
            try {
                data = JSON.stringify(data);
            }
            catch (e) {
                this.player.log.warn(`LocalStorageDataPlugin.write: ${key}: invalid data object.`);
                data = "";
            }
        }
        localStorage.setItem(key, data);
        this.player.log.debug(`LocalStorageDataPlugin.write: ${key}`);
    }

    async remove(context, keyParams) {
        const key = this.serializeKey(context, keyParams);
        localStorage.setItem(key, "");
        this.player.log.debug(`LocalStorageDataPlugin.remove: ${key}`);
    }
}
