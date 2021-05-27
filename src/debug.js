import Paella from 'paella-core/js/Paella';
import Events, { bindEvent } from 'paella-core/js/core/Events';

let paella = new Paella('player-container')

bindEvent(paella, Events.BUTTON_PRESS, (params) => {
	console.log(params);
});

paella.loadManifest()
	.then(() => console.log("done"))
	.catch(e => console.error(e));
