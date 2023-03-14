# Localization

Paella Player includes very basic APIs for translating strings from dictionaries. All plugins that are implemented must use these APIs, but it is possible to configure them so that internally it is possible to delegate string translation to other libraries.



## Localization API

Localization APIs include functions to set the language, get the current language, translate phrases and add dictionaries.

Example: set and get language, translate:


```javascript
import { setLanguage, getLanguage, translate } from 'paella-core';

setLanguage('es');
console.log(`Current language: ${ getLanguage() }`);
console.log(translate('Hello'));
```

To add new dictionaries, you can use the `addDictionary` API function:

```javascript
import { addDictionary } from 'paella-core';
```



You can load dictionaries using the Paella Player initialization object. This function adds the corresponding dictionary with the specified language, and if this dictionary is already included, extends it with the new translation strings:

```javascript
import { addDictionary } from 'paella-core';
...
const initParams = {
  ...
  loadDictionaries: player => {
    addDictionary('es',{
      "Hello": "Hola",
      "World": "Mundo"
    })
  }
}
...
```

For more information about Paella Player initialization, check [this document](initialization.md).

## Paella instance API

The `paella-core` instance includes an API for accessing localization functions, which can be used alternatively, without the need to import the API functions from the library.

**`translate(word,keys)`:** Translates a phrase or word. The `keys` parameter is an array that allows substitutions to be made in the text once it has been translated. For example, if the text to translate is `"hello $1!"`, we could use the array `["John"]` which would substitute the key `$1`.

**`setLanguage(lang)`:** Sets the current language. By default, the current language is inferred from `navigator.language`.

**`getLanguage()`:** Returns the current language.

**`addDictionary(lang,dict)`:** Adds the `dict` dictionary for the `lang` language. The dictionary keys are added to the previously existing dictionary. Previously existing keys will be replaced with the keys from the new dictionary.

**`getDictionaries()`:** Returns the configured dictionaries.

**`getDefaultLanguage()`:** Returns the default language of the player, in case no translations are found for the current language. The default implementation of this function returns the `defaultLanguage` attribute of the configuration file, and if undefined, returns the language `en`.


Example: 

```javascript
player.setLanguage('es');
console.log(`Current language: ${ player.getLanguage() }`);
console.log(player.translate("Hello"));
```

## Variables

You can translate sentences containing variables:

```js
player.addDictionary({ "es",
  {
    "The lead developer is $1, and the CEO is $2": "El desarrollador principal es $1, y el CEO es $2"
  }
});
...
player.translate("The lead developer is $1, and the CEO is $2", ["John","Mary"]);
```

It is important to note that the system does not modify the variables or the sentences to take into account gender, cardinality, etc.

```js
player.addDictionary({ "es",
  {
    "there are $1 kittens in the basket": "Hay $1 gatitos en la cesta"
  }
});
...
player.translate("there are $1 kittens in the basket", ["1"]);
// Hay 1 gatitos en la cesta
```

## Getting all the available dictionaries

It is possible to obtain all the dictionaries configured in an instance of `paella-core` using the `player.getDictionaries()` function. It is important to call this function when the player is fully loaded, otherwise we will not get the translation strings that may have been added by the plugins.

## Using custom localization library

You can use the Paella Player initialization object to define custom translation functions through callbacks. In these functions you can make a call to a third party localization library. This is interesting, for example, to integrate Paella Player with the localization library you are using in your web site.



```javascript

// My own localization library:
// Objects to store the custom localization dictionaries
const localization = {
  _dict: {},
  _lang: navigator.language.substring(0,2),
  _defaultLang: 'en', // Use english as default language
  translate: (word) => {
    return this._dict[this._lang] && this._dict[this._lang][word] || word;
  },
  addDictionary: (lang, dict) => this._dict[lang] = dict
}

// Or you can use a third party localization library, such as i18n


const initParams = {
  ...
  setLanguageFunction: lang => localization._lang = lang,
	getLanguageFunction: () => localization._lang,
	translateFunction: (word) => localization.translate(word),
	addDictionaryFunction: (lang, dict) => localization.addDictionary(lang,dict),
  getDictionariesFunction: () => localication._dict,
  getDefaultLanguageFunction: (_player) => localization._defaultLang
	...
}
```



## Adding dictionaries from plugins

It's possible to extend Paella Player dictionaries through plugins. Plugins that add user interaction are able to add translation text strings. These are the descendant plugins of the [UserInterfacePlugin](user_interface_plugin.md) class.

You can add dictionaries by implementing the `getDictionaries()` function of `UserInterfacePlugin`, which will add these translation strings globally, i.e. they will not only be available for the plugin that adds them, but for the whole player. 

For more information, see the documentation for the plugin types descended from [UserInterfacePlugin](user_interface_plugin.md):

- [ButtonPlugin](button_plugin.md)
- [ButtonGroupPlugin](button_group_plugin.md)
- [MenuButtonPlugin](menu_button_plugin.md)
- [PopUpButtonPlugin](popup_button_plugin.md)
- [VideoLayout](video_layout.md)

In addition to this, the keyboard shortcut plugins also include the `getDictionaries()` function, to allow the keyboard shortcuts description to be translated.

As of paella-core version 1.23, the `getDictionaries()` function is also available for classes that inherit from `PluginModule`. This way, it is possible to unify all dictionaries of a plugin module within the module definition:

```js
import { PluginModule } from 'paella-core';

export default class MyPluginModule extends PluginModule {
  get moduleName() {
    return "my plugin module";
  }

  get moduleVersion() {
    return "1.0.0";
  }

  async getDictionaries() {
    const dict = {
      es: {
        "my plugin module": "mi módulo de plugins"
      }
    };

    dict['es-ES'] = dict.es;
    return dict;
  }
}
```

