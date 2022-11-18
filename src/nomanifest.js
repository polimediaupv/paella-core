import Paella from 'paella-core/js/Paella';
import "./debug.css";

const initParams = {

}

window.onload = async () => {
    const paella = new Paella('player-container', initParams);

    paella.loadManifest()
        .then(() => console.log("Done"))
        .catch(e => paella.log.error(e));
}