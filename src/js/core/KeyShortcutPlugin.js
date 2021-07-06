import Plugin from 'paella-core/js/core/Plugin';

export const KeyCodes = {
    "Digit1": 49,
    "Digit2": 50,
    "Digit3": 51,
    "Digit4": 52,
    "Digit5": 53,
    "Digit6": 54,
    "Digit7": 55,
    "Digit8": 56,
    "Digit9": 57,
    "Digit0": 48,
    "KeyA": 65,
    "KeyB": 66,
    "KeyC": 67,
    "KeyD": 68,
    "KeyE": 69,
    "KeyF": 70,
    "KeyG": 71,
    "KeyH": 72,
    "KeyI": 73,
    "KeyJ": 74,
    "KeyK": 75,
    "KeyL": 76,
    "KeyM": 77,
    "KeyN": 78,
    "KeyO": 79,
    "KeyP": 80,
    "KeyQ": 81,
    "KeyR": 82,
    "KeyS": 83,
    "KeyT": 84,
    "KeyU": 85,
    "KeyV": 86,
    "KeyW": 87,
    "KeyX": 88,
    "KeyY": 89,
    "KeyZ": 90,
    "Comma": 188,
    "Period": 190,
    "Semicolon": 186,
    "Quote": 222,
    "BracketLeft": 219,
    "BracketRight": 221,
    "Backquote": 192,
    "Backslash": 220,
    "Minus": 189,
    "Equal": 187,
    "AltLeft": 18,
    "AltRight": 18,
    "CapsLock": 20,
    "ControlLeft": 17,
    "ControlRight": 17,
    "OSLeft": 91,
    "OSRight": 92,
    "ShiftLeft": 16,
    "ShiftRight": 16,
    "ContextMenu": 93,
    "Enter": 13,
    "Space": 32,
    "Tab": 9,
    "Delete": 46,
    "End": 35,
    "Help": 45,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Escape": 27,
    "PrintScreen": 44,
    "ScrollLock": 145,
    "Pause": 19
};

export default class KeyShortcutPlugin extends Plugin {

    get type() { return "keyshortcut"; }

    /**
     * 
     * @returns [{ keyCode: KeyCode, description: string, action: function }]
     */
    async getKeys() {

        return [];
    }
}
