import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';
import { defaultLoadVideoManifestFunction } from 'paella-core/js/core/initFunctions';
import { setCookie, getCookie, setCookieIfAllowed } from 'paella-core/js/core/utils';
import './debug.css';

// Objects to store the custom localization dictionaries
import g_dictionaries from 'paella-core/js/default-dictionaries.js';
let g_currentLanguage = navigator.language.substring(0,2);

// Localization API
import {
	setLanguage,
	addDictionary
} from 'paella-core/js/core/Localization';

import testIcon from './icons/play_icon_fullscreen.svg';
import { createElementWithHtmlText } from './js/core/dom';
import Loader from './js/core/Loader';

class CustomLoader extends Loader {
	async create() {
		createElementWithHtmlText(`
			<h1 style="">Loading...</h1>
		`, this.element);
	}

	get debug() {
		return false;
	}
}

// A simple mechanism to save and read cookie preferences
const saveCookieConsent = (preferences, analytical, marketing) => {
	setCookie('cookieConsent', JSON.stringify({
		preferences, analytical, marketing
	}));
}

const getCookieConsentData = () => {
	try {
		return JSON.parse(getCookie('cookieConsent'));
	}
	catch(e) {
		return { preferences: false, analytics: false, marketing: false };
	}
}

const initParams = {
	customLoader: CustomLoader,

	loadVideoManifest: async function(videoManifestUrl,config,player) {
		player.log.debug(config);
		return await defaultLoadVideoManifestFunction(videoManifestUrl, config, player);
	},

	// Setup custom localization functions
	setLanguageFunction: lang => g_currentLanguage = lang,
	getLanguageFunction: () => g_currentLanguage,
	translateFunction: (word) => {
		return g_dictionaries[g_currentLanguage] && g_dictionaries[g_currentLanguage][word] || word
	},
	addDictionaryFunction: (lang, dict) => {
		g_dictionaries[lang] = g_dictionaries[lang] || {};
		for (const key in dict) {
			const translation = dict[key];
			g_dictionaries[lang][key] = translation;
		}
	},
	getDictionariesFunction: () => {
		return g_dictionaries;
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
	},

	getCookieConsentFunction: (type) => {
		const cookieConsentData = getCookieConsentData();
		const result = cookieConsentData[type] || false;
		return result;
	},

	getCookieDescriptionFunction: (cookieObject) => {
		return cookieObject.description;
	}

};

window.onload = async () => {
	let paella = new Paella('player-container', initParams);

	const saveCookies = () => {
		const val = (item) => document.getElementById(item).checked;
		
		const preferences = val('preferences');
		const analytical = val('analytical');
		const marketing = val('marketing');
		saveCookieConsent(preferences,analytical,marketing);
		setCookie('testSaveCookie','');
		document.getElementById('currentCookieConsent').innerHTML = `preferences: ${preferences}, analytical: ${analytical}, marketing: ${marketing}`;
		document.getElementById('currentCookieValue').innerHTML = `'testSaveCookie': ''`;
		paella.cookieConsent.updateConsentData();
	}

	const consentData = getCookieConsentData();
	document.getElementById('currentCookieConsent').innerHTML = 
		`preferences: ${consentData.preferences}, analytical: ${consentData.analytical}, marketing: ${consentData.marketing}`;

	(() => {
		const setVal = (item, value) => document.getElementById(item).checked = value;
		const cookieType = () => document.getElementById('saveCookieType').value;
		const cookieTextField = () => document.getElementById('testSaveCookieData');
		const cookieConsent = getCookieConsentData();
		setVal('preferences', cookieConsent.preferences);
		setVal('analytical', cookieConsent.analytical);
		setVal('marketing', cookieConsent.marketing);

		const updateCookie = () => {
			const value = getCookie('testSaveCookie');
			document.getElementById('currentCookieValue').innerHTML = `'testSaveCookie': '${ value }'`;
		}
	
		document.getElementById('saveCookiesButton').addEventListener('click', () => {
			saveCookies();
		});

		document.getElementById('saveCookieButton').addEventListener('click', () => {
			setCookieIfAllowed(paella, cookieType(), 'testSaveCookie', cookieTextField().value);
			updateCookie();
		});
	})();
	
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
		.then(() => {
			//paella.addCustomPluginIcon("es.upv.paella.playPauseButton","play",testIcon);
			paella.log.debug(`${paella.translate("Rice")} ${paella.translate("Chicken")}`
		)})
		.catch(e => paella.log.error(e));
};
