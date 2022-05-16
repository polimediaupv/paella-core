# Using wowza and SMIL files to generate an HLS with multiple audio tracks

In this example we are going to use wowza to stream HLS.

You can get mode information in wowza documentation:
- [Use alternative audio or video tracks with Apple HLS streams in Wowza Streaming Engine](https://www.wowza.com/docs/how-to-use-alternative-audio-or-video-tracks-with-apple-hls-streams)

If you don't want to use wowza, you can encode to HLS directly with ffmpeg, please read [Using ffmpeg to generate an HLS with multiple audio tracks](ffmpeg-multiple-audio-tracks-hls.md).

As in ffmpeg example, we are going to encode a video example with tree audio tracks.

Our example files are:

- video_1080p.mp4 (video source, 1920x1080)
- audio.en.mp3 (audio file, language: english)
- audio.es.mp3 (audio file, language: spanish)
- audio.de.mp3 (audio file, language: german)

We are going to generate three video tracks with diferent qualities and three audio tracks.
Finaly we sill write a `smil` file to use with [wowza streaming server](https://www.wowza.com/)

## Basic Steps

Okay, let’s see what the fundamental steps to packaging a VOD file.

1. Create the video/audio files (with ffmpeg)
    1. read an input video and audios from disk.
    2. scale/resize the video to the multiple resolutions required.
    3. transcode each of the scaled videos to the required bitrates
    4. transcode the audio to the required bitrates.

2. create a `smil` file that points to each of the audio/video tracks.

Now, let’s tackle this step by step, shall we?

## Create the video/audio files

Okay, Step 1 involve reading a video/audio files from disk, scaling it to multiple resolutions. This can be done in a single command as follows:

```
ffmpeg -i video_1080p.mp4 \
-i audio.en.mp3 -i audio.es.mp3 -i audio.de.mp3 \
-filter_complex \
"[0:v]split=3[v1][v2][v3]; \
[v1]copy[v1out]; [v2]scale=w=1280:h=720[v2out]; [v3]scale=w=640:h=360[v3out]" \
-map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 hls-multiaudio-1/1080.mp4 \
-map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 hls-multiaudio-1/720.mp4 \
-map [v3out] -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 hls-multiaudio-1/360.mp4 \
-map 1:a:0 -c:a:0 aac -b:a:0 96k -ac 2 hls-multiaudio-1/en.mp4 \
-map 2:a:0 -c:a:1 aac -b:a:1 96k -ac 2 hls-multiaudio-1/es.mp4 \
-map 3:a:0 -c:a:2 aac -b:a:2 48k -ac 2 hls-multiaudio-1/de.mp4
```

This command will generate six files:

Our example files are:

- 1080.mp4 (video source, 1920x1080)
- 720.mp4 (video source, 1280x720)
- 360.mp4 (video source, 640x360)
- en.mp4 (audio file, language: english)
- es.mp4 (audio file, language: spanish)
- de.mp4 (audio file, language: german)

## Create a `smil` file

Then you need to create a `smil` file that points to each of the audio/video tracks.

smil file (`engage-player_hls-multiaoudio-1.smil`):
```
<?xml version="1.0" encoding="UTF-8"?>
<smil>
    <head/>
    <body>
        <switch>
                <video height="1080" src="mp4:engage-player/hls-multiaudio-1/1080" video-bitrate="5114880" width="1920">
                        <param name="videoCodecId" value="avc1.66.30" valuetype="data"/>
                        <param name="videoOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag.AUDIO" value="aac" valuetype="data"/>
                        <param name="audioCodecId" value="mp4a.40.2" valuetype="data"/>
                </video>
                <video height="720" src="mp4:engage-player/hls-multiaudio-1/720" video-bitrate="332800" width="1280">
                        <param name="videoCodecId" value="avc1.66.30" valuetype="data"/>
                        <param name="videoOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag.AUDIO" value="aac" valuetype="data"/>
                        <param name="audioCodecId" value="mp4a.40.2" valuetype="data"/>
                </video>
                <video height="360" src="mp4:engage-player/hls-multiaudio-1/360" video-bitrate="128000" width="640">
                        <param name="videoCodecId" value="avc1.66.30" valuetype="data"/>
                        <param name="videoOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag.AUDIO" value="aac" valuetype="data"/>
                        <param name="audioCodecId" value="mp4a.40.2" valuetype="data"/>
                </video>
                <video src="mp4:engage-player/hls-multiaudio-1/en" system-language="en" title="English" audio-bitrate="99328">
                        <param name="audioOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag" value="EXT-X-MEDIA" valuetype="data"/>
                        <param name="cupertinoTag.GROUP-ID" value="aac" valuetype="data"/>
                        <param name="cupertinoTag.DEFAULT" value="YES" valuetype="data"/>
                        <param name="cupertinoTag.AUTOSELECT" value="YES" valuetype="data"/>
                </video>
                <video src="mp4:engage-player/hls-multiaudio-1/es" system-language="es" title="Español" audio-bitrate="99328">
                        <param name="audioOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag" value="EXT-X-MEDIA" valuetype="data"/>
                        <param name="cupertinoTag.GROUP-ID" value="aac" valuetype="data"/>
                        <param name="cupertinoTag.DEFAULT" value="NO" valuetype="data"/>
                        <param name="cupertinoTag.AUTOSELECT" value="YES" valuetype="data"/>
                </video>
                <video src="mp4:engage-player/hls-multiaudio-1/de" system-language="de" title="Deutsch" audio-bitrate="99328">
                        <param name="audioOnly" value="TRUE" valuetype="data"/>
                        <param name="cupertinoTag" value="EXT-X-MEDIA" valuetype="data"/>
                        <param name="cupertinoTag.GROUP-ID" value="aac" valuetype="data"/>
                        <param name="cupertinoTag.DEFAULT" value="NO" valuetype="data"/>
                        <param name="cupertinoTag.AUTOSELECT" value="YES" valuetype="data"/>
                </video>

        </switch>
    </body>
</smil>
```

## Copy the files to your wowza installation

You will ned to copy those files to your wowza installation in order to play your videos.

This is the folder structure in the example, yours can be diferent.
```
\  (wowza root app)
|- engage-player_hls-multiaoudio-1.smil
|- engage-player\
   |- hls-multiaudio-1\
      |- 1080.mp4
      |- 720.mp4
      |- 360.mp4
      |- en.mp4
      |- es.mp4
      |- de.mp4
```

Now, You can point to your `m3u8` file using the URL: `https://<wowza.server>/<your_app_name>/smil:engage-player_hls-multiaoudio-1.smil/playlist.m3u8`