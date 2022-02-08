import Plugin from 'paella-core/js/core/Plugin';
import { loadPluginsOfType } from './Plugin';

const g_shortcuts = {};

const getModifierStatus = sc => {
    return `alt:${sc.keyModifiers?.altKey || false}, ctrl:${sc.keyModifiers?.ctrlKey || false}, shift:${sc.keyModifiers?.shiftKey || false}`
}

const getShortcutHash = (sc) => {
    const hash = `${sc.keyCode}_${getModifierStatus(sc)}`;
    return hash;
}

export async function loadKeyShortcutPlugins(player) {
    await loadPluginsOfType(player, "keyshortcut", async (plugin) => {
        const shortcuts = await plugin.getKeys();
        shortcuts.forEach(shortcut => {
            g_shortcuts[shortcut.keyCode] = g_shortcuts[shortcut.keyCode] || [];
            shortcut.plugin = plugin;
            g_shortcuts[shortcut.keyCode].push(shortcut);
        });

        for (const keyCode in g_shortcuts) {
            const shortcuts = g_shortcuts[keyCode];
            const hashes = {};
            if (shortcuts.length > 0) {
                shortcuts.forEach(shortcut => {
                    const hash = getShortcutHash(shortcut);
                    if (!hashes[hash]) {
                        hashes[hash] = shortcut;
                    }
                    else {
                        player.log.warn(`Collision detected in shortcut for key code ${ keyCode }`);
                        const enabledShortcut = hashes[hash];
                        player.log.warn('Enabled shortcut:');
                        player.log.warn(`plugin: ${enabledShortcut.plugin.name}, keyCode: ${enabledShortcut.keyCode}, modifiers: ${getModifierStatus(enabledShortcut)}, description: ${enabledShortcut.description}`);
                        player.log.warn('Collision shortcut (disabled):');
                        player.log.warn(`plugin: ${shortcut.plugin.name}, keyCode: ${shortcut.keyCode}, modifiers: ${getModifierStatus(shortcut)}, description: ${shortcut.description}`);
                        shortcut.disabled = true;
                    }
                })
            }
        }
    });

    player.log.debug(g_shortcuts);
    window.onkeyup = async (event) => {
        const validFocus = () => document.activeElement && document.activeElement !== document.body && !/video/i.test(document.activeElement.tagName);

        // Exclude the action key when there are something focused
        if (event.code === "Space" && validFocus()) {
            return;
        }
        const shortcut = g_shortcuts[event.code];
        if (shortcut) {
            await shortcut.forEach(async s => {
                const altStatus = !s.keyModifiers?.altKey || (s.keyModifiers?.altKey && event.altKey);
                const ctrlStatus = !s.keyModifiers?.ctrlKey || (s.keyModifiers?.ctrlKey && event.ctrlKey);
                const shiftStatus = !s.keyModifiers?.shiftKey || (s.keyModifiers?.shiftKey && event.shiftKey);
                if (altStatus && ctrlStatus && shiftStatus && !s.disabled) {
                    await s.action(event);
                }
                else if (altStatus && ctrlStatus && shiftStatus && s.disabled) {
                    player.log.warn("Shortcut not triggered due to collision:");
                    player.log.warn(`plugin: ${s.plugin.name}, keyCode: ${s.keyCode}, modifiers: ${getModifierStatus(s)}, description: ${s.description}`);
                }
            });
        }
    }
}

export async function unloadKeyShortcutPlugins(player) {
    console.warn("unloadKeyShortcutPlugins: not implemented");
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
