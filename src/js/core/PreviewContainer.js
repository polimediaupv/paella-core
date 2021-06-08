
import { DomClass, createElementWithHtmlText } from './dom';

const g_style = `
    background-color: #e4e4e4;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const g_imgStyle = `
    width: 100%;
`
export default class PreviewContainer extends DomClass {
    constructor(player, parentElement,backgroundImage) {
        const attributes = {
            "class": "preview-container",
            "style": g_style
        };
        super(player, {attributes, parent: parentElement});

        this._img = createElementWithHtmlText(`
            <img style="${g_imgStyle}" src="${backgroundImage}" alt=""/>
        `, this.element);

        this.element.addEventListener("click", (evt) => {
            player.play();
        });
    }

    loadBackgroundImage(src) {
        this._img.setAttribute("src",src);
    }
}
