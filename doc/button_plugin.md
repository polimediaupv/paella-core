
# Button plugin

Allows you to add buttons in two different locations:

- The playback bar, located at the bottom of the Paella Player container. In this case, the buttons are added below the time bar.
- The video container, at its top margin.

The buttons can be aligned to the right or left of the playback bar. By default, this setting is specified in the configuration.


```javascript
import { ButtonPlugin } from 'paella-core';

export default class MyButtonPlugin extends ButtonPlugin {
  get side() {
  	return "left"; // or right  
  }
  
  get parentContainer() {
    return "playbackBar";  // or videoContainer
  }

  async mouseOver(target) {
    
  }
  
  async mouseOut(target) {
    
  }
  
  async action() {
    
  }
}
```



## Methods that can be overwritten

Apart from the `Plugin` methods, `ButtonPlugin` provides three methods and one property that can be overridden:

- `get side()`: returns the end where we want to place the button. The default implementation gets this value from the configuration. This method should be overridden only in case we want the button to be always displayed in the same place, regardless of the configuration.
- `get parentContainer()`: returns the container where we want to add the button, which can be either `playbackBar` or `videoContainer`. If this function is not overridden, the value is obtained from the plugin configuration, and if it is not specified in the configuration either, it defaults to `playbackBar`.
- `async mouseOver(target)`: is called when the mouse enters the button area. See the section on button sections below for more information.
- `async mouseOut(target)`: called when the mouse leaves one of the button areas
- `async action()`: called when the user clicks the button.
- `get titleSize()`: is used to set the font size of the button title. It can return `small`, `medium` or `large`.


## Button elements

Internally, the button is composed of four DOM elements:

- `container`: is the container that encompasses the other three parts.
- `button`: it is the clickable area of the button
- `leftArea`: is an empty area to the left of the button
- `rightArea`: is an empty area to the right of button.

All these areas are DOM elements. leftArea and rightArea are empty. The idea is that at any given time we can create a button that includes elements to the right and to the left of the button. An example of this is the volume button, which can be obtained from the [paella-basic-plugins repository](https://github.com/polimediaupv/paella-basic-plugins/blob/main/src/plugins/es.upv.paella.volumeButtonPlugin.js).

These elements are created before the plugin is loaded, so we can access them from the same load:

```javascript
async load() {
  this.leftArea.innerHTML = "Left area";
}
```

The `target` parameter in the `mouseOver` and `mouseOut` functions is the section that triggers the action (over or out), and you can use it to determine what to do in this action:

```javascript
async mouseOver(target) {
  if (target === this.button) {
    console.log("enter button");
  }
}
```



## Other ButtonPlugin APIs

`get iconElement()`: Returns the icon DOM element, that is a child of the `button` element.

`get titleContainer()`: Returns the DOM container of the button title.

`hide()`: hide the button.

`show()`: shows the button.



## Button icon

To specify the icon it is necessary to use icons in vector SVG format. This is a prerequisite, since CSS styles are used to specify the color of the icons. To do the loading, using the webpack configuration defined in the [paella player tutorial](tutorial.md), the icon will be automatically embedded in the code.

The button can be set at any time, using the `set icon()` property. For example, we can use the `async load()` method, but we can also change it at another time:

```javascript
...
import myPluginIcon1 from 'icons/my-plugin-icon-1.svg';
import myPluginIcon2 from 'icons/my-plugin-icon-2.svg';

export default class MyButtonPlugin extends ButtonPlugin {
  ...
  async load() {
    this.icon = myPluginIcon1;
  }

	async action() {
    if (this.icon === myPluginIcon1) {
      this.icon = myPluginIcon2;
    }
    else {
      this.icon = myPluginIcon1;
    }
  }
}
```

To load the SVG icons, besides using Webpack, it is possible to use a Paella Player utility that loads the icon and makes it ready to be added as a DOM element:

```javascript
import { utils } from 'paella-core';

...

const icon = await utils.loadSvgIcon(iconPath);
```

## Icon title

To specify the button text, we use the `set title()` accessor. It is possible to change the button text at any time.

```javascript
...
export default class MyButtonPlugin extends ButtonPlugin {
  ...
  get titleSize() { return "small"; }
  
  async load() {
    this.title = "Hello";
  }

	async action() {
    this.title = "World";
  }
}
```

## Configuration

The `parentContainer` property, in its default implementation, gets its value from the plugin configuration, inside the `config.json` file. This property can take several values, two of which are predefined, while the rest are arbitrary:

- `playbackBar`: The button will be placed on the playback bar. This is the default value, if any other is specified.
- `videoContainer`: The button shall be placed inside the [video container](video_container.md). In the vertical axis, the buttons are placed at the top of the container. 
- Any other value: The button will be placed inside a container that match that name. These containers can be created using plugins of type [button group](button_group_plugin.md).

As with `parentContainer`, the `side` property also takes its value from the plugin configuration. This property affects the side on the horizontal axis that the button is placed, and only affects in case `parentContainer` is the playbar or the video container. In this case, this property has only two possible values:

- `left`: The button will be placed on the left side of the playback bar or the video container.
- `right`: The button will be placed on the right side of the playback bar or the video container.

## Non-interactive buttons

It is possible to add non-interactive buttons. Although strictly speaking a non-interactive button is not a button, this allows you to create plugins that are active but not usable. For example, if we want to emphasise that the player supports subtitles, but the current video does not include them, we can add a non-interactive button.

Non-interactive buttons have mouse events, keyboard events and tab stop disabled, and include the `non-interactive` class, as explained below in the section on modifying styles.

To disable the button interaction, you must to return `false` in the property `interactive`. This property is only read at plugin load time, after calling its `isEnabled` function, and before calling its `load` function. Therefore, a button cannot change from interactive to non-interactive during the player's lifecycle:

```js
export default class MyButtonPlugin extends ButtonPlugin {
  ...
  get interactive() {
    return false;
  }
}
```

## Variable width buttons

By default, buttons have a fixed size that can be configured by CSS, as shown below. But sometimes you may want to add buttons with a variable width, for example, if you want to display text.

If you specify text and an icon, variable-width buttons place the button to the left of the text rather than over the icon.

To specify that you want variable width, you must return the `dynamicWidth` property. As with the `interactive` property, this is read before the plugin is loaded and after the `isEnabled` function is called, so this property remains the same throughout its life cycle.

```js
export default class MyButtonPlugin extends ButtonPlugin {
  ...
  async load() {
    this.icon = testIcon;
    this.title = "Dynamic width button";
  }

  get dynamicWidth() {
    return true;
  }
}
```

## Accesibility

To set up the `aria-label` attribute, you can use the `ariaLlabel` property in the button plugin configuration. In addition, the `description` property in the plugin configuration, will be used as `title` attribute in the button.

```json
{
  "plugins": {
    ...
    "es.upv.paella.myButtonPlugin": {
      "enabled": true,
      "description": "My button description",
      "ariaLabel": "My button accesibility string"
    }
  }
}
```

The texts of both attributes are translated using the [paella player dictionary system](localization.md).

In addition to using the configuration file, it is possible to define the `aria-label` text by implementing the `getAriaLabel()` function, which must return a text string. Note that the text you define in the configuration takes precedence over the text returned by `getAriaLabel()`. This function can be used to return a predefined text, which can be optionally customized by configuring the plugin.

```javascript
export default class MyButtonPlugin extends ButtonPlugin {
  ...
  getAriaLabel() {
    return "My button predefined accesibility string";
  }
  ...
}
```

## Style customization

The structure of the button plugins in the playbar is as follows:

```html
<div class="button-plugin-container">
  <div class="button-plugin-side-area left-side">
  </div>
  <button class="button-plugin ">
    <div class="interactive-button-content">
      <i class="button-icon" style="pointer-events: none">
        <svg><!-- svg icon--></svg>
      </i>
      <span class="button-title button-title-medium">
        <!-- icon text -->
      </span>
    </div>
  </button>
  <div class="button-plugin-side-area right-side">
  </div>
</div>
```

Of these elements, there are two parts that can be used by the plugin to add elements to the left or right of the button. For example, the volume plugin in the `paella-basic-plugins` library uses the right area to add the volume control on the mouse hover.

The button itself consists of the main container, which is the `<button class="button-plugin">` element, the icon, which is the `<i class="button-icon">` element and contains an SVG icon that loads the plugin within its code, and the `<span class="button-title">` element.

As button plugins can be used elsewhere in the player, the following selectors are used to style the button, icon and text:

- `.playback-bar .button-plugins .button-plugin-container button`: button on the playback bar.
- `.playback-bar .button-plugins button i`: icon on playback bar button.
- `.button-plugins span.button-title`: text on playback bar button.

In this way, we restrict the changes to those buttons that are in the playback bar. If we want to modify the buttons in the video container, then we use the following selectors:

- `.video-container .button-plugins .button-plugin-container button`: button on video container.
- `.video-container .button-plugins .button-plugin-container button`: icon on video container button.
- `.button-plugins span.button-title`: text on video container button.

Finally, button plugins can also be placed in a popup container (see documentation on button group plugins). These buttons are referenced with the following queries:

- `.button-group .button-plugin-container button`: button on a button group pop up.
- `.button-group button i`: icon on a pop up button.
- `.button-group span.button-title`: text on a pop up button.

Changes to the button's appearance will generally be made to the `button.button-plugin` element.

Remember that to load custom styles you must use [the `loadStyle` function](styles.md).

**Set the button text sizes:**

There are three possible text sizes for button titles. The use of one or another size depends on the plugin's definition, as the plugin knows best which size best suits the use. We can modify the predefined sizes of these three types with the following rules:

```css
/* Playback bar and video container */
.button-plugins span.button-title.button-title-small {
    font-size: 10px;
}
  
.button-plugins span.button-title.button-title-medium {
    font-size: 14px;
}
  
.button-plugins span.button-title.button-title-large {
    font-size: 16px;
}

/* Button group */
.button-group span.button-title.button-title-small {
  font-size: 8px;
}

.button-group span.button-title.button-title-medium {
  font-size: 10px;
}

.button-group span.button-title.button-title-large {
  font-size: 12px;
}
```

**Non-interactive buttons:** for this type of button, the `non-interactive` class is added to the button element, and the button element becomes a `<span>` instead of a `<button>`. As a non-interactive element that will no longer respond to mouse events, the side bins are also not added.

```html
<div class="button-plugin-container">
  <span class="button-plugin non-interactive">
    <div class="non-interactive-button-content">
      <i class="button-icon" style="pointer-events: none">
        <svg><!-- svg icon--></svg>
      </i>
      <span class="button-title button-title-medium">
        <!-- icon text -->
      </span>
    </div>
  </span>
</div>
```

**Button size:** the button size can be customized using the CSS variables `--button-fixed-width` and `--button-fixed-height`:

```css
:root {
  --button-fixed-width: 40px;
  --button-fixed-height: 40px;
}
```

