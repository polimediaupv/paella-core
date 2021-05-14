# Paella Player 7 documentation

## About Paella Player 7

[Presentation](paella_player_7_presentation.md)



## Getting started

[Tutorial. Create your own paella player](tutorial.md)

[Video manifest (data.json)](video_manifest.md): the video manifest is a set of resources that compose the video, specified in JSON format.

[Embedding Paella Player in a React application](paella_react.md)

[Embedding Paella Player in a Svelte application](paella_svelte.md)



## Reference

[Initialization](initialization.md): initialize paella and customize the default parameters and settings.

[Events](events.md): events that Paella Player triggers during the player's live cycle

[The video container](video_container.md): is the element that displays the different videos within its area, and manages the layout of these videos through plugins.

[The Stream Provider](stream_provider.md): is responsible for managing the synchronization of the different video streams, and handling the soft trimming.

[Captions](captions.md): APIs to load captions and subtitles.

[Plugins](plugins.md): introduction to the plugin system in Paella Player 7

[Video layout](video_layout.md): how to implement plugins to distribute the position of the video streams in the player container area.

Add buttons to the playback bar:

- [Button plugins](button_plugin.md): simple click button to execute an action.
- [Popup button plugins](popup_button_plugin.md): a button that shows a popup window to display custom content.
- [Menu button plugins](menu_button_plugin.md): a special type of popup button plugin that shows a menu.

[Video plugins](video_plugin.md): Extend the video formats that Paella Player can handle.

Video plugin formats available in [paella core](https://github.com/polimediaupv/paella-core):

- [Image video plugin](image-video-plugin.md)
- [MP4 video plugin](mp4-video-plugin.md)

[Data plugins](data_plugins.md): provides an interface to implement communication with the backend through the use of plugins

[Captions plugins](captions_plugins.md): allows to load different formats of captions.


