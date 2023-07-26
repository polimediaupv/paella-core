import ButtonGroupPlugin from 'paella-core/js/core/ButtonGroupPlugin';

import ScreenIcon from 'paella-core/icons/screen.svg';

import PaellaCorePlugins from './PaellaCorePlugins';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async load() {
        this.icon = ScreenIcon;
    }
}
