import ButtonGroupPlugin from 'paella-core/js/core/ButtonGroupPlugin';
import 'paella-core/styles/ButtonGroup.css';

import ScreenIcon from 'paella-core/icons/screen.svg';

export default class TestButtonGroupPlugin extends ButtonGroupPlugin {
    async load() {
        this.icon = ScreenIcon;
    }
}
