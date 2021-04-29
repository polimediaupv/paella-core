# Plugins

## Introduction

Paella Player uses plugins to extend its functionality. Each Paella Player module that can be extended by plugins defines a new plugin type and a specific API, extending the `Plugin` base class.

It is also possible to create extensible plugins via plugins in the same way: by creating a new class that extends `Plugin` or one of its subclasses.



## Create a plugin

To create a new plugin, you must select a directory to place it in. In this directory you can place one or more plugins. The selection of this directory is done by setting a require context, which is a standard feature of Webpack. This context is resolved at compile time, so the path to the plugin folder must be a static string.

The require context is set up in the Paella Player initialization parameters, using the `customPluginContext` attribute:

```javascript
const initParams = {
  customPluginContext: [
    require.context('./path/to/my/plugins', true, /\.js/)
    // Add other plugin contexts here
  ]
}
```

All other third-party plugins, which you can install from other npm packages or from other repositories, are also configured using the `customPluginContext` attribute. The developer of each plugin package must provide a function that returns the require context for that package. For example, this is how to add the basic plugins from the [paella-basic-plugins] repository (https://github.com/polimediaupv/paella-basic-plugins):

```javascript
import getBasicPluginsContext from 'paella-basic-plugins';

const initParams = {
  customPluginContext: [
    // Add my plugins
    require.context('./path/to/my/plugins', true, /\.js/),
    
    // Add basic plugins
    getBasicPluginsContext()
  ]
}
...
```



## Plugin files and plugin name

Once we have selected our plugins directory, we can create in it as many plugins as we want. All the files inside this directory will be swallowed as plugins, so if you need to create other support files, you must place them outside the directory.

Each plugin has a unique identifier, which matches the name of the JavaScript file that implements it. The convention is to include some sort of unique identifier in the name, such as your organization's URL. 

The plugin name is resolved from the file name as shown in the following table:

| file name                  | plugin name (identifier)  |
| -------------------------- | ------------------------- |
| es.upv.paella.dualVideo.js | "es.upv.paella.dualVideo" |

The plugin name will be used to identify it, for example, in the configuration file:

```json
{
  "plugins": {
    "com.mycompany.paella.myPlugin": { ... plugin configuration ... }
  }
}
```



## The Plugin base class

In the plugin file, a class extending `Plugin` must be returned by default:

```javascript
import { ButtonPlugin } from 'paella-core';

export default class MyButtonPlugin extends ButtonPlugin {
	// Plugin implementation
}
```

The base Plugin class provides the following API:

```javascript
export default class MyPlugin extends Plugin {
  // You can overwrite `isEnabled()` if you have to control
  // some extra loading condition, apart from the plugin
  // configuration
  async isEnabled() {
    return this.config?.enabled;
  }

  // You can override the `load()` method to initialize your plugin
  async load() {
    this.player;	// The instance of the player that created the plugin
    this.name;    // The plugin name, used as unique identifier. See "Plugin name" section
		this.config;  // The configuration object. See "Plugin configuration" section
		this.order;   // Loading order. See "loading order" section
  }
}
```



## Plugin configuration

The configuration of the plugin is defined in the `config.json` file, undet the `plugins` configuration object. The key of the object must match the plugin name, and the value is an object with the plugin configuration attributes. The only mandatory attribute of the confiugration object is `enabled`:

```json
{
    ...
    "plugins": {
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true
        },
        "es.upv.paella.hlsVideoFormat": {
            "enabled": true
        },
    }
}
```



## Loading order 

The order in which plugins are loaded depends on the type: when loading a plugin, all plugins of the first type will be loaded first, then all plugins of the second type, and so on.

Within each plugin type, the loading order is defined by the `order` attribute in the plugin configuration:

```json
{
    ...
    "plugins": {
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1,
        },
        "es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 0,
        },
    }
}
```

As for the loading order of plugin types, it depends on the implementation. For example, plugins of type `button`, which add buttons to the interface, will be loaded when Paella Player loads the playbar, plugins of type `video` will be loaded when Paella Player has to determine the type of video stream it has to process, and so on.



## Predefinied plugin types

### Playback bar plugins

These are plugins that allow you to add functionality to the playback bar.

**[ButtonPlugin](button_plugin.md):** They implement a simple button that performs an action when the user presses it.

**[PopUpButtonPlugin](popup_button_plugin.md):** They implement a button that displays a pop up with a content specified by the plugin itself.

**[MenuButtonPlugin](menu_button_plugin.md):** Implements a button that displays a menu with options.



### Video format plugins

These are plugins that allow you to extend the video formats supported by Paella Player. [VideoPlugin](video_plugin.md)



### Video layout plugins

These are plugins that specify the arrangement of videos in the display area. By means of video layouts we enable the playback of one or several streams simultaneously. [VideoLayout](video_layout.md)



### Video canvas plugins

If the video format plugins are used to decide the video decoding method, the video canvas plugins are responsible for determining how they will be displayed in the video container. The most basic method of representation is a `<video>` tag, and for this the `en.upv.paella.VideoCanvas` plugin is used, which is included inside `paella-core`, but other plugins can be defined to modify the video representation, for example, using a WebGL canvas to represent video in 360º, or implementing a zoom system to the video. [CanvasPlugin](canvas_plugin.md).



## Create a plugin type

You can extend Paella Player creating new plugin types. The most common case is when we need to extend a predefined plugin. For example, if we have a button type plugin, which when pressed we want to display subtitles, we can make this button in turn define a new type of plugin that allows to load subtitles from different sources.

To create a new plugin type you basically have to do three things:

- Define the base class, with all the APIs we need for the new plugin type.
- Define a type identifier. This identifier is defined by implementing the `type` attribute in the plugin base class.
- Load the plugins of that type in the site where we want to use it.

In this example, the plugin type we define serves to feed the menu of a plugin of type `MenuButtonPlugin`:

**es.upv.paella.myExtensibleMenuButtonPlugin.js:**

```javascript
import { Plugin, MenuButtonPlugin, loadPluginsOfType } from 'paella-core'

export class CustomMenuPlugin extends Plugin {
	get type() { return "custom-menu"; }
  
  getMenuItem() {
    // TODO: The plugin must override this option
    return { id: 0, title: "Untitled" };
  }
}

export default class MyExtensibleMenuButtonPlugin extends MenuButtonPlugin {
  async load() {
    this._menuItems = [];
    loadPluginsOfType(this.player,"custom-menu",(plugin) => {
      // getMenuItem is defined in the new plugin type
      this._menuItems.push(plugin.getMenuItem());
    })
  }
  
  async getMenu() {
    return this._menuItems;
  }
}
```

As you can see, we can define in the same file the plugin of type `MenuButtonPlugin` and the base class of the new plugin type, but the class to be exported by default must be the one that implements the plugin whose type is already defined, in this case, `MenuButtonPlugin`. 

To implement a new plugin of type `custom-menu`, we would import it from the same file, using the name of the class.

**es.upv.paella.myCustomMenuPlugin.js:**

```javascript
import { CustomMenuPlugin } from './es.upv.paella.myExtensibleMenuButtonPlugin';

export default class MyCustomMenuPlugin extends CustomMenuPlugin {
  getMenuItem() {
    return {
      id: Math.ceil(Math.random() * 1000),
      title: this.config.menuItemTitle
    }
  }
}
```

The configuration of both plugins can be extended at will. For example, by defining MyCustomMenuPlugin, we configure the title of the menu item in the configuration:

```json
{
  "plugins": {
    "es.upv.paella.myExtensibleMenuButtonPlugin": {
      "enabled": true,
      "side": "right",
      "order": 0
    },
    "es.upv.paella.myCustomMenuPlugin": {
      "enabled": true,
      "menuItemTitle": "Hello, World"
    }
  }
}
```



Note that it is not necessary to define both plugin classes in the same file. We could define in a separate file the class that defines our new plugin type, but note that this file cannot be placed in the plugins folder. For example, you can add your plugin class definition in a subdirectory:

**api/CustomMenuPlugin.js:**

```javascript
import { Plugin } from 'paella-core'

export default class CustomMenuPlugin extends Plugin {
	get type() { return "custom-menu"; }
  
  getMenuItem() {
    // TODO: The plugin must override this option
    return { id: 0, title: "Untitled" };
  }
}
```

**es.upv.paella.myExtensibleMenuButtonPlugin.js:**

```javascript
import { MenuButtonPlugin, loadPluginsOfType } from 'paella-core'

export default class MyExtensibleMenuButtonPlugin extends MenuButtonPlugin {
  async load() {
    this._menuItems = [];
    loadPluginsOfType(this.player,"custom-menu",(plugin) => {
      // getMenuItem is defined in the new plugin type
      this._menuItems.push(plugin.getMenuItem());
    })
  }
  
  async getMenu() {
    return this._menuItems;
  }
}
```

**es.upv.paella.myCustomMenuPlugin.js:**

```javascript
import CustomMenuPlugin from './api/CustomMenuPlugin';

export default class MyCustomMenuPlugin extends CustomMenuPlugin {
  getMenuItem() {
    return {
      id: Math.ceil(Math.random() * 1000),
      title: this.config.menuItemTitle
    }
  }
}
```

