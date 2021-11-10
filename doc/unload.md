# Unload Paella Player

Once we create the Paella Player instance, it can be in three load states:

- Unloaded: The Paella Player instance is created. In this state all static parameters of the player are defined (configuration, available plugins, etc.).
- Manifest loaded: In this state the configuration, dictionaries, video manifest and some types of early loading plugins (data, keyboard shortcuts, event tracking and the like) have been loaded.
- Loaded: In this state, the video streams, the video layout plugins, the user interface and the rest of the plugins are loaded.

There are different cases in which it is useful to switch between these states, for example, in SPA applications where we want to reload a different video, or in long lists of videos where we want to download some of them to free resources.

They are several APIs with which we can move between theese states

![img/paella-player-states.svg](img/paella-player-states.svg)
