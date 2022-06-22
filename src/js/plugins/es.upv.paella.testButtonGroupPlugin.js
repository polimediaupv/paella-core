import ButtonGroupPlugin from '../core/ButtonGroupPlugin';

import ScreenIcon from '../../icons/screen.svg';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    async load() {
        this.icon = ScreenIcon;
    }
}
