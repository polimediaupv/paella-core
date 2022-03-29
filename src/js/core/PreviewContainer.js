
import { DomClass, createElementWithHtmlText } from './dom';

const g_style = `
    background-color: #e4e4e4;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); 
`
const g_imgStyle = `
    width: 100%;
`;

const g_iconContainerStyle = `
    position: absolute; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const g_iconStyle = `
    pointer-events: none;
    width: 20%;
    max-width: 400px;
    min-width: 100px;
    opacity: 0.6;
`;

import PlayIcon from 'paella-core/icons/play_icon_fullscreen.svg';

export default class PreviewContainer extends DomClass {
    constructor(player, parentElement,backgroundImage) {
        const attributes = {
            "class": "preview-container",
            "style": g_style
        };
        super(player, {attributes, parent: parentElement});

        this._img = createElementWithHtmlText(`
        <div>
            <img style="${g_imgStyle}" src="${backgroundImage}" alt=""/>
            <div style="${ g_iconContainerStyle }">
                <i class="preview-play-icon" style="${ g_iconStyle }">${ PlayIcon }</i>
            </div>
        </div>
        `, this.element);

        this.element.addEventListener("click", (evt) => {
            player.play();
        });
    }

    loadBackgroundImage(src) {
        this._img.setAttribute("src",src);
    }
}
