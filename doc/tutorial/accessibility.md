# Basic accessibility

To implement basic accessibility we will use two strategies:

- Keyboard shortcuts plugin: allows you to perform some player functions using keys.
- Plugin attributes: we will configure the `aria-label` and `tabindex` attributes to facilitate navigation using the tab and enter keys.

## Keyboard shortcuts plugin

`paella-core` includes a basic keyboard shortcut plugin with the following key configuration:

- M: toggle audio mute
- K: toggle play/pause
- J: rewind the time specified in the settings
- L: advances the time specified in the configuration
- Space: Toggle play/pause
- F: toggle fullscreen
- C: toggle captions
- Arrow left: rewind the time specified in the settings
- Arrow right: advances the time specified in the configuration
- Arrow up: volume up 10%
- Arrow down: volume down 10%
- Escape: close pop up
- U: decrease playback speed
- O: increase playback speed

In the plugin configuration options, in addition to activating the plugin, two things must be specified:

- Time increment and decrement when advancing or rewinding the video with the J, L, left arrow and right arrow keys.
- Valid playback speed settings.

In the `paella-basic-plugins` package we have available two plugins that are related to these keyboard shortcut plugin settings. They are independent plugins of the keyboard shortcuts, and have their own configuration, so for consistency we should configure them with the same settings. Next we will add the keyboard shortcut plugin settings, and we will also add the `forwardButtonPlugin`, `backwardButtonPlugin` and `playbackRateButton` plugins, which we will use to forward and rewind the video, and to select the playback speed:

```json
{
    "plugins": {
        ...
        "es.upv.paella.forwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 2,
            "time": 10,
            "suffix": true
        },

        "es.upv.paella.backwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 1,
            "time": 10,
            "suffix": true
        },

        "es.upv.paella.playbackRateButton": {
            "enabled": true,
            "side": "right",
            "rates": [0.75, 1, 1.5, 2],
            "menuTitle": "Playback Rate",
            "showIcon": false
        },

        "es.upv.paella.defaultShortcuts": {
            "enabled": true,
            "validPlaybackRates": [0.75, 1, 1.5, 2],
            "skipBackwards": 10,
            "skipForward": 10
        },
        ...
    }
}
```

Notice how the `validPlaybackRate` configuration settings in `defaultShortcuts` match `rates` in `playbackRateButton`. The same can be seen with `skipBackwards` and `skipForward`, with the `time` attribute of the `backwardButtonPlugin` and `forwardButtonPlugin` plugins.

To adjust the position of the buttons, we will also have to modify the `order` attribute of volumeButtonPlugin:

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.volumeButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 3
        },
        ...
    }
}
```

## Plugin attributes: aria-label and description

The HTML `aria-label` attribute is used to label user interface elements. This data can be read by accessibility devices to improve navigation. To define the `aria-label` tag of the button, we will use the `ariaLabel` attribute in the configuration of the button type plugins:

```json
{
    "plugins": {
        "es.upv.paella.playPauseButton": {
            "enabled": true,
            "order": 0,
            "ariaLabel": "Toggle play/pause"
        }
    }
}
```

On the other hand we have the `description` attribute. We have already used it in previous tutorials to label buttons when used in button groups, but if the plugin is to be used directly on the button bar, this text will also be used for the `title` attribute of the button. This defines the tool tip text that is displayed when the mouse is left over the button for a few seconds:

```json
{
    "plugins": {
        "es.upv.paella.playPauseButton": {
            "enabled": true,
            "order": 0,
            "ariaLabel": "Toggle play/pause",
            "description": "Toggle play/pause"
        }
    }
}
```

Both the `ariaLabel` text and the `description` text will be translated using the available dictionaries.

## Plugin attributes: tabindex

The HTML attribute `tabindex` is used to set the focus order when using the tab key. It is an incremental numeric value: when tab key is pressed, the focus will be placed on the element with the lowest `tabindex` value, and it will scroll through the rest of the elements in increasing order.

To define the `tabindex` of the buttons, we will use the `tabIndex` configuration attribute. Note that this value does not have to be related to the `order` attribute: remember that right-aligned plugins are stacked from right to left. It is recommended to define the `tabIndex` after defining the position of the elements in the interface:

```json
{
     "buttonGroups": [
        {
            "enabled": true,
            "groupName": "options",
            "aria-label": "Configuration options",
            "description": "Configuration options",
            "icon": "settings-icon.svg",
            "order": 4,
            "side": "right",
            "parentContainer": "playbackBar",
            "menuTitle": "other_settings",
            "tabIndex": 8
        }
    ],
    "plugins": {
        ...
        "es.upv.paella.playPauseButton": {
            "enabled": true,
            "order": 0,
            "ariaLabel": "Toggle play/pause",
            "description": "Toggle play/pause",
            "tabIndex": 0
        },

        "es.upv.paella.volumeButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 3,
            "ariaLabel": "Set audio volume",
            "description": "Set audio volume",
            "tabIndex": 3
        },

        "es.upv.paella.layoutSelector": {
            "enabled": true,
            "side": "right",
            "order": 2,
            "showIcons": true,
            "parentContainer": "playbackBar",
            "minContainerSize": 600,
            "description": "Select different layout 🎛️",
            "aria-label": "Select different layout",
            "tabIndex": 4
        },

        "es.upv.paella.fullscreenButton": {
            "enabled": true,
            "side": "right",
            "order": 3,
            "description": "Toggle fullscreen player 📺",
            "ariaLabel": "Toggle fullscreen",
            "tabIndex": 7
        },

        "es.upv.paella.frameControlButtonPlugin": {
            "enabled": true,
            "side": "right",
            "order": 2,
            "targetContent": "presentation",
            "description": "Navigate video using frame thumbnails",
            "ariaLabel": "Navigate video using frame thumbnails",
            "tabIndex": 5
        },

        "es.upv.paella.captionsSelectorPlugin": {
            "enabled": true,
            "side": "right",
            "parentContainer": "options",
            "description": "Select captions",
            "ariaLabel": "Select captions"
        },

        "es.upv.paella.forwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 2,
            "time": 10,
            "suffix": true,
            "description": "Seek forwards 10 seconds",
            "ariaLabel": "Seek forwards 10 seconds",
            "tabIndex": 2
        },

        "es.upv.paella.backwardButtonPlugin": {
            "enabled": true,
            "side": "left",
            "order": 1,
            "time": 10,
            "suffix": true,
            "description": "Seek backwards 10 seconds",
            "ariaLabel": "Seek backwards 10 seconds",
            "tabIndex": 1
        },

        "es.upv.paella.playbackRateButton": {
            "enabled": true,
            "side": "right",
            "rates": [0.75, 1, 1.5, 2],
            "menuTitle": "Playback Rate",
            "showIcon": false,
            "description": "Set video playback rate",
            "ariaLabel": "Set video playback rate",
            "tabIndex": 3
        },
    }
}
```

## tabindex in video canvas buttons

Ideally, in terms of user experience and usability, the tabindex should be set up in a consistent order: generally starting with the most important buttons, and thereafter in the same order, e.g. from left to right.

The problem is that the buttons that are placed on the video canvas have a variable order, and they can be shown or hidden depending on the current layout. For this reason, we cannot assign a fixed tabindex value to each button.

To solve this problem, the tabindex of video canvas buttons is set automatically when a video layout is activated. Starting from a base index, `paella-core` will assign the tabindex value to the buttons in order of appearance, from left to right. This will apply both to the buttons defined by the video layout plugin, as well as to the `VideoCanvasButton` buttons added to the video canvas.

So to finish the configuration, just set the initial tabindex for the video layout plugins. This value must be the same for all video layout plugins, since the layouts are never activated simultaneously. If we want to start the navigation by the button bar, the initial value must be higher than the highest tabindex of the rest of the buttons. El atributo que usaremos para configurar esto es `tabIndexStart`:

```json
{
    ...
    "plugins": {
        "plugins": {
        "es.upv.paella.dualVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter-presentation", "content": ["presenter","presentation"], "icon": "presenter-presentation.svg", "title": "Presenter and presentation" }
            ],
            
            "pipContentIds": [
                "presenter-presentation-pip"
            ],

            "tabIndexStart": 20
        },

        "es.upv.paella.singleVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "presenter.svg", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "presentation.svg", "title": "Presentation" }
            ],
            "dualVideoContentIds": [
                "presenter-presentation"
            ],

            "tabIndexStart": 20
        },

        "es.upv.paella.dualVideoPiP": {
            "enabled": true,
            "validContent": [
                { "id": "presenter-presentation-pip", "content": ["presenter","presentation"], "icon": "pip.svg", "title": "PiP mode" }
            ],
            "dualVideoContentIds": [
                "presenter-presentation"
            ],

            "tabIndexStart": 20
        },
        ...
    }
}
```

Once the tabindex of all plugins is configured, we can navigate through them using the tab key, and activate them using the Enter key. You can also use the spacebar key, although this key is used (by default) in the keyboard shortcuts plugin to start or stop video playback. This setting is made this way because spacebar playback has become a de facto standard in video players.

To avoid this conflict, we can use the `clickWithSpacebar` property inside the `accessibility` section. If this option is set to `false`, button activations in keyboard navigation will be performed exclusively with the Enter key.

```json
{
    ...
    "accessibility": {
        "clickWithSpacebar": false
    },
    ...
}
```

Previous tutorial: [Localization](localization.md)
Next tutorial: 