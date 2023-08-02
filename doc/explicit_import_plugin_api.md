# Explicit import plugin API (paella-core >= 1.41)

## Motivation

The plugin import system of `paella-core` 1.0 allows to import all plugins of a plugin module using a `plugin context` object. This import system is based on a feature of [Webpack](https://webpack.js.org).

This system is very convenient because:

- It automates the import of plugins. You simply have to create the files with the plugin implementation in the folder associated to the context.
- It automates the import of plugin modules. The system is able to distinguish whether a file is a plugin or a plugin module.
- It generates the plugin identifier automatically from the file name.

However, all these advantages come with a very important drawback: it depends on the building system, in this case Webpack. JavaScript-related technologies are advancing and changing very quickly. At the time of writing (August 2023) there are much better alternatives to webpack. Since the first versions of Paella Player, when it was a monolithic video player, we have gone through several technologies that have so far disappeared and are no longer maintained.

To avoid these problems, for `paella-core` 2.0 we have the objective of dispensing with any building system, so that the programmer is the one who decides which system he wants to use when creating the player. To do this, first of all we have to replace the plugin import system by a system that does not depend on Webpack, and from this need comes the new plugin import API explicitly.

## Migration

The new API is compatible with the old one, and in fact they can be used simultaneously. From version 1.41 onwards, the context-based API will be deprecated at some point. In version 2.0 only the explicit import API will be available.

## Explicit import

The name of the API comes from the fact that plugins are imported one by one explicitly. We no longer have a plugin context in which all plugins in the directory are imported, but we have to import the plugin classes we want to use one by one.

The import is done through the `initParams` object, using the `plugins` property, which is an array. Anyway, the `paella-core` plugins are imported automatically:

```js
import { Paella } from 'paella-core'
import { FullscreenButtonPlugin } from 'paella-basic-plugins'

const player = new Paella('player-container', {
    plugins: [
        FullscreenButtonPlugin
    ]
});
...
```

It is possible to import plugins in two different ways:

- Add the plugin class to the `plugins` array, directly. In the example above this method is used. When plugins are imported in this way they are enabled by default, that is, it is not necessary to add the plugin to the configuration and set its `enabled` property to `true`.
- Add an object to the `plugins` array, containing the plugin class and the default configuration. The idea of using this method is that an initial default configuration can be set, for example, if we want to add plugins that are not enabled by default. The `paella-core` plugins are imported using this method so that they are disabled by default, and this API works the same way the context-based plugin API worked.

```js
import { Paella } from 'paella-core'
import { FullscreenButtonPlugin } from 'paella-basic-plugins'

const player = new Paella('player-container', {
    plugins: [
        {
            plugin: FullscreenButtonPlugin,
            config: {
                enabled: false
            }
        }
    ]
});
...
```

The configuration we pass in the `plugins` array is the default configuration, that is, the configuration parameters in the `config.json` file will take precedence over the ones we set in `initParams`.

If we want to import many plugins, this method is much more tedious. Fortunately, the plugin libraries export an array with the plugins to perform the import via the explicit API. The name of this resource is specified in the documentation of each plugin library:

```js
import { Paella } from 'paella-core';
import { basicPlugins } from 'paella-basic-plugins';

const player = new Paella('player-container', {
  plugins: [
    ...basicPlugins
  ]
});
...
```

If a plugin is imported twice, it will take priority the second time it appears in the array. This can happen when we use plugin arrays, as in the example above, but then want to explicitly add another plugin to set a default configuration. It can also happen with `paella-core` plugins, as these are always imported by default, and it is possible that after importing them we want to change some configuration parameter:

```js
import { Paella, PlayPauseButtonPlugin } from 'paella-core'
import { basicPlugins, FullscreenButtonPlugin } from 'paella-basic-plugins'

const player = new Paella('player-container', {
    plugins: [
        ...basicPlugins,
        {
            plugin: PlayPauseButtonPlugin,
            config: {
                enabled: true
            }
        },
        {
            plugin: FullscreenButtonPlugin,
            config: {
                enabled: true,
                side: 'right'
            }
        }
    ]
});
...
```

## Plugin definition

When creating plugins, there are a couple of things to do to make them compatible with the explicit import API:

- It is necessary to define the plugin identifier manually, since the explicit import system cannot obtain the plugin name from the file.
- If the plugin belongs to a plugin module, the module instance must be returned.

### Plugin identifier

The plugin identifier is implemented by the `get name()` property. The default implementation returns the name of the file defined by the plugin context API, so this property will return `undefined` if the plugin is imported with the explicit API. By convention, and also for compatibility, the plugin identifier is defined as the file name, without the `.js` extension:

**es.upv.paella.myButtonPlugin.js:**

```js
import { ButtonPlugin } from 'paella-core'

export default class MyButtonPlugin extends ButtonPlugin {
    get name() {
        return super.name || "es.upv.paella.myButtonPlugin";
    }
    ...
}
```

### Plugin module

All plugins belonging to a module must return the same instance of the plugin module. using the `getPluginModuleInstance` function. We can use several patterns to implement this functionality:

- Via a singleton defined in the PluginModule class. After this, each plugin can return a call to the singleton function. The problem with this method is that we have to remember to add the `getPluginModuleInstance` function in each plugin we implement.
- By means of one or several base classes that implement the `getPluginModuleInstance` function. The problem with this approach is that a plugin module may have more than one plugin type. In this case, you would have to define a base class for each plugin type. Of course, using this method you'll need to use the PluginModule singleton to get an unique instance for all the plugin types.

#### Example: use a singleton in PluginModule

**MyPluginModule.js:**

```js
import { PluginModule } from "paella-core"

let g_singleton = null;

export default class MyPluginModule extends PluginModule {
    static Get() {
        if (!g_singleton) {
            g_singleton = null;
        }
        return g_singleton;
    }
    ...
}
```

**es.upv.paella.myPlugin.js:**

```js
import { ButtonPlugin } from "paella-core"
import MyPluginModule from "MyPluginModule"

export default class MyPlugin extends ButtonPlugin {
    getPluginModuleInstance() {
        return MyPluginModule.Get();
    }

    get name() {
        return super.name || "es.upv.paella.myPlugin";
    }
    ...
}
```

#### Example: use one or more base classes

**MyButtonPluginBase.js:**

```js
import { ButtonPlugin } from "paella-core"
import MyPluginModule from "MyPluginModule"

export default class MyButtonPluginBase extends ButtonPlugin {
    getPluginModuleInstance() {
        return MyPluginModule.Get();
    }
}
```

**MyMenuPluginBase.js:**

```js
import { MenuButtonPlugin } from "paella-core"
import MyPluginModule from "MyPluginModule"

export default class MyMenuButtonPluginBase extends MenuButtonPlugin {
    getPluginModuleInstance() {
        return MyPluginModule.Get();
    }
}
```

**es.upv.paella.buttonPlugin1.js:**

```js
import MyButtonPluginBase from "MyButtonPluginBase"

export default class ButtonPlugin1 extends MyButtonPluginBase {
    get name() {
        return super.name || "es.upv.paella.buttonPlugin1";
    }
    ...
}
```

**es.upv.paella.menuButtonPlugin1.js:**

```js
import MyMenuPluginBase from "MyMenuPluginBase"

export default class MenuPlugin1 extends MyMenuPluginBase {
    get name() {
        return super.name || "es.upv.paella.menuButtonPlugin1";
    }
    ...
}
```

If your plugin library defines many plugins of each type, you may find it useful to create base classes for each plugin type. Otherwise it will probably be easier to add the `getPluginModuleInstance()` function to each plugin. What you MUST NEVER DO is to create an instance of the PluginModule in each `getPluginModuleInstance` function. If you do this, `paella-core` will interpret each plugin as belonging to a different module:

```js
export default class MyPlugin extends ButtonPlugin {
    getPluginModuleInstance() {
        // NEVER DO THIS
        return new MyPluginModule();
    }
    ...
}
```

