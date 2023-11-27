import ButtonPlugin from '../core/ButtonPlugin';
import PaellaCorePlugins from './PaellaCorePlugins';

import testIcon from '../../icons/screen';

export default class NonInteractiveButton extends ButtonPlugin {
    getPluginModuleInstance() {
        return PaellaCorePlugins.Get();
    }
    
    async load() {
        this.icon = testIcon;
        this.title = "aa"
    }

    get interactive() {
        return false;
    }

    get dynamicWidth() {
        return false;
    }
}
