
import VideoLayout from '../core/VideoLayout';

import { CanvasButtonPosition } from '../core/CanvasPlugin';

import defaultIconSideBySide from '../../icons/icon_side_by_side';

import PaellaCoreLayouts from './PaellaCoreLayouts';

export default class SingleVideoDynamicLayout extends VideoLayout {
    getPluginModuleInstance() {
        return PaellaCoreLayouts.Get();
    }
    
    get name() {
		return super.name || "es.upv.paella.singleVideoDynamic";
	}

    get layoutType() {
        return "dynamic";
    }

    async load() {
        this.player.log.debug("Single video dynamic layout loaded");
        this.dualVideoContentIds = this.config.dualVideoContentIds || [
            "presenter-presentation-dynamic",
            "presenter-2-presentation-dynamic",
            "presenter-presenter-2-dynamic",
            "presenter-presentation",
            "presenter-2-presentation",
            "presenter-presenter-2"
        ];
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        const iconSideBySide = this.player.getCustomPluginIcon(this.name,"iconSideBySide") || defaultIconSideBySide;

        const result = [];
        if (this._multiStream) {
            result.push({
                icon: iconSideBySide,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Dual stream 50%'),
                ariaLabel: this.player.translate('Dual stream 50%'),
                name: this.name + ':iconSideBySide',
                click: async () => {
                    const availableContentIds = this.player.videoContainer.validContentIds;
                    const dualVideoContentId = this.dualVideoContentIds.find(id => {
                        return availableContentIds.indexOf(id) !== -1;
                    });
                    if (dualVideoContentId) {
                        this.player.videoContainer.setLayout(dualVideoContentId);
                    }
                }
            });
        }
        return result;
    }

    getLayoutStructure(streamData, contentId, mainContent) {
        if (streamData.length > 1) {
            this._multiStream = true;
        }
        const { content } = this.validContent.find(content => content.id === contentId);
        this._currentContent = content.map(c => {
            return {
                id: c,
                size: 50
            }
        });
        return {
            id: "single-dynamic",
            videos: [
                {
                    content: this._currentContent[0].id,
                    visible: true,
                    size: this._currentContent[0].size
                }
            ]
        }
    }
}