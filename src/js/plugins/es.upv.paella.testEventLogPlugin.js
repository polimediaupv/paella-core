
import EventLogPlugin from '../core/EventLogPlugin';
import Events from '../core/Events';

import PaellaCorePlugins from './PaellaCorePlugins';

export default class TestEventLogPlugin extends EventLogPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
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
