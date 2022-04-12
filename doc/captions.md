# Captions

The subtitle API is divided into two parts:

- APIs for loading, querying, enabling and disabling subtitles. It is accessible through the paella player instance.
- Plugin format extension API: via [caption plugins](caption_plugins.md).



## Captions class

The `Captions` class represents all the information about a set of subtitles. The intention of `Captions` is to provide a data structure where we can load subtitles from any format, so that Paella Player does not depend on any particular format of subtitle representation.

```javascript
const spanishCaptions = new Captions("Spanish", "es");
spanishCaptions.addCue({
  label: "cue 1",
  start: 60,
  end: 65,
  captions: "Hello, World"
});

spanishCaptions.addCue({
  label: "cue 2",
  start: "1:06",
  end: "1:11",
  captions: "this is a <strong>single line</strong> caption"
});

spanishCaptions.addCue({
  start: "1:12",
  end: 79,
  captions: [
    "this is a multi",
    "line caption"
  ]
});
...
```



As you can see in the above example:

- The label is an optional parameter
- You can specify the time intervals in seconds or in formatted time string.
- You can mix numeric and time string format for the same cue.
- You can add multi line captions using an array of strings
- You can use HTML tags in the captions.



## CaptionsCanvas

The `CaptionCanvas` is the element of paella player where the captions are represented, and it is also the interface through which we can load them, consult them, activate and deactivate them. It is accessible through the `paella` instance through the `async captionsCanvas` attribute:

```javascript
... 
const captionCanvas = await myPlayerInstance.captionCanvas;

// Add captions to the canvas
captionCanvas.addCaptions(spanishCaptions):

// Get the list of captions
captionsCanvas.captions.forEach(c => console.log(c));

// Enable captions
captionsCanvas.enableCaptions({
  lang: 'es'	// You also can search by label or index
});

// Disable captions
captionsCanvas.disableCaptions();

// Find captions
captionsCanvas.getCaption({
  label: "Spanish"	// You calso can search by language or index
});

if (captionsCanvas.currentCaptions !== null) {
  console.log("Current captions: " + captionsCanvas.currentCaptions.language);
}
```

When the `addCaptions` method is used, the `Events.CAPTIONS_CHANGED` event is fired. We can capture this event from plugins to, for example, generate a subtitle selection menu.


## WebVTT

Although the paella player API is independent of subtitle format, `paella-core` provides a utility to load subtitles in WebVTT format:

```javascript
const parser = new WebVTTParser(text);
parser.language = "es";
parser.label = "Spanish";
captionsCanvas.addCaptions(parser.captions);
```



## Captions plugins

Although in the previous examples we have seen how to add subtitles directly using the subtitle API, the proper way to load them is by using [captions plugins](captions_plugins.md).

