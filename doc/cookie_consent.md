# Cookie consent utilities

Sometimes there is a need to implement plugins that must comply with the European regulation on browser cookie consent. This consent must be integrated with the website to provide an interface where the user can accept or deny the use of cookies in different areas.

`paella-core` incorporates a series of APIs that facilitate the integration of the plugins with the website, so as to provide the plugins with a homogeneous way of consulting the consent regardless of the website where the player is running.

To make this mechanism work, it is necessary to connect the player to the website so that the following tasks can be completed:

- Define the types of cookies with which the website works. For example, we may have technical, preference, marketing and analytical cookies.
- Provide a method for `paella-core` to ask the website what is the user's consent to a type of cookie.
- Provide a standardized API for plugins to query `paella-core` for consent to a cookie type.

In short, the `paella-core` cookie consent APIs work as a mediator between the plugins and the website. It would be possible to implement a website-specific plugin that queries consent directly, but this plugin would not work in other `paella-core` based players, and this is why it is interesting to have an API that performs this mediation.

It is important to note that `paella-core` does not perform any kind of cookie consent management: it is the responsibility of the developer to implement this mechanism and configure the player.

The cookie consent API is available form `paella-core` 1.8.

## Configuration

The first step is to configure the types of cookies the website works with. This is done through the `paella-core` settings, under the `cookieConsent` section:

```json
{
    ...
    "cookieConsent": [
        {
            "type": "necessary",
            "title": "Necessary",
            "description": "Cookies required for proper operation.",
            "required": true
        },
        {
            "type": "preferences",
            "title": "Preferences",
            "description": "Cookies used to store user preferences that can be configured in the application. If disabled, some of these features may not work properly.",
            "required": false
        },
        {
            "type": "analytical",
            "title": "Analytical",
            "description": "Cookies used to analyze user behavior and thus provide clues about future improvements in the application.",
            "required": false
        },
        {
            "type": "marketing",
            "title": "Marketing",
            "description": "Cookies used to better tailor ads to user preferences.",
            "required": false
        }
    ],
    ...
}
```

Each type of cookie is identified by the `type` attribute, which will be used in the `paella-core` APIs. The `title` attribute is used to identify the type of cookie, in case any plugin should display this information in the user interface. The same happens with the `description` attribute, only that in this case, it is possible to ask for this description to the website, as we will see in the next section. 

The `required` attribute indicates whether the type of cookie is mandatory, that is, if it is a type of cookie that is not regulated by the regulation, and that is mandatory to accept for the operation of the website. For example, the same preference on cookies that the user wants to consent to would be a required attribute, otherwise the cookie consent message would appear every time the web page loads.

## Connect `paella-core` with your cookie consent mechanism

### Initialization callbacks

The `initParams` object provides the callbacks that connect the web to `paella-core`. There are two callbacks, one of which is mandatory to implement for the correct functioning of the web:

**`getCookieConsentFunction`:** It is the callback that will call `paella-core` to ask the website if a cookie type is consented by the user or not.
**`getCookieDescriptionFunction`:** It is used to query the website for the description of a cookie type. This function is optional, and if provided, the `description` attribute of the configuration will not be used.

```js
function myWebsiteCheckConsentFunction(type) {
    // Use your web API to find out if the user has
    // consented to cookies of the specified type. 
    ...
    return consent;
}

function myGetCookieDescriptionFunction(type) {
    // Use the api of your website to obtain the
    // description of the type of cookie.
    ...
    return description;
}

const initData = {
    ...
    getCookieConsentFunction: (type) => {
        return myWebsiteCheckConsentFunction(type);
    },

    getCookieDescriptionFunction: (cookieObject) => {
        return myGetCookieDescriptionFunction(cookieObject.type);
    }
};
```

You can read more about `paella-core` initialization in [this document](initialization.md).

### Update the consent data

When the user modifies the cookie preferences, we have to notify `paella-core` that it has to update this information. Internally, `paella-core` will send an `Events.COOKIE_CONSENT_CHANGED` event. If we implement a plugin that needs to explicitly know the cookie preferences, we can use this event to update the plugin state.

```js
function mySaveCookiePreferencesFunction() {
    // This could be the implementation of your website that is executed
    // when the user saves the cookie preferences.
    ...
    
    // When calling this function, `paella-core` will use the callbacks
    // defined in the previous point to update the configuration, and will
    // fire the COOKIE_CONSENT_CHANGED event for the plugins that need it
    // to update this information.
    myPlayer.cookieConsent.updateConsentData();
}
```

## Cookie consent API

To obtain user consent for a cookie type, we will use the `cookieConsent` object of the player.

```js
...
if (myPlayer.cookieConsent.getConsentForType('analytics')) {
    setCookie('analyticsUserId', userId);
}
```

## Example plugin implementation

Suppose a plugin that needs to deal with analytics cookies. The previous point shows how to ask `paella-core` if the user has given consent for a cookie type. However, these types are not static, as they are set in the configuration. For this reason, plugins that use the cookie consent APIs will most likely need to get these values from the plugin configuration:

```json
{
    "cookieConsent": [
        ...
        {
            "type": "analytical",
            "title": "Analytical",
            "description": "",
            "required": false
        }
    ],
    ...
    "plugins": {
        ...
        "es.upv.paella.myCookieDataPlugin": {
            "enabled": true,
            "cookieType": "analytical"
        }
    }
}
```

```js
export class MyCookieDataPlugin extends DataPlugin {
    ...
    async write(context, id, data) {
        if (this.player.cookieConsent.getConsentForType(this.config.cookieType)) {
            this.doWrite(context, id, data);
        }
    }
}
```


## Utility functions

paella-core provides a number of functions in the `utils` package to work with cookies. The basic ones are `setCookie` and `getCookie`, but there is also a function that allows you to write a cookie conditionally, depending on whether the user has consented to a specific type of cookie: `setCookieIfAllowed`:

```js
import { utils } from 'paella-core';

...

utils.setCookieIfAllowed(myPlayer, 'analytical', 'analyticsUserId',userId);
```

For more information, see the [`paella-core` utility package document](utils.md).

