import UserInterfacePlugin from './UserInterfacePlugin';
import { getPluginsOfType } from './plugin_tools';
import { createElementWithHtmlText } from './dom';
import Events, { triggerEvent } from './Events';
import { translate } from './Localization';
import { sanitizeHTML } from './utils';

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
	const parent = createElementWithHtmlText('<li></li>', buttonAreaElem);
	parent.plugin = plugin;
	const tabIndex = plugin.tabIndex;
	const ariaLabel = translate(plugin.ariaLabel);
	const description = translate(plugin.description);
	const fixedSizeClass = plugin.dynamicWidth ? 'dynamic-width' : 'fixed-width';
	const id = plugin.id ? `id="${plugin.id}" ` : "";
	const name = plugin.buttonName ? `name="${plugin.buttonName}" ` : "";

	if (plugin.interactive) {
		const button = createElementWithHtmlText(`
			<button type="button" ${id}${name}class="${ fixedSizeClass }" tabindex="${ tabIndex }" aria-label="${ ariaLabel }" title="${ description }">
			</button>
		`, parent);

		if (plugin.className !== "") {
			button.classList.add(plugin.className);
		}

		plugin._button = button;
		plugin._container = parent;
		button._pluginData = plugin;
		parent._pluginData = plugin;
	
		button.addEventListener("click", (evt) => {
			const plugin = button._pluginData;
			triggerEvent(plugin.player, Events.BUTTON_PRESS, {
				plugin: plugin
			});
			plugin.action(evt, null);
			
			
			evt.stopPropagation();

			// We remove the focus on the button click event, because otherwise the user
			// interface will never be hidden.
			// We use pageX and pageY to differentiate the origin of the click: if it was produced
			// by a keyboard action, then we do not remove the focus so as not to hinder accessibility.
			if (evt.pageX !== 0 && evt.pageY !== 0) {
				document.activeElement.blur();
			}
		});

		let addHiddenTimer = null;
		const clearHideTimer = () => {
			if (addHiddenTimer) {
				clearTimeout(addHiddenTimer);
				addHiddenTimer = null;
			}
		}
		const addHiddenClass = () => {
			clearHideTimer();
			addHiddenTimer = setTimeout(() => {
				if (plugin.leftSideContainerPresent) {
					plugin.leftSideContainer.classList.add("hidden");
				}
				if (plugin.rightSideContainerPresent) {
					plugin.rightSideContainer.classList.add("hidden");
				}
				addHiddenTimer = null;
			}, 300);
		}

		const removeHiddenClass = () => {
			clearHideTimer();
			if (plugin.leftSideContainerPresent) {
				plugin.leftSideContainer.classList.remove("hidden");
			}
			if (plugin.rightSideContainerPresent) {
				plugin.rightSideContainer.classList.remove("hidden");
			}
		}

		button.addEventListener("focus", removeHiddenClass);
		button.addEventListener("mouseover", removeHiddenClass);
		button.addEventListener("mouseout", addHiddenClass);
		button.addEventListener("blur", addHiddenClass);

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

		if (plugin.className !== "") {
			button.classList.add(plugin.className);
		}
	}
	else {
		const button = createElementWithHtmlText(`
			<div ${id}${name} class="non-interactive ${ fixedSizeClass }" title="${ description }">
			</div>
		`, parent);

		plugin._button = button;
		plugin._container = parent;
		button._pluginData = plugin;
		parent._pluginData = plugin;

		if (plugin.className !== "") {
			button.classList.add(plugin.className);
		}
	}
}

const getSideContainer = () => {
	const container = document.createElement('span');
	container.classList.add("side-container");
	container.classList.add("hidden");
	return container;
}


export class ButtonPluginObserver {
	onIconChanged(plugin,prevIcon,newIcon) {}
	onTitleChanged(plugin,prevTitle,newTitle) {}
	onStateChanged(plugin,prevText,newText,prevIcon,newIcon) {}
}

export default class ButtonPlugin extends UserInterfacePlugin {
	get type() { return "button" }
	
	// _container and _button are loaded in PlaybackBar
	get container() { return this._container; }
	get button() { return this._button; }
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

	get minContainerSize() {
		return this.config.minContainerSize || this.getMinContainerSize();
	}

	getMinContainerSize() {
		return 0;
	}

	setObserver(observer) {
		if (observer instanceof ButtonPluginObserver) {
			this._observer = observer;
		}
		else if (typeof observer.onIconChanged === "function" ||
			typeof observer.onTitleChanged === "function" ||
			typeof observer.onStateChanged === "function")
		{
			this._observer = observer;
		}
		else {
			throw new Error("Invalid observer for ButtonPlugin");
		}
	}
	
	get icon() {
		if (!this._icon) {
			this._icon = "";
		}
		return this._icon;
	}
	
	set icon(icon) {
		if (typeof icon === "string") {
			icon = sanitizeHTML(icon);
		}

		this._icon = icon;
		if (icon && this._button instanceof HTMLElement) {
			const cur = this._button.querySelector('i') || createElementWithHtmlText(`<i></i>`, this._button);
			cur.innerHTML = icon;
		}
		else if (this._button instanceof HTMLElement){
			const cur = this._button.querySelector('i');
			if (cur) {
				this._button.removeChild(cur);
			}
		}

		if (this._observer?.onIconChanged) {
			this._observer.onIconChanged(this, this._icon, icon);
		}
	}

	get title() {
		return this._title || "";
	}

	set title(t) {
		this._title = t;
		if (t && this._button instanceof HTMLElement) {
			const cur = this._button.querySelector('span') || createElementWithHtmlText(`<span class="button-title-${ this.titleSize }"></span>`, this._button);
			cur.innerHTML = t;
		}
		else if (this._button instanceof HTMLElement){
			const cur = this._button.querySelector('span');
			if (cur) {
				this._button.removeChild(cur);
			}
		}

		if (this._observer?.onTitleChanged) {
			this._observer.onTitleChanged(this, this._title, t);
		}
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

	enable() {
		this._enabled = true;
		this.show();
	}

	disable() {
		this._enabled = false;
		this.hide();
	}
	
	hide() {
		if (this._button) {
			this._button.style.display = "none";
		}
	}
	
	show() {
		if (this._enabled === false) {
			return;
		}
		const { width } = this.player.playbackBar.containerSize;
		if (this._button && (width > this.minContainerSize || this.parentContainer !== "playbackBar")) {
			this._button.style.display = null;
		}
	}

	#leftSideContainer = null;
	get leftSideContainer() {
		if (!this.#leftSideContainer) {
			this.#leftSideContainer = getSideContainer();
			this.container.appendChild(this.#leftSideContainer);
		}
		return this.#leftSideContainer;
	}

	get leftSideContainerPresent() {
		return this.#leftSideContainer !== null;
	}

	#rightSideContainer = null;
	get rightSideContainer() {
		if (!this.#rightSideContainer) {
			this.#rightSideContainer = getSideContainer();0
			this.container.appendChild(this.#rightSideContainer);
		}
		return this.#rightSideContainer;
	}

	get rightSideContainerPresent() {
		return this.#rightSideContainer !== null;
	}

	get stateText() {
		return null;
	}

	get stateIcon() {
		return null;
	}

	setState({ text = null, icon = null } = {}) {
		const prevText = this._statusText;
		const prevIcon = this._statusIcon;
		this._statusText = text;
		this._statusIcon = icon;
		this.#updateStateCallbacks.forEach(cb => cb(this));
		if (this._statusIcon) {
			this.icon = this._statusIcon;
		}
		if (this._statusText) {
			this.title = this._statusText;
		}

		this._observer?.onStateChanged?.(this, prevText, text, prevIcon, icon);
	}

	#updateStateCallbacks = [];

	onStateChange(cb) {
		if (typeof cb === "function") {
			this.#updateStateCallbacks.push(cb);
		}
		else {
			this.player.log.warn("Invalid callback for ButtonPlugin.onStateChange");
		}
	}

	async action(event, callerContainer = null) {
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
