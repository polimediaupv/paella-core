import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import Events, { bindEvent } from 'paella-core/js/core/Events';

import playIcon from 'paella-core/icons/play.svg';

export default class PlayButtonPlugin extends ButtonPlugin {
	get icon() { return playIcon; }
	
	async load() {
		bindEvent(this.player, Events.PLAY, () => {
			this.hide();
		});
		bindEvent(this.player, Events.PAUSE, () => {
			this.show();
		});
		bindEvent(this.player, Events.ENDED, () => {
			this.show();
		});
	}
	
	async action() {
		await this.player.videoContainer.play();
	}
}