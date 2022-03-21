import VideoLayout from 'paella-core/js/core/VideoLayout';
import { getCookie, setCookie } from 'paella-core/js/core/utils';
import { CanvasButtonPosition } from '../core/CanvasPlugin';

import iconRotate from 'paella-core/icons/icon_rotate.svg';
import iconMinimize from 'paella-core/icons/minimize.svg';
import iconMinimize2 from 'paella-core/icons/minimize-2.svg';
import iconMinimize3 from 'paella-core/icons/minimize-3.svg';
import iconDualVideo from 'paella-core/icons/dual-video.svg';
import iconSideBySide from 'paella-core/icons/icon_side_by_side.svg';
import iconSwitchSide from 'paella-core/icons/icon_switch_side.svg';
import iconMaximize from 'paella-core/icons/maximize.svg';
import iconClose from 'paella-core/icons/close.svg';

const layoutIcons = [
    iconMinimize,
    iconMinimize2,
    iconDualVideo
];

let layout = 0;
/**
 * in pip mode, the minimized video is de second one
 */
const layouts = [
    // First layout: side by side
    {
        id: "side-by-side",
        videos: [
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",width:560,height:315,top:218,left:712},
                    {aspectRatio:"16/10",width:560,height:350,top:206,left:712},
                    {aspectRatio:"4/3",width:560,height:420,top:173,left:712},
                    {aspectRatio:"5/3",width:560,height:336,top:206,left:712},
                    {aspectRatio:"5/4",width:560,height:448,top:160,left:712}
                ],
                visible:true,
                layer:1
            },
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",width:688,height:387,top:166,left:10},
                    {aspectRatio:"16/10",width:688,height:430,top:148,left:10},
                    {aspectRatio:"4/3",width:688,height:516,top:111,left:10},
                    {aspectRatio:"5/3",width:690,height:414,top:154,left:10},
                    {aspectRatio:"5/4",width:690,height:552,top:96,left:10}
                ],
                visible:true,
                layer:"1"
            }
        ],
        buttons: []
    },

    // Second layout: PIP left
    {
        id: "pip-left",
        videos:[
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",left:0,top:0,width:1280,height:720},
                    {aspectRatio:"16/10",left:64,top:0,width:1152,height:720},
                    {aspectRatio:"5/3",left:40,top:0,width:1200,height:720},
                    {aspectRatio:"5/4",left:190,top:0,width:900,height:720},
                    {aspectRatio:"4/3",left:160,top:0,width:960,height:720}
                ],
                visible:true,
                layer:1
            },
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",left:50,top:470,width:350,height:197},
                    {aspectRatio:"16/10",left:50,top:448,width:350,height:219},
                    {aspectRatio:"5/3",left:50,top:457,width:350,height:210},
                    {aspectRatio:"5/4",left:50,top:387,width:350,height:280},
                    {aspectRatio:"4/3",left:50,top:404,width:350,height:262}
                ],
                visible:true,
                layer:2
            }
        ],
        buttons: []
    },

    // Third layout: PIP right
    {
        id: "pip-right",
        videos: [
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",left:0,top:0,width:1280,height:720},
                    {aspectRatio:"16/10",left:64,top:0,width:1152,height:720},
                    {aspectRatio:"5/3",left:40,top:0,width:1200,height:720},
                    {aspectRatio:"5/4",left:190,top:0,width:900,height:720},
                    {aspectRatio:"4/3",left:160,top:0,width:960,height:720}
                ],
                visible:true,
                layer:1
            },
            {
                content:null,
                rect:[
                    {aspectRatio:"16/9",left:880,top:470,width:350,height:197},
                    {aspectRatio:"16/10",left:880,top:448,width:350,height:219},
                    {aspectRatio:"5/3",left:880,top:457,width:350,height:210},
                    {aspectRatio:"5/4",left:880,top:387,width:350,height:280},
                    {aspectRatio:"4/3",left:880,top:404,width:350,height:262}
                ],
                visible:true,
                layer:2
            }
        ],
        buttons: []
    }
];

function nextLayout(validContent) {
    layout = (layout + 1) % layouts.length;
    return currentLayout(validContent);
}

function setLayout(validContent, index) {
    layout = index < layouts.length ? index : layout;
    return currentLayout(validContent);
}

function currentLayout(validContent) {
    let selectedLayout = JSON.parse(JSON.stringify(layouts[layout]));
    selectedLayout.videos[0].content = validContent[0];
    selectedLayout.videos[1].content = validContent[1];
    return selectedLayout;
}

export default class DualVideoLayout extends VideoLayout {
    get identifier() { return "dual-video"; }

    async load() {
        let layoutIndex = getCookie('dualVideoLayoutIndex');
        if (layoutIndex !== "") {
            layout = Number(layoutIndex);
        }
        this.player.log.debug("Dual video layout loaded");
    }

    getValidStreams(streamData) {
        // As this is a dual stream layout plugin, we make sure that the valid streams containis
        // two streams. This prevents a bad configuration of the plugin
        return super.getValidStreams(streamData)
            .filter(stream => stream.length === 2);
    }
    
    switchContent() {
        const v0 = this._currentContent[0];
        const v1 = this._currentContent[1];
        this._currentContent[0] = v1;
        this._currentContent[1] = v0;
        
        this.player.videoContainer.updateLayout();
    }
    
    switchMinimized() {
        nextLayout(this._currentContent);
        this.player.videoContainer.updateLayout();
    }

    minimizeVideo(content) {
        let switchLayout = true;
        if (content === this._currentContent[0]) {
            const v0 = this._currentContent[0];
            const v1 = this._currentContent[1];
            this._currentContent[0] = v1;
            this._currentContent[1] = v0;
            switchLayout = false;
        }
        if (layout === 1 && switchLayout) {
            setLayout(this._currentContent, 2);
        }
        else {
            setLayout(this._currentContent, 1);
        }
        this.player.videoContainer.updateLayout();
    }

    setSideBySide() {
        setLayout(this._currentContent, 0);
        this.player.videoContainer.updateLayout();
    }

    get minimizedContent() {
        // See layout structure
        if (layout === 0) {
            return "";
        }
        else {
            return this._currentContent[1];
        }
    }

    closeVideo(content) {
        const singleStreamContentIds = this.player.videoContainer.validContentIds.filter(cid => cid.indexOf("-") === -1);
        const contentId = singleStreamContentIds.find(cid => cid != content);
        this.player.videoContainer.setLayout(contentId);
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        if (layoutStructure.id === "side-by-side") {
            // Buttons: swap videos and minimize
            return [
                // Swap
                {
                    icon: iconRotate,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Swap position of the videos'),
                    ariaLabel: this.player.translate('Swap position of the videos'),
                    click: () => {
                        this.switchContent();
                    }
                },

                // Minimize
                {
                    icon: iconMaximize,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Maximize video'),
                    ariaLabel: this.player.translate('Maximize video'),
                    click: () => {
                        this.minimizeVideo(content);
                        this.switchContent();
                    }
                },

                // Close
                {
                    icon: iconClose,
                    position: CanvasButtonPosition.RIGHT,
                    title: this.player.translate('Close video'),
                    ariaLabel: this.player.translate('Close video'),
                    click: () => {
                        this.closeVideo(content);
                    }
                }
            ]
        }
        else {
            const result = [];

            if (content === this.minimizedContent) {
                result.push({
                    icon: iconMaximize,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Maximize video'),
                    ariaLabel: this.player.translate('Maximize video'),
                    click: () => {
                        this.switchContent();
                    }
                });

                result.push({
                    icon: iconSwitchSide,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Place the video on the other side of the screen'),
                    ariaLabel: this.player.translate('Place the video on the other side of the screen'),
                    click: () => {
                        this.minimizeVideo(content);
                    }
                });

                result.push({
                    icon: iconClose,
                    position: CanvasButtonPosition.RIGHT,
                    title: this.player.translate('Close video'),
                    ariaLabel: this.player.translate('Close video'),
                    click: () => {
                        this.closeVideo(content);
                    }
                });
            }
            else {
                result.push({
                    icon: iconMinimize3,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Minimize video'),
                    ariaLabel: this.player.translate('Minimize video'),
                    click: () => {
                        this.switchContent();
                    }
                });

                result.push({
                    icon: iconSideBySide,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate('Put the videos side by side'),
                    ariaLabel: this.player.translate('Put the videos side by side'),
                    click: () => {
                        this.setSideBySide();
                    }
                });

                result.push({
                    icon: iconClose,
                    position: CanvasButtonPosition.RIGHT,
                    title: this.player.translate('Close video'),
                    ariaLabel: this.player.translate('Close video'),
                    click: () => {
                        this.closeVideo(content);
                    }
                });
            }
            return result;
        }
    }

    getLayoutStructure(streamData, contentId) {
        if (!this._currentContent || this._currentContentId!==contentId) {
            const {content} = this.validContent.find(content => content.id === contentId);
            this._currentContent = content;
            this._currentContentId = contentId;

            const content0 = getCookie('dualVideoLayoutContent0');
            const content1 = getCookie('dualVideoLayoutContent1');
            if (content0 !== "" && content1 !== "" && 
                this._currentContent.indexOf(content0) !== -1 && 
                this._currentContent.indexOf(content1) !== -1)
            {
                this._currentContent[0] = content0;
                this._currentContent[1] = content1;
            }
        }
        const selectedLayout = currentLayout(this._currentContent);

        const result = {
            id: selectedLayout.id,
            player: this.player,
            name:{es:"Dos streams con posición dinámica"},
            hidden:false,
            videos: selectedLayout.videos,
            buttons: []
        };

        // Save layout settings
        setCookie("dualVideoLayoutIndex", layout);
        setCookie("dualVideoLayoutContent0", this._currentContent[0]);
        setCookie("dualVideoLayoutContent1", this._currentContent[1]);
        
        return result;
    }

    async getDictionaries() {
        const dict = {
            es: {
                "Swap between side by side and minimized video": "Cambiar la disposición de los dos vídeos entre minimizado y del mismo tamaño",
                "Swap the position of the videos": "Intercambiar la posición de los vídeos"
            }
        };
        return dict;
    }
}
