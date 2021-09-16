import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import WebVTTParser from 'paella-core/js/captions/WebVTTParser';
import { HlsVideo } from 'paella-core/js/videoFormats/es.upv.paella.hlsVideoFormat';

export default class HlsCaptionsPlugin extends CaptionsPlugin {
    async isEnabled() {
        const enabled = await super.isEnabled();
        if (!enabled) {
            return false;
        }

        const { streamProvider } = this.player.videoContainer;
        this.captions = [];

        streamProvider.players.forEach(p => {
            if (p instanceof HlsVideo) {
                const { subtitleTracks } = p._hls;
                subtitleTracks?.forEach(track => {
                    const { lang, name, url, id } = track;
                    this.captions.push({
                        id,
                        label: name,
                        language: lang,
                        url
                    });
                });
            }
        });

        if (this.captions.length) {
            this.player.log.debug("HLS captions loaded.");
        }

        return this.captions.length > 0;
    } 

    async getCaptions() {
        const result = [];

        
        const p = [];
        this.captions.forEach(caption => {
            p.push(new Promise(async resolve => {
                const response = await fetch(caption.url);
                const baseUrl = caption.url.substring(0, caption.url.lastIndexOf('/') + 1);
                const data = await response.text();
                const re = /([a-z0-9_\-]+\.vtt)/im;
                const m3u8Data = re.exec(data);
                if (m3u8Data) {
                    const vttUrl = baseUrl + m3u8Data[1];
                    const vttResponse =await fetch(vttUrl);
                    const vttText = await vttResponse.text();
                    
                    const parser = new WebVTTParser(vttText);
                    parser.captions.label = caption.label;
                    parser.captions.language = caption.language;
                    result.push(parser.captions);
                    resolve();
                }
                else {
                    resolve();
                }
            }));
        });
        await Promise.all(p);
        return result;
    }
}