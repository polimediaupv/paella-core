import VideoLayout from 'paella-core/js/core/VideoLayout';
import PaellaCoreLayouts from './PaellaCoreLayouts';

export default class NStreamsVideoLayout extends VideoLayout {
    getPluginModuleInstance() {
        return PaellaCoreLayouts.Get();
    }

    get name() {
        return "es.upv.paella.nStreams";
    }

    get layoutType() {
        return "dynamic";
    }

    get validContent() {
        // Generate the `validContent` object in configuration, using the content of the video manifest
        this.config.validContent = [{
            id: this.config.contentId,
            content: this.player.videoManifest.streams.map(s => s.content),
            icon: this.config.icon,
            title: this.config.title
        }];
        return this.config.validContent;
    }

    async load() {        
    }

    getVideoCanvasButtons(layoutStructure, content, video, videoCanvas) {
        return [];
    }

    getLayoutStructure(streamData, contentId, mainContent) {
        return {
            id: "n-streams",
            alignType: "grid",
            videos: streamData.map(s => ({
                content: s.content,
                visible: true
            }))
        }
    }
}