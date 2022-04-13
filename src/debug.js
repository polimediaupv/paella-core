import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';
import { defaultLoadVideoManifestFunction } from 'paella-core/js/core/initFunctions';

import './debug.css';

// Objects to store the custom localization dictionaries
const g_dictionaries = {};
let g_currentLanguage = navigator.language.substring(0,2);

// Localization API
import {
	setLanguage,
	addDictionary
} from 'paella-core/js/core/Localization';

const initParams = {
	loadVideoManifest: async function(videoManifestUrl,config,player) {
		player.log.debug(config);
		return await defaultLoadVideoManifestFunction(videoManifestUrl, config, player);
	},

	// Setup custom localization functions
	setLanguageFunction: lang => g_currentLanguage = lang,
	getLanguageFunction: () => g_currentLanguage,
	translateFunction: (word) => g_dictionaries[g_currentLanguage] && g_dictionaries[g_currentLanguage][word] || word,
	addDictionaryFunction: (lang, dict) => {
		g_dictionaries[lang] = g_dictionaries[lang] || {};
		for (const key in dict) {
			const translation = dict[key];
			g_dictionaries[lang][key] = translation;
		}
	},

	loadDictionaries: (player) => {
		setLanguage('es');
		addDictionary('es', {
			'Rice': 'Arroz',
			'Chicken': 'Pollo',
			'Hello': 'Hola',
			'World': 'Mundo',
			'Test popup button': 'Botón desplegable de prueba'
		});

		// Or you can use the player object
		player.setLanguage('es');
		player.addDictionary('es', {
			'Rice': 'Arroz',
			'Chicken': 'Pollo',
			'Hello': 'Hola',
			'World': 'Mundo',
			'Test popup button': 'Botón desplegable de prueba'
		});
	}

};

window.onload = async () => {

	let paella = new Paella('player-container', initParams);
	
	window.onhashchange = async (event) => {
		await paella.unload();
		await paella.loadManifest();
	}
	
	bindEvent(paella, Events.BUTTON_PRESS, (params) => {
		paella.log.debug(params);
	}, false);
	
	bindEvent(paella, Events.SHOW_POPUP, (params) => {
		paella.log.debug("Show popup");
		paella.log.debug(params);
	}, false);
	
	bindEvent(paella, Events.HIDE_POPUP, (params) => {
		paella.log.debug("Hide popup");
		paella.log.debug(params);
	}, false);
	
	bindEvent(paella, Events.MANIFEST_LOADED, () => {
		paella.log.debug("Video manifest loaded");
	}, false);
	
	bindEvent(paella, Events.LAYOUT_CHANGED, () => {
		paella.log.debug("Layout changed");
	}, false);
	
	bindEvent(paella, Events.VOLUME_CHANGED, () => {
		paella.log.debug("Volume changed");
	}, false);
	
	bindEvent(paella, Events.PLAYER_LOADED, () => {
		paella.log.debug("============================== Player loaded =================================");
	}, false);

	bindEvent(paella, Events.HIDE_UI, () => {
		paella.log.debug("Hide user interface");
	}, false);

	bindEvent(paella, Events.SHOW_UI, () => {
		paella.log.debug("Show user interface");
	}, false);

	paella.loadManifest()
		.then(() => paella.log.debug(`${paella.translate("Rice")} ${paella.translate("Chicken")}`))
		.catch(e => paella.log.error(e));
};
