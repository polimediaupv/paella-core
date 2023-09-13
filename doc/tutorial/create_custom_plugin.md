# Create custom plugin

You can extend `paella-core` using plugins. Plugins allow you to add new functions to the player in a modular way, so that the same plugins can be reused in other players.

There are many types of plugins that you can add to your player. In fact, it is impossible to cover all types of `paella-core` plugins in a single tutorial. To learn all about plugins, you can use the [reference documentation on this topic](../plugins.md).

In our case, we are going to create a button type plugin, which we can add to the player in the same way we did in the [tutorial where we added the playback bar buttons](add_plugins.md).

## Plugin file

Create a file with the name `TestButtonPlugin.js` in the same location as the `main.js` file. Insert the following code:

```js
import { ButtonPlugin } from 'paella-core';

export default class TestButtonPlugin extends ButtonPlugin {
    get name() {
        return "es.upv.paella.testButtonPlugin";
    }

    async load() {
        this.icon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-messenger" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
            <path d="M8 13l3 -2l2 2l3 -2" />
        </svg>
        `;
    }

    async action() {
        alert("Hello, World!");
    }
}
```

The `name` attribute is mandatory and has to return a unique identifier for that plugin. The `async load()` function is called just before loading the plugin, so we can use it to load resources necessary for its operation. In this case we have initialized the button icon (attribute `this.icon`). The `async action()` function, in button type plugins, is the one called when the user clicks on it.

Previous tutorial: [Create custom plugin](create_custom_plugin.md)
Next tutorial: 
