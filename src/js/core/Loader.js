

import { createElementWithHtmlText, DomClass } from './dom';

import ProgressIndicatorIcon from '../../icons/progress_indicator.svg';

import '../../css/Loader.css';

export default class Loader extends DomClass {
    constructor(player) {
        super(player, { parent: player.containerElement });

        this.element.className = "loader-container";
        
        const icon = createElementWithHtmlText(`
        <i>${ProgressIndicatorIcon}</i>`, this.element);
    }
}
