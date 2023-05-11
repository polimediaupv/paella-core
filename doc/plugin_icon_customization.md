# Plugin icon customization (paella-core >= 1.2)

As a general rule, it is not possible to customize the icons of third-party library plugins, as it is the plugin's responsibility to set its icon. However, if we want our plugin to support icon customization, we can use the following features that are available as of `paella-core` v1.2

## `Paella.getCustomPluginIcon(pluginName,iconName)`

This function is designed to be used from the plugin code. It is used to obtain a custom icon for that plugin. Custom icons are identified by the plugin identifier and a name that has to be unique to that icon, within that plugin.

If the icon has not been customized, then this function will return `null`. The following example is extracted from the code of the `es.upv.paella.playPauseButton` plugin, which uses two different icons for play and pause:

```js
import defaultPlayIcon from 'paella-core/icons/play.svg';
import defaultPauseIcon from 'paella-core/icons/pause.svg';

export default class PlayButtonPlugin extends ButtonPlugin {
	async load() {
		const playIcon = this.player.getCustomPluginIcon(this.name,"play") ||
                         defaultPlayIcon;
		const pauseIcon = this.player.getCustomPluginIcon(this.name,"pause") ||
                         defaultPauseIcon;
		this.icon = playIcon;
        ...
```

If the icon has not been customized, the `getCustomPluginIcon` function will return `null`, and therefore the icon defined by the plugin will be assigned, and otherwise the custom plugin will be used.

Because support for icon customization depends on each plugin implementing it via the above APIs, each third-party plugin library must detail whether the plugins it exports are supported, and document the corresponding names of each icon. The plugin libraries maintained by the Universidad Politécnica de Valencia detail this information in the `README.md` ficehro of each github repository.

## `Paella.addCustomPluginIcon(pluginName,iconName,svgData)`

On the code side of the video player, the programmer can set the custom icons using this function, which receives the plugin identifier, the icon name and the icon text in SVG format as a parameter. Remember that, as stated in the documentation on button type icons, plugin icons can only be set in SVG format, so this function can only receive icons in SVG text format.

The following code is extracted from the debug player example defined in the `paella-core` source code. In this case, we have used Webpack's SVG text importer to load the icon from a file, but we could also pass a valid SVG text string embedded in the JavaScript code:

```js
...
import testIcon from './icons/play_icon_fullscreen.svg';
...

paella.loadManifest()
		.then(() => {
			paella.addCustomPluginIcon("es.upv.paella.playPauseButton","play",testIcon);
		)})
		.catch(e => paella.log.error(e));
```

## `Paella.removeCustomPluginIcon(pluginName,iconName)` (paella-core >= 1.32)

Allows you to delete a custom icon. This function removes the icon from the custom icon registry, but does not change it in the plugin where it is used. For the changes to take effect, the player must be restarted with the `paella.reload()` or `paella.unload()` APIs.

```js
paella.removeCustomPluginIcon("es.upv.paella.playPauseButton","play");
paella.reload();
```

## Summary

There are APIs to customize plugin icons, but it must be noted that the plugin must support it. It may be the case that the developer of a plugin does not want the icon he has used to be modified, and in this case the `addCustomPluginIcon` function will have no effect. 

However, it is still possible to customize the icon if we define a new plugin and override the `init` method.

```js
// Note: this is an example. Check the actual `paella-basic-plugins` repository
// documentation to get more info about the exported plugin classes. 
import { VolumePlugin } from 'paella-basic-plugins';

import MyIcon from '../icons/my-volume-icon.svg';

export default class MyVolumePlugin extends VolumePlugin {
    async load() {
        super.load();
        this.icon = MyIcon;
    }    
}
```

For more information, check the document [Customization](customization.md).
