## mp4 video plugin

It allows to play video in mp4 format obtained by progressive download. This format is the most compatible, both on the browser and server side, since the video files can be supplied by any HTTP server.

As of Paella Player 7, this video format does not support multi audio and multi quality, due to browser compatibility issues. To work with multiple qualities and multiple audios, you can use the `hls` format, by means of the plugin [paella-hls-video-plugin](https://githjub.com/polimediaupv/paella-hls-video-plugin).

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



El identificador de formato es `mp4`. En versiones anteriores, el array de fuentes podía contener más de un elemento, que representaban los vídeos disponibles para las difertentes calidades. Actualmente solo está soportada una calidad de vídeo, por lo que si el array contiene más de un elemento, se cargará el de mayor resolución

- **src:** Absolute URL or relative path to the video manifest file, which indicates the location of the mp4 file corresponding to the source.
- **mimetype:** the mimetype format. Currently it can only contain `video/mp4`, but it is mandatory to add it in case more formats are supported in the future.
- **res:** the video resolution. Is an object formed by two attributes: `w`  for width and `h` for height. This attribute is also required.