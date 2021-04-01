
# Button plugin

They allow adding buttons to the playback bar, located at the bottom of the player. With the default style sheet configuration, the buttons are placed below the progress indicator.

The buttons can be aligned to the right or left of the playback bar. By default, this setting is specified in the configuration.



```javascript
import { ButtonPlugin } from 'paella-core';

export default class MyButtonPlugin extends ButtonPlugin {
  get side() {
  	return "left"; // or right  
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