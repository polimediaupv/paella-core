import ButtonPlugin from '../core/ButtonPlugin.js';
import PaellaCorePlugins from './PaellaCorePlugins.js';
import { secondsToTime } from '../core/utils.js';
import Events from '../core/Events.js';

export default class CurrentTimeLabelPlugin extends ButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }

    get name() {
        return "es.upv.paella.currentTimeLabel";
    }
    
    async load() {
        this.title = secondsToTime(0);

        const updateTitle = async () => {
            const currentTime = await this.player.videoContainer.currentTime();
            let newTitle = secondsToTime(currentTime);

            if (this.config.showTotalTime) {
                const duration = await this.player.videoContainer.duration();
                newTitle += ` / ${secondsToTime(duration)}`;
            }

            this.title = newTitle;
        }

        this.player.bindEvent(Events.TIMEUPDATE, () => updateTitle());
        this.player.bindEvent(Events.TRIMMING_CHANGED, () => updateTitle());
        this.player.bindEvent(Events.SEEK, () => updateTitle());
    }

    get interactive() {
        return false;
    }

    get dynamicWidth() {
        return true;
    }
}
