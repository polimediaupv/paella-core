import UserInterfacePlugin from 'paella-core/js/core/UserInterfacePlugin';
import { getPluginsOfType } from 'paella-core/js/core/Plugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';
import { translate } from 'paella-core/js/core/Localization';

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



export function getNextTabIndex(player) {
	player.__tabIndex = player.__tabIndex || 0;
	++player.__tabIndex;
	return player.__tabIndex;
}

export function getCurrentTabIndex(player) {
	return player.__tabIndex || 0;
}

export async function addButtonPlugin(plugin, buttonAreaElem) {
	const parent = createElementWithHtmlText('<div class="button-plugin-container"></div>', buttonAreaElem);
	parent.plugin = plugin;
	const tabIndex = plugin.tabIndex;
	const ariaLabel = translate(plugin.ariaLabel);
	const description = translate(plugin.description);

	const leftArea = createElementWithHtmlText(`
		<div class="button-plugin-side-area left-side ${ plugin.className }"></div>
	`, parent);
	const button = createElementWithHtmlText(`
		<button class="button-plugin ${ plugin.className }" tabindex="${ tabIndex }" aria-label="${ ariaLabel }" title="${ description }"><i class="button-icon" style="pointer-events: none">${ plugin.icon }</i></button>
	`, parent);
	const rightArea = createElementWithHtmlText(`
		<div class="button-plugin-side-area right-side ${ plugin.className }"></div>
	`, parent);
	const titleContainer = createElementWithHtmlText(`
		<span class="button-title button-title-${ plugin.titleSize }">${ plugin.title || "&nbsp;" }</span>
	`, button);
	plugin._leftArea = leftArea;
	plugin._rightArea = rightArea;
	plugin._button = button;
	plugin._container = parent;
	plugin._titleContainer = titleContainer;
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
		const plugin = button._pluginData;
		triggerEvent(plugin.player, Events.BUTTON_PRESS, {
			plugin: plugin
		});
		plugin.action(evt);
		evt.stopPropagation();
	});
}

export default class ButtonPlugin extends UserInterfacePlugin {
	get type() { return "button" }
	
	// _container, _leftArea, _rightArea, _button and _titleContainer are loaded in PlaybackBar
	get container() { return this._container; }
	get leftArea() { return this._leftArea; }
	get rightArea() { return this._rightArea; }
	get button() { return this._button; }
	get titleContainer() { return this._titleContainer; }

	get ariaLabel() {
		return this.config.ariaLabel || this.getAriaLabel();
	}

	getAriaLabel() {
		return "";
	}

	get tabIndex() {
		return this.config.tabIndex || this.getTabIndex();
	}

	getTabIndex() {
		return getNextTabIndex(this.player);
	}

	getDescription() {
		return "";
	}

	get description() {
		return this.config.description || this.getDescription();
	}
	
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

	get title() {
		return this._title || "";
	}

	set title(t) {
		this._title = t;
		this._titleContainer.innerHTML = t;
	}

	// "small", "medium", "large"
	get titleSize() {
		return "medium";
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
		this.player.log.warn(`Action not implemented in button plugin ${ this.name }`);	
	}
}
