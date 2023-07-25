
import VideoLayout from 'paella-core/js/core/VideoLayout';

import { CanvasButtonPosition } from '../core/CanvasPlugin';

import defaultIconRotate from 'paella-core/icons/icon_switch_side.svg';
import defaultIconMaximize from 'paella-core/icons/maximize.svg';
import defaultIconClose from 'paella-core/icons/close.svg';
import defaultIconSideBySide from 'paella-core/icons/icon_side_by_side.svg';
import defaultIconPiP from 'paella-core/icons/icon_pip.svg';

export default class DualVideoDynamicLayout extends VideoLayout {
    get name() {
		return super.name || "es.upv.paella.dualVideoDynamic";
	}

    get layoutType() {
        return "dynamic";
    }

    async load() {
        this.pipContentIds = this.config.pipContentIds || [];
        this.allowSwitchSide = this.config.allowSwitchSide !== undefined ? this.config.allowSwitchSide : true;
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        const iconMaximize = this.player.getCustomPluginIcon(this.name,"iconMaximize") || defaultIconMaximize;
        const iconSideBySide = this.player.getCustomPluginIcon(this.name,"iconSideBySide") || defaultIconSideBySide;
        const iconSwitchSide = this.player.getCustomPluginIcon(this.name,"iconSwitchSide") || defaultIconRotate;
        const iconClose = this.player.getCustomPluginIcon(this.name,"iconClose") || defaultIconClose;
        const iconPiP = this.player.getCustomPluginIcon(this.name,"iconPiP") || defaultIconPiP;
        const layoutData = () => this._currentContent.find(lo => lo.id === content);
        const isMinimized = () => layoutData().size === 25;
        const isMaximized = () => layoutData().size > 50;
        const result = [];

        if (isMinimized() || isMaximized()) {
            result.push({
                icon: iconSideBySide,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Dual stream 50%'),
                ariaLabel: this.player.translate('Dual stream 50%'),
                name: this.name + ':iconSideBySide',
                click: async () => {
                    this._currentContent.forEach(lo => {
                        lo.size = 50;
                    });
                    await this.player.videoContainer.updateLayout();
                }
            });
        }
        else {
            result.push({
                icon: iconMaximize,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Maximize video'),
                ariaLabel: this.player.translate('Maximize video'),
                name: this.name + ':iconMaximize',
                click: async () => {
                    this._currentContent.forEach(lo => {
                        lo.size = lo.id === content ? 75 : 25;
                    });
                    await this.player.videoContainer.updateLayout();
                }
            });
        }

        if (this.allowSwitchSide) {        
            result.push({
                icon: iconSwitchSide,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate('Switch side'),
                ariaLabel: this.player.translate('Switch side'),
                name: this.name + ':iconSwitchSide',
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
        }

        result.push({
            icon: iconClose,
            position: CanvasButtonPosition.RIGHT,
            title: this.player.translate("Close video"),
            ariaLabel: this.player.translate("Close video"),
            name: this.name + ':iconClose',
            click: async () => {
                const singleStreamContentIds = this.player.videoContainer.validContentIds.filter(cid => cid.indexOf("-") === -1);
                const contentId = singleStreamContentIds.find(cid => cid != content);
                await this.player.videoContainer.setLayout(contentId);
            }
        });

        if (this.pipContentIds.length > 0) {
            result.push({
                icon: iconPiP,
                position: CanvasButtonPosition.LEFT,
                title: this.player.translate("Picture-in-picture"),
                ariaLabel: this.player.translate("Picture-in-picture"),
                name: this.name + ':iconPiP',
                click: async () => {
                    const contentId = this.player.videoContainer.validContentIds.find(cid => this.pipContentIds.indexOf(cid) !== -1);
                    await this.player.videoContainer.setLayout(contentId,content);
                }
            })
        }

        return result;
    }

    getLayoutStructure(streamData, contentId, mainContent) {
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