# Quick Start

## Create project

You can get `paella-core` from `npm`. You can use any building system, and you can also integrate the player with frameworks such as [React](https://es.react.dev) or [Svelte](https://svelte.dev). In this tutorial we'll use [vite](https://vitejs.dev):

```sh
$ npm create vite@latest paella-tutorial -- --template vanilla
$ cd paella-tutorial
$ npm install
$ npm run dev
```

The last command will output something similar to this:

```sh
 VITE v4.3.9  ready in 281 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

You can test the website using the `Local` URL which shows the output of the above command. Press `ctrl+C` to stop debugging.

Before we start, let's remove all the files from the Vite template that we don't need:

- public/vite.png
- counter.js
- javascript.svg
- style.css

Delete the contents of the `main.js` file, and replace the contents of the `index.html` file with the following code:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Paella Player Tutorial</title>
    <style>
      body {
        margin: 0px;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div id="player-container" style="width: 100vw; height: 100vh"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

Install `paella-core` in your new site using npm:

```sh
$ npm install --save paella-core
```

## Required files

To create a basic player you will need at least three files:

- Configuration file: This file is used to store all the settings of the player. The location of this file is important, because within the configuration options other files may appear, which will usually be referenced based on the path where the configuration file is located.
- Video file: Obviously we need a video to play.
- Video preview image: It's mandatory to supply a preview image file, because paella-core is lazy loaded: video files, plugins and many other resources will not be loaded until the user clicks the play button.

## Configuration 

You can create the configuration file anywhere, but for simplicity, we well use the default configuration path. By default, `paella-core` expects to find the configuration file in `config/config.json`. As we are using the vite's vanillajs template to build the player, you can place all the required static files at `public` directory. So, following file at `public/config/config.json`:

```json
{
    "plugins": {
        "es.upv.paella.singleVideoDynamic": {
            "enabled": "true",
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "", "title": "Presentation" }
            ]
        },

        "es.upv.paella.mp4VideoFormat": {
            "enabled": true
        },

        "es.upv.paella.videoCanvas": {
            "enabled": true
        }
    }
}
```

The previous configuration file is the minimum required to use paella-core to play one video. Playing videos consisting of more than one stream is much more complicated, so for the moment we will start with the simplest case.

`paella-core` is designed to be highly modular, and for this reason there are many elements necessary for its operation that are set up via plugins. In addition to this, to avoid unwanted collisions between plugins, all plugins are disabled by default. For that reason we need to specify a minimum number of plugins in the configuration file to be able to play a video. In two of them we just enable them with the `enabled` attribute. In another one we have also specified more configuration parameters.

### Video format plugin

The video format plugins take care of loading each stream depending on its type. There are many types of video formats that `paella-core` can handle, and it is also possible to add plugins to handle other new formats. For more information, you can check the [video format plugin documentation](../video_plugin.md). In the configuration file we have activated the `en.upv.paella.mp4VideoFormat` plugin. Generally we will activate several video format plugins.

### Video canvas

Video format plugins do not show video anywhere. To show the video in the player, you need to enable a [video canvas plugin](../video_canvas_plugin.md). The default canvas is a `<video>` element, but some formats may require a different canvas, such as a 360° video.

### Video layout

A video canvas defines how a video stream will be displayed, but it does not define the position with respect to the player where it will be displayed. When we have a single video it is obvious what its position has to be: it should occupy as much of the player area as possible, but as `paella-core` is a multi stream video player, it is necessary to have one more element to define these positions. We do this through the video layout, which in this case is through the `en.upv.paella.singleVideoDynamic` plugin.


## Basic player

We are going to create a basic video player with which to play a single mp4 video stream, together with its preview image. For the video and image we will use the following resources that are available online:

- Video: `https://repository.paellaplayer.upv.es/belmar-multiresolution/media/480-presenter.mp4`
- Preview: `https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg`

You can also download them and modify the URLs to use paths relative to your player, but for convenience in this example we will use the URL.

In the `html` file, we have added a `<div>` element with the `player-container` identifier. To create the player, we need to know this, as `paella-core` will use that container to place the player. We specify this when we create the player instance, which we can get from the `paella-core` package:

```js
import { Paella } from 'paella-core';

const player = new Paella('player-container');
```

Now we just need to upload the video. To do this we'll use the `loadUrl` function, where we pass the URL of the video and a number of optional parameters. In this case, we will only pass the preview image.

```js
...
const videoUrl = "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/480-presenter.mp4";
const preview = "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg";
await player.loadUrl(videoUrl, { preview });
```

To load the player, simply click on the player or press the space bar on your keyboard. 

El reproductor funciona, pero no tiene ningún botón para pausar o reanudar la reproducción. Esto es porque los botones de la barra de reproducción también son plugins. `paella-core` incluye un plugin para esto, y para activarlo solo tienes que añadirlo en la configuración:

```json
```
{
  "plugins": {
    ...
    "es.upv.paella.playPauseButton": {
      "enabled": true
    }
  }
}

 
