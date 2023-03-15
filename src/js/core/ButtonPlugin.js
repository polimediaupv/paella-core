import UserInterfacePlugin from 'paella-core/js/core/UserInterfacePlugin';
import { getPluginsOfType } from 'paella-core/js/core/plugin_tools';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import Events, { triggerEvent } from 'paella-core/js/core/Events';
import { translate } from 'paella-core/js/core/Localization';
import PopUp from './PopUp';

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
	const fixedSizeClass = plugin.dynamicWidth ? 'dynamic-width' : 'fixed-width';
	const id = plugin.id ? `id="${plugin.id}" ` : "";
	const name = plugin.buttonName ? `name="${plugin.buttonName}" ` : "";

	if (plugin.interactive) {
		const leftArea = createElementWithHtmlText(`
			<div class="button-plugin-side-area left-side ${ plugin.className }"></div>
		`, parent);
		const button = createElementWithHtmlText(`
			<button type="button" ${id}${name}class="button-plugin ${ plugin.className } ${ fixedSizeClass } no-icon" tabindex="${ tabIndex }" aria-label="${ ariaLabel }" title="${ description }">
				<div class="interactive-button-content">
					<i class="button-icon" style="pointer-events: none; display: none">${ plugin.icon }</i>
					<span class="button-title button-title-${ plugin.titleSize }">${ plugin.title || "&nbsp;" }</span>
				</div>
			</button>
		`, parent);
		const rightArea = createElementWithHtmlText(`
			<div class="button-plugin-side-area right-side ${ plugin.className }"></div>
		`, parent);
		const titleContainer = button.getElementsByClassName('button-title')[0];

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
			if (plugin.closePopUps && plugin.popUp) {
				PopUp.HideNonAncestors(plugin.popUp);
			}
			else if (plugin.closePopUps) {
				PopUp.HideAllPopUps(false);
			}
			triggerEvent(plugin.player, Events.BUTTON_PRESS, {
				plugin: plugin
			});
			plugin.action(evt);
			evt.stopPropagation();
		});

		const clickWithSpacebar = plugin.player.config.accessibility?.clickWithSpacebar !== undefined ? 
				plugin.player.config.accessibility?.clickWithSpacebar: true;
		if (!clickWithSpacebar) {
			button.addEventListener("keyup", evt => {
				// prevent to send the clic event with spacebar
				if (evt.keyCode == 32 ) {
					evt.preventDefault();
				} 
			});
			button.addEventListener("keydown", evt => {
				// prevent to send the hover event with spacebar
				if (evt.keyCode == 32 ) {
					evt.preventDefault();
				} 
			});
		}
	}
	else {
		const button = createElementWithHtmlText(`
			<div ${id}${name} class="button-plugin ${ plugin.className } non-interactive ${ fixedSizeClass } no-icon" title="${ description }">
				<div class="non-interactive-button-content">
					<i class="button-icon" style="pointer-events: none; display: none;">${ plugin.icon }</i>
					<span class="button-title button-title-${ plugin.titleSize }">${ plugin.title || "&nbsp;" }</span>
				</div>
			</div>
		`, parent);
		const titleContainer = button.getElementsByClassName('button-title')[0];

		plugin._leftArea = null;
		plugin._rightArea = null;
		plugin._button = button;
		plugin._container = parent;
		plugin._titleContainer = titleContainer;
		button._pluginData = plugin;
		parent._pluginData = plugin;
	}
}

export default class ButtonPlugin extends UserInterfacePlugin {
	get type() { return "button" }
	
	// _container, _leftArea, _rightArea, _button and _titleContainer are loaded in PlaybackBar
	get container() { return this._container; }
	get leftArea() { return this._leftArea; }
	get rightArea() { return this._rightArea; }
	get button() { return this._button; }
	get titleContainer() { return this._titleContainer; }
	get interactive() { return true; }
	get dynamicWidth() { return false; }
	
	getId() {
		return null;
	}

	get id() { return this.config.id || this.getId(); }

	getButtonName() {
		return null;
	}

	get buttonName() { return this.config.name || this.getButtonName() || this.name; }

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

	get minContainerSize() {
		return this.config.minContainerSize || this.getMinContainerSize();
	}

	getMinContainerSize() {
		return 0;
	}
	
	get icon() {
		if (!this._icon) {
			this._icon = "";
		}
		return this._icon;
	}
	
	set icon(icon) {
		this._icon = icon;
		if (icon) {
			this.iconElement.innerHTML = icon;
			this.iconElement.style.display = "";
			this.button.classList.remove("no-icon");
		}
		else {
			this.iconElement.innerHTML = "";
			this.iconElement.style.display = "none";
			this.button.classList.add("no-icon");
		}
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

	get closePopUps() {
		return this.config.closePopUps || this.getClosePopUps();
	}

	getClosePopUps() {
		return true;
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
		const { width } = this.player.playbackBar.containerSize;
		if (this._button && (width > this.minContainerSize || this.parentContainer !== "playbackBar")) {
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

	onResize({ width, height }) {
		if (width < this.minContainerSize) {
			this.hide();
		}
		else {
			this.show();
		}
	}
}
