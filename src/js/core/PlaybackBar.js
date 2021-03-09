import { DomClass, createElementWithHtmlText } from 'paella-core/js/core/dom';

import Events, { bindEvent } from 'paella-core/js/core/Events';
import ProgressIndicator from 'paella-core/js/core/ProgressIndicator';
import { loadPluginsOfType } from 'paella-core/js/core/Plugin';

import 'paella-core/styles/PlaybackBar.css';

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
		const leftButtons = [];
		const rightButtons = [];
		
		this._frameList = this.player.videoManifest;
		
		async function addButtonPlugin(plugin, arrayButtons, buttonAreaElem) {
			const parent = createElementWithHtmlText('<div class="button-plugin-container"></div>', buttonAreaElem);

			const leftArea = createElementWithHtmlText(`
				<div class="button-plugin-side-area left-side ${ plugin.className }"></div>
			`, parent);
			const button = createElementWithHtmlText(`
				<button class="button-plugin ${ plugin.className }"><i class="button-icon" style="pointer-events: none">${ plugin.icon }</i></button>
			`, parent);
			const rightArea = createElementWithHtmlText(`
				<div class="button-plugin-side-area right-side ${ plugin.className }"></div>
			`, parent);
			plugin._leftArea = leftArea;
			plugin._rightArea = rightArea;
			plugin._button = button;
			plugin._container = parent;
			button._pluginData = plugin;
			leftArea._pluginData = plugin;
			rightArea._pluginData = plugin;
			parent._pluginData = plugin;

			// Event listeners
			parent.addEventListener("mouseover", (evt) => {
				evt.target._pluginData.mouseOver(evt.target._pluginData._container, evt);
			});
			parent.addEventListener("mouseout", (evt) => {
				evt.target._pluginData.mouseOut(evt.target._pluginData._container, evt);
			});

			button.addEventListener("click", (evt) => {
				evt.target._pluginData.action(evt);
			});
			button.addEventListener("mouseover", (evt) => {
				evt.target._pluginData.mouseOver(evt.target._pluginData._button, evt);
			});
			button.addEventListener("mouseout", (evt) => {
				evt.target._pluginData.mouseOut(evt.target._pluginData._button, evt);
			});

			leftArea.addEventListener("mouseover", (evt) => {
				evt.target._pluginData.mouseOver(evt.target._pluginData._leftArea, evt);
			});
			leftArea.addEventListener("mouseout", (evt) => {
				evt.target._pluginData.mouseOut(evt.target._pluginData._leftArea, evt);
			});
			rightArea.addEventListener("mouseover", (evt) => {
				evt.target._pluginData.mouseOver(evt.target._pluginData._rightArea, evt);
			});
			rightArea.addEventListener("mouseout", (evt) => {
				evt.target._pluginData.mouseOut(evt.target._pluginData._rightArea, evt);
			});
		}
		
		console.debug("Loading button plugins");
		loadPluginsOfType(this.player,"button",(plugin) => {
			console.debug(` Button plugin: ${ plugin.name }`);
			if (plugin.side == "left") {
				addButtonPlugin(plugin, leftButtons, this.buttonPluginsLeft);
			}
			else if (plugin.side == "right") {
				addButtonPlugin(plugin, rightButtons, this.buttonPluginsRight);
			}
		});
		
	}
	
	hideUserInterface() {
		console.debug("Hide playback bar user interface");
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