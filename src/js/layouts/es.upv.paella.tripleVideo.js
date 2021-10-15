
import VideoLayout from 'paella-core/js/core/VideoLayout';


import iconRotate from 'paella-core/icons/icon_rotate.svg';

const layout = {
    videos: [
        {
            content: {},
            rect:[
                { aspectRatio:"16/9",left:239, top:17, width:803, height:451 }
            ],
            visible:true,
            layer:1
        },
        {
            content: {},
            rect:[
                { aspectRatio:"16/9",left:44, top:482, width:389, height:218 }
            ],
            visible:true,
            layer:1
        },
        {
            content: {},
            rect:[
                { aspectRatio:"16/9",left:847, top:482, width:389, height:218 }
            ],
            visible:true,
            layer:1
        }
    ],
    buttons: [
        {
            rect: { left: 618, top: 495, width: 45, height: 45 },
            onClick: function(event) { this.rotate(); },
            label:"Rotate",
            icon:"icon_rotate.svg",
            layer: 2
        }
    ]
}

function getLayout(validContent) {
    let selectedLayout = JSON.parse(JSON.stringify(layout));
    selectedLayout.videos[0].content = validContent[0];
    selectedLayout.videos[1].content = validContent[1];
    selectedLayout.videos[2].content = validContent[2];
    return selectedLayout;
}

export default class TripleVideoLayout extends VideoLayout {
    get identifier() { return "triple-video"; }

    async load() {
        this.player.log.debug("Triple video layout loaded");
    }

    getValidStreams(streamData) {
        // As this is a dual stream layout plugin, we make sure that the valid streams containis
        // two streams. This prevents a bad configuration of the plugin
        return super.getValidStreams(streamData)
            .filter(stream => stream.length === 3);
    }
    
    switchContent() {
        const v0 = this._currentContent[0];
        const v1 = this._currentContent[1];
        const v2 = this._currentContent[2];
        this._currentContent[0] = v2;
        this._currentContent[1] = v0;
        this._currentContent[2] = v1;
        
        this.player.videoContainer.updateLayout();
    }

    getLayoutStructure(streamData, contentId) {
        if (!this._currentContent || this._currentContentId!==contentId) {
            this._currentContentId = contentId;
            const {content} = this.validContent.find(content => content.id === contentId);
            this._currentContent = content;
        }
        const selectedLayout = getLayout(this._currentContent);
        
        const result = {
            player: this.player,
            name:{es:"Three streams with dynamic position"},
            hidden:false,
            videos: selectedLayout.videos,
            buttons: [
                {
                    rect: selectedLayout.buttons[0].rect,
                    onClick: () => { this.switchContent(); },
                    label:"Switch",
                    icon: iconRotate,
                    layer: 2,
                    ariaLabel: "Swap the position of the videos",
                    title: "Swap the position of the videos"
                }
            ]
        };
        
        return result;
    }

    async getDictionaries() {
        return {
            es: {
                "Swap between side by side and minimized video": "Cambiar la disposición de los dos vídeos entre minimizado y del mismo tamaño",
                "Swap the position of the videos": "Intercambiar la posición de los vídeos"
            }
        };
    }
}
