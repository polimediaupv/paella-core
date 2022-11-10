
import VideoLayout from 'paella-core/js/core/VideoLayout';

import defaultIconMaximize from "../../icons/maximize.svg";
import { CanvasButtonPosition } from '../core/CanvasPlugin';
export default class DualVideoDynamicLayout extends VideoLayout {
    get layoutType() {
        return "dynamic";
    }

    async load() {

    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        return [{
            icon: defaultIconMaximize,
            position: CanvasButtonPosition.LEFT,
            title: "Test button",
            ariaLabel: "Test button",
            click: async () => {
                alert("Test button");
            }
        }];
    }

    getLayoutStructure(streamData, contentId) {
        if (!this._currentContent) {
            const { content } = this.validContent.find(content => content.id === contentId);
            this._currentContent = content.map(c => {
                return {
                    id: c,
                    size: 50
                }
            });
        }
        return {
            id: "dual-dynamic",
            videos: [
                {
                    content: this._currentContent[0].id,
                    visible: true,
                    size: this._currentContent[0].size
                },
                {
                    content: this._currentContent[1].id,
                    visible: true,
                    size: this._currentContent[1].size
                }
            ]
        }
    }
}