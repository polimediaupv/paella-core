
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

