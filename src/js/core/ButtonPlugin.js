import Plugin, { getPluginsOfType } from 'paella-core/js/core/Plugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

export function getButtonPlugins(player, side = "any", parent = "playbackBar") {
	return getPluginsOfType(player, "button")
		.filter(btn => {
			return (btn.side === side || side === "any") && btn.parent === parent
		});
}

export function getLeftButtonPlugins(player) {
	return getButtonPlugins(player, "left", "playbackBar");
}

export function getRightButtonPlugins(player) {
	return getButtonPlugins(player, "right", "playbackBar");
}

export async function addButtonPlugin(plugin, buttonAreaElem) {
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
	parent.addEventListener("mouseenter", (evt) => {
		parent._pluginData.mouseOver(parent, evt);
	});
	parent.addEventListener("mouseleave", (evt) => {
		parent._pluginData.mouseOut(parent, evt);
	});

	button.addEventListener("click", (evt) => {
		button._pluginData.action(evt);
	});
}

export default class ButtonPlugin extends Plugin {
	get type() { return "button" }
	
	// _container, _leftArea, _rightArea and _button are loaded in PlaybackBar
	get container() { return this._container; }
	get leftArea() { return this._leftArea; }
	get rightArea() { return this._rightArea; }
	get button() { return this._button; }
	
	get iconElement() {
		return this.button?.getElementsByClassName("button-icon")[0];
	}
	
	get icon() {
		return this._icon;
	}
	
	set icon(icon) {
		this._icon = icon;
		this.iconElement.innerHTML = icon;
	}
	
	// "left" or "right"
	get side() {
		const side = this.config?.side;
		return side || "left";
	}

	// "playbackBar" or "videoContainer"
	get parentContainer() {
		const parent = this.config?.parentContainer;
		return parent || "playbackBar";
	}
	
	get className() { return ""; }
	
	hide() {
		if (this._button) {
			this._button.style.display = "none";
		}
	}
	
	show() {
		if (this._button) {
			this._button.style.display = "block";
		}
	}
	
	async mouseOver(target) {

	}

	async mouseOut(target) {

	}

	async action() {
		console.log(`Action not implemented in button plugin ${ this.name }`);	
	}
}
