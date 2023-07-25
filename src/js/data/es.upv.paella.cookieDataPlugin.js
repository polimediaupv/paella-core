import { DataPlugin } from 'paella-core/js/core/Data';

import { setCookie, getCookie } from 'paella-core/js/core/utils';

export default class CookieDataPlugin extends DataPlugin {
    get name() {
        return super.name || "es.upv.paella.cookieDataPlugin";
    }
    
    serializeKey(context,params) {
        if (typeof(params) === "object") {
            params = JSON.stringify(params);
        }
        return `${context}|${params}`;
    }

    async read(context, keyParams) {
        const key = this.serializeKey(context, keyParams);
        let value = getCookie(key);
        try {
            value = JSON.parse(value);
        }
        catch (e) {}
        this.player.log.debug(`CookieDataPlugin.read: ${key}`);
        return value;
    }

    async write(context, keyParams, data) {
        const key = this.serializeKey(context, keyParams);
        if (data && typeof(data) === "object") {
            try {
                data = JSON.stringify(data);
            }
            catch (e) {
                this.player.log.warn(`CookieDataPlugin.write: ${key}: invalid data object.`);
                data = "";
            }
        }
        setCookie(key, data);
        this.player.log.debug(`CookieDataPlugin.write: ${key}`);
    }

    async remove(context, keyParams) {
        const key = this.serializeKey(context, keyParams);
        setCookie(key, "");
        this.player.log.debug(`CookieDataPlugin.remove: ${key}`);
    }
}
