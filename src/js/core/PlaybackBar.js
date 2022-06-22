import { DomClass, createElementWithHtmlText } from '../core/dom';

import ProgressIndicator from '../core/ProgressIndicator';
import { loadPluginsOfType, unloadPluginsOfType } from '../core/Plugin';
import { addButtonPlugin } from '../core/ButtonPlugin';

import '../../css/PlaybackBar.css';

export default class PlaybackBar extends DomClass {
	constructor(player,parent) {
		const attributes = {
			"class": "playback-bar"
		};
		super(player, { attributes, parent });
		
		this._progressIndicator = new ProgressIndicator(player, this.element);
		this._buttonPluginsLeft = createElementWithHtmlText(
			`<div class="button-plugins left-side"></div>`, this.element);
		this._buttonPluginsRight = createElementWithHtmlText(
			`<div class="button-plugins right-side"></div>`, this.element);
	}
	
	async load() {		
		this._frameList = this.player.videoManifest;
		
		this.player.log.debug("Loading button plugins");
		await loadPluginsOfType(this.player,"button",async (plugin) => {
			this.player.log.debug(` Button plugin: ${ plugin.name }`);
			if (plugin.side === "left") {
				await addButtonPlugin(plugin, this.buttonPluginsLeft);
			}
			else if (plugin.side === "right") {
				await addButtonPlugin(plugin, this.buttonPluginsRight);
			}
		}, async plugin => {
			if (plugin.parentContainer === "playbackBar") {
				return await plugin.isEnabled();
			}
			else {
				return false;
			}
		});
	}

	async unload() {
		// Remove elements from parent
		this.removeFromParent();

		// Unload plugins
		await unloadPluginsOfType(this.player, "button");
		this._buttonPluginsLeft.innerHTML = ""
		this._buttonPluginsRight.innerHTML = "";
	}
	
	hideUserInterface() {
		this.player.log.debug("Hide playback bar user interface");
		this.hide();
	}
	
	showUserInterface() {
		this.show();
	}
	
	get buttonPluginsRight() {
		return this._buttonPluginsRight;
	}
	
	get buttonPluginsLeft() {
		return this._buttonPluginsLeft;
	}
	
	get progressIndicator() {
		return this._progressIndicator;
	}
	
	onResize() {
		this.progressIndicator.onResize();
	}
}