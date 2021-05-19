## Captions plugins

Integrates the captions API defined in [CaptionsCanvas](captions.md) with the Paella Player plugin system, to load captions into the video.

Caption plugins only have one specific method, which is normally used together with the two generic plugin methods:

- `async getCaptions()`: returns an array with objects of type [Caption](captions.md).
- `async isEnabled()` and `async load()`: can be used to determine if the video has captions, and to get them from the backend.

Caption plugins have the responsibility to determine if a video has captions, for example, from the `captions` attribute of the [video manifest](video_manifest.md). If your service's backend provides other methods for loading captions, the way to get them is via a caption plugin.

In addition, the subtitle plugins are also in charge of loading and decoding the subtitles in whatever format, and generating the `Captions` objects from there. 

For subtitles in `webvtt` format, there is a utility to load this format and convert it into a `Captions` object:

```javascript
import { WebVTTParser } from 'paella-core';

...
const parser = WebVTTParser(vttText);
const { captions } = parser;

console.log(captions.cues);
```



## Example: vttManifestCaptionsPlugin

**es.upv.paella.vttManifestCaptionsPlugin.js:**

```javascript

import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import WebVTTParser from 'paella-core/js/captions/WebVTTParser';

import { resolveResourcePath } from 'paella-core/js/core/utils';

export default class VttManifestCaptionsPlugin extends CaptionsPlugin {
  async isEnabled() {
    const enabled = await super.isEnabled();
    return  enabled &&
      this.player.videoManifest.captions &&
      this.player.videoManifest.captions.length>0;
  }

  async getCaptions() {
    const result = [];
    const p = [];
    this.player.videoManifest.captions.forEach(captions => {
      p.push(new Promise(resolve => {
        if (/vtt/i.test(captions.format)) {
          const fileUrl = resolveResourcePath(this.player, captions.url);
          console.log(fileUrl);
          fetch(fileUrl)
            .then(fetchResult => {
            if (fetchResult.ok) {
              return fetchResult.text();
            }
            else {
              reject();
            }
          })
            .then((text) => {
            const parser = new WebVTTParser(text);
            parser.captions.label = captions.text;
            parser.captions.language = captions.lang;
            result.push(parser.captions);
            resolve();
          })

        }
      }));
    });
    await Promise.all(p);
    return result;
  }
}
```



