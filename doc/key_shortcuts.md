
# Key shortcut plugins

Keyboard shortcuts plugins allow to link actions with keystrokes. This type of plugin is loaded second, just after the plugins of type [event log](event_log_plugins.md), and before loading the video manifest, so that it will be possible to map keys even before the video is fully loaded.

The only function specific to the `KeyShortcutPlugin` plugins is `async getKeys()`, which returns an array with the key configuration:

```javascript
import { KeyShortcutPlugin } from 'paella-core';

export default class MyKeyShortcuts extends KeyShortcutPlugin {
    async getKeys() {
        return [
            {
                keyCode: "KeyK",
                keyModifiers: {
                    altKey: true
                },
                description: "Toggle play/pause",
                action: async event => {
                    const paused = await this.player.paused();
                    if (paused) {
                        await this.player.play();
                    }
                    else {
                        await this.player.pause();
                    }
                }
            }
        ]
    }
}
```


In addition, an object with the values of each `keycode` is also exported. In this way we can make use of the code completion tools.

```javascript
import { KeyShortcutPlugin, KeyCode } from 'paella-core';

export default class MyKeyShortcuts extends KeyShortcutPlugin {
    async getKeys() {
        return [
            {
                keyCode: KeyCode.KeyK,
                keyModifiers: {
                    altKey: true
                },
                description: "Toggle play/pause",
                action: async event => {
                    const paused = await this.player.paused();
                    if (paused) {
                        await this.player.play();
                    }
                    else {
                        await this.player.pause();
                    }
                }
            }
        ]
    }
}
```

