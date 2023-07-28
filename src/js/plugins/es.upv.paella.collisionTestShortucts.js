
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";
import PaellaCorePlugins from "./PaellaCorePlugins";

export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyM,
                description: "Collision key shortcut",
                keyModifiers: {
                    ctrlKey: false
                },
                action: async () => {
                    this.player.log.debug("Test collision shortcut");
                }
            }
        ]
    }
}