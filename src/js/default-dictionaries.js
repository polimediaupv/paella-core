
const defaultDictionaries = {};

/*
const dictionaries = require.context('../i18n/', true, /\.json$/);
dictionaries.keys().forEach(k => {
    const reResult = /([a-z-]+[A-Z_]+)\.json/.exec(k);
    const localization = reResult && reResult[1];
    
    if (localization) {
        const dict = dictionaries(k);
        defaultDictionaries[localization] = dict;
        
        const lang = localization.substr(0,2);
        if (!(lang in defaultDictionaries)) {
            defaultDictionaries[lang] = dict;
        }
    }
});
*/
export default defaultDictionaries;