# Progress indicator customization

## Remaining time text

The progress indicator text is used to show the current time of the video. It can be customized in several ways. It can be displayed above the progress bar aligned to the left or to the right, it can be displayed in the button area or it can be hidden. These settings can be specified in the player configuration, in the `progressIndicator` section.

```json
{
    "progressIndicator": {
        "showTotal": true,
        "parentContainer": "progressIndicator",
        "side": "left", 
        "visible": true
    }
}
```

**`showTotal` (`true`|`false`):** Indicates if we want to show or hide the total time of the video.
**`parentContainer` (`progressIndicator`|`buttonArea`):** Indicates whether we want to display the text above the progress indicator or below it, in the button area.
**`side` (`left`|`right`):** Indicates whether we want to display the text aligned to the left or to the right of the container.
**`visible` (`true`|`false`):** It allows to hide the text.

## Appearance of the progress indicator

The styles of the progress indicator can be set via CSS (see the [documentation about customization](customization.md)). However, the progress indicator has several elements that can be shown or hidden through the player settings.

```json
{
    "progressIndicator": {
        "showHandler": true,
        "hideHandlerOnMouseOut": true,
        "showRemainingProgress": true
    }
}
```

**`showHandler` (`true`|`false`):** If `true`, a handle will be displayed at the current time instant of the video. By default it has a circle shape, but its appearance can be changed through CSS styles.
**`hideHandlerOnMouseOut` (`true`|`false`):** If `true`, the handler will only be visible when the mouse is over the playback bar. This parameter has no effect if `showHandler` is `false`.
**`showRemainingProgress` (`true`|`false`):** If `true`, a bar will be displayed showing the remaining time of the video.
