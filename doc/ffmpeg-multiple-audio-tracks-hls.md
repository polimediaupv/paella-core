# Using ffmpeg to generate an HLS with multiple audio tracks

As an example we are going to encode a video expample with tree audio tracks.

Our example files are:

- video_1080p.mp4 (video source, 1920x1080)
- audio.en.mp3 (audio file, language: english)
- audio.es.mp3 (audio file, language: spanish)
- audio.de.mp3 (audio file, language: german)

We are going to generate three video tracks with diferent qualities and three audio tracks.
Our final `m3u8` file will have six tracks.

## Basic Steps to HLS Packaging using FFmpeg

Okay, let’s see what the fundamental steps to packaging a VOD file using HLS are, shall we?

1. read an input video and audios from disk.
2. scale/resize the video to the multiple resolutions required.
3. transcode each of the scaled videos to the required bitrates
4. transcode the audio to the required bitrates.
5. create a master playlist that points to each of the audio/video tracks.

Now, let’s tackle this step by step, shall we?

## Resize a Video to Multiple Resolutions using FFmpeg

Okay, Step 1 and 2 involve reading a video from disk and scaling it to multiple resolutions. This can be done in a single command as follows:
```
ffmpeg -i video_1080p.mp4 \
-i audio.en.mp3 -i audio.es.mp3 -i audio.de.mp3 \
-filter_complex \
"[0:v]split=3[v1][v2][v3];\
[v1]copy[v1out];\
[v2]scale=w=1280:h=720[v2out];\
[v3]scale=w=640:h=360[v3out]"
```

Here, we are reading the video and the three audio files, and is scaling the input video to 1080p, 720p, and 360p.

## Transcode a Video to Multiple Bitrates for HLS Packaging using FFmpeg

Next, we have to transcode the video to multiple bitrates as is typically done for ABR Video Streaming.

```
-map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map [v3out] -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
```

> **_Note:_** You can also choose your own encoding parameters and modify it to your liking and requirements. I’ve used some simple parameters to mimic a CBR encode in this example. There are probably a zillion ways to transcode your videos using FFmpeg. You can choose between a combination of presets, crf values, CBR settings, etc...

**Importantly**, we have set the `-keyint_min` value to `48` which should force a keyframe periodically as this is very important in ABR streaming.

## Encode the audio for HLS Packaging using FFmpeg

Next, we have to encode each of the three audio tracks to support mutiples languages.

```
-map 0:a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
-map 1:a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
-map 2:a:0 -c:a:2 aac -b:a:2 48k -ac 2 \
```

## Creating HLS Playlists (m3u8) using FFmpeg

Now that we have the commands to transcode a video into multiple bitrate variants, let’s start creating HLS VOD Playlists FFmpeg.

Some of the important settings that are needed for HLS packaging are:

- `hls_playlist_type=vod`: By setting this value, FFmpeg creates a VOD playlist, inserts `#EXT-X-PLAYLIST-TYPE:VOD` into the m3u8 header and forces `hls_list_size` to 0.
- `hls_time seconds`: We need to use this to set the target segment length in seconds.
    * The default value is 2 seconds and the segment will be cut on the next key frame after this time has passed.
    * That is why it is important for us to make sure that there is a Key frame at the end of every N seconds for each of the bitstream variants so that they align with each other.
- `hls_segment_type`: this takes on two values – `mpegts` or `fmp4` and creates either TS segments or fmp4 (CMAF) segments.
- `hls_flags` independent_segments: Add the `#EXT-X-INDEPENDENT-SEGMENTS` to playlists when all the segments of that playlist are guaranteed to start with a Key frame.
- `hls_segment_filename filename`: this is used to name the segments that are created during the packaging process.
- `master_pl_name`: create an HLS master playlist (m3u8)


```
-f hls \
-hls_time 2 \
-hls_playlist_type vod \
-hls_flags independent_segments \
-hls_segment_type mpegts \
-hls_segment_filename stream_%v/data%02d.ts \
-master_pl_name manifest.m3u8 \
-var_stream_map "a:0,agroup:audio,default:yes,language:en,name:en a:1,agroup:audio,default:no,language:es,name:es a:2,agroup:audio,default:no,language:de,name:de v:0,agroup:audio,name:1080 v:1,agroup:audio,name:720 v:2,agroup:audio,name:360" \
stream_%v/stream.m3u8
```

## Final Script for HLS Packaging using FFmpeg – VOD

```
ffmpeg -i video_1080p.mp4 \
-i audio.en.mp3 -i audio.es.mp3 -i audio.de.mp3 \
-filter_complex \
"[0:v]split=3[v1][v2][v3];\
[v1]copy[v1out];\
[v2]scale=w=1280:h=720[v2out];\
[v3]scale=w=640:h=360[v3out]"
-map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map [v3out] -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
-map 0:a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
-map 1:a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
-map 2:a:0 -c:a:2 aac -b:a:2 48k -ac 2 \
-f hls \
-hls_time 2 \
-hls_playlist_type vod \
-hls_flags independent_segments \
-hls_segment_type mpegts \
-hls_segment_filename stream_%v/data%02d.ts \
-master_pl_name master.m3u8 \
-var_stream_map "a:0,agroup:audio,default:yes,language:en,name:en a:1,agroup:audio,default:no,language:es,name:es a:2,agroup:audio,default:no,language:de,name:de v:0,agroup:audio,name:1080 v:1,agroup:audio,name:720 v:2,agroup:audio,name:360" \
stream_%v/stream.m3u8
```

It produces a master playlist and six folders containing the individual segments, and the individual playlists for the audio/video tracks.


Here is what the master.m3u8 file looks like:

```
#EXTM3U
#EXT-X-VERSION:6
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="group_audio",NAME="audio_0",DEFAULT=YES,LANGUAGE="en",URI="stream_en/stream.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="group_audio",NAME="audio_1",DEFAULT=NO,LANGUAGE="es",URI="stream_es/stream.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="group_audio",NAME="audio_2",DEFAULT=NO,LANGUAGE="de",URI="stream_de/stream.m3u8"
#EXT-X-STREAM-INF:BANDWIDTH=5605600,RESOLUTION=1920x1080,CODECS="avc1.640032,mp4a.40.2",AUDIO="group_audio"
stream_1080/stream.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=3405600,RESOLUTION=1280x720,CODECS="avc1.64001f,mp4a.40.2",AUDIO="group_audio"
stream_720/stream.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1205600,RESOLUTION=640x360,CODECS="avc1.64001e,mp4a.40.2",AUDIO="group_audio"
stream_360/stream.m3u8
```

You can see that the master playlist references the individual playlists for the tracks.


## Worth reading

- [Using FFmpeg as a HLS streaming server](https://www.martin-riedl.de/2020/04/17/using-ffmpeg-as-a-hls-streaming-server-overview/)
