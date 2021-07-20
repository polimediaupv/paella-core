import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';
import { defaultLoadVideoManifestFunction } from 'paella-core/js/core/initFunctions';

const initParams = {
	loadVideoManifest: async function(videoManifestUrl,config) {
		console.log(config);
		return await defaultLoadVideoManifestFunction(videoManifestUrl, config);
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
	.then(() => console.log("done"))
	.catch(e => console.error(e));
