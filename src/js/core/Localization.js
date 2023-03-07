
let g_currentLang = "en";
let g_defaultLanguage = "";

const g_dictionaries = {
};

export function defaultTranslateFunction(word) {
    const dict = g_dictionaries[g_currentLang] || {}
    const defaultDict = g_dictionaries[g_defaultLanguage] || {};
    return dict[word] || defaultDict[word] || word;
}

export function defaultSetLanguageFunction(lang) {
    g_currentLang = lang;    
}

export function defaultGetLanguageFunction() {
    return g_currentLang;
}

export function defaultAddDictionaryFunction(lang,dict) {

    g_dictionaries[lang] = g_dictionaries[lang] || {};
    
    for (const key in dict) {
        const translation = dict[key];
        g_dictionaries[lang][key] = translation;
    }
}

export function defaultGetDictionariesFunction() {
    return g_dictionaries;
}

export function defaultGetDefaultLanguageFunction(player) {
    return player.config.defaultLanguage || navigator.language;
}

let g_translateFunc = defaultTranslateFunction;

let g_setLanguageFunc = defaultSetLanguageFunction;

let g_getLanguageFunc = defaultGetLanguageFunction;

let g_defaultAddDictionary = defaultAddDictionaryFunction;

let g_defaultGetDictionaries = defaultGetDictionariesFunction;

let g_defaultGetDefaultLang = defaultGetDefaultLanguageFunction;

export function translate(word, keys = null) {
    const translated = g_translateFunc(word);
    if (Array.isArray(keys)) {
        let result = translated;
        keys.forEach((key,index) => {
            const temp = `$${index + 1}`;
            result = result.replace(temp,key);
        });
        return result;
    }
    else {
        return translated;
    }
}

export function setLanguage(lang) {
    g_setLanguageFunc(lang);
}

export function getLanguage() {
    return g_getLanguageFunc();
}

export function addDictionary(lang,dict) {
    g_defaultAddDictionary(lang, dict);
}

export function getDictionaries() {
    return g_defaultGetDictionaries();
}

export function getDefaultLanguage(player) {
    return g_defaultGetDefaultLang(player);
}

export function setTranslateFunction(fn) {
    g_translateFunc = fn;
}

export function setSetLanguageFunction(fn) {
    g_setLanguageFunc = fn;
}

export function setGetLanguageFunction(fn) {
    g_getLanguageFunc = fn;
}

export function setAddDictionaryFunction(fn) {
    g_defaultAddDictionary = fn;
}

export function setGetDictionariesFunction(fn) {
    g_defaultGetDictionaries = fn;
}

export function setGetDefaultLanguageFunction(fn) {
    g_defaultGetDefaultLang = fn;
}

export function setupDefaultLanguage(player) {
    g_defaultLanguage = getDefaultLanguage(player);
}