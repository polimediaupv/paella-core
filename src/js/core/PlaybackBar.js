import { DomClass, createElementWithHtmlText } from './dom';

import ProgressIndicator from './ProgressIndicator';
import { loadPluginsOfType, unloadPluginsOfType } from './plugin_tools'
import { addButtonPlugin } from './ButtonPlugin';
import { pauseAutoHideUiTimer, resumeAutoHideUiTimer } from './utils';
import PopUp from './PopUp';

export default class PlaybackBar extends DomClass {
	constructor(player,parent) {
		const inlineMode = player.config.progressIndicator?.inlineMode ?? false;
		const attributes = { "class": "playback-bar" };
		super(player, { attributes, parent });

		this.element.addEventListener('mouseenter', () => pauseAutoHideUiTimer(player));
		this.element.addEventListener('mouseleave', () => resumeAutoHideUiTimer(player));
		
		this._topContainer = createElementWithHtmlText(`<div></div>`);
		this._navContainer = createElementWithHtmlText('<nav></nav>');
		this._buttonPluginsLeft = createElementWithHtmlText(`<ul></ul>`, this._navContainer);
		this._centerContainer = createElementWithHtmlText(`<div></div>`, this._navContainer);
		this._buttonPluginsRight = createElementWithHtmlText(`<ul></ul>`, this._navContainer);
		
		if (inlineMode) {
			this._progressIndicator = new ProgressIndicator(player, this._centerContainer, this);
		}
		else {
			this._progressIndicator = new ProgressIndicator(player, this._topContainer, this);
			this.element.appendChild(this._topContainer);
		}

		this.element.appendChild(this._navContainer);

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