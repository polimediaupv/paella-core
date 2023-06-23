
import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import DFXPParser from 'paella-core/js/captions/DFXPParser';

import { resolveResourcePath } from 'paella-core/js/core/utils';

export default class DfxpManifestCaptionsPlugin extends CaptionsPlugin {
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
                    return fetch(fileUrl)
                        .then(fetchResult => {
                            if (fetchResult.ok) {
                                let cleaned = fetchResult.text();
                                // fix malformed xml replacing the malformed characters with blank
                                // Ignore no-control-regex is Ok for cleaning test per eslint docs
                                // "If you need to use control character pattern matching, then you should turn this rule off."
                                // ref https://eslint.org/docs/latest/rules/no-control-regex
                                // eslint-disable-next-line no-control-regex
                                cleaned = cleaned.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
                                cleaned = cleaned.replace(/&\w+;/gmi,'');
                                cleaned = cleaned.replaceAll('<br>','');
                                return cleaned;
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
                else {
                    reject();
                }
            }));
        });
        await Promise.allSettled(p);
        return result;
    }
}
