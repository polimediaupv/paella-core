
import Events, { triggerEvent } from "./Events";

export const defaultGetCookieConsentCallback = (type) => {
    return false;
}

export const defaultGetCookieDescriptionCallback = (cookieObject) => {
    return cookieObject.description;
}

export default class CookieConsent {
    constructor(player,initCallbacks) {
        this._player = player;

        this._cookieConsentData = player.config.cookieConsent || [];

        this._getConsentCallback = initCallbacks.getConsent || defaultGetCookieConsentCallback;
        this._getDescriptionCallback = initCallbacks.getDescription || defaultGetCookieDescriptionCallback;

        this._cookieConsentData.forEach(consentObject => {
            consentObject.description = this._getDescriptionCallback(consentObject);
        });

        this.updateConsentData();
    }

    updateConsentData() {
        this._cookieConsentData.forEach(consentElement => {
            consentElement.value = this._getConsentCallback(consentElement.type) || consentElement.required;
        });
        triggerEvent(this._player, Events.COOKIE_CONSENT_CHANGED, { cookieConsent: this } );
    }

    getConsentForType(type) {
        const object = this._cookieConsentData.find(c => c.type === type);
        return object?.value || false;
    }
}
