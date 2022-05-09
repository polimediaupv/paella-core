# paella-core documentation

## About Paella Player 7

[Presentation](paella_player_7_presentation.md)

## Paella Player 6.x and earlier versions

[Documentation at github](https://github.com/polimediaupv/paella/tree/develop/doc)

## Getting started

[Tutorial. Create your own paella player](tutorial.md)

[Video manifest (data.json)](video_manifest.md): the video manifest is a set of resources that compose the video, specified in JSON format.

[Embedding Paella Player in a React application](paella_react.md)

[Embedding Paella Player in a Svelte application](paella_svelte.md)

[Create a plugin module from scratch](plugin_module_tutorial.md): a step-by-step tutorial on how to create a plugin module for `paella-core`.


## Reference

[Initialization](initialization.md): initialize paella and customize the default parameters and settings.

[Player life cycle](life_cycle.md): change Paella Player state (UNLOADED, MANIFEST, LOADED).

[Log](log.md): write messages to the console using the logging API

[Events](events.md): events that Paella Player triggers during the player's live cycle

[The video container](video_container.md): is the element that displays the different videos within its area, and manages the layout of these videos through plugins.

[The Stream Provider](stream_provider.md): is responsible for managing the synchronization of the different video streams, and handling the soft trimming.

[Captions](captions.md): APIs to load captions and subtitles.

[Multiple audio tracks](multiaudio.md): Explains how to access the APIs supporting videos with multiple audio tracks.

[Plugins](plugins.md): introduction to the plugin system in Paella Player 7

[paella-core plugins](paella-core-plugins.md): list of plugins that paella-core includes as standard.

[Video layout](video_layout.md): how to implement plugins to distribute the position of the video streams in the player container area.

[Pop Up API](pop_up_api.md): how to show pop up windows.

Add buttons to the playback bar:

- [Button plugins](button_plugin.md): simple click button to execute an action.
- [Popup button plugins](popup_button_plugin.md): a button that shows a popup window to display custom content.
- [Menu button plugins](menu_button_plugin.md): a special type of popup button plugin that shows a menu.
- [Button group plugins](button_group_plugin.md): create groups of buttons in a pop up window.

[Video plugins](video_plugin.md): Extend the video formats that Paella Player can handle.

Video plugin formats available in [paella core](https://github.com/polimediaupv/paella-core):

- [Image video plugin](image-video-plugin.md)
- [MP4 video plugin](mp4-video-plugin.md)
- [hls video plugin](hls-video-plugin.md)
- [hls live (and low latency) video plugin](hls-live-video-plugin.md)

[Data plugins](data_plugins.md): provides an interface to implement communication with the backend through the use of plugins

[Captions plugins](captions_plugins.md): allows to load different formats of captions.

[Event plugins](event_log_plugins.md): capture events to trigger actions using a plugin.

[Keyboard Shortcut plugins](key_shortucts.md): add shortcuts to handle player actions.

[Exported plugin classes](exported_plugins.md): in this document you can check the list of the built-in plugin classes exported by `paella-core`. You can extend these plugins in your player to extend their default features.

[Localization](localization.md): translate text strings, add dictionaries and set up your preferred localization library in Paella Player.

[Utilities](utils.md): common-use utility package.

[Predefined plugins](predefined_plugins.md): List of plugins included in `paella-core`

[Customization](customization.md): modification and customisation of different elements of the user interface and player design.

[Styles](styles.md): define custom colors and skins.

## Plugin repositories

- [Paella basic plugins](https://github.com/polimediaupv/paella-basic-plugins): collection of basic plugins for paella-core.
- [Paella slide plugins](https://github.com/polimediaupv/paella-slide-plugins): A set of plugins to handle slides for paella-core.
- [Paella zoom plugin](https://github.com/polimediaupv/paella-zoom-plugin): A [canvas plugin](canvas_plugin.md) to zoom videos for paella-core.
- [Paella user tracking plugins](https://github.com/polimediaupv/paella-user-tracking): It contains basic plugins for capturing user events, such as button or key presses, and other video events
