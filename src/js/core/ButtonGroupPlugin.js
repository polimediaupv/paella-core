import MenuButtonPlugin from './MenuButtonPlugin';
import { createElementWithHtmlText } from './dom';
import { loadPluginsOfType } from './plugin_tools';
import { addButtonPlugin } from './ButtonPlugin';
import { translate } from './Localization';
import { loadSvgIcon } from './utils';

export default class ButtonGroupPlugin extends MenuButtonPlugin {
    get closeOnSelect() {
        return this.config.closeOnSelect ?? false;
    }

    async load() {
        if (this._iconPath) {
            this.icon = await loadSvgIcon(this._iconPath);
        }
    }

    async getContent() {
        if (!this._buttonPlugins) {
            this._buttonPlugins = [];
            await loadPluginsOfType(this.player,"button",async (plugin) => {
                this.player.log.debug(`Load button plugins into "${this.groupName}" container`);
                this._buttonPlugins.push(plugin);

                plugin.setObserver(this);
            }, async plugin => {
                const containerName = plugin.parentContainer;
                if (containerName === this.groupName) {
                    return await plugin.isEnabled();
                }
                else {
                    return false;
                }
            });
        }
        return await super.getContent();
    }

    onIconChanged(plugin,prevIcon,newIcon) {
        // TODO: Change icon in menu button, if menu is open
    }

    onTitleChanged(plugin,prevTitle,newTitle) {
        // TODO: Change text in menu button, if menu is open
    }

    onStateChanged(plugin,prevText,newText,prevIcon,newIcon) {
        // TODO: Change text and icon in menu button, if menu is open
    }

    get groupName() {
        return this.config?.groupName || "buttonGroup";
    }

    get popUpType() {
        return "no-modal";
    }

    getClosePopUps() {
        return false;
    }

    buttonType() {
        return "button";
    }

    async getMenu() {
        return this._buttonPlugins.map(plugin => {
            return {
                id: plugin.name,
                title: plugin.title || plugin.description,
                icon: plugin.icon
            }
        });
    }

    itemSelected(itemData, menuItems) {
        const plugin = this._buttonPlugins.find(plugin => plugin.name === itemData.id);
        if (plugin) {
            const event = new Event("menuitemselected");
            plugin.action(event, this.currentContent);
        }
    }

    async showPopUp() {
		await super.showPopUp();

        setTimeout(() => {
            if (this._firstItem) {
                this._firstItem.focus();
            }
        }, 50);

        this.buttons?.forEach(btn => {
            if (btn.style.display === 'none') {
                this.hideButtonContainer(btn);
            }
            else {
                this.showButtonContainer(btn);
            }
        });
	}

    get buttons() {
        return this._content && Array.from(this._content.getElementsByClassName('button-plugin'));
    }

    hideButtonContainer(btn) {
        const container = btn.parentNode?.parentNode;
        if (container) {
            container.style.display = "none";
        }
    }

    showButtonContainer(btn) {
        const container = btn.parentNode?.parentNode;
        if (container) {
            container.style.display = null;
        }
    }
}
