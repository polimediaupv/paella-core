import { DomClass } from 'paella-core/js/core/dom';
import { secondsToTime } from 'paella-core/js/core/utils';
import Events from 'paella-core/js/core/Events.js';

export default class ProgressIndicatorTimer extends DomClass {
    constructor(player, parent) {
        const attributes = {
            "class": "progress-indicator-timer"
        }
        super(player, { attributes, parent });

        const showTotal = player.config.progressIndicator?.showTotal;
        this.element.innerHTML = "0:00" + showTotal ? "00:00":"";
        
        if (player.config.progressIndicator?.visible === false) {
            this.hide();
        }

        const updateTime = async (time) => {
            const formattedTime = secondsToTime(time);
            if (showTotal === false) {
                this.element.innerHTML = formattedTime;
            }
            else {
                const totalTime = secondsToTime(await player.videoContainer.duration());
                this.element.innerHTML = `${formattedTime} / ${totalTime}`;
            }
        }

        player.bindEvent(Events.TIMEUPDATE, async ({ currentTime }) => await updateTime(currentTime));
        player.bindEvent(Events.SEEK, async ({newTime}) => await updateTime(newTime));
        player.bindEvent(Events.STOP, async () => await updateTime(0));

        const container = player.config.progressIndicator?.parentContainer;
        const side = player.config.progressIndicator?.side || "left";
        if (container === "progressIndicator") {
            this.element.classList.add(`${side}-side`);
        }
    }
}
