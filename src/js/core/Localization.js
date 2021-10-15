
let g_currentLang = "en";

const g_dictionaries = {
};

export function defaultTranslateFunction(word) {
    const dict = g_dictionaries[g_currentLang] || {}
    return dict[word] || word;
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

let g_translateFunc = defaultTranslateFunction;

let g_setLanguageFunc = defaultSetLanguageFunction;

let g_getLanguageFunc = defaultGetLanguageFunction;

let g_defaultAddDictionary = defaultAddDictionaryFunction;

export function translate(word) {
    return g_translateFunc(word);
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
