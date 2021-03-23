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

TODO: complete this



## Soft trimming API

TODO: complete this