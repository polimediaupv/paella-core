import Plugin from 'paella-core/js/core/Plugin';
import { loadPluginsOfType } from './Plugin';

const getModifierStatus = sc => {
    return `alt:${sc.keyModifiers?.altKey || false}, ctrl:${sc.keyModifiers?.ctrlKey || false}, shift:${sc.keyModifiers?.shiftKey || false}`
}

const getShortcutHash = (sc) => {
    const hash = `${sc.keyCode}_${getModifierStatus(sc)}`;
    return hash;
}

const addKeyModifiersObject = sc => {
    sc.keyModifiers = sc.keyModifiers || {};
    sc.keyModifiers.altKey = sc.keyModifiers.altKey || false;
    sc.keyModifiers.shiftKey = sc.keyModifiers.shiftKey || false;
    sc.keyModifiers.ctrlKey = sc.keyModifiers.ctrlKey || false;
}

export const getShortcuts = (player) => {
    const enabledShortcuts = [];
    for (const keyCode in player.__shortcuts__) {
        const shortcut = player.__shortcuts__[keyCode];
        shortcut.forEach(sc => {
            if (!sc.disabled) {
                enabledShortcuts.push(sc);
            }
        });
    }
    return enabledShortcuts;
}

export async function loadKeyShortcutPlugins(player) {
    player.__shortcuts__ = player.__shortcuts__ || {};

    // If the page contains more than one paella player, the first one to register will be the one that will handle the keyboard shortcuts
    if (!window.__paella_shortcuts_player__) {
        window.__paella_shortcuts_player__ = player;
    }
    else {
        player.log.warn("Warning: more than one paella player instance with enabled shortcut plugins.");
        player.log.warn("Check your code to ensure that only one instance of paella player registers keyboard shortcut plugins.");
        return;
    }

    await loadPluginsOfType(player, "keyshortcut", async (plugin) => {
        const shortcuts = await plugin.getKeys();
        shortcuts.forEach(shortcut => {
            player.__shortcuts__[shortcut.keyCode] = player.__shortcuts__[shortcut.keyCode] || [];
            shortcut.plugin = plugin;
            player.__shortcuts__[shortcut.keyCode].push(shortcut);
        });

        const dicts = await plugin.getDictionaries();
        for (const key in dicts) {
            const dict = dicts[key];
            player.addDictionary(key, dict);
        }

        for (const keyCode in player.__shortcuts__) {
            const shortcuts = player.__shortcuts__[keyCode];
            const hashes = {};
            if (shortcuts.length > 0) {
                shortcuts.forEach(shortcut => {
                    const hash = getShortcutHash(shortcut);
                    addKeyModifiersObject(shortcut);
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

    player.__paella_key_event_listener__ = async (event) => {
        const validFocus = () => document.activeElement && document.activeElement !== document.body && !/video/i.test(document.activeElement.tagName);

        // Exclude the action key when there are something focused
        if (event.code === "Space" && validFocus()) {
            return;
        }
        const shortcut = player.__shortcuts__[event.code];
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

    window.addEventListener("keyup", player.__paella_key_event_listener__);
}

export async function unloadKeyShortcutPlugins(player) {
    delete player.__shortcuts__;
    if (player == window.__paella_shortcuts_player__) {
        window.removeEventListener("keyup",player.__paella_key_event_listener__);
        delete window.__paella_key_event_listener__;
        delete window.__paella_shortcuts_player__;
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

    async getDictionaries() {
        return {}
    }
}
