# Stream Provider

StreamProvider is the component in charge of managing the playback and synchronization of video streams.  It is also in charge of managing soft trimming.

In general, StreamProvider APIs are intended to be used internally, and therefore should not be used directly except for two specific cases:

- If we want to perform actions on video playback that do not generate events. The one in charge of triggering playback events (play, pause, volume change, seek, etc) is [VideoContainer](video_container.md), so if we use StreamProvider to perform these actions, no events will be triggered.
- If we want to obtain data of current instant and duration, without taking into account the trimming, the APIs in charge of this are only in StreamProvider.

StreamProvider is accessed through the [VideoContainer](video_container.md):

```javascript
myPlayerInstance.videoContainer.streamProvider
```



## Media players

At load time, StreamProvider uses the information from the video manifest regarding video streams, and takes care of creating the video players, taking into account the stream type, the installed and activated plugins, and the order in which they are loaded, in the configuration file. For more information about the configuration of the video plugins, see [this document](video_plugin.md).



## APIs

### Stream management functions

`async executeAction()`: Allows to execute a command on all video players. Returns an array with the results of the execution of that action on all video players.

```javascript
(await myPlayer.videoContainer.executeAction("currentTime"))
	.forEach(t => console.log(t));
```

`get players()`: Returns an array with the video players. 

`get streamData()`: Returns the streams information extracted from the video manifest

`get streams()`: Returns an array with the grouped information of streams, video plugins and players

`get mainAudioPlayer()`: Returns the main audio player. The main audio player is obtained from the Paella Player configuration, and from the information of the video streams.

- In the video manifeset, with the `role` property of each stream, the main audio will be the one corresponding to the first stream whose role is `mainAudio`:

```json
{	// data.json (video manifest)
  ...
  "streams": [
    {
      "sources": [...],
      "content": "presenter",
      "role": "mainAudio"
    }
    ...
  ]
}
```



- If none of the streams contains the role, then it will be the audio whose `content` is the one defined in the `defaultAudioStream` property in the player configuration:

```json
{	// config.json
  ...
  "defaultAudioStream": "presenter"
  ...
}
```



### Playback control functions

`async play()`, `async pause()`,  `async stop()`: Controls video playback.

`async paused()`: Returns true if the videos are paused. The result is a bool array, with as many elements as there are video players.

`async setCurrentTime(t)`: Sets the current time instant of all videos.

`async currentTime()`: Returns an array with the current time of all videos

`async duration()`: Returns an array with the duration of all the videos.

`async volume()`: Returns the volume of the main media player.

`async setVolume(v)`: Sets the volume of the main video player



### Trimming management functions

Of the playback control functions, those that affect the time instant all take video trimming into account. The following two functions return time instants in seconds, ignoring trimming:

`async currentTimeIgnoringTrimming()`: Returns the current time instant, ignoring trimming.

`async durationIgnoringTrimming()`: Returns the duration of the video, ignoring trimming.

`get isTrimEnabled()`: Returns true if trimming is enabled

`get trimStart()`: Returns the initial time instant of trimming.

`get trimEnd()`: Returns the trimming end time instant.

`async setTrimming({ enabled, start, end })`: Configures video trimming. Esta función genera el evento `Events.TIMEUPDATE`, de forma que si el vídeo está pausado, todos los observadores del evento puedan recalcular las propiedades del vídeo.

### Quality management functions

There are two functions to control the quality change of videos: one to get the list of available qualities and one to set the quality.

It is important to note that for the quality change mechanism to work predictably, all streams must have the same number of selectable qualities. In addition to this, it is highly recommended that both streams are played using the same plugin. If either of these two conditions are not met, the quality change may not be 100% well behaved.

`async getQualities()`: Returns the array of `VideoQualityItem` objects corresponding to the quality reference video. The reference video for qualities is the one that has more elements in its array of `VideoQualityItem` elements. If the recommendations are met and all streams have the same qualities, then the one from the main stream will be returned.

`async setQuality(q)`: Sets the current quality for the video. The parameter passed is one of the elements of the array obtained with `getQualities()`.

`async getCurrentQuality()`: Returns the `VideoQualityItem` object corresponding to the current video quality.



## Multi audio functions

The multiple audio control functions allow you to change the audio track of the main audio stream, provided that the [video plug-in](video_plugin.md) supports it. All multi audio functions work with instances of objects of the `AudioTrackData` class. More information on videos with multiple audio tracks can be found in [this document](multiaudio.md).

`async supportsMultiaudio()`: returns true if the main audio source supports multiple audio tracks.

`async getAudioTracks()`: returns an array of instances of `AudioTrackData` objects, or null if the video does not support multi audio.

`async setCurrentAudioTrack(audioTrackData)`: sets the current active audio track.

`get currentAudioTrack()`: returns the current active audio track.




