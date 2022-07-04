import { DomClass } from 'paella-core/js/core/dom';
import { secondsToTime } from 'paella-core/js/core/utils';
import Events from 'paella-core/js/core/Events.js';

export default class ProgressIndicatorTimer extends DomClass {
    constructor(player, parent) {
        const attributes = {
            "class": "progress-indicator-timer"
        }
        super(player, { attributes, parent });

        this.element.innerHTML = "0:00/00:00";

        const updateTime = async (time) => {
            const formattedTime = secondsToTime(time);
            this.element.innerHTML = formattedTime;
        }

        player.bindEvent(Events.TIMEUPDATE, async ({ currentTime }) => await updateTime(currentTime));
        player.bindEvent(Events.SEEK, async ({newTime}) => await updateTime(newTime));
        player.bindEvent(Events.STOP, async () => await updateTime(0));
    }
}
