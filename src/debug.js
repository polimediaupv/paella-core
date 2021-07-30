import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';
import { defaultLoadVideoManifestFunction } from 'paella-core/js/core/initFunctions';

const dict = {
	es: {
		"Rice": "Arroz",
		"Chicken": "Pollo"
	}
};

let currentLanguage = navigator.language.substring(0,2);

const initParams = {
	loadVideoManifest: async function(videoManifestUrl,config) {
		console.log(config);
		return await defaultLoadVideoManifestFunction(videoManifestUrl, config);
	},

	setLanguageFunction: lang => currentLanguage = lang,
	getLanguageFunction: () => currentLanguage,
	translateFunction: (word) => dict[currentLanguage] && dict[currentLanguage][word] || word
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
