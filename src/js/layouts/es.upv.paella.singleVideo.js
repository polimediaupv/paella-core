import { CanvasButtonPosition } from '../core/CanvasPlugin';
import VideoLayout from '../core/VideoLayout';

import sideBySideIcon from "../../icons/icon_side_by_side.svg";

export default class SingleVideoLayout extends VideoLayout {
    get identifier() { return "single-video"; }

    async load() {
        this.player.log.debug("Single video layout loaded");
    }

    getValidStreams(streamData) {
        // As this plugin is a single stream, we make sure that the valid streams are simple
        // This prevents a bad configuration of the plugin
        return super.getValidStreams(streamData)
            .filter(stream => stream.length === 1);
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        if (this._multiStream) {
            return [
                {
                    icon: sideBySideIcon,
                    position: CanvasButtonPosition.LEFT,
                    title: this.player.translate("Show second video stream"),
                    ariaLabel: this.player.translate("Show second video stream"),
                    click: () => {
                        this.player.videoContainer.setLayout("presenter-presentation");
                    }
                }
            ]
        }
        else {
            return []
        }
    }

    getLayoutStructure(streamData, contentId) {
        const validContent = this.validContent.find(content => content.id===contentId);
        const layoutStructure = {
            player: this.player,
            name:{es:"One stream"},
            hidden:false,
            videos: [
                {
                    content:validContent.content[0],
                    rect:[
                        { aspectRatio:"1/1",left:280,top:0,width:720,height:720 },
                        { aspectRatio:"6/5",left:208,top:0,width:864,height:720 },
                        { aspectRatio:"5/4",left:190,top:0,width:900,height:720 },
                        { aspectRatio:"4/3",left:160,top:0,width:960,height:720 },
                        { aspectRatio:"11/8",left:145,top:0,width:990,height:720 },
                        { aspectRatio:"1.41/1",left:132,top:0,width:1015,height:720 },
                        { aspectRatio:"1.43/1",left:125,top:0,width:1029,height:720 },
                        { aspectRatio:"3/2",left:100,top:0,width:1080,height:720 },
                        { aspectRatio:"16/10",left:64,top:0,width:1152,height:720 },
                        { aspectRatio:"5/3",left:40,top:0,width:1200,height:720 },
                        { aspectRatio:"16/9",left:0,top:0,width:1280,height:720 },
                        { aspectRatio:"1.85/1",left:0,top:14,width:1280,height:692 },
                        { aspectRatio:"2.35/1",left:0,top:87,width:1280,height:544 },
                        { aspectRatio:"2.41/1",left:0,top:94,width:1280,height:531 },
                        { aspectRatio:"2.76/1",left:0,top:128,width:1280,height:463 }
                    ],
                    visible:true,
                    layer:1
                }
            ],
            background:{content:"slide_professor_paella.jpg",zIndex:5,rect:{left:0,top:0,width:1280,height:720},visible:true,layer:0},
            logos:[{content:"paella_logo.png",zIndex:5,rect:{top:10,left:10,width:49,height:42}}],
            buttons: [],
            onApply: function() { }
        }

        if (streamData.length > 1) {
            this._multiStream = true;
        }

        return layoutStructure;
    }
} 