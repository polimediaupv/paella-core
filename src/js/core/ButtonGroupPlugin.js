import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import { loadPluginsOfType } from 'paella-core/js/core/Plugin';
import { addButtonPlugin } from 'paella-core/js/core/ButtonPlugin';
import { translate } from 'paella-core/js/core/Localization';

import 'paella-core/styles/ButtonGroup.css'; 

export default class ButtonGroupPlugin extends PopUpButtonPlugin {

    get groupName() {
        return this.config?.groupName || "buttonGroup";
    }

    get popUpType() {
        return "no-modal";
    }

    async getContent() {
        const content = createElementWithHtmlText('<div class="button-group"></div>');

        // Get the button plugins with "parentContainer" === this.groupName
        this._firstItem = null;
        if (!this._initialized) {
            this.player.log.debug(`Load button plugins into "${this.groupName}" container`);
            await loadPluginsOfType(this.player,"button",async (plugin) => {
                this.player.log.debug(` Button plugin: ${ plugin.name }`);
                const pluginWrapper = createElementWithHtmlText('<div class="button-plugin-wrapper"></div>', content);

                // Configure the parent pop up if the plugin is a 
                // PopUpButtonPlugin
                if (plugin instanceof PopUpButtonPlugin) {
                    plugin.parentPopUp = this._popUp;
                }

                await addButtonPlugin(plugin, pluginWrapper);
                const descriptionText = createElementWithHtmlText(`<a class="button-description">${ translate(plugin.description) }</a>`, pluginWrapper);
                descriptionText.addEventListener("click", (evt) => {
                    plugin.action();
                    evt.stopPropagation();
                });

                if (!this._firstItem) {
                    const button = pluginWrapper.getElementsByTagName("button");
                    this._firstItem = button && button[0];
                }
            }, async plugin => {
                const containerName = plugin.parentContainer;
                if (containerName === this.groupName) {
                    return await plugin.isEnabled();
                }
                else {
                    return false;
                }
            });
            this._initialized = true;
        }

        return content;
    }

    async showPopUp() {
		await super.showPopUp();

        setTimeout(() => {
            if (this._firstItem) {
                this._firstItem.focus();
            }
        }, 50);

        this.buttons.forEach(btn => {
            if (btn.style.display === 'none') {
                this.hideButtonContainer(btn);
            }
            else {
                this.showButtonContainer(btn);
            }
        });
	}

    get buttons() {
        return Array.from(this.popUp.element.getElementsByClassName('button-plugin'));
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