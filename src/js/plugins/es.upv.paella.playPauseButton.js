import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import Events, { bindEvent } from 'paella-core/js/core/Events';

import defaultPlayIcon from 'paella-core/icons/play.svg';
import defaultPauseIcon from 'paella-core/icons/pause.svg';
import defaultReplayIcon from 'paella-core/icons/replay.svg';

import PaellaCorePlugins from './PaellaCorePlugins';

export default class PlayButtonPlugin extends ButtonPlugin {

	getPluginModuleInstance() {
		return PaellaCorePlugins.Get();
	}
	
	get name() {
		return super.name || "es.upv.paella.playPauseButton";
	}

	async load() {
		const playIcon = this.player.getCustomPluginIcon(this.name,"play") || defaultPlayIcon;
		const pauseIcon = this.player.getCustomPluginIcon(this.name,"pause") || defaultPauseIcon;
		const replayIcon = this.player.getCustomPluginIcon(this.name,"replay") || defaultReplayIcon;
		this.icon = playIcon;
		const defaultTitlePause = "pause";
		const defaultTitlePlay = "play";
		const defaultShortcutKey = "k";
		bindEvent(this.player, Events.PLAY, () => {
			this.icon = pauseIcon;
			this._button.ariaKeyshortcuts = this.config.ariaKeyshortcuts || defaultShortcutKey ;
			this._button.ariaLabel = this.config.ariaLabelPause || defaultTitlePause;
			this._button.title = this.config.ariaLabelPause || defaultTitlePause;
		});
		bindEvent(this.player, Events.PAUSE, () => {
			this.icon = playIcon;
			this._button.ariaKeyshortcuts = this.config.ariaKeyshortcuts || defaultShortcutKey ;
			this._button.ariaLabel = this.config.ariaLabelPause || defaultTitlePlay ;
			this._button.title = this.config.ariaLabelPause || defaultTitlePlay;
		});
		bindEvent(this.player, Events.ENDED, () => {
			this.icon = replayIcon;
			this._button.ariaKeyshortcuts = this.config.ariaKeyshortcuts || defaultShortcutKey ;
			this._button.ariaLabel = this.config.ariaLabelPause || defaultTitlePlay ;
			this._button.title = this.config.ariaLabelPause || defaultTitlePlay;
		});
		bindEvent(this.player, Events.STOP, () => {
			this.icon = playIcon;
			this._button.ariaKeyshortcuts = this.config.ariaKeyshortcuts || defaultShortcutKey ;
			this._button.ariaLabel = this.config.ariaLabelPause || defaultTitlePlay ;
			this._button.title = this.config.ariaLabelPause || defaultTitlePlay;
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
}