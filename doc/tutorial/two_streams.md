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