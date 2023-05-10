import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import ProgressIndicator from 'paella-core/js/core/ProgressIndicator';
import { loadPluginsOfType, unloadPluginsOfType } from 'paella-core/js/core/plugin_tools'
import { addButtonPlugin } from 'paella-core/js/core/ButtonPlugin';
import { pauseAutoHideUiTimer, resumeAutoHideUiTimer } from './utils';
import 'paella-core/styles/PlaybackBar.css';
import PopUp from './PopUp';

export default class PlaybackBar extends DomClass {
	constructor(player,parent) {
		const inlineMode = player.config.progressIndicator?.inlineMode ?? false;
		const attributes = {
			"class": inlineMode ? "playback-bar inline-mode" : "playback-bar top-mode"
		};
		super(player, { attributes, parent });

		this.element.addEventListener('mouseenter', () => pauseAutoHideUiTimer(player));
		this.element.addEventListener('mouseleave', () => resumeAutoHideUiTimer(player));
		
		this._buttonPluginsLeft = createElementWithHtmlText(
			`<div class="button-plugins left-side"></div>`);
		this._timerContainer = createElementWithHtmlText(
			`<div class="timer-container"></div>`);
		this._buttonPluginsRight = createElementWithHtmlText(
			`<div class="button-plugins right-side"></div>`);
			

		const timerSide = player.config.progressIndicator?.side || "left";
		if (inlineMode) {
			this.element.appendChild(this._buttonPluginsLeft);
			if (timerSide === "left") {
				this.element.appendChild(this._timerContainer);
				this._progressIndicator = new ProgressIndicator(player, this);
				this.element.appendChild(this._buttonPluginsRight);
			}
			else {
				this._progressIndicator = new ProgressIndicator(player, this);
				this.element.appendChild(this._timerContainer);
				this.element.appendChild(this._buttonPluginsRight);
			}
		}
		else {
			this._progressIndicator = new ProgressIndicator(player, this);
			this.element.appendChild(this._buttonPluginsLeft);
			if (timerSide === "left") {
				this.element.appendChild(this._timerContainer);
				this.element.appendChild(this._buttonPluginsRight);
			}
			else {
				this.element.appendChild(this._buttonPluginsRight);
				this.element.appendChild(this._timerContainer);
			}
		}

		this.element.addEventListener("click", () => {
			PopUp.HideAllPopUps(false);
		});

		this._enabled = true;
	}

	get enabled() {
		return this._enabled;
	}

	set enabled(e) {
		this._enabled = e;
		if (!this._enabled) {
			this.hide();
		}
		else {
			this.showUserInterface();
		}
	}
	
	async load() {		
		this._frameList = this.player.videoManifest;
		this._enabledPlugins = [];
		
		this.player.log.debug("Loading button plugins");
		await loadPluginsOfType(this.player,"button",async (plugin) => {
			this.player.log.debug(` Button plugin: ${ plugin.name }`);
			this._enabledPlugins.push(plugin);
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

		await this._progressIndicator.loadPlugins();
		this.onResize();
	}

	async unload() {
		// Remove elements from parent
		this.removeFromParent();

		// Unload plugins
		await unloadPluginsOfType(this.player, "button");
		this._buttonPluginsLeft.innerHTML = ""
		this._buttonPluginsRight.innerHTML = "";

		await this._progressIndicator.unloadPlugins();
	}
	
	hideUserInterface() {
		this.player.log.debug("Hide playback bar user interface");
		this.hide();
	}
	
	showUserInterface() {
		if (this._enabled) {
			const inlineMode = this.player.config.progressIndicator?.inlineMode ?? false;
			const showMode = inlineMode ? 'flex' : 'block';
			this.show(showMode);
			this.onResize();
		}
	}
	
	get buttonPluginsRight() {
		return this._buttonPluginsRight;
	}
	
	get buttonPluginsLeft() {
		return this._buttonPluginsLeft;
	}

	get timerContainer() {
		return this._timerContainer;
	}
	
	get progressIndicator() {
		return this._progressIndicator;
	}

	get containerSize() {
		const width = this.element.clientWidth;
		const height = this.element.clientHeight;
		return { width, height } 
	}
	
	onResize() {
		const { containerSize } = this;
		this._enabledPlugins.forEach(plugin => plugin.onResize(containerSize));
		this.progressIndicator.onResize();
	}
}