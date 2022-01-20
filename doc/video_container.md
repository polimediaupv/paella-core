# VideoContainer

## Description

The VideoContainer component performs three tasks:

- **Obtain compatible video layouts:** from the [video manifest](video_manifest.md), and taking into account the configuration of the [video layout plugins](video_layout.md), a list of layouts that are compatible with the current video configuration will be generated. It also provides the necessary API to retrieving the supported layouts and activate them.
- **Access playback controls:** provides the API needed to access the video playback controls.
- **Access soft trimming settings:** provides the API to enable, disable and configure video soft trimming.



Access to the VideoContainer component is through the Paella Player instance:

```javascript
import Paella from 'paella-core';

const player = new Paella('player-container');
...

const { videoContainer } = player;
```



## Content identifiers

Content identifiers, hereafter contentId, identify a video layout configuration. They are configured in the `config.json` file, in the configuration options of the layout plugins, as indicated in [this document](video_layout.md). The `validContent` array contains the different layout settings that can be applied, depending on the `content` section of the [video manifest](video_manifest.md):

**config.json:**

```json
"plugins": {
  "es.upv.paella.singleVideo": {
    "enabled": true,
    "validContent": [
      {
        "id": "presenter", 	<<< content identifier
        "content": ["presenter"], 	<<< valid content
        "icon": "present-mode-2.svg", 
        "title": "Presenter"
      },
      {
        "id": "presentation", <<< content identifier
        "content": ["presentation"], 	<<< valid content
        "icon": "present-mode-1.svg", 
        "title": "Presentation"
      }
    ]
  },
  "es.upv.paella.dualVideo": {
    "enabled": true,
    "validContent": [
      {
        "id": "presenter-presentation", <<< content identifier
        "content": ["presenter","presentation"], 	<<< valid content
        "icon": "present-mode-3.svg", 
        "title": "Presenter and presentation"
      }
    ]
  },
```

In the content configuration (`validContent`), the most relevant attributes are `id` and `content`. The first one is the unique content identifier. This identifier is the one we will use in the API to activate a layout. The second one is the content array that will be extracted from the video manifest. It will contain as many elements as streams supported by the video layout plugin.

Each video stream in the video manifest is tagged with this attribute. The videoContainer will cross-reference the data in the video manifest with the configuration data of all the video layout plugins, and from this it will get an array with the content identifiers that are applicable.

**data.json (video manifest):**

```json
"streams": [
		{
			"sources": {
				"mp4": [
					{
						"src": "presentation.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1442",
							"h": "1080"
						}
					}
				]
			},
			"preview": "presentation_cut.jpg",
			"content":"presentation"  <<<< Content identifier
		},
		{
			"sources": {
				"mp4": [
					{
						"src": "presenter.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1920",
							"h": "1080"
						}
					}
				]
			},
			"preview": "presenter_cut.jpg",
			"content":"presenter",		<<<< Content identifier
		}
	],
```

For more information, see [this document](video_layout.md).



## Layout API

`videoContainer.validContentIds`: Gets the contentId array that can be activated.

```javascript
player.videoContainer.validContentIds
> ["presentation","presenter","presenter-presentation"]
```

`videoContainer.validContentSettings:` Obtains the configuration of the layouts that are applicable. Includes all the information of the `validContent` elements in the configuration file.

```javascript
player.videoContainer.validContentSettings
> [
    {
      id: "presenter",
      content: ["presenter"],
      icon: "present-mode-2.svg",
      title: "Presenter"
    },
    {
      id: "presentation",
      content: ["presentation"],
      icon: "present-mode-1.svg",
      title: "Presentation"
    },
    {
      id: "presenter-presentation",
      content: ["presenter","presentation"],
      icon: "present-mode-3.svg",
      title: "Presenter and presentation"
    }
  ]
```

`videoContainer.layoutId:` Gets the current layout identifier

`async videoContainer.setLayout(contentId):` Activates a layout, identified by its contentId

```javascript
const firstContentId = player.videoContainer.validContentIds[0];
if (firstContentId) {
  await player.videoContainer.setLayout(firstContentId);
}
```



### Example: layout selector plugin

This code is extracted from the `en.upv.paella.layoutSelector` plugin, which is one of the plugins available in the [paella-basic-plugins](https://github.com/polimediaupv/paella-basic-plugins) package. We have left only the parts of the code relevant to list the available layouts and activate it. For more information, you can check the operation of menu button plugins [here](menu_button_plugin.md).

```javascript
export default class LayoutSelectorPlugin extends MenuButtonPlugin {
  ...
  async getMenu() {
    // We build the menu based on the configuration of the layouts 
    // available for the current video.
    const contentSettings = this.player.videoContainer.validContentSettings;
    return Promise.all(await contentSettings.map(async item => {
      const configPath = utils.joinPath([this.player.configResourcesUrl, item.icon]);
      const icon = await utils.loadSvgIcon(configPath);
      return {
        id: item.id,
        title: item.title,
        icon: icon,
        selected: this.player.videoContainer.layoutId === item.id
      }
    }));
  }
  ...
  itemSelected(itemData) {
    this.player.videoContainer.setLayout(itemData.id);
  }
}
```



## Playback API

`async videoContainer.play()`: Starts video playback. Triggers the  `Events.PLAY` event.

`async videoContainer.pause()`: Pause video playback. Trigger the `Events.PAUSE` event.

`async videoContainer.stop()`: Stops the video and resets the initial time to zero. Triggers the `Events.STOP` event.

`async videoContainer.paused()`: Returns true if the video is paused.

`async videoContainer.setCurrentTime(t)`: Seek to the specified time, in seconds. Triggers the `Events.SEEK` event.

`async videoContainer.currentTime()`: Returns the current playback time, in seconds

`async videoContainer.volume()`: Returns the volume, as a number between 0 and 1. Triggers the `Events.VOLUME_CHANGED` event.

`async videoContainer.setVolume(v)`: Sets the volume to the specified intensity, from 0 to 1. This API only works on desktop browsers.

`async videoContainer.duration`:Returns the video duration.0090



## Soft trimming API

Soft trimming allows you to modify the start and end time of the video, in order to play only an intermediate part. It is useful to trim a central part of a video, without having to process it. For example, it allows to prepare a video to display only the relevant part of an event recorded without production, eliminating the entrance and exit of the audience.

The soft trimming APIs only allow to set the initial and final instant of the video, i.e., we cannot eliminate intermediate parts. There is also no mechanism to store or retrieve the trimming. However, we can write a plugin that loads this data from a server, and activate the trimming using these APIs.

Soft trimming can be enabled, disabled and modified at runtime, and the changes will be visible immediately.

Sets the trimming values for the video. If we set `enabled=true`, but the start time is greater than or equal to the end time, trimming will remain disabled.

If soft trimming is enabled, the timeline interaction functions will use moments relative to the trimming we have configured. For example, if the video lasts 900 seconds and we activate a trimming between instant 100 and instant 160, the video will last 60 seconds. If we execute `setCurrentTime(30)`, we will be placing the current time instant in the second 130, that is `trimming.start + 30`.

To get the actual current time values while keeping trimming enabled, we can use the APIs of [stream provider](stream_provider.md).

`videoContainer.isTrimEnabled`: returns true if the soft trimming is enabled.

`videoContainer.trimStart`: returns the start instant of the trimming, in seconds

`videoContainer.trimEnd`: returns the end instant of the trimming, in seconds

`async videoContainer.setTrimming({ enabled, start, end })`: sets the trimming values for the video. If we set `enabled=true`, but the start time is greater than or equal to the end time, trimming will remain disabled.

TRIMMING_CHANGED event

## Adding DOM elements to video container

The VideoContainer objects implements some functions to add element based in the current layout video positions:

`videoContainer.appendChild(element, rect = null, zIndex = 1)`: Add an HTML element to the video container DOM node. This function will add the element to the same node that contains the independent video players.

- The `rect` parameter is an object with the size and position of the element to be added, in pixels, relative to the video container element. If this parameter is set, the `element` style will be set in accordance with the specified rectangle settings (`{ x, y, width, height }`).
- The `zIndex` parameter will be set to the element style. If the zIndex is set to null, the element will remain behind the layout elements.
- If the `rect` parameter is null, the `zIndex` parameter will be ignored.
- The `rect` coordinates, in pixels, will be transformed to `%`, so that the element remains in the same position when resizing.
- This function returns the element added (the same element passed in `element` parameter)

`videoContainer.removeChild(element)`: Removes an element from the video container.

`videoContainer.getVideoRect(target=null)`: Returns the video rectangle of an element of the video container:

- if `target` is null, this call will return the size of the video container itself.
- `target` can also be a string specifying the `content` attribute of the independent video stream that we want to get.

Note that when the user changes the layout of the video, all elements added with this API will remain unchanged. If you are implementing a plugin that must support a layout switch, you need to listen to the `Event.LAYOUT_CHANGED` event to perform the actions you need to do in case of this event.

### Example: add a translucent red rectangle over the "presenter" video

You can test the following code in the JavaScript debug console:

```js
var p = __paella_instances__[0].videoContainer.getVideoRect("presenter");
var e = __paella_instances__[0].videoContainer.appendChild(document.createElement('div'), p);
e.style.backgroundColor = 'rgba(255,0,0,0.4)';
```

Note: remember that you never may use __paella_instances__ for production code. the above example has only been exposed so that you can test the API in a simple way.