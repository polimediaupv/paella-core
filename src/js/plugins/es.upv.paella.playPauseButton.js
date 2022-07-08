import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import Events, { bindEvent } from 'paella-core/js/core/Events';

import defaultPlayIcon from 'paella-core/icons/play.svg';
import defaultPauseIcon from 'paella-core/icons/pause.svg';

export default class PlayButtonPlugin extends ButtonPlugin {
	async load() {
		const playIcon = this.player.getCustomPluginIcon(this.name,"play") || defaultPlayIcon;
		const pauseIcon = this.player.getCustomPluginIcon(this.name,"pause") || defaultPauseIcon;
		this.icon = playIcon;
		bindEvent(this.player, Events.PLAY, () => {
			this.icon = pauseIcon;
		});
		bindEvent(this.player, Events.PAUSE, () => {
			this.icon = playIcon;
		});
		bindEvent(this.player, Events.ENDED, () => {
			this.icon = playIcon;
		});
		bindEvent(this.player, Events.STOP, () => {
			this.icon = playIcon;
		});
	}
	
	async action() {
		if (await this.player.paused()) {
			await this.player.videoContainer.play();
		}
		else {
			await this.player.videoContainer.pause();
		}
	}

	async getDictionaries() {
		return {
			es: {
				"Play and pause button": "Reproducir y parar el vídeo"
			}
		};
	}
}