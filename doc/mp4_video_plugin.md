## mp4 video plugin

It allows to play video in mp4 format obtained by progressive download. This format is the most compatible, both on the browser and server side, since the video files can be supplied by any HTTP server.

As of Paella Player 7, this video format does not support multi audio and multi quality, due to browser compatibility issues. To work with multiple qualities and multiple audios, you can use the `hls` format, by means of the plugin [paella-hls-video-plugin](https://githjub.com/polimediaupv/paella-hls-video-plugin).


**NOTE:** the use of `enable/disable` video API has been removed due to a very unstable behaviour. For this reason, mp4 streams are always played even if they are hidden. The malfunction is reproducible in almost all browsers. Problems occur when trying to remove and re-add the video tag to the DOM tree. We recommend using the [HLS video plugin](hls_live_video_plugin.md), which although it does not have these functions implemented, will save bandwidth if variable bitrate streams are configured.

## Configuration

To recognise mp4 videos, you need to activate the plugin in the settings.

```json
{
    "plugins": {
        ...
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1
        },
        ...
    }
}
```

If there is more than one stream type in a stream within the video manifest that is compatible with the current configuration, the plugin whose value in the `order` attribute is lower will be used. For more information, see the [video format plugins](video_plugins.md) documentation.

### crossorigin (paella-core >= 1.28)

By default, the `crossorigin` attribute of the HTML video is added without content:

```html
...
<video crossorigin >
  ...
</video>
```

If any other value needs to be configured, the `crossOrigin` configuration parameter can be used:

```json
{
    "plugins": {
        ...
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1,
            "crossOrigin": "user-credentials"
        },
        ...
    }
}
```

To prevent the `crossorigin` attribute from being added to the `<video>` element, you can set the configuration value to `false`.:

```json
"es.upv.paella.mp4VideoFormat": {
    "enabled": true,
    "order": 1,
    "crossOrigin": false
}
```

### Prevent video download

There is no way to prevent the user from downloading an mp4 video, as this is a feature that is natively implemented by the browser, but we can make it a bit more complicated by preventing the context menu of the video from being shown. There is no API implemented for this, but it is easy to do it through the `PLAYER_LOADED` event. What we'll do is intercept the native `contextmenu` event of the `video` elements:

```js
...
const player = new Paella('playerContainer', {...});

player.bindEvent(Events.PLAYER_LOADED, () => {
  player.videoContainer.streamProvider.players.forEach(player => {
    player.video?.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });
});

await player.loadManifest();
...
```

## Video manifest format

```json
{
  ...
  "streams": [
    {
      "sources": {
        "mp4": [
          {
            "src": "video.mp4",
            "mimetype": "video/mp4",
            "res": {
              "w": 640,
              "h": 480
            }
          }
        ]
      }
    }
  ]
}
```



The format identifier is `mp4`. In previous versions, the source array could contain more than one element, representing the videos available for the different qualities. Currently only one video quality is supported, so if the array contains more than one element, the one with the highest resolution will be loaded.

- **src:** Absolute URL or relative path to the video manifest file, which indicates the location of the mp4 file corresponding to the source.
- **mimetype:** the mimetype format. Currently it can only contain `video/mp4`, but it is mandatory to add it in case more formats are supported in the future.
- **res:** the video resolution. Is an object formed by two attributes: `w`  for width and `h` for height. This attribute is also required.