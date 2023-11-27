import ButtonGroupPlugin from '../core/ButtonGroupPlugin';

import ScreenIcon from '../../icons/screen';

import PaellaCorePlugins from './PaellaCorePlugins';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async load() {
        this.icon = ScreenIcon;
    }
}
