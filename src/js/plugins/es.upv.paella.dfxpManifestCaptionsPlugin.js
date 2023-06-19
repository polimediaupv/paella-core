
import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import DFXPParser from 'paella-core/js/captions/DFXPParser';

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
            p.push(new Promise((resolve, reject) => {
                if (/dfxp/i.test(captions.format)) {
                    const fileUrl = resolveResourcePath(this.player, captions.url);
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
                            const parser = new DFXPParser(this.player, text);
                            Object.entries(parser.captions).forEach(([lang,captions]) => {
                                result.push(captions);
                            });
                            resolve();
                        })
                    
                }
            }));
        });
        await Promise.all(p);
        return result;
    }
}