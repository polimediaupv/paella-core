
import EventLogPlugin from 'paella-core/js/core/EventLogPlugin';
import Events from 'paella-core/js/core/Events';

export default class TestEventLogPlugin extends EventLogPlugin {
    get events() {
        return [
            Events.PLAY,
            Events.PAUSE,
            Events.TIMEUPDATE,
            Events.MANIFEST_LOADED,
            Events.STREAM_LOADED,
            Events.PLAYER_LOADED
        ];
    }

    async onEvent(event, params) {
        this.player.log.verbose(event);
        this.player.log.verbose(params);
    }
}
