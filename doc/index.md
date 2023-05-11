# paella-core documentation

## About Paella Player 7

[Presentation](paella_player_7_presentation.md)

[Improvements](improvements.md): Improvements and new plugins added to the different versions of `paella-core` APIs

[About paella-core versioning](versioning.md): A detailed explanation of how the paella-core versioning system works and the other plugin libraries maintained by the Universidad Politécnica de Valencia.

[Roadmap](roadmap.md): Future implementations planned for `paella-core`.

## Paella Player 6.x and earlier versions

[Documentation at github](https://github.com/polimediaupv/paella/tree/develop/doc)

## Getting started

[Tutorial. Create your own paella player](tutorial.md)

[Video manifest (data.json)](video_manifest.md): the video manifest is a set of resources that compose the video, specified in JSON format.

[Embedding Paella Player in a React application](paella_react.md)

[Embedding Paella Player in a Svelte application](paella_svelte.md)

[Create a plugin module from scratch](plugin_module_tutorial.md): a step-by-step tutorial on how to create a plugin module for `paella-core`.

[paellaplayer.upv.es website sources](https://github.com/polimediaupv/paellaplayer.upv.es/tree/paella-7-site): the paella player website. This is a real production example of a SPA application using Svelte and `paella-core` libraries.


## Reference

[Initialization](initialization.md): initialize paella and customize the default parameters and settings.

[Configuration](configuration.md): general configuration options.

[Paella object](paella_object.md): list of APIs of the main object of `paella-core`.

[Player life cycle](life_cycle.md): change Paella Player state (UNLOADED, MANIFEST, LOADED).

[Log](log.md): write messages to the console using the logging API

[Events](events.md): events that Paella Player triggers during the player's live cycle

[The video container](video_container.md): is the element that displays the different videos within its area, and manages the layout of these videos through plugins.

[The playback bar](playback_bar.md): is the object that manages the player's playback bar, which is located at the bottom of the video container.

[The Stream Provider](stream_provider.md): is responsible for managing the synchronization of the different video streams, and handling the soft trimming.

[Playback bar customization](progress_indicator_customization.md): explains the configuration options of the current time text of the video and other elements of the progress indicator.

[Captions](captions.md): APIs to load captions and subtitles.

[Multiple audio tracks](multiaudio.md): Explains how to access the APIs supporting videos with multiple audio tracks.

[Plugins](plugins.md): introduction to the plugin system in Paella Player 7

[paella-core plugins](paella_core_plugins.md): list of plugins that paella-core includes as standard.

[Video layout](video_layout.md): how to implement plugins to distribute the position of the video streams in the player container area.

[Pop Up API](pop_up_api.md): how to show pop up windows.

Add buttons to the playback bar:

- [Button plugins](button_plugin.md): simple click button to execute an action.
- [Popup button plugins](popup_button_plugin.md): a button that shows a popup window to display custom content.
- [Menu button plugins](menu_button_plugin.md): a special type of popup button plugin that shows a menu.
- [Button group plugins](button_group_plugin.md): create groups of buttons in a pop up window.

[Video plugins](video_plugin.md): Extend the video formats that Paella Player can handle.

Video plugin formats available in [paella core](https://github.com/polimediaupv/paella-core):

- [Image video plugin](image_video_plugin.md)
- [MP4 video plugin](mp4_video_plugin.md)
- [HTML video plugin](html_video_plugin.md) (paella-core >= 1.15.0)
- [hls video plugin](hls_video_plugin.md)
- [hls live (and low latency) video plugin](hls_live_video_plugin.md)
- [audio only video plugin (paella-core >= 1.1)](audio_video_plugin.md). You should also check the documentation about the [audio canvas](audio_canvas_plugin.md)

[Data plugins](data_plugins.md): provides an interface to implement communication with the backend through the use of plugins

[Captions plugins](captions_plugins.md): allows to load different formats of captions.

[Canvas plugins](canvas_plugin.md): used to provide a viewing area for videos. This type of plugin is closely related to video format plugins, as each video format is designed to work together with one or more different canvas.

[Canvas audio plugins (paella-core >= 1.1)](audio_canvas_plugin.md): used to provide a viewing area for audio streams.

[Canvas button plugins (paella-core >= 1.7)](canvas_button_plugin.md): used to add buttons to the video canvas.

[Event plugins](event_log_plugins.md): capture events to trigger actions using a plugin.

[Keyboard Shortcut plugins](key_shortucts.md): add shortcuts to handle player actions.

[Progress Indicator plugins (paella-core >=1.2)](progress_indicator_plugin.md): customization of the playback bar.

[Exported plugin classes](exported_plugins.md): in this document you can check the list of the built-in plugin classes exported by `paella-core`. You can extend these plugins in your player to extend their default features.

[Localization](localization.md): translate text strings, add dictionaries and set up your preferred localization library in Paella Player.

[Utilities](utils.md): common-use utility package.

[DOM Utilities](dom_utilities.md): utilities to create DOM elements that can be displayed in the browser.

[Predefined plugins](predefined_plugins.md): List of plugins included in `paella-core`

[Customization](customization.md): modification and customisation of different elements of the user interface and player design.

[Button plugin icon customization (paella-core >= 1.2)](plugin_icon_customization.md): Icon customization API for plugins. Allows you to modify the icons of a plugin defined in a plugin library, provided that the plugin supports it.

[Styles](styles.md): define custom colors and skins.

[Progress indicator customization](progress_indicator_customization.md): see here the options for customizing the text indicating the current time instant of the video and other optional elements of the progress indicator bar..

[Customize loader (paella-core >= 1.5)](loader.md): how to create your own loader.

[Cookie consent API (paella-core >= 1.8)](cookie_consent.md): integrate `paella-core` with your website cookie user consent.

[Preferences API](preferences.md) (paella >= 1.19): API to manage user preferences using cookies or DataPlugins.

[Skins](skin_api.md) (paella-core >= 1.32)


## Plugin repositories

- [Paella basic plugins](https://github.com/polimediaupv/paella-basic-plugins): collection of basic plugins for paella-core.
- [Paella slide plugins](https://github.com/polimediaupv/paella-slide-plugins): A set of plugins to handle slides for paella-core.
- [Paella zoom plugin](https://github.com/polimediaupv/paella-zoom-plugin): A [canvas plugin](canvas_plugin.md) to zoom videos for paella-core.
- [Paella user tracking plugins](https://github.com/polimediaupv/paella-user-tracking): It contains basic plugins for capturing user events, such as button or key presses, and other video events
- [Paella layout plugins](https://github.com/polimediaupv/paella-layout-plugins): Contains extra layout plugins
- [Paella webgl plugins](https://github.com/polimediaupv/paella-webgl-plugins): [Canvas plugins](canvas_plugin.md) to show videos using WebGL.
