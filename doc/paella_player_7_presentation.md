# Paella Player 7

Paella Player 7 represents the most important change we have made since its first version was released in 2013. 

Paella 7 has been completely rewritten, aiming several issues:

- Allow easier integration in other platforms by leaving out the singleton design pattern.
- Easier styling and accessibility support.
- Reduce the number of dependences.
- Improve stability
- Allow easier long-term maintenance of the project.
- Solve the technical debt of 10 years of development & improve stability.

Backwards compatibility is maintained at config level, since the video manifest format remain unchanged. However, at functionality level, some features that have been consistently problematic will no longer be supported. 

Player implementation has been rewritten from scratch. For this reason, any code developed for Paella Player 6.x and earlier versions will not be compatible with Paella Player 7. 

We will maintain support for version 6.5 for bug fixes, although no new features will be included.

## Motivation

Since we started the development of this project, web development technologies have come a long way. The JavaScript language has undergone its biggest evolution since it was first created, with ES6. Web browsers are now more uniformly supported and more standards-compliant. New technologies have been added that enhance the multimedia experience, such as Media Source Extensions. Overall, since the beginning of 2021, that we started developing the new Paella Player version, we have a number of development technologies that allow us to create more robust software with fewer dependencies on third-party libraries.

Over the years we have tried to incorporate these improvements gradually, while maintaining backward compatibility, but we have now reached a point where we can no longer move forward with small incremental improvements.

On the other hand, although internally Paella Player is strongly oriented to plugins, the organization of the project as a large monolithic application leads more and more to the core developers of the project having to perform maintenance tasks of code that we have not created or that we are not using within the Universidad Politécnica de Valencia.

For these reasons we have approached Paella Player 7 as a new project, which we have started from scratch.

## The new Paella Player architecture

### Architectural improvements

The main difference with respect to previous versions is that, for the first time, Paella Player is no longer a web application, but a base library, surrounded by a series of other plug-in libraries, developed by the Universidad Politécnica de Valencia:

- `paella-core`: Paella Player base library. It includes the plugin management infrastructure, user interface management, event handling and basic video loading and initialization utilities. It also includes the play/pause button plugin.
- `paella-basic-plugins`: includes the plugins required for the operation of the multi stream video player, including:
  * Fullscreen button.
  * Volume.
  * Video stream layout selector.
  * Forward 30 seconds and backward 30 seconds buttons.
- `paella-slide-plugins`: includes slide management plugins:
  * Timeline navigator using slides.
  * Next/previous slide timeline navigator.
  * Slide indicator in the timeline.
- `paella-zoom-plugin`: implements a video canvas to provide video zoom.
- `paella-player`: reference application. It includes a basic implementation of Paella Player that includes the above plugin list. This repository can be used as a base to create your own player, although depending on the case, it is often advisable to create a project from scratch.
- `paella-user-tracking`: implements a basis for creating player usage monitoring plugins.

Following a more faithful approach to the open source software development model, other institutions are free to maintain their own plugin repositories to contribute improvements to the player.

Strictly speaking, we no longer have a `paella player 7`, since from now on, each project will be able to mount its own player based on `paella-core`. For this reason, the role of Paella Player 7 is taken over by `paella-core`, which starts from version `1.0.x`.

### API Improvements

**Elimination of the `paella` singleton:** `paella-core` is implemented using ES6 modules, so it is not intended to work as a singleton. The direct consequence of this is that the programmer is free to create the player instance, and manage it as he wants. This also means that it is possible to create more than one player on the same website.

**Styling improvements:** Styles that define the user interface are now implemented at the level of the container that is designated to load the player, instead of using the entire page frame. This makes it much easier to integrate the player within websites, without the need to use an iframe tag.

**Standardization enhancements:** `paella-core` APIs are designed to make it possible to implement all features of standard technologies natively, for example the support of multiple audio tracks or the playback quality selection provided by HLS with the m3u8 format. Currently, and as long as there is no other better technology in terms of supported devices and features, at the Universidad Politécnica de Valencia we are committed to HLS, therefore, `paella-core` incorporates a basic plugin with support for HLS and LL-HLS. Another example is the possibility to display the subtitles of videos in the video stream itself, making it possible to send a video with subtitles to an external device (miracast, Airplay, DLNA, etc).

**New player life cycle:** The new `paella-core` life cycle includes three states: unloaded, video manifest loaded and loaded. There are APIs capable of switching between these states, and through them it is possible to perform tasks that were not possible before. For example, we can download a player, modify the video identifier to which it points and reload it, without having to perform a complete reload of the page. With this feature we can include a `paella-core` based player in SPA applications (React, Svelte, Angular, etc.).

**More powerfull video layouts:** `paella-core` includes a number of new APIs that allow you to create much more versatile video layouts than in previous versions. For this reason, the default video layouts have been modified to make them more intuitive, and to allow them to interoperate with each other.


### Documentation enhancements

The development of `paella-core` is being done in milestones, and a milestone is not complete until the documentation and corresponding examples have been completed. Documentation is being done through examples and tutorials, supported by a detailed API specification.



## Features lost since Paella Player 6.x

There are some browser APIs that can be used to display advertising in an invasive way, or abusing data consumption. In this second case, in the case of mobile devices, it can result in economic damage to the user. For this reason, browsers have added many restrictions to some APIs. The problem is that we have found that some of these APIs were used by Paella Player 6.x to perform certain actions in a more or less "imaginative" way.

For example, changing video quality in progressive download sources (mp4, ogv, webm...) was done by downloading one video and loading another. Generally, this quality change is triggered by a user event, but because a number of actions have to be performed in order, and some of them are performed asynchronously (promises, callbacks, etc.), the process is interrupted in the middle, causing many problems in some browsers.

All features that have been lost since version 6 have been removed after careful study of the options, and the conclusion that it is not possible to provide a sufficiently stable implementation. Note that for all of them there are solutions that allow those funcionalities in a better way.

These features will be deprecated in `paella-core`:

- Multiple quality videos in progressive download format (mp4, ogv, webm, etc. files). Only the highest resolution stream in the manifest file (by default, data.json) will be loaded.
- Multiple audio tracks using the "audioTag" attribute (this feature is marked as deprecated since version 6.4). `paella-core` includes new APIs to allow the use of multiple audio tracks, using technologies that natively support this feature (e.g. HLS video streams). More information on videos with multiple audio tracks can be found in [this document](multiaudio.md).
- User authorization and authentication. Because `paella-core` is now a library, it does not make sense to include the authorization and authentication tools within it. It makes more sense for the video player itself to decide the most appropriate method of implementing these functions. To this end, the new `paella-core` APIs provide multiple points where it is possible to insert the authorization and authentication features (see document [initialization](initialization.md)).


## Work-in-progress features 

Although some features of Paella Player 6 are not included due to missing APIs, some of them will probably be available in the future.

- WebGL video canvas, including:
  * 360° video
  * Chroma key
- Thanks to the new life cycle APIs, it will be possible to unload automatically a player, for example, when a single page contains many players, and the loaded player leaves the visible area of the window through scrolling.


