# Two streams

The main feature of `paella-core` is that it is able to play more than one video stream simultaneously, allowing, for example, a video of a speaker and a separate video with the presentation. Having the two streams separately allows the user to modify the layout to see the part of the presentation that is of most interest: you can see a thumbnail of the presenter above the presentation, you can see both videos at the same size, or you can even close one of the videos to see only the other.

Video layout plugins are used to allow the user to choose how they want to watch each stream. There are two types of video distribution plugins:

- Static video layout: the position of each stream is defined using fixed positions. The total video display area (which is where the independent streams will be placed) has a fixed ratio, hence they are called static layouts. Specifically, the ratio of such layouts is for a 16:9 format video.
- Dynamic video layout: the position of each stream is defined by dynamic mechanisms provided by the browser, generally using CSS styles. The proportion of the video container in this case is dynamic, which makes it suitable for use on mobile screens. 

Dynamic layouts are much newer, and were created to better support smartphones and portrait videos. However, they are not always appropriate. It is more appropriate to do picture-in-picture video layouts statically, because a dynamic layout has too many possible combinations of proportions in the size of the container and the size of each stream. 

In the case of dynamic layouts for a single video stream, they generally make better use of screen space in portrait videos.

## Video content

Video streams are tagged with an attribute called `content`. They are used to identify the type of content contained in each stream. For example, we can have a stream of a presenter and a stream of a presentation. In the video layout we need a way to specify where each stream is placed, and for this we use the content tag.

Note: For the moment we are going to focus on the video layout part, later we will see how to tag each stream with its content.

In the [previous tutorial](quick_start.md) configuration file we added a layout for a single video:

```json
"es.upv.paella.singleVideoDynamic": {
    "enabled": "true",
    "validContent": [
        { "id": "presenter", "content": ["presenter"], "icon": "", "title": "Presenter" },
        { "id": "presentation", "content": ["presentation"], "icon": "", "title": "Presentation" }
    ]
}
```

The `validContent` attribute is used to specify which are the possible combinations we are going to accept for this layout. It is an array where each element is a valid combination of streams. In our example, let's assume we have two types of content: `presenter` and `presentation`. Since the video layout is designed for a single video, we will have two combinations: either we show the `presenter` stream or we show the `presentation` stream.

For each element of the `validContent` array we have to specify four attributes:

- `id`: es el identificador de esa combinación. Más tarde veremos que ese identificador se utiliza para decirle a `paella-core` cual es la combinación de vídeos que queremos activar.
- `content`: is an array where we specify the content tags to be supported by this combination. Depending on how the layout is implemented, this array can support one or more elements, but in any case you must always respect the number of elements supported by the plugin. In the case of the `es.upv.paella.singleVideoDynamic` plugin, the array must only contain one `content` tag.
- `icon`: is a reference to an icon file, which must be in `SVG` vector format, and is used to identify this combination with an icon. The plugin that allows to select the video layout (defined in the `paella-basic-plugins` package that we will see later in another tutorial) allows to identify each layout with this icon, so it is a visual aid. As explained in the previous tutorial, references to files in the configuration file are made with respect to the directory where the configuration file is located. If we add the `presenter.svg` icon, then we have to place the file in `config/presenter.svg`.
- `title`: is a descriptive text for this combination of videos. It works in the same way as the icon, but in this case it serves to identify the combination of videos by text instead of an image.

We are going to add the `es.upv.paella.dualVideoDynamic` plugin configuration to be able to display two streams:

```config.json
{
    "plugins": {
        "es.upv.paella.singleVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "", "title": "Presentation" }
            ]
        },

        "es.upv.paella.dualVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter-presentation", "content": ["presenter","presentation"], "icon": "", "title": "Presenter and presentation" }
            ]
        },
        ...
    }
}
```


## Video manifest

To play two streams we cannot use the `loadUrl` function. If you want to play more than one video at a time, you have to use a video manifest file. A video manifest file is used to group all the information of a video. We can specify one or more formats for one or more streams, metadata such as video title, subtitles, frame thumbnails and other resources can be added. The preferred way to upload videos to `paella-core` is to use video manifest files. You can read all the information about video manifest files [in this document](../video_manifest.md).

By default, `paella-core` loads the video manifest files from a repository of files organised by folders. Each folder is named with a unique identifier for the video, and inside this folder is the video manifest file and other resource files, if needed. It is possible to modify this behaviour in many ways, which will be discussed later, but for the moment we will use the default behaviour.

First let's modify the current example to use a video manifest file. Create a directory called `single-stream` inside `public`. Inside the `single-stream` directory, add a `data.json` file with this content:

```json
{
    "metadata": {
        "preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg"
    },
    "streams": [
        {
            "sources": {
                "mp4": [
                    {
                        "src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
                        "mimetype": "video/mp4"
                    }
                ]
            },
            "content": "presenter"
        }
    ]
}
```


Within the `metadata` section we have placed the URL of the preview image we used in the example above. In addition to the `preview` attribute, we can also add the `previewPortrait` attribute, which we can use to specify a preview image when the video container is displayed in portrait format (e.g. on a smartphone screen). Depending on the screen format, one image or the other would be loaded. In either case, it is necessary to specify at least one of the two preview images.

The `streams` section contains the video data. `streams` is an array where each element corresponds to a video stream. The data of a video stream has the following structure:

```json
{
    "sources": { ... source data ... },
    "content": "contentLabel"
}
```

`sources` is an object where each key corresponds to a video playback plugin. In this case we are using `mp4`, which indicates that we want to use the mp4 video plugin `en.upv.paella.mp4VideoFormat`. The name of the `mp4` key is defined by the plugin, and is specified in the documentation for each video format plugin. The content of the `mp4` object is also defined by the plugin, which decides the format of the data it expects to receive. Specifically, the mp4 video plugin expects an array of objects with the following data:

```json
"mp4": [
    {
        "src": "video file url",
        "mimetype": "video/mp4"
    }
]
```

The content of `mp4` is an array because in previous versions of `paella player`, the `mp4` format supported multiple video files for different resolutions, but in `paella-core` this support has been removed in favour of the `hls` format. But for backwards compatibility, this attribute is still an array.

Continuing with the stream data, `content` is the content tag, which is mandatory, because it is necessary to relate the video layout plugins seen above to the content of each stream.

## Play video manifest

To play the video manifest we have to use the `loadManifest()` function instead of `loadUrl()`. Modify the `main.js` file:

```js
import { Paella } from 'paella-core';

const player = new Paella('player-container');

await player.loadManifest();
```

The `loadManifest()` function does not take any parameters, as it will look for the video manifest in the video repository. By default, the video repository is in the same directory as the player's `.html` file, so we have added the manifest file in `single-stream/data.json`. In this case, the video manifest identifier will be `single-stream`. To play the video, enter the following URL:

`http://localhost:5173/?id=single-stream`


## Video manifest with two streams

Añade un video manifest nuevo en el fichero `public/dual-stream/data.json`:

```json
{
    "metadata": {
        "preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg"
    },
    "streams": [
        {
            "sources": {
                "mp4": [
                    {
                        "src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
                        "mimetype": "video/mp4"
                    }
                ]
            },
            "content": "presenter",
            "role": "mainAudio"
        },
        {
            "sources": {
                "mp4": [
                    {
                        "src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4",
                        "mimetype": "video/mp4"
                    }
                ]
            },
            "content": "presentation"
        }
    ]
}
```

Regarding the `single-stream` video manifest, we have added a new stream with the same structure. In this second stream, we have added the `content` tag: `presentation`. In addition, in the first stream we have added the `role` tag: `mainAudio`. When we have two video streams, it is mandatory to specify which of the streams is the one containing the main audio, we do this with the `role` tag.

With the current configuration, the `dual-stream` video manifest can work with three layout configurations:

- `es.upv.paella.singleVideoDynamic`, contentId: `presenter`: watch the presenter's video.
- `es.upv.paella.singleVideoDynamic`, contentId: `presentation`: watch the video of the presentation.
- `es.upv.paella.singleVideoDynamic`, contentId: `presenter-presentation`: watch both videos at the same time.

Para establecer cual es el contentId que queremos ver por defecto, tenemos varias opciones:

**Order of plugins:** If there are several compatible layout plugins, the one defined first in the plugins object shall be used first. In turn, the preferred contentId will be the one that comes first in the `validContent` array.

**`order` attribute:** Within the configuration of each plugin, we can use the `order` attribute to define the order of loading. A lower value indicates higher priority:

```json
{
    "plugins": {
        "es.upv.paella.dualVideoDynamic": {
            ...
            "order": 1
        },

        "es.upv.paella.singleVideoDynamic": {
            ...
            "order": 0  // More priority than dualVideoDynamic
        }
    }
}
```

**`defaultLayout` attribute:** you can use the `defaultLayout` attribute in the general `paella-core` configuration to indicate which `contentId` you want to use by default. If this fails because it is not available, the above criteria will be used:


```json
{
    "defaultLayout": "presenter-presentation",
    "plugins": {
        ...
    }
}
```

Choose any of the methods described above to ensure that the `presenter-presentation` contentId is loaded by default.

## Change video layout

The layouts have a series of buttons that allow you to change the arrangement of the videos within the layout, or to switch to a different layout. The `en.upv.paella.dualVideoDynamic` layout contains three buttons by default:

- **Swap position:** moves the video from the left side to the right or the other way around.
- Maximize:** makes the video bigger. By default, it tries to resize the videos so that one takes up approximately 75% of the space and the other 25%. When this option is enabled, the button becomes **restore**, which resizes the two videos back to the same size.
- Close:** this button loads the single video layout with the content we want to leave open.

In the same way, the single video layout has a button to open the dual video layout. This button will be visible as long as there are streams in the video manifest with the right content configuration to be able to display both streams.

In the current example we only have one single and one double video layout activated. If we want to switch from one layout to another it is easy, as there are only two layout plugins active. But it can happen that we have more than one layout active for the same amount of streams. Add the following plugin configuration to the `config.json` file to activate the picture-in-picture video layout:

```json
{
    "plugins": {
        ...
        "es.upv.paella.dualVideoPiP": {
            "enabled": true,
            "validContent": [
                { "id": "presenter-presentation-pip", "content": ["presenter","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" }
            ]
        },
        ...
    }
}
```

Now we have two layouts that can display two streams, and the `singleVideoDynamic` plugin doesn't know which layout to use when we click the button to watch two videos. When a video layout plugin includes a system that allows you to switch to a different layout, parameters are included in the configuration to set which layout you want to switch to. The picture-in-picture video plugin also has a button that deactivates this mode, and what it does is to switch to another video layout. Therefore, the PiP video plugin also includes a configuration parameter to set which dual video layout we want to use. Finally, the `dualVideoDynamic` plugin can switch to `PiP` mode if the layout is specified in the configuration.

Below you can see the complete configuration of the three layout plugins.

```json
{
    ...
    "plugins": {
        "es.upv.paella.singleVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "", "title": "Presentation" }
            ],
            "dualVideoContentIds": [
                "presenter-presentation"
            ]
        },

        "es.upv.paella.dualVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter-presentation", "content": ["presenter","presentation"], "icon": "", "title": "Presenter and presentation" }
            ],
            
            "pipContentIds": [
                "presenter-presentation-pip"
            ]
        },

        "es.upv.paella.dualVideoPiP": {
            "enabled": true,
            "validContent": [
                { "id": "presenter-presentation-pip", "content": ["presenter","presentation"], "icon": "", "title": "PiP mode" }
            ],
            "dualVideoContentIds": [
                "presenter-presentation"
            ]
        },
        ...
    }
}
```

## Repository location

It is generally not a good idea to keep the video repository in the same location as the player. Let's set up the video repository in the `repo` folder.

- Create a folder in `data/repo` and move the two video directories (`dual-stream` and `single-stream`) into this folder.
- Add the following attributes to the beginning of the configuration file:

```json
{
    "repositoryUrl": "repo",
    "manifestFileName": "data.json",
    ...
}
```

The `repositoryUrl` attribute specifies the URL where the player will look for the folders with the manifest video identifiers. `manifestFileName` specifies the name of the `json` file that each folder should contain. To form the full path to the video manifest file, use `${repositoryUrl}/${video_id}/${manifestFileName}`. According to this, to search for video with a `dual-stream` identifier, the path the player will search for is `repo/dual-stream/data.json`.



