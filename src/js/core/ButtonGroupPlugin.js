import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';
import { loadPluginsOfType } from 'paella-core/js/core/Plugin';
import { addButtonPlugin } from 'paella-core/js/core/ButtonPlugin';

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
        if (!this._initialized) {
            console.debug(`Load button plugins into "${this.groupName}" container`);
            loadPluginsOfType(this.player,"button",(plugin) => {
                console.debug(` Button plugin: ${ plugin.name }`);
                const pluginWrapper = createElementWithHtmlText('<div class="button-plugin-wrapper"></div>', content);

                // Configure the parent pop up if the plugin is a 
                // PopUpButtonPlugin
                if (plugin instanceof PopUpButtonPlugin) {
                    plugin.parentPopUp = this._popUp;
                }

                addButtonPlugin(plugin, pluginWrapper);
                createElementWithHtmlText(`<div class="button-description">${ plugin.description }</div>`, pluginWrapper);
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
}