# Paella Player 7

Next fall 2021 we will release version 7 of Paella Player, which will include the most important changes since the first version was released in 2013.

Paella 7 will be a complete rewrite of Paella, aiming several issues

- Allow easier integration in other platforms by leaving out the singleton design pattern.
- Easier stlyling and accessibility support.
- Reduce the number of dependences.
- Allow easier long-term maintenance of the project.
- Solve the technical debt of 10 years of development.

The video manifest format will remain unchanged, but there are some features that have been consistently problematic and will no longer be supported. However, the biggest change has to do with the player implementation, which we have designed from scratch for the first time. For this reason, any code developed for Paella Player 6.x and earlier versions is not going to be compatible with Paella Player 7. 

We will maintain support for version 6.5 for bug fixes, although no new features will be included.

## Motivation

Since we started the development of this project, web development technologies have come a long way. The JavaScript language has undergone its biggest evolution since it was first created, with ECMAScript 2015. Web browsers are now more uniformly supported and more standards-compliant. New technologies have been added that enhance the multimedia experience, such as Media Source Extensions. Overall, at the beginning of 2021 we have a number of development technologies that allow us to create more robust software with fewer dependencies on third-party libraries.

Over the years we have tried to incorporate these improvements gradually, while maintaining backward compatibility, but we have now reached a point where we can no longer move forward with small incremental improvements.

On the other hand, although internally Paella Player is strongly oriented to plugins, the organization of the project as a large monolithic application leads more and more to the core developers of the project having to perform maintenance tasks of code that we have not created or that we are not using within the Universidad Politécnica de Valencia.

For these reasons we have approached Paella Player 7 as a new project, which we have started from scratch.


## Improvements in Paella Player 7

### Architectural improvements

Unlike previous versions, Paella Player 7 is implemented as a library and a series of independent plugins, defined in several repositories:

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



### API Improvements

**Elimination of the `paella` singleton:** Paella Player 7 is implemented using ES6 modules, so it is not intended to work as a singleton. The direct consequence of this is that the programmer is free to create the player instance, and manage it as he wants. This also means that it is possible to create more than one player on the same website.

**Styling improvements:** Styles that define the user interface are now implemented at the level of the container that is designated to load the player, instead of using the entire page frame. This makes it much easier to integrate the player within websites, without the need to use an iframe tag.

**Standardization enhancements:** Paella Player 7 APIs are designed to make it possible to implement all features of standard technologies natively, for example the support of multiple audio tracks or the playback quality selection provided by HLS with the mm3u8 format. Another example is the possibility to display the subtitles of videos in the video stream itself, making it possible to send a video with subtitles to an external device (miracast, Airplay, DLNA, etc).



### Documentation enhancements

The development of Paella Player 7 is being done in milestones, and a milestone is not complete until the documentation and corresponding examples have been completed. Documentation is being done through examples and tutorials, supported by a detailed API specification.



## Features lost since Paella Player 6.x

There are some browser APIs that can be used to display advertising in an invasive way, or abusing data consumption. In this second case, in the case of mobile devices, it can result in economic damage to the user. For this reason, browsers have added many restrictions to some APIs. The problem is that we have found that some of these APIs were used by Paella Player to perform certain actions in a more or less "imaginative" way.

For example, changing video quality in progressive download sources (mp4, ogv, webm...) was done by downloading one video and loading another. Generally, this quality change is triggered by a user event, but because a number of actions have to be performed in order, and some of them are performed asynchronously (promises, callbacks, etc.), the process is interrupted in the middle, causing many problems in some browsers.

All features that have been lost since version 6 have been removed after careful study of the options, and the conclusion that it is not possible to provide a sufficiently stable implementation. Note that for all of them (but for disable non-visible streams) there are solutions that allow those funcionalities in a better way.

These features will be deprecated in paella 7
- Multiple quality videos in progressive download format (mp4, ogv, webm, etc. files). Only the highest resolution stream in the manifest file (by default, data.json) will be loaded.
- Disable non-visible streams, although it is possible that this feature will return in the future.
- Multiple audio tracks using the "audioTag" attribute (this feature is marked as deprecated since version 6.4). For multiple audio tracks, another API is being prepared, which is expected to work only with video formats that can natively support it.

## Work-in-progress features 

The current version of Paella Player 7 is a pre-release that we are going to publish so that the community can test and make suggestions and improvements. Some features of Paella Player 6 are not included due to missing APIs, but they will be available when the first beta version is released:

- 360° video
- Chroma key
- Unload player API and automatic unload: if you have a page with more than one player, you can set Paella Player to download automatically when these conditions occur:
  - The player has exited the page scroll with a gap greater than a certain number of pixels.
  - There is another player that remains visible within the screen and it is fully loaded.
  - The video manifest contains a preview image.
  - All the players are included in the page as `<div>` elements. This feature will not work if you embed players using `<iframe>` tags.

