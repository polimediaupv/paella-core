
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";


export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {

    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyK,
                description: "Toggle play/pause",
                action: (event) => {
                    console.log(event);
                }
            }
        ]
    }
}