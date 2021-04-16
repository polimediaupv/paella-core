import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';

import screenIcon from 'paella-core/icons/screen.svg';

export default class FoldableButtonPlugin extends ButtonPlugin {
    get foldableContainer() {
        if (this.config.side === "left") {
            return this.rightArea;
        }
        else {
            return this.leftArea;
        }
    }

    async load() {
        this.icon = screenIcon;
        this.foldableContainer.style.display = "none";
        this.foldableContainer.innerHTML = "Foldable Container";
    }

    async mouseOver(target) {
        this.foldableContainer.style.display = "inline-block";
    }

    async mouseOut(target) {
        this.foldableContainer.style.display = "none";
    }
}