
import CaptionsPlugin from '../captions/CaptionsPlugin';
import WebVTTParser from '../captions/WebVTTParser';
import PaellaCorePlugins from './PaellaCorePlugins';

import { resolveResourcePath } from '../core/utils';

export default class VttManifestCaptionsPlugin extends CaptionsPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    get name() {
		return super.name || "es.upv.paella.vttManifestCaptionsPlugin";
	}

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
            p.push(new Promise(async (resolve, reject) => {
                if (/vtt/i.test(captions.format)) {
                    const fileUrl = resolveResourcePath(this.player, captions.url);
                    const fetchResult = await fetch(fileUrl)    
                    if (fetchResult.ok) {
                        const text = await fetchResult.text();
                        const parser = new WebVTTParser(text);
                        parser.captions.label = captions.text;
                        parser.captions.language = captions.lang;
                        result.push(parser.captions);
                        resolve();
                    }
                    else {
                        reject();
                    }                    
                }
                else {
                    reject();
                }
            }));
        });
        await Promise.allSettled(p);
        return result;
    }
}