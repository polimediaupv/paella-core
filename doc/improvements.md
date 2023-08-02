# paella-core versions

## paella-core 1.1.x

### Improvements

- [es.upv.paella.audioVideoFormat](audio-video-plugin.md) plugin added
- [es.upv.paella.audioCanvas](audio_canvas_plugin.md) plugin added

## paella-core 1.2.x

- [Plugin icon customization API](plugin_icon_customization.md) added.
- [Progress indicator plugin](progress_indicator_plugin.md) added.
- Improvements in progress indicator time configuration. For more information, see [this document](progress_indicator_customization.md).

## paella-core 1.3.x

- [Improvements in progress indicator](progress_indicator_customization.md): Now it is possible to show a handler button to seek the video timeline.
- The `enableCache` parameter in [hls plugin configuration](hls_video_plugin.md) has been renamed to `disableCache`.

## paella-core 1.4.x

- [Improvements in video container customization](video_container.md): It is now possible to place the video container on top of the playback bar, so that the playback bar does not hide the video at the bottom.
- [No interactive button plugins added](button_plugin.md): It is now possible to create non-interactive buttons, which allow you to display disabled player options, or visual elements such as logos.
- [Buttons without icon (title only)](button_plugin.md): It is now possible to create button plugins that only contain text (no icon).
- [Improvements in playback bar and buttons customization](button_plugin.md): New CSS variables added `--button-fixed-width`, `--button-fixed-height`, `--playback-bar-height` and `--button-icon-size`.
- [New DataPlugin API](data_plugins.md): Now more than one data plugin can receive `write` and `remove` operations simultaneously. Read operations are still received only by the highest priority data plugin for that context.
- [Dynamic width button plugins](button_plugin.md): Now it is possible to create variable with button plugins, which are useful for include descriptive text.

## paella-core 1.5

- The volume and playback rate values are now saved, to be restored when the player is next loaded. This function can be activated or deactivated in the configuration. By default, these features are disabled. Check [the VideoContainer documentation](video_container.md) to know more about this feature.
- `CAPTIONS_ENABLED` and `CAPTIONS_DISABLED` events added. Triggered when the user enable or disable a captions track.
- `ENTER_FULLSCREEN` and `EXIT_FULLSCREEN` events added.
- [Loader customization](loader.md): now you can create your own loader.

## paella-core 1.6

- [Menu Button Plugin title](menu_button_plugin.md): you can add a title to the menu button plugins.
- [Button Group Plugin title](button_group_plugin.md): you can add a title to the button group plugins.

## paella-core 1.7

- New plugin type: [Canvas Button Plugin](canvas_button_plugin.md): you can now put buttons in the video canvas area.

## paella-core 1.8

- [New cookie consent API implemented](cookie_consent.md), to provide a mediator between website and paella-core plugins.

## paella-core 1.9

- [Dynamic sized video layouts](video_layout.md): a series of APIs have been implemented to define dynamic video layout sizes. The layout size is dynamically adjusted according to the size available in the video container, in order to optimize the space occupied by the streams.

## paella-core 1.10

- [Playback bar improvements](playback_bar.md): new API to disable or enable the playback bar user interface.

## paella-core 1.11

- loadUrl API implemented: Now you can use the [loadUrl()](paella_object.md) function to load a compatible video file. The video must to be compatible with at least one of the [video format plugins](video_plugin.md) enabled in the player.
- Default preview image: Now you can set a [default preview image](initialization.md) at the init params or the configuration file. If a default preview image is defined, then it is not mandatory to include the `preview` metadata in the video manifest.

## paella-core 1.12

- Portrait preview image: now you can set a portrait preview image to be used when the player is shown in a portrait container. You can get more information about this feature in [video manifest](video_manifest.md) and [initialization](initialization.md) documents.

## paella-core 1.13

- New API to get all available dictionaries: `player.getDictionaries()`.
- New translation API customization features: support for `getDictionaries()` function has been added.
- Improvements in accessibility

## paella-core 1.14

- New [ButtonPlugin](button_plugin.md) attribute: `minContainerSize`. Allows to show a button plugin in playback bar only if the parent container width is greater than the `minContainerSize` attribute.


## paella-core 1.15

- [HtmlVideoFormat](html_video_plugin.md) added: support HTML multi format videos.

## paella-core 1.16

- [New ButtonPlugin APIs](button_plugin.md) to set the `name` and `id` attributes to the button.
- [New video manifest options](video_manifest.md): configure the video trimming in the manifest.

## paella-core 1.17

- Accesibility improvements in [video layout buttons](video_layout.md).

## paella-core 1.18

- It is now possible to recover the last known instant of a video.

## paella-core 1.19

- New [preferences manager API](preferences.md)
- The videoContainer now uses the preferences API to store the video settings.

## paella-core 1.20

- Now you can force the native HLS player in Safari for macOS and iPadOS browsers.
- You can setup the `popUpType` attribute of PopUpButtonPlugin in the plugin configuration.

## paella-core 1.21

- New pop up APIs: `HideTopPopUp()`, `Contains(domElement)`. [PopUp documentation](pop_up_api.md).
- Improvements in UX: two non-hierarchically related pop-ups are now prevented from opening at the same time.

## paella-core 1.22

- Now you can [create button group instances](button_group_plugin.md) from the configuration file.
- New button plugin configuration: [closePopUps](button_plugin.md).

## paella-core 1.23

- Now the PluginModule class can use the `getDictionaries()` function, to get all the dictionaries required for this plugin module.
- Default language option added to define a fallback language, in the case that the browser language does not match with any defined dicctionary.

## paella-core 1.24

- Improvements in accessibility: now it is possible to define if the space bar acts as the button click.

## paella-core 1.25

- New options in dynamic video layout settings. See the [videoContainer configuration](configuration.md) for more information.
- New API: [videoContainer.isLiveStream](video_container.md)
- New API: [progressIndicator timeline visibility](playback_bar.md)

## paella-core 1.26

- [New metadata](video_manifest.md): **visibleTimeLine**. Allows to hide the progress bar time line.
 
 ## paella-core 1.27

- [Metadata object no longer mandatory](video_manifest.md). The preview image is still mandatory, but a default one can be specified in the player configuration. [See the documentation](video_manifest.md) for more information.

## paella-core 1.28

- New configuration option added to [mp4](mp4_video_plugin.md), [hls](hls_video_plugin.md) and hls live videos: `crossOrigin`. Allows to set the `crossorigin` attribute of the `<video>` element.


## paella-core 1.29

- [Improvements in CanvasButton API](canvas_button_plugin.md): new parameters passed to `action()` function

## paella-core 1.30

- New API: [VideoContainerMessage](video_container_message.md).

## paella-core 1.31

- New utility function: [`mergeObjects(objA,objB)`](utils.md).
- New APIs for [button plugins](button_plugin.md): callbacks called on get and lost focus.

## paella-core 1.32

- New [skin API](skin_api.md)
- New customization options for [playback bar](progress_indicator_customization.md)

## paella-core 1.33

- Support for embedded icons in the [skin definition file](skin_api.md).
- Support for embedded style sheet in the [skin definition file](skin_api.md).
- Support for loading a [skin using an object](skin_api.md).

## paella-core 1.34

- Improvements in `utils.mergeObjects()` function to merge arrays.

## paella-core 1.35

- New API function: [`paella.requestedCustomIcons`](paella_object.md)

## paella-core 1.36

- New API options in [`MenuButtonPlugin`](menu_button_plugin.md): now you can use DOM elements as menu items and menu title.

## paella-core 1.37

- Better support for portrait videos
- Single video dynamic layout added


## paella-core 1.38

- Moveable and resizeable pop ups: [See PopUpButtonPlugin documentation](popup_button_plugin.md) for more information.
- Attribute "name" added to canvas button plugins
- Video layouts now include the "name" attribute in buttons.

## paella-core 1.39

- DFXP manifest plugin implemented. [See paella-core plugins](paella_core_plugins.md) for more information.

## paella-core 1.40

- New API: [frameList](paella_object.md)

## paella-core 1.41

- New API: [close all TimeLine pop ups](time_line_pop_up.md)
- [New plugin API](explicit_import_plugin_api.md)
