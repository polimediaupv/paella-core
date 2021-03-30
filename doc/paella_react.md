# Embedding Paella Player in a React application

In this tutorial we are going to create a very simple React application where we will add a Paella Player component.

Before we start it is important that you know the basics of using Paella Player. You can start with the [basic tutorial](tutorial.md). You should also have basic knowledge of React with functional components.

To complete this tutorial you only need to have Node v12 or higher and your favorite code editor installed.

## Create the app

We are going to start from scratch, creating an application using create-react-app. After that, install `paella-core` and all the plugins you want to use:

```sh
$ npx create-react-app paella-react
$ npm install paella-core paella-basic-plugins
```



## Create the resource files

Create the resource files needed to run Paella Player in the `public` folder. At the very least you will need to create the configuration file, and a manifest file. Remember that, by default, the `config.json` file is placed into the `config` folder.

**public/config/config.json:**

```json
{
	"repositoryUrl": "manifest",
	"manifestFileName": "data.json",

	"defaultLayout": "presenter-presentation",
	
	"plugins": {
		"es.upv.paella.singleVideo": {
			"enabled": true,
			"validContent": [
				{ "id": "presenter", "content": ["presenter"], "icon": "present-mode-2.svg", "title": "Presenter" },
				{ "id": "presentation", "content": ["presentation"], "icon": "present-mode-1.svg", "title": "Presentation" },
				{ "id": "presenter-2", "content": ["presenter-2"], "icon": "present-mode-1.svg", "title": "Presentation" }
			]
		},
		"es.upv.paella.dualVideo": {
			"enabled": true,
			"validContent": [
				{ "id": "presenter-presentation", "content": ["presenter","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
				{ "id": "presenter-2-presentation", "content": ["presenter-2","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
				{ "id": "presenter-presenter-2", "content": ["presenter","presenter-2"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" }
			]
		},
		"es.upv.paella.mp4VideoFormat": {
			"enabled": true,
			"order": 1
		},
		"es.upv.paella.playPauseButton": {
			"enabled": true,
			"order": 1
		},
        "es.upv.paella.fullscreenButton": {
			"enabled": true,
			"side": "right",
			"order": 2
		}
	}
}
```

Let's create a basic manifest in `public/manifest/test/data.json`.

**public/manifest/test/data.json:**

```json
{
	"metadata": {
		"duration": 909.13,
		"title": "Belmar 15 minutes (multiresolution)",
		"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg"
	},
	"streams": [
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1442",
							"h": "1080"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/presentation_cut.jpg",
			"content":"presentation"
		},
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1920",
							"h": "1080"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/presenter_cut.jpg",
			"content":"presenter"
		}
	],
	"frameList": [
		{
			"id": "frame_854",
			"mimetype": "image/jpeg",
			"time": 854,
			"url": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/3d90109c-9608-44c1-8660-fce3f216d716/presentation_cut.jpg",
			"thumb": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/403de1df-aa66-44c0-b600-7683acf249b8/presentation_cut.jpg"
		},
		{
			"id": "frame_751",
			"mimetype": "image/jpeg",
			"time": 751,
			"url": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/598bd2ba-4fef-4886-884e-0ab82176f13d/presentation_cut.jpg",
			"thumb": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/73a6564c-b2d6-4896-b0f1-38129dde2c85/presentation_cut.jpg"
		},
		{
			"id": "frame_0",
			"mimetype": "image/jpeg",
			"time": 0,
			"url": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/7dc22bee-14f3-442c-8f0d-30d8b68c8604/presentation_cut.jpg",
			"thumb": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/46561b90-85b3-4ad7-a986-cdd9b52ae02b/presentation_cut.jpg"
		},
		{
			"id": "frame_363",
			"mimetype": "image/jpeg",
			"time": 363,
			"url": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/d3194d9b-8f65-403b-a639-9de4311a283b/presentation_cut.jpg",
			"thumb": "https://repository.paellaplayer.upv.es/belmar-multiresolution/slides/4505b6d9-8a0c-4809-ade3-840e743188ed/presentation_cut.jpg"
		}
	]
}
```



## Create the player component

From the tutorial example, we are going to create a React component to embed the player. Create a Player.js file inside the src folder:

```javascript
import { Paella } from 'paella-core';
import basicPluginContext from 'paella-basic-plugins';
import { useEffect } from 'react';

let paella = null;
function Player({ width, height }) {

    useEffect(() => {
        if (!paella) {
            paella = new Paella('player-container', {
                customPluginContext: [
                    basicPluginContext()
                ]
            });
            paella.loadManifest()
                .then(() => console.log("Done"))
                .catch(e => console.error(e));
        }

    }, [])

    return (
        <div id="player-container" className="player-container" style={{
            position: "relative",
            width: width,
            height: height,
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0"
            }}></div>
    
    )
}

export default Player;
```



## Add the player to the React App

Open the `App.js` file and replace the code with:

```javascript
import './App.css';
import Player from './Player';

function App() {
  return (
    <div className="App">
      <h1>Hello from React</h1>
      <Player width="70%" height="50vh"></Player>
    </div>
  );
}

export default App;
```



## Run the app

Execute the app with:

```sh
$ npm start
```

To load the video, you need to specify the manifest identifier. The data.json file has been created inside the `test` folder, so the manifest identifier will be `test`. Enter the following URL in the browser to view the app:

[http://localhost:3000/?id=test](http://localhost:3000/?id=test)

