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

Text under construction

Previous tutorial: [Data plugins and preferences](data_plugins_and_preferences.md)
Next tutorial: 