# Predefined plugins

## src/js/data

Data plugins. You can check the documentation on [data plugins here](data_plugins.md).

- `es.upv.paella.cookieDataPlugin.js`: A [data plugin](data_plugin.md) to store and load data from cookies.

## src/js/layouts

Layout plugins. You can check the documentation about [video layout plugins in this document](video_layout.md).

- `es.upv.paella.singleVideo.js`: Layout for videos with one or more streams.
- `es.upv.paella.dualVideo.js`: Layout for videos with two or more streams. This layout contains buttons that allow you to switch to the layout of a single video. This plugin contains icons that can be configured:
    * plugin identifier: `es.upv.paella.dualVideo`
    * icon names:
        + `iconRotate`: exchange the left video with the right video, in side-by-side mode
        + `iconMaximize`: maximize video thumbnail.
        + `iconClose`: close a video.
        + `iconSwitchSide`: switch the picture-in-picture video side.
        + `iconMinimize`: minimize a video.
        + `iconSideBySide`: set the video in side-by-side mode.
- `es.upv.paella.tripleVideo.js`: Layout for videos with three or more streams.

### About singleVideo layout configuration

This layout contains a button that allows you to switch to a dual video layout, which is activated when the video manifest contains two or more streams. It is important to define which layout we want to use to switch back to a two-stream configuration so that the plugin will be able to find it.

At this point, you should consult the [documentation on video layouts](video_layout.md), but in short, each applicable layout is identified through a valid unique content identifier. This information is defined in the plugin configuration:

**config.json**:

```json
{
    "plugins": {
        "es.upv.paella.singleVideo": {
            ...
            "validContent": [
                {
                    "id": "presenter-layout",
                    "content": ["presenter"], 
                    ...
                }, 
                {
                    "id": "presentation-layout",
                    "content": ["presentation"]
                }
            ]
        },
        "es.upv.paella.dualVideo": {
            ...
            "validContent": [
                {
                    "id": "presenter-presentation-layout", 
                    "content": ["presenter","presentation"]
                    ...
                }
            ]
        },
        "es.upv.paella.tripleVideo": {
            ...
            "validContent": [
                {
                    "id": "presenter-presenter-2-presentation-layout",
                    "content": ["presenter","presenter-2","presentation"]
                    ...
                }
            ]
        },
    }
}
```

In the example above, we have the three layout plugins that are included in `paella-core`. With this configuration, we would have four available contents, which are the elements of the `validContent` arrays of each plugin:

- `presenter-layout`: show the stream with `presenter` content, through the `en.upv.paella.singleVideo` plugin. This means that the stream of the video manifest whose `content` tag corresponds to `presenter` will be displayed.
- `presentation-layout`: show the stream with `presentation` content, through the `en.upv.paella.singleVideo` plugin. This means that the stream of the video manifest whose `content` tag corresponds to `presentation` will be displayed.
- `presenter-presentation-layout`: shows the `presentation` and `presenter` streams, through the `en.upv.paella.dualVideo` plugin. This means that the streams of the video manifest whose `content` attribute matches `presentation` and `presenter` will be displayed.
- `presenter-presenter-2-presentation-layout`: shows the `presenter`, `presentation` and `presenter-2` streams through the `en.upv.paella.tripleVideo` plugin.

To properly configure the singleVideo plugin, we have to specify the list of valid content identifiers that we want to use when the user wants to switch to the dual video layout. This is done using the `dualVideoContentIds` attribute, which is an array in which we place a list of content identifiers of the dual video layout. The layout to be used will be the first one available from the `dualVideoContentIds` list.

For example: in the following configuration two different dual stream plugins are included (the `dualVidieoSideBySide` layout is available in the `paella-layout-plugins` package). In the configuration of the single stream layout we are specifying that we want `presenter-presentation-sbs` to be used, but if this layout is not available, we want to use `presenter-presentation`:

```json
{
    "plugins": {
        ...
        "es.upv.paella.singleVideo": {
            "enabled": true,
            "dualVideoContentIds": [
                "presenter-presentation-sbs",
                "presenter-presentation"
            ],
            "validContent": [
                {
                    "id": "presenter", 
                    "content": ["presenter"], 
                    "icon": "present-mode-2.svg", 
                    "title": "Presenter"
                },
                {
                    "id": "presentation", 
                    "content": ["presentation"], 
                    "icon": "present-mode-1.svg", 
                    "title": "Presentation" 
                }
            ]
        },
        "es.upv.paella.dualVideo": {
            "enabled": true,
            "validContent": [
                {
                    "id": "presenter-presentation", 
                    "content": ["presenter","presentation"], 
                    "icon": "present-mode-3.svg", 
                    "title": "Presenter and presentation"
                }
            ]
        },
        "es.upv.paella.dualVideoSideBySide": {
            "enabled": true,
            "validContent": [
                {
                    "id": "presenter-presentation-sbs", 
                    "content": ["presenter","presentation"], 
                    "icon": "present-mode-3.svg", 
                    "title": "Presenter and presentation"
                }
            ]
        }
    }
}
```

## src/js/videoFormats

Plugins to implement support for new video formats. Check the documentation about [video format plugins in this document](video_plugin.md).

- `es.upv.paella.hlsVideoFormat.js`: Support for m3u8 streams. Check the documentation about HLS video [in this document](hls_video_plugin.md).
- `es.upv.paella.hlsLiveVideoFormat.js`: This plugin extends the `hlsVideoFormat.js` plugin, and it is used to support special settings on live stream videos.
- `es.upv.paella.imageVideoFormat.js`: Support for virtual video composed by a list of images. You can check the documentation about this special video type in [this document](image_video_plugin.md)
- `es.upv.paella.mp4VideoFormat.js`: Support for progressive download video. Check the documentation about this format [here](mp4_video_plugin.md) 
- `es.upv.paella.audioVideoFormat.js`: Support for audio-only streams. To use this plugin it's important to enable the `es.upv.paella.audioCanvas` plugin. You can get more information about audio-only format in [this document](audio_video_plugin.md).

## src/js/canvas

Plugins that implement [canvas](canvas_plugin.md) to display video formats.

- `es.upv.paella.videoCanvas.js`: Canvas to display HTML-compliant video formats, i.e. those that use the `<video>` element to display multimedia content. [video canvas plugin documentation](video_canvas_plugin.md).
- `es.upv.paella.audioCanvas.js`: Canvas to display audio-only streams. This canvas fills the space of the video with an image. The source of the image will depend on the video format used. [audio canvas plugin documentation](audio_canvas_plugin.md).

## src/js/plugins

Other plugins

- `es.upv.paella.defaultShortcuts.js`: Defines the default keyboard shortcuts of the video player
- `es.upv.paella.playPauseButton.js`: Play and pause button.
- `es.upv.paella.vttManifestCaptionsPlugin.js`: Allows to load subtitles in `VTT` format statically defined in the [video manifest](video_manifest.md) file.

