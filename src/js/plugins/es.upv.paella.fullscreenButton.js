import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import Events, { bindEvent } from 'paella-core/js/core/Events';

import fullscreenIcon from 'paella-core/icons/fullscreen.svg';
import windowedIcon from 'paella-core/icons/windowed.svg';

export default class PauseButtonPlugin extends ButtonPlugin {
	async isEnabled() {
		const enabled = await super.isEnabled()
		return this.player.isFullScreenSupported()
	}
	async load() {
		this.icon = fullscreenIcon;
		bindEvent(this.player, Events.FULLSCREEN_CHANGED, (status) => {
			console.log(status);
			if (status) {
				this.icon = fullscreenIcon;
			}
			else {
				this.icon = windowedIcon;
			}
		})
	}
	
	async action() {
		if (this.player.isFullscreen) {
			await this.player.exitFullscreen();
		}
		else {
			await this.player.enterFullscreen();
		}
	}
}