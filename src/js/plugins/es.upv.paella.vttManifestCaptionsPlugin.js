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
        this.player.videoManifest.captions.forEach(async captions => {
            if (/vtt/i.test(captions.format)) {
                const fileUrl = resolveResourcePath(this.player, captions.url);
                console.log(fileUrl);
                const result = await fetch(fileUrl);
                if (result.ok) {
                    const text = await result.text();
                    const parser = new WebVTTParser(text);
                    console.log(text);
                    parser.captions.label = captions.text;
                    parser.captions.language = captions.lang;
                    result.push(parser.captions);
                }
            }
        });
        return result;
    }
}