import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';
import { defaultLoadVideoManifestFunction } from 'paella-core/js/core/initFunctions';

// Objects to store the custom localization dictionaries
const g_dictionaries = {};
let g_currentLanguage = navigator.language.substring(0,2);

// Localization API
import {
	setLanguage,
	addDictionary
} from 'paella-core/js/core/Localization';

const initParams = {
	loadVideoManifest: async function(videoManifestUrl,config) {
		console.log(config);
		return await defaultLoadVideoManifestFunction(videoManifestUrl, config);
	},

	// Setup custom localization functions
	setLanguageFunction: lang => g_currentLanguage = lang,
	getLanguageFunction: () => g_currentLanguage,
	translateFunction: (word) => g_dictionaries[g_currentLanguage] && g_dictionaries[g_currentLanguage][word] || word,
	addDictionaryFunction: (lang, dict) => g_dictionaries[lang] = dict,

	loadDictionaries: (player) => {
		setLanguage('es');
		addDictionary('es', {
			'Rice': 'Arroz',
			'Chicken': 'Pollo',
			'Hello': 'Hola',
			'World': 'Mundo'
		});

		// Or you can use the player object
		player.setLanguage('es');
		player.addDictionary('es', {
			'Rice': 'Arroz',
			'Chicken': 'Pollo',
			'Hello': 'Hola',
			'World': 'Mundo'
		});
	}

};

let paella = new Paella('player-container', initParams);

bindEvent(paella, Events.BUTTON_PRESS, (params) => {
	console.log(params);
});

bindEvent(paella, Events.SHOW_POPUP, (params) => {
	console.log("Show popup");
	console.log(params);
});

bindEvent(paella, Events.HIDE_POPUP, (params) => {
	console.log("Hide popup");
	console.log(params);
});

bindEvent(paella, Events.MANIFEST_LOADED, () => {
	console.log("Video manifest loaded");
});


paella.loadManifest()
	.then(() => console.log(`${paella.translate("Rice")} ${paella.translate("Chicken")}`))
	.catch(e => console.error(e));
