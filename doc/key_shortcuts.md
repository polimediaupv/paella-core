
# Key shortcut plugins

## Adding keyboard shortcuts through plugins

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

## Keyboard shortcut conflicts

In case there is more than one identical key combination registered by one or more plugins (for example, two plugins register the `M` key with the `ctrl` modifier), only the first one registered will be activated. In this case, Paella Player will launch a warning through the debug console to indicate which plugin and key combination has conflicted.

## Multiple paella player in the same page

If a web site is being developed that will have more than one active video player, it is the responsibility of the programmer to ensure that only one of them loads keyboard shortcut plugins. Keyboard shortcuts are recorded in the browser window, which is a global resource for the entire page. If there were more than one video player listening for keyboard events, it would be the case that all players on the page would act simultaneously.

To avoid this, `paella-core` has a mechanism that causes only the first player loaded on the page to register keyboard shortcut plugins. If another player subsequently tries to register keyboard shortcut plugins, they will be ignored and will not be active. Paella Player will display a warning if this happens.

## Keyboard shortcuts API

Paella Player provides an API to get the keyboard shortcuts that are registered. This API can be accessed in two ways:

- Through the exported `getShortcuts` function.

```js
import { getShortcuts } from 'paella-core';

...

console.log(getShortcuts(myPaellaInstance));
```

- Through the `getShortcuts` function of the Paella Player instance.

```js
console.log(myPaellaInstance.getShortcuts());
```

The response is an array with the list of active keyboard shortcuts. If there is a collision between two keyboard shortcuts, only the active keyboard shortcut will be returned in this list.

```js
myPaellaInstance.getShortcuts()
> [
    {
        keyCode: "KeyM",
        description: "Toggle audio mute",
        keyModifiers: {
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
            plugin: [Object (key shortcut plugin instance)]
        }
    },
    ...
]
```
