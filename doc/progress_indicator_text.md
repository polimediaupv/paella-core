# Progress indicator text

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

