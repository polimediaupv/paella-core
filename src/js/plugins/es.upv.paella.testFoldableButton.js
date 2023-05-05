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

    showFoldableContainer() {
        this.foldableContainer.style.display = "inline-block";
    }

    hideFoldableContainer() {
        this.foldableContainer.style.display = "none";
    }

    async load() {
        this.icon = screenIcon;
        this.foldableContainer.style.display = "none";
        this.foldableContainer.innerHTML = "Foldable Container";
    }

    async mouseOver(target) {
        this.showFoldableContainer();
    }

    async mouseOut(target) {
        this.hideFoldableContainer();
    }

    async focusIn() {
        this.showFoldableContainer();
    }

    async focusOut() {
        this.hideFoldableContainer();
    }
}
