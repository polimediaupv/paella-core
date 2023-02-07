# Video layout plugins

## Define a VideoLayout plugin

```javascript
import VideoLayout from 'paella-core/js/core/VideoLayout';

export default class MyVideoLayout extends VideoLayout {
    // properties and functions
}
```

## Configuration

*config.json*
```json
{
    "plugins": {
        "es.upv.paella.myVideoLayout": {
            "enabled": true,
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "present-mode-2.svg", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "present-mode-1.svg", "title": "Presentation" }
            ]
        }
    }
}
```

The icons used to identify each layout content must be in `svg` format, and placed in the same directory as the `config.json` configuration file.

IMPORTANT: the identifiers of the `validContent` elements must be unique among all layout plugins. If you activate two different layouts that accept the same content, you must differentiate the identifiers between the two plugins:

```json
{
    "plugins": {
        ...
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
                   "cookieType": "functionality",
                   "validContent": [
                       {
                            "id": "presenter-presentation-sbs", 
                            "content": ["presentation","presenter"], 
                            "icon": "present-mode-3.svg", 
                            "title": "Presenter and presentation side by side"
                        }
                   ]
               },
    }
}
```

## Types of video layout

From paella-core version 1.9 onwards, there are two types of video layouts: statically sized and dynamically sized.

### Static layouts

Static layouts allow defining the positions and sizes of the sub-streams by static positions according to the template base size. The base size of the video template corresponds to a 16:9 aspect ratio video, and the positions and sizes of the sub-streams are defined in relation to a container of size 1280x720px. When the layout is loaded, these sizes are automatically converted to percentage measurements, so that the window can be resized without affecting the proportions.
### Dynamic layouts

Dynamically sized layouts define the size of the sub-streams by a percentage of container occupancy. Depending on the size of the video container, the sub-streams will be placed horizontally or vertically. The total occupancy percentage of all streams must not exceed 100%.
## Layout properties and functions

### Layout type

Returns whether the layout is dynamically or statically sized (`static` or `dynamic`)

```js
// paella-core >= 1.9
get layoutType() { 
    return "static";    // or "dynamic"
}
```


### Identifier

```javascript
get identifier() { return "my-video-layout"; }
```

### Icon

```javascript
get icon() { return "icon.jpg"; }
```

### Valid content

This property returns the `content` array in the plugin configuration:

```javascript
get validContent() {
    return this.config?validContent;
}
```


### Checking if the layout is compatible with the video

Get the valid stream data combination, according to the plugin configuration.
The result of this function must be an array of arrays with all the possible
combinations. For example:

**video manifest (data.json)**
```json
{
    "streams": [
        {
            "sources": {
                ...
            },
            "content": "presenter"
        },
        {
            "sources": {
                ...
            },
            "content": "presentation"
        }
    ]
}
```

**plugin configuration**

```json
"es.upv.paella.dualVideo": {
    "enabled": true,
    "validContent": [
        { "id": "presenter-presentation", "content": ["presenter","presentation"] },
        { "id": "presenter-2-presentation", "content": ["presenter-2","presentation"] },
        { "id": "presenter-presenter-2", "content": ["presenter","presenter-2"] }
    ]
}
```

The result of `getValidStreams` can be:

```javascript
[
    ["presenter","presentation"]
]
```

With the same video manifest, and a plugin with the following configuration:

```json
"es.upv.paella.singleVideo": {
    "enabled": true,
    "validContent": [
        { "id": "presenter", "content": ["presenter"] },
        { "id": "presentation", "content": ["presentation"] },
        { "id": "presenter-2", "content": ["presenter-2"] }
    ]
},
```

The result of `getValidStreams` can be:

```javascript
[
    ["presenter"],
    ["presentation"]
]
```

```javascript
getValidStreams(streamData) {
    // The default implementation checks if the streamData content matches 
    // the videoContent.content array in the plugin configuration, but
    // here you can add more conditions
    // For example: allow only configurations with one stream.
    return super.getValidStreams(streamData)
        .filter(stream => stream.length === 1);
}
```

The exact content of the `getValidStreams` function result depends on the layout plugin implementation. For example, you can implement a layout commpatible with a variable number of streams

### Layout structure

The fields that can be contained in the layout structure differ depending on whether the layout is of static or dynamic size.

The `videos` section is an array that contains the properties of each video stream within the layout. The `content` attribute corresponds to the `content` attribute of the [video manifest](video_manifest.md), and is used to identify the content that can be contained within that stream. The `visible` attribute indicates whether that video is visible or not.

In static layouts the `rect` array is returned inside each `videos` element, which indicates a size and position for each aspect ratio. The aspect ratio will be calculated from the size of the video stream, and the closest size and position will be used. In this type of layout it is also possible to return the `buttons` attribute, which is used to define buttons in static positions within the layout, but this parameter is deprecated and should not be used.

In dynamically sized layouts, instead of specifying the `rect` attribute, the `size` attribute is defined, which defines the percentage of the video container to be used by that stream.


**Static size layout structure:**

```javascript
get layoutType() { return "static"; }

getLayoutStructure(streamData) {
    const structure = {
        name:{es:"One stream"},
        hidden:false,
        videos: [
            {
                content:validContent[0],
                rect:[
                    { aspectRatio:"1/1",left:280,top:0,width:720,height:720 },
                    { aspectRatio:"6/5",left:208,top:0,width:864,height:720 },
                    { aspectRatio:"5/4",left:190,top:0,width:900,height:720 },
                    { aspectRatio:"4/3",left:160,top:0,width:960,height:720 },
                    { aspectRatio:"11/8",left:145,top:0,width:990,height:720 },
                    { aspectRatio:"1.41/1",left:132,top:0,width:1015,height:720 },
                    { aspectRatio:"1.43/1",left:125,top:0,width:1029,height:720 },
                    { aspectRatio:"3/2",left:100,top:0,width:1080,height:720 },
                    { aspectRatio:"16/10",left:64,top:0,width:1152,height:720 },
                    { aspectRatio:"5/3",left:40,top:0,width:1200,height:720 },
                    { aspectRatio:"16/9",left:0,top:0,width:1280,height:720 },
                    { aspectRatio:"1.85/1",left:0,top:14,width:1280,height:692 },
                    { aspectRatio:"2.35/1",left:0,top:87,width:1280,height:544 },
                    { aspectRatio:"2.41/1",left:0,top:94,width:1280,height:531 },
                    { aspectRatio:"2.76/1",left:0,top:128,width:1280,height:463 }
                ],
                visible:true,
                layer:1
            }
        ],
        background:{content:"slide_professor_paella.jpg",zIndex:5,rect:{left:0,top:0,width:1280,height:720},visible:true,layer:0},
        logos:[{content:"paella_logo.png",zIndex:5,rect:{top:10,left:10,width:49,height:42}}],
        onApply: function() { }
    }
    return structure;
}
```

**Dynamic size layout structure:**

```javascript
get layoutType() { return "dynamic"; }

getLayoutStructure(streamData) {
    const structure = {
        name:{es:"One stream"},
        hidden:false,
        videos: [
            {
                content:validContent[0],
                size: 50
                visible:true
            },
            {
                content:validContent[1],
                size: 50,
                visible: true
            }
        ],
        background:{content:"slide_professor_paella.jpg",zIndex:5,rect:{left:0,top:0,width:1280,height:720},visible:true,layer:0},
        logos:[{content:"paella_logo.png",zIndex:5,rect:{top:10,left:10,width:49,height:42}}],
        onApply: function() { }
    }
    return structure;
}
```

### User interaction

Video layouts can add user interaction elements. For example, the integrated layout plugin for two videos allows you to change the arrangement of the two videos to display them side by side or in picture-in-picture mode. These changes are made via buttons added by the layout.

There are two ways to add buttons to a video layout:

1. (deprecated) Through the `buttons` attribute of the layout structure. It is possible to add buttons at specific positions in the layout. The same rules are used to define the position and size of the buttons as for the videos: they are coordinates relative to the base size of the video area, which are automatically translated into percentages, so that the position and size are the same when resizing the video area. This method is only available for static size layouts.
2. Through the `getVideoCanvasButtons` function of the layout plugin. It allows to add buttons at the top of each video corresponding to a stream. The buttons can be added aligned to the left, to the right or to the center. The `getVideoCanvasButtons` function is called once for each video, and must return the buttons corresponding to each video. To identify the video, the function receives as parameter, among others, the content corresponding to the `content` attribute of the video stream in the manifest.

Example 1: extracted from the `es.upv.paella.tripleVideo` layout plugin:

```js
getLayoutStructure(streamData, contentId) {
  ...
  const result = {
    ...
    buttons: [
      {
        rect: selectedLayout.buttons[0].rect,
        onClick: () => { this.switchContent(); },
        label:"Switch",
        icon: iconRotate,
        layer: 2,
        ariaLabel: "Swap the position of the videos",
        title: "Swap the position of the videos"
      }
    ]
  };

  return result;
}
```

Example 2: extracted from the `es.upv.paella.dualVideo` layout plugin:

```js
getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
  if (layoutStructure.id === "side-by-side") {
    return [
      // Swap
      {
        icon: iconRotate,
        position: CanvasButtonPosition.LEFT,
        title: this.player.translate('Swap position of the videos'),
        ariaLabel: this.player.translate('Swap position of the videos'),
        click: () => {
            this.switchContent();
        }
      },

      // Minimize
      {
        icon: iconMinimize3,
        position: CanvasButtonPosition.LEFT,
        title: this.player.translate('Minimize video'),
        ariaLabel: this.player.translate('Minimize video'),
        click: () => {
            this.minimizeVideo(content);
        }
      }
    ]
  }
  else {
    ...
  }
}
```

### Accesibility (paella-core >= 1.17)

To configure the tab index attribute of the layout buttons, you can set the `tabIndexStart` attribute in plugin configuration. The tab index attribute of the layout buttons will be set according to the position of the button in the window, from left to right, in increasing order, starting with the value defined in `tabIndexStart`. The default value of this property is 10, and it should be used whenever you have less than 10 buttons in the playback bar.

```json
{
    ...
    "es.upv.paella.myVideoLayout": {
        ... other layout settings
        "tabIndexStart": 20
    }
}
```