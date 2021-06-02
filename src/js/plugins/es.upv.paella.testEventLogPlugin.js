
import EventLogPlugin from 'paella-core/js/core/EventLogPlugin';
import Events from 'paella-core/js/core/Events';

export default class TestEventLogPlugin extends EventLogPlugin {
    get events() {
        return [
            Events.PLAY,
            Events.PAUSE,
            Events.TIMEUPDATE
        ];
    }

    async onEvent(event, params) {
        console.log(event);
        console.log(params);
    }
}
