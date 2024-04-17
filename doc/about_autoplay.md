## About autoplay

## Autoplay policies

Autoplay consists of starting video playback as soon as the page loads, without user interaction. This feature is restricted by default in all browsers, in order to avoid invasive advertising through videos. The default configuration of browsers prevents the playback of videos that have an audio track, or that are not muted. This can be further restricted by the user, as it is possible to disable automatic playback completely, even on videos with muted audio. All this applies to the JavaScript playback API: the `play()` function will only work if the browser's autoplay policies allow it, or if the call to that function has been triggered by a user event, e.g. the `click` event.

If a video cannot be played due to user permission policies, an exception is thrown and the loading is interrupted. This would not be a problem, because the user can always click the play button to start playback. As the action is triggered by a user event, this would not be a problem.

## Synchronisation of videos in `paella-core`

As `paella-core` is a multi stream player, it needs some information about the loading of the videos in order to synchronise all the video streams. We cannot start playing a video if the other videos are not ready to play, otherwise it could happen that one of the videos loads first, starts playing and the other video is still loading.

To control this, the `load` function of each video is asynchronous, and is designed to pause execution until the video is loaded. This is implemented by the HTML video's native `loadedmetadata` and `canplay` events.

## Problem with video events in Safari

We're not sure if this is a bug or expected behaviour, but currently desktop Safari does not fire the `loadedmetadata` and `canplay` events if the video has not started playing. For this reason, in order for the `load` function not to get stuck, it is necessary to make a call to `play()` inside, to ensure that the `loadedmetadata` and `canplay` events are called.

To play a video in `paella-core` there are two options:

- Call the `loadManifest()` function: the basic video information is loaded, but does not start playing. The video will start playing when the user initiates playback with a mouse event.
- Call the `load()` function: loads the basic information for the video, then loads the video and starts playing it.

The actual loading of the video streams is done in the `load()` function. At this point, due to problems with the `canplay` event, a `play()` call is made on the video. If the `load()` call has not been triggered by a user event, it will fail with an exception. The problem with this is that, on failure of this call, the `load()` function will crash. The clearest symptom of this is that the video will just keep loading indefinitely.

## `paella-core` no permite autoplay

The problem we have is that a playback failure due to browser policies will crash the player. In previous versions autoplay was allowed, but this triggered a lot of bug reports from users due to this bug. Not all browsers have problems, but our philosophy is to give a consistent experience across browsers. For this reason, the `load()` API of `paella-core` is only allowed to be called when triggered by a user event. No explicit control is made to prevent the call from working if this requirement is not met, but in any case the behaviour of calling `load()` outside an action triggered by a user event is not defined, and therefore this is not supported.

We will evaluate whether it is possible to modify the video synchronisation system in future versions of `paella-core`, so that it does not require a wait for the video to be ready for playback, but at the moment this change is too big to implement without affecting the lifecycle.




