import Paella from 'paella-core/js/Paella';
import "./debug.css";

const initParams = {

}

window.onload = async () => {
    const paella = new Paella('player-container', initParams);

    await paella.loadUrl([
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4',
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4'
    ]);
}