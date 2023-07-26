import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';

import PaellaCorePlugins from './PaellaCorePlugins';

export default class TestCaptionsPlugin extends CaptionsPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
}
