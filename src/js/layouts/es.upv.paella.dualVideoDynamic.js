
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
                    visible: true
                },
                {
                    content: "presentation",
                    visible: true
                }
            ]
        }
    }
}