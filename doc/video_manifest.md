# Video manifest

The video manifest is a json document that catalogs the properties and resources that make up a multi stream video for Paella Player. By default, the manifest is stored in a file named `data.json`, inside a directory named after the video identifier. To learn more about how to modify this configuration, see the [initialization](initialization.md) document.

It consists of four attributes, two of which, metadata and streams, are mandatory:

- **metadata:** Contains the cataloging data of the video.

- **streams:** It is an array with the video stream data.

- **frameList:** Is the list of thumbnails extracted from the video frames.

- **captions:** Contains the subtitle information.

Once loaded, you can access the videoManifest through the following API:

```javascript
myPlayerInstance.videoManifest
```

## Metadata

The video cataloging data is used to display the title, preview, duration and other data. In this section, the `duration` and `preview` fields are mandatory.

```json
{
  "metadata": {
    "duration": 909.13,
    "title": "Belmar 15 minutes (multiresolution)",
    "preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview.jpg",
    "related": [
      {
        "title": "HLS video stream",
        "url": "index.html?id=hls",
        "thumb": "https://repository.paellaplayer.upv.es/hls/preview.jpg",
        "id": "hls"
      }
    ]
  }
}
```

**duration:** Is the total duration of the video, in seconds. If the video has soft trimming configured, it does not have to be taken into account in the total duration computation.

**title:** Is the title of the video. The title is not used directly by any `paella-core` element, but it can be used by plugins, so, although it is not a mandatory field, it is highly recommended to include it.

**preview:** It is a preview image that identifies the video. This parameter is mandatory, as the preview image is required for the lazy load mode to work. The URL can be absolute or relative to the manifest URL.

**related:** It is information about related videos. This information is not used from `paella-core`, but can be used by plugins. This is an array with objects containing the access information for each related video. Each element of the array must contain the following fields (they are all mandatory):

- **title:** The related video title.
- **url:** The URL to access the video. It can be absolute or relative to the URL of the current video player.
- **thumb:** The video thumbnail.
- **id:** The video identifier.



## Streams

It is an array that contains the information of the streams that compose the video.

```json
{
  "streams": [
    {
      "sources": {...},
      "content": "presenter",
      "role": "mainAudio"
    },
    {
      "sources": {...},
      "content": "presentation"
    }
  ]
}
```

### Sources

Each stream can be composed of one or more video sources. Each video source contains the information to access the video in a specific format. Thus, we can have a stream with two sources, the first in `mp4` progressive download format, and the second in `hls` format. Therefore, both sources will not be used at the same time, but one or the other will be used depending on the Paella Player configuration and browser compatibility.

The format of the `sources` object depends on each particular source, but roughly speaking it consists of a series of keys, which identify the type of source, and as a value an array with source data.

The type identifier determines which video plugin will be used to display that source, and the content of the array is determined by the video plugin: each video plugin expects some or other data, so to know exactly the format of the manifest, you should consult the documentation of the video plugins. The most common formats are:

- **mp4:** mp4 video file with codec compatible with this format, obtained by progressive download. Check the format in the [mp4 video plugin documentation](mp4_video_plugin.md)
- **hls:** hls m3u8 stream. It is implemented via the [hls.js](https://github.com/video-dev/hls.js) library in browsers that support [Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API), and natively on iOS. You can check the format of the hls manifest data in the [hls plugin documentation](hls-video-plugin.md).
- **hlsLive:** hls m3u8 stream, optimized for live streaming events. In practice, the video plugin that handles these streams is identical to that of the normal `hls` streams, but by separating it by another stream type it is possible to prepare in our player a different configuration for each type (hls and hls live). [hls live plugin documentaiton](hls-live-video-plugin.md).
- **images:** It is a very suitable plugin for slide-based presentations. It is not a video, but a list of images with a duration, where each image has a timecode associated with it. You can check the format in the documentation of the [image video plugin](image-video-plugin.md).

We can have as many video plugins configured as we want, and a stream in turn can contain information for as many video formats as necessary. If the browser supports more than one format, the video plugin to be used will depend on the `order` attribute in the [plugins configuration](plugins.md).



### Content

This is the content identification tag for the stream. Each stream must necessarily be identified by a content. This value will be crossed with the configuration of the video layout plugins, to determine in which part of the layout the stream will be placed. You can learn more about stream configuration for video layouts in [this document](video_layout.md).



### Role

Indicates the role that the stream plays in composing videos. For Paella Player version 7, the only role used is `mainAudio`, which identifies the stream as the main audio source. All other video sources will try to load without audio, but there are some browsers where it is not possible to mute the volume. For this reason, it is highly recommended that video streams that do not have the `mainAudio` role be encoded without audio tracks.



## Frame List

It is a list of representative frames of the video, associated to an instant of time. For example, in a class supported by a slideshow, you could use the list of slides corresponding to the slideshow.

The frame list is used to bring up a thumbnail on the timeline when hovering over it, but it can also be used by other plugins. This attribute is optional, but it is highly recommended to include it for easy navigation through the video.

```json
{
  ...
  "frameList": [
    {
      "id": "frame_854",
      "mimetype": "image/jpeg",
      "time": 854,
      "url": "image_854.jpg",
      "thumb": "image_854_thumb.jpg"
    },
    {
      "id": "frame_0",
      "mimetype": "image/jpeg",
      "time": 0,
      "url": "image_0.jpg",
      "thumb": "image_0_thumb.jpg"
    },
    ...
  ]
}
```

- **id:** unique identifier of the frame
- **mimetype:** the mimetype of the image
- **time:** the time instant to which the image corresponds, in seconds. If the video have soft trimming, the time instant is referred to the total time of the video without taking the trimming into account.
- **url:** the URL of the full sized image.
- **thumb:** the URL of the thumbnail image. Its mimetype must be the same as the full sized image mimetype.



## Captions

Contains subtitle cataloging information. There can be as many subtitles as needed, in several languages and also in several formats. Depending on the installed subtitle plugins and the order attribute in the configuration, one or another subtitle format will be used.

```json
{
  ...
  "captions": [
    {
      "lang": "es",
      "text": "Español (traducción automática)",
      "format": "vtt",
      "url": "captions.es.vtt"
    }
  ]
}
```



- **lang:** is the language of this subtitle.
- **text:** is the identifying text for this subtitle, which can be used by the subtitle plugin to display in the user interface.
- **format:** is the format identifier, which will be used to determine the subtitle plugin to be used.
- **url:** is the absolute URL or relative path to the manifest containing the subtitle file.



