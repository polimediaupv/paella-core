
import VideoLayout from 'paella-core/js/core/VideoLayout';

import { CanvasButtonPosition } from '../core/CanvasPlugin';

import defaultIconRotate from 'paella-core/icons/icon_rotate.svg';
import defaultIconMinimize from 'paella-core/icons/minimize-3.svg';
import defaultIconSwitchSide from 'paella-core/icons/icon_switch_side.svg';
import defaultIconMaximize from 'paella-core/icons/maximize.svg';
import defaultIconClose from 'paella-core/icons/close.svg';
import defaultIconSideBySide from 'paella-core/icons/icon_side_by_side.svg';

export default class DualVideoDynamicLayout extends VideoLayout {
    get layoutType() {
        return "dynamic";
    }

    async load() {

    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        const iconMinimize = this.player.getCustomPluginIcon(this.name,"iconMinimize") || defaultIconMinimize;
        const iconMaximize = this.player.getCustomPluginIcon(this.name,"iconMaximize") || defaultIconMaximize;
        const iconSwitchSide = this.player.getCustomPluginIcon(this.name,"iconSwitchSide") || defaultIconRotate;
        const iconClose = this.player.getCustomPluginIcon(this.name,"iconClose") || defaultIconClose;
        const layoutData = () => this._currentContent.find(lo => lo.id === content);
        const isMinimized = () => layoutData().size === 25;
        const isMaximized = () => layoutData().size > 25;
        const result = [];

        if (isMinimized()) {
            result.push({
                icon: iconMaximize,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Maximize video'),
                ariaLabel: this.player.translate('Maximize video'),
                click: async () => {
                    this._currentContent.forEach(lo => {
                        lo.size = 50;
                    });
                    await this.player.videoContainer.updateLayout();
                }
            });
        }
        else if (isMaximized()) {
            result.push({
                icon: iconMinimize,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Minimize video'),
                ariaLabel: this.player.translate('Minimize video'),
                click: async () => {
                    this._currentContent.forEach(lo => {
                        lo.size = lo.id === content ? 25 : 75;
                    });
                    await this.player.videoContainer.updateLayout();
                }
            });
        }
        result.push({
            icon: iconSwitchSide,
            position: CanvasButtonPosition.LEFT,
            title: this.player.translate('Switch side'),
            ariaLabel: this.player.translate('Switch side'),
            click: async () => {
                const ct1 = this._currentContent[0].id;
                const ct2 = this._currentContent[1].id;
                const ct1Size = this._currentContent[0].size;
                const ct2Size = this._currentContent[1].size;
                this._currentContent[0].id = ct2;
                this._currentContent[0].size = ct2Size;
                this._currentContent[1].id = ct1;
                this._currentContent[1].size = ct1Size;
                await this.player.videoContainer.updateLayout();
            }
        });
        result.push({
            icon: iconClose,
            position: CanvasButtonPosition.RIGHT,
            title: this.player.translate("Close video"),
            ariaLabel: this.player.translate("Close video"),
            click: async () => {
                const singleStreamContentIds = this.player.videoContainer.validContentIds.filter(cid => cid.indexOf("-") === -1);
                const contentId = singleStreamContentIds.find(cid => cid != content);
                await this.player.videoContainer.setLayout(contentId);
            }
        });

        return result;
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