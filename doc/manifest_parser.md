# Manifest Parser (paella-core >= 1.46)

The ManifestParser is a utility to extract information from the video manifest file. You can access an instance of `ManifestParser` from the player object, or you can create an instance from scratch, although in this case not all parsing tools work.

You can use the `ManifestParser` tools to get information from the video manifest file without loading paella-core. When a manifest file contains a single video stream, does not contain a list of thumbnails, does not have trimming enabled, and in general only uses resources that can be played with a native HTML player, it may be preferable not to load the entire player.

The clearest example of this is an audio stream that does not contain slides: if we can extract the audio file from the manifest, we may prefer to load a native audio player from the web browser so as not to take up so much space on the page, and to save resources. The `ManifestParser` can help you to perform this type of task.

## Access through the player object

The `player` object contains APIs to access `ManifestParser` functions:

- **`player.metadata`**: returns the `metadata` section of the video manifest.
- **`player.streams`**: video or audio streams query utilities.
- **`player.frameList`**: query utilities to the list of thumbnails and frames extracted from the video.
- **`player.captions`**: returns the `captions` section of the video manifest.
- **`player.trimming`**: returns the `trimming` section of the video manifest.
- **`player.visibleTimeLine`**: returns the `visibleTimeLine` property of the video manifest.

Note that these functions only give access to the content of the video manifest. If this data is loaded from other data sources (for example, a data plugin), these APIs will not return that information.

## Access through a `ManifestParser` object

Puedes utilizar directamente un objeto `ManifestParser` en los casos en los que no hayas cargado un objeto `player`. Esto puede resultar útil si tienes acceso al video manifest, y quieres obtener información de él antes de cargar el player:

```js
import { ManifestParser } from 'paella-core';

const parser = new ManifestParser();
...
```

The `parser` object contains the same APIs described in the previous section:

- **`manifestParser.metadata`**
- **`manifestParser.streams`**
- **`manifestParser.frameList`**
- **`manifestParser.captions`**
- **`manifestParser.trimming`**
- **`manifestParser.visibleTimeLine`**

Please, note that some APIs may not be available directly from the `parser` object because they requier access to the `player` object.

## Utility APIs

The `metadata`, `caption` and `trimming` objects, and the `visibleTimeLine` property, only give access to the video manifest data. But the `streams` and `frameList` objects contain utilities to extract processed information from the raw data.

### `manifestParser.streams`

To get raw data from the video manifest, we'll use the `streams` property:

```js
console.log(player.streams.streams);
```

However, this property is not usually used, because the following properties and functions give more information extracted from the raw data.

**`manifestParser.streams.contents`:** Returns an array with the contents of the streams. For example, fot the following video manifest:

```json
{
    ...
    "streams":[
		{
			"sources": {
				...
			},
			"content":"presentation"
		},
		{
			"sources": {
				...
			},
			"content":"presenter",
			"role": "mainAudio"
		}
	],
    ...
}
```

the `contents` property would return the array `['presentation','presenter']`.

**`manifestParser.streams.getStream(content)`:** Returns the stream data corresponding with the `content` parameter, or `null` if the content is not present in the video manifest.

```js
console.log(manifestParser.streams.getStream('presenter'));
// Output:
// {
//   "sources": {
//       ...
//   },
//   "content": "presenter",
//   "role": "mainAudio"
// }
```

**`manifestParser.streams.getSourceTypes(content)`:** Returns the source types corresponding with the `content` parameter, or `null` if the content is not present in the video manifest. For example, given the following video manifest file:

```json
{
    ...
    "streams":[
		{
			"sources": {
				"mp4": [...],
                "hls": [...],
                "image": [...]
			},
			"content":"presentation"
		},
		{
			"sources": {
				"mp4": [...],
                "hls": [...]
			},
			"content":"presenter",
			"role": "mainAudio"
		}
	],
    ...
}
```

The following line of code would return the array `['mp4','hls','image:']`:

```js
manifestParser.streams.getSourceTypes('presentation');
```

**`manifestParser.streams.getCanvasTypes(content)`:** Returns an array with the canvas types corresponding with the `content` parameter, or `null` if the content is not present in the video manifest. If there is no `canvas` attribute defined in the video manifest, the function will return the default canvas type. Given the above video manifest data, the following line of code would return the array `['video']`:

```js
manifestParser.streams.getCanvasTypes('presenter');
```

**`manifestParser.streams.isAudioOnly`:** Returns `true` if the video manifest file only contains an `audio` stream. Note that this attribute will always return `false` if there are more than one stream, even if one of them contains only images.

**`manifestParser.streams.audioOnlySource`:** If the video manifest contains only an audio stream, this function returns the URL of the audio resource, or `null` in other case.

**`manifestParser.stream.isNativelyPlayable`:** Returns `true` if the video manifest contains one an only one stream that can be played natively.

**`manifestParser.stream.nativeSource`:** Returns the URL of the native source, if the video manifest can be played natively, or `null` in other case.

**`manifestParser.stream.nativeType`:** Returns `audio` or `video` if the video manifest contains a source that can be played natively, or `null` in other case.

**`manifestParser.stream.nativePlayer`:** Returns a DOM element configured with the native source, if the video manifest can be played natively, or `null` in other case. The DOM element can be a `<video>` or a `<audio>` element.

```js
import { Player } from 'paella-core';

...
const paella = new Paella('player-container', initParams);

if (paella.streams.isNativelyPlayable) {
    const nativePlayer = paella.streams.nativePlayer;
    nativePlayer.setAttribute("controls","");
    await paella.unload();
    const container = document.getElementById('player-container');
    container.appendChild(nativePlayer);
}
...
```

### `manifestParser.frameList`

**`manifestParser.frameList.frames`:** Returns an array with the frames.

**`manifestParser.frameList.targetContent`:** Returns the `content` property related with the video stream. The `content` property indicates from which video stream the images array have been extracted.

In addition to the `frames` and `targetContent` properties, the `frameList` object also provide the following APIs:

**`manifestParser.frameList.isEmpty`:** Returns `true` if the video manifest does not contain any video frame.

**`manifestParser.frameList.getImage(time, ignoreTrimming = false)`:** Returns the image that corresponds to the time instant specified in the `time` parameter.

The `ignoreTrimming` parameter is used to indicate whether the `time` parameter is taking trimming into account or not. This parameter can only be used if `manifestParser` is used through the `player` object, since it needs access to the player to determine if trimming is enabled. This is because trimming can be enabled using `paella-core` APIs. It is possible that trimming is enabled and has been loaded using a data source other than the video manifest (e.g., a data plugin).
