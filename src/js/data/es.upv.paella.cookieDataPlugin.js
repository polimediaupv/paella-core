import { DataPlugin } from 'paella-core/js/core/Data';

import { setCookie, getCookie } from 'paella-core/js/core/utils';

export default class CookieDataPlugin extends DataPlugin {
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
            value = unescape(value);
            value = JSON.parse(value);
        }
        catch (e) {}
        console.debug(`CookieDataPlugin.read: ${key}`);
        return value;
    }

    async write(context, keyParams, data) {
        const key = this.serializeKey(context, keyParams);
        if (typeof(data) === "object") {
            data = JSON.stringify(data);
        }
        data = escape(data);
        setCookie(key, data);
        console.debug(`CookieDataPlugin.write: ${key}`);
    }

    async remove(context, keyParams) {
        const key = this.serializeKey(context, keyParams);
        setCookie(key, "");
        console.debug(`CookieDataPlugin.remove: ${key}`);
    }
};
