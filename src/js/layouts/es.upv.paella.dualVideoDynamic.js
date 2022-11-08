
import VideoLayout from 'paella-core/js/core/VideoLayout';

export default class DualVideoDynamicLayout extends VideoLayout {
    get layoutType() {
        return "dynamic";
    }

    async load() {

    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        return [];
    }

    getLayoutStructure(streamData, contentId) {
        return {
            id: "dual-dynamic",
            videos: [
                {
                    content: "presenter",
                    visible: true,
                    size: 50
                },
                {
                    content: "presentation",
                    visible: true,
                    size: 50
                }
            ]
        }
    }
}