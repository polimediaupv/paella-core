# Trimming basics

`paella-core` was designed for use in the distance learning sector. Large educational institutions, such as the Polytechnic University of Valencia, usually have a number of requirements for handling their video content:

- Large numbers of recordings are made on a weekly basis.
- The recordings are usually heavy, more than one hour long, which corresponds to the duration of a class.
- It is important that the recordings are available to the students in a short time.

So that the costs of the recordings are not exorbitant, it is very important to be able to automate the recording process. For this reason, recordings are scheduled automatically. The problem with this is that it is impossible to know the exact start and end time of the class: there is always a time gap at the beginning of the video when the students enter the classroom, and the end of the class may end earlier or take a little longer.

The process of eliminating the beginning and end of the video is known as trimming.

## Soft trimming

The first step in trimming a video is simple: just mark the start and end time of the lesson. This process can be done automatically using AI techniques, or it can be done manually: the teacher can mark the start and end of the class, or a technical team can do it. In either case, the second step would be to re-encode the video to remove the leftover parts.

Let's assume that the average length of the videos is one and a half hours, and 500 videos are processed every day. It takes a lot of computing power to process all this information, and if we can't generate the videos at least as fast as they are recorded, they will accumulate over time. Students will have to wait longer and longer to be able to watch class videos.

The solution to this problem is soft trimming: the beginning and end of the video is marked, but instead of re-encoding the video, the video player takes care of skipping these parts. Surely the videos will still have to be re-encoded (e.g. to generate lower quality versions), but at least with this process, the video can be available very soon after being recorded, and the re-encoded versions can appear progressively.

`paella-core` incorporates a soft trimming system that allows to do this. The user will not notice any difference with respect to a video that has been re-encoded: the duration indicator, the current time indicator or the progress bar will behave as if the video duration was the one set by the trimming. Therefore, the user will not have access through the player to the parts of the video that are not trimmed.

**Important note:** Keep in mind that soft trimming is a software implemented solution in the player: the actual video file or stream includes all the recording, but the player is in charge of starting the playback at the initial trimming instant, and ending it at the final instant. It is important to take this into account, because an advanced user, using the browser development tools, could download the video file and have access to these parts. If we want to remove a part of the beginning or the end for privacy reasons, then this solution is not the most appropriate.

 ## Trimming API

The trimming API functions are inside [`videoContainer`](../video_container.md). To activate the trimming we will use the `setTrimming()` function, where we will pass as parameter an object with the trimming details:

- `enabled`: Enables or disables soft trimming. If the parameter is `false`, then all other parameters are optional.
- `start`: Indica el instante inicial del trimming en segundos.
- `end`: Indicates the final time instant of trimming in seconds. This time instant is expressed with respect to the total duration of the video, without taking into account the `start` parameter.

To see an example, let's set up a trimming from the 100th second to the 160th second. It is possible to use the functions of the trimming APIs after the loading of the video manifest:

```js
...
await player.loadManifest();

player.videoContainer.setTrimming({ start: 100, end: 160, enabled: true });
...
```

When playing the video, both the playback bar and the time indicator will indicate a video with a duration of one minute.

To obtain the trimming data we can use the `isTrimEnabled`, `trimStart` and `trimEnd` attributes:

```js
...
...
const start = player.videoContainer.trimStart;
const end = player.videoContainer.trimEnd;
if (player.videoContainer.isTrimEnabled) {
    console.log(`Trimming is enabled. Start: ${start}, end: ${end}`);
}
...
```

The trimming API can be used to implement plugins, but `paella-core` has a number of tools that serve to facilitate the integration of the trimming system with the server backend.

## trimming in video manifest

You can set the trimming of a video using the video manifest file. To begin with, delete the lines you added earlier to set the trimming manually.


```js
...
await player.loadManifest();

//player.videoContainer.setTrimming({ start: 100, end: 160, enabled: true });
...
```

Add a new video manifest file in the `public/repo/trimming/data.json` folder. Copy the contents of `data.json` from the `repo/repo/hls-dual/data.json` example:

```json
{
	"streams": [
		...
	],
    "frameList": [
		...
	],
	"trimming": {
		"enabled": true,
		"start": 100,
		"end": 160
	}
}
```

Load the new example video with the URL `http://localhost:5173/?id=trimming`. The player will recognize the information in the `data.json` file and will automatically set the trimming.


Previous tutorial: [Data plugins and preferences](data_plugins_and_preferences.md)
Next tutorial: 
