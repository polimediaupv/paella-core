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

## Style customization

Most of the elements in the progress bar are customised using CSS styles. Please refer to [this document to find out how to include custom styles](styles.md) using the function `loadStyle()`, as it is not enough to include them in the header of the website.

### Progress indicator handler

You can modify the handler properties using the `.progress-indicator-handler` class.

**Modify handler size:** You can modify the size of the handler with the `width` and `height` properties, also using the `margin-left` property to place it in the appropriate position. The rule is that the `margin-left` property must be half the `width` property with a negative sign.

```css
:root {
    /* Optional: you can use a CSS variable to simplify future changes */
	--handler-size: 9px;
}

.progress-indicator-handler {
    background-color: white;
	width: var(--handler-size);
    height: var(--handler-size);
	margin-left: calc(-1 * var(--handler-size) / 2);

    /* If you want to preserve the rounded shape */
    border-radius: var(--handler-size); 
}
```

**Modify handler color, borders, etc:**

All other properties can be applied directly to the `.progress-indicator-handler` class.

```css
.progress-indicator-handler {
    color: white;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 90%);

    /* If you want to set a border, you need to redefine 
       the box-sizing to border-box, to preserve the
       handler position in progress bar */
    box-sizing: border-box;
    border: 2px solid gray;

}
```

## Progress bar

Some progress bar properties are calculated by code. For example, the height of the bar may depend on what is configured in the progress bar plugins. However, the basic definition of its properties is done through CSS styles.

The progress indicator can be modified using the `.progress-indicator`, `.progress-indicator-content` and `.progress-indicator-remaining` classes. 

- `.progress-indicator`: is the container that contains all the elements of the progress indicator. Using styles, we can control its size and position horizontally, and its relative position vertically.
- `.progress-indicator-content`: this is the part of the progress bar that indicates the time that has elapsed, and is located to the left of the handler.
- `.progress-indicator-remaining`: the part of the progress bar that indicates how much time is left to finish the video.

[Progress indicator plugins](progress_indicator_plugin.md), which allow you to draw elements on this bar, can draw behind or in front of it. Two `<canvas>` elements are used to do this. In the default definition of paella-core styles, this is taken into account when setting the colours and opacities of `.progress-indicator-content` and `.progress-indicator-remaining`, because if these styles are not set correctly, the result is that we can hide the content added by these plugins. In particular, if the `.progress-indicator-content` element is completely opaque, we will hide everything that is drawn behind it.

**Size:** Use the `width` and `margin-left` property to set the size and position horizontally:

```css
.progress-indicator {
    /* Example: fill the entire toolbar with the progress bar */
    width: 100%;
    margin-left: 0%;
}
```

You can also change the height of the progress indicator container through the above class:

```css
.progress-indicator {
    height: 14px;
}
```


To define the above vertical height (`.progress-indicator` container) its important to bear in mind that the height can be modified by [progress indicator plugins](progress_indicator_plugin.md). If a progress indicator plugin does set a special height, it will always take precedence over what is defined by CSS styles. To avoid this problem, instead of defining the height of the progress bar, we will define the height of the visible elements, which are the elapsed time indicator and the remaining time indicator. So, to define the height of the progress indicator, you must to use the `height` property of the `.progress-indicator-container .progress-indicator-content` and `.progress-indicator-container .progress-indicator-remaining`.

It is important that the class selector indicates the parent of the element: `.progress-indicator-container`. Another option is to use the `!important` property for the height, although it is more advisable to use the full selector.


```css
:root {
    --progress-bar-height: 4px;
}

.progress-indicator-container .progress-indicator-content {
    height: var(--progress-bar-height);
}

.progress-indicator-container .progress-indicator-remaining {
    height: var(--progress-bar-height);
}
```

In general, changes affecting the appearance of the progress bar shall be made to the above elements, taking into account the following:

- The `.progress-indicator-remaining` container occupies the full width of the progress bar, and the `.progress-indicator-content` container is drawn over it.
- The `.progress-indicator-remaining`, `.progress-indicator-content` elements and the `.progress-indicator-handler` timeline handler are all inside the `.progress-indicator-conainer` element, which encloses them. This in turn is the container between the two `<canvas>` elements that the progress bar plugins use to draw their content:

```html
<div class="progress-indicator">
	<canvas class="progress-canvas canvas-layer-0"></canvas>
	<div class="progress-indicator-container">
		<div class="progress-indicator-content"></div>
		<i class="progress-indicator-handler"></i>
    	<div class="progress-indicator-remaining"></div>
    </div>
	<canvas class="progress-canvas canvas-layer-1"></canvas>
</div>
```

- To allow progress bar plugins to draw background content that is visible, the progress bar elements should have some transparency. This can be done either by modifying the opacity of the entire `.progress-indicator-container`, which will affect the button handle as well, or by modifying the `.progress-indicator-content` and `.progress-indicator-remaining` containers separately.

- The button handler defaults the `z-index` property to 1, so that it is always drawn above the two `<canvas>` mentioned above. To respect the way progress indicator plugins work, we should not use this technique on `.progress-indicator-remaining`.