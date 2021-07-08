import Plugin from 'paella-core/js/core/Plugin';
import { loadPluginsOfType } from './Plugin';

const g_shortcuts = {};

export async function loadKeyShortcutPlugins(player) {
    await loadPluginsOfType(player, "keyshortcut", async (plugin) => {
        const shortcuts = await plugin.getKeys();
        shortcuts.forEach(shortcut => {
            g_shortcuts[shortcut.keyCode] = g_shortcuts[shortcut.keyCode] || [];
            shortcut.plugin = plugin;
            g_shortcuts[shortcut.keyCode].push(shortcut);
        });
    });

    console.log(g_shortcuts);
    window.onkeyup = async (event) => {
        const shortcut = g_shortcuts[event.code];
        if (shortcut) {
            await shortcut.forEach(async s => {
                const altStatus = !s.keyModifiers?.altKey || (s.keyModifiers?.altKey && event.altKey);
                const ctrlStatus = !s.keyModifiers?.ctrlKey || (s.keyModifiers?.ctrlKey && event.ctrlKey);
                const shiftStatus = !s.keyModifiers?.shiftKey || (s.keyModifiers?.shiftKey && event.shiftKey);
                if (altStatus && ctrlStatus && shiftStatus) {
                    await s.action(event);
                }
            });
        }
    }
}

export const KeyCodes = {
    "Digit1": "Digit1",
    "Digit2": "Digit2",
    "Digit3": "Digit3",
    "Digit4": "Digit4",
    "Digit5": "Digit5",
    "Digit6": "Digit6",
    "Digit7": "Digit7",
    "Digit8": "Digit8",
    "Digit9": "Digit9",
    "Digit0": "Digit0",
    "KeyA": "KeyA",
    "KeyB": "KeyB",
    "KeyC": "KeyC",
    "KeyD": "KeyD",
    "KeyE": "KeyE",
    "KeyF": "KeyF",
    "KeyG": "KeyG",
    "KeyH": "KeyH",
    "KeyI": "KeyI",
    "KeyJ": "KeyJ",
    "KeyK": "KeyK",
    "KeyL": "KeyL",
    "KeyM": "KeyM",
    "KeyN": "KeyN",
    "KeyO": "KeyO",
    "KeyP": "KeyP",
    "KeyQ": "KeyQ",
    "KeyR": "KeyR",
    "KeyS": "KeyS",
    "KeyT": "KeyT",
    "KeyU": "KeyU",
    "KeyV": "KeyV",
    "KeyW": "KeyW",
    "KeyX": "KeyX",
    "KeyY": "KeyY",
    "KeyZ": "KeyZ",
    "Comma": "Comma",
    "Period": "Period",
    "Semicolon": "Semicolon",
    "Quote": "Quote",
    "BracketLeft": "BracketLeft",
    "BracketRight": "BracketRight",
    "Backquote": "Backquote",
    "Backslash": "Backslash",
    "Minus": "Minus",
    "Equal": "Equal",
    "AltLeft": "AltLeft",
    "AltRight": "AltRight",
    "CapsLock": "CapsLock",
    "ControlLeft": "ControlLeft",
    "ControlRight": "ControlRight",
    "OSLeft": "OSLeft",
    "OSRight": "OSRight",
    "ShiftLeft": "ShiftLeft",
    "ShiftRight": "ShiftRight",
    "ContextMenu": "ContextMenu",
    "Enter": "Enter",
    "Space": "Space",
    "Tab": "Tab",
    "Delete": "Delete",
    "End": "End",
    "Help": "Help",
    "Home": "Home",
    "Insert": "Insert",
    "PageDown": "PageDown",
    "PageUp": "PageUp",
    "ArrowDown": "ArrowDown",
    "ArrowLeft": "ArrowLeft",
    "ArrowRight": "ArrowRight",
    "ArrowUp": "ArrowUp",
    "Escape": "Escape",
    "PrintScreen": "PrintScreen",
    "ScrollLock": "ScrollLock",
    "Pause": "Pause"
};

export default class KeyShortcutPlugin extends Plugin {

    get type() { return "keyshortcut"; }

    /**
     * 
     * @returns [{ keyCode: KeyCode, keyModifiers: [KeyModifiers], description: string, action: async function }]
     */
    async getKeys() {

        return [];
    }
}
