# Video manifest: captions

`paella-core` has two plugins for loading subtitles in `vtt` and `dfxp` format. Both plugins use the video manifest to load the subtitles. The plugins do not require any specific configuration, so we only have to activate them:

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.vttManifestCaptionsPlugin": {
            "enabled": true
        },

        "es.upv.paella.dfxpManifestCaptionsPlugin": {
            "enabled": true
        },
        ...
    }
}
```

On the other hand, we need to activate the subtitle selector plugin, which is available in `paella-basic-plugins`. As we have already imported the context plugin from `paella-basic-plugins`, we only need to add the configuration:

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.captionsSelectorPlugin": {
            "enabled": true,
            "side": "right"
        },
        ...
    }
}
```



In the video manifest we can use the `captions` property to define a list of subtitles. Each element of the list will contain a reference to a subtitle file. If the file path is relative, the download URL will be formed based on the directory where the video manifest file is located.

```json
{
    ...
    "captions": [
		{
			"lang": "es",
			"text": "Español (traducción automática)",
			"format": "vtt",
			"url": "captions.es.vtt"
		}
	]
}
```

## WebVTT

The VTT format is based on plain text. Basically, the file contains a list consisting of an identifier, timestamps and one or more lines of text.

Create the following three files:

**public/repo/vtt-captions/data.json:**

```json
{
	"streams": [
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/pm-be0c7738-039d-9445-8237-8b85f37cd303/video/720p.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1280",
							"h": "720"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/pm-be0c7738-039d-9445-8237-8b85f37cd303/slides/thumb_0.jpg",
			"content":"presenter"
		}
	],
	"captions": [
		{
			"lang": "es",
			"text": "Español",
			"format": "vtt",
			"url": "captions.es.vtt"
		},
        {
			"lang": "en",
			"text": "English",
			"format": "vtt",
			"url": "captions.en.vtt"
		}
	]
}
```

**public/repo/vtt-captions/captions.es.vtt:**

```txt
WEBVTT

00:00:02.220 --> 00:00:05.800
ok voy a hablar de <b>Tycho Brahe</b> traído porque creo

00:00:06.300 --> 00:00:09.270
su trabajo era realmente el inicio de la ciencia

00:00:09.470 --> 00:00:13.790
la gente piensa que la ciencia para así comenzó hace mucho tiempo con los griegos y

00:00:14.100 --> 00:00:19.930
quizá con los árabes allí, pero en realidad la ciencia comenzó con este hombre

00:00:20.250 --> 00:00:21.900
y ¿por qué digo que

00:00:22.300 --> 00:00:26.940
bueno, miremos a los instrumentos que utilizó para observar los planetas

00:00:27.190 --> 00:00:30.760
fue la primera persona que realmente parcela con exactitud
```


**public/repo/vtt-captions/captions.en.vtt:**

```txt
WEBVTT

00:00:02.220 --> 00:00:05.800
ok i'm going to talk about <b>Tycho Brahe</b> because I think

00:00:06.300 --> 00:00:09.270
his work was really the beginning of science

00:00:09.470 --> 00:00:13.790
people think that the science for so began a long time ago with the Greeks and

00:00:14.100 --> 00:00:19.930
perhaps with the Arabs there, but in reality science began with this man.

00:00:20.250 --> 00:00:21.900
and why do I say that?

00:00:22.300 --> 00:00:26.940
well, let's look at the instruments he used to observe the planets.

00:00:27.190 --> 00:00:30.760
was the first person to actually plot with accuracy
```

Note that the example files are partial and are used only as examples.

You can test the new videos using this URL:

`http://localhost:5173/?id=vtt-captions`

## DFXP

The DFXP format is based on XML and HTML, and has the advantage of allowing several languages to be defined in a single file.

Add the following files:

**repo/dfxp-captions/data.json:**

```json
{
	"streams": [
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/pm-be0c7738-039d-9445-8237-8b85f37cd303/video/720p.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1280",
							"h": "720"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/pm-be0c7738-039d-9445-8237-8b85f37cd303/slides/thumb_0.jpg",
			"content":"presenter"
		}
	],
	"captions": [
		{
			"lang": "captions",
			"text": "Captions",
			"format": "dfxp",
			"url": "captions.dfxp"
		}
	]
}
```

**repo/dfxp-captions/captions.dfxp:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xmlns="http://www.w3.org/ns/ttml" xmlns:ttm="http://www.w3.org/ns/ttml#metadata" xmlns:tts="http://www.w3.org/ns/ttml#styling" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xml:lang="en">
  <head>
    <metadata>
      <ttm:title>Netflix Subtitle for phpNuNPlM</ttm:title>
    </metadata>
    <styling>
      <style tts:fontStyle="normal" tts:fontWeight="normal" xml:id="s1" tts:color="white" tts:fontFamily="Arial" tts:fontSize="100%"></style>
    </styling>
    <layout>
      <region tts:extent="80% 40%" tts:origin="10% 10%" tts:displayAlign="before" tts:textAlign="center" xml:id="topCenter" />
      <region tts:extent="80% 40%" tts:origin="10% 50%" tts:displayAlign="after" tts:textAlign="center" xml:id="bottomCenter" />
    </layout>
  </head>
  <body>
    <div style="s1" xml:id="d1" xml:lang="es">
      <p xml:id="p1" begin="00:00:02.220" end="00:00:05.800" region="bottomCenter">ok voy a hablar de <span tts:fontWeight="bold">Tycho Brahe</span> porque creo</p>
      <p xml:id="p2" begin="00:00:06.300" end="00:00:09.270" region="bottomCenter">su trabajo era realmente el inicio de la ciencia</p>
      <p xml:id="p3" begin="00:00:09.470" end="00:00:13.790" region="bottomCenter">la gente piensa que la ciencia para así comenzó hace mucho tiempo con los griegos y</p>
      <p xml:id="p4" begin="00:00:14.100" end="00:00:19.930" region="bottomCenter">quizá con los árabes allí, pero en realidad la ciencia comenzó con este hombre</p>
      <p xml:id="p5" begin="00:00:20.250" end="00:00:21.900" region="bottomCenter">y ¿por qué digo que</p>
      <p xml:id="p6" begin="00:00:22.300" end="00:00:26.940" region="bottomCenter">bueno, miremos a los instrumentos que utilizó para observar los planetas</p>
    </div>
    <div style="s1" xml:id="d2" xml:lang="en">
      <p xml:id="p1" begin="00:00:02.220" end="00:00:05.800" region="bottomCenter">ok I'm going to talk about <span tts:fontWeight="bold">Tycho Brahe</span> in because I think</p>
      <p xml:id="p2" begin="00:00:06.300" end="00:00:09.270" region="bottomCenter">his work was really the start of science</p>
      <p xml:id="p3" begin="00:09.470" end="00:00:13.790" region="bottomCenter">people think that science for so began a long time ago with the Greeks and</p>
      <p xml:id="p4" begin="00:00:14.100" end="00:00:19.930" region="bottomCenter">maybe with the Arabs there, but in reality science started with this man</p>
      <p xml:id="p5" begin="00:20.250" end="00:00:21.900" region="bottomCenter">and why do I say that</p>
      <p xml:id="p6" begin="00:00:22.300" end="00:00:26.940" region="bottomCenter">well, let's look at the instruments he used to observe the planets</p>
    </div>
  </body>
</tt>
```

Note how the DFXP format allows multiple subtitles to be added using the same file. In this case, the DFXP plugin uses the internal tags of the subtitle file to name each track, and these values are used to label the subtitle menu items.

Previous tutorial: [Customize icons](customize_icons.md)
Next tutorial: 

