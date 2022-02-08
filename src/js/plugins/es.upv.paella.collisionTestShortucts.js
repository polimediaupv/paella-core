
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";

export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {

    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyM,
                description: "Collision key shortcut",
                keyModifiers: {
                    ctrlKey: false
                },
                action: async () => {
                    console.log("Test collision shortcut");
                }
            }
        ]
    }
}