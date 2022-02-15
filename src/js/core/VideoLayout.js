
import { getPluginsOfType } from "./Plugin";
import UserInterfacePlugin from "./UserInterfacePlugin";


export function getValidLayouts(player, streamData) {
    // Find the valid layouts that matches the streamData content
    const result = getPluginsOfType(player, "layout")
        .filter(layout => layout.config && layout.canApply(streamData));
    return result;
}

export function getLayoutWithId(player, layoutId) {
    const result = getPluginsOfType(player, "layout");
    result.find(layout => {
        player.log.debug(layout);
        return layout.identifier === layoutId
    });
    return result;

}

export function getValidContentIds(player, streamData) {
    const validLayouts = getValidLayouts(player, streamData);
    const result = [];
    validLayouts.forEach(lo => {
        result.push(...lo.getValidContentIds(streamData));
    });
    return result;
}

export function getLayoutWithContentId(player, streamData, contentId) {
    const layouts = getValidLayouts(player, streamData);
    let result = null;
    layouts.some(layout => {
        if (layout.getValidContentIds(streamData).indexOf(contentId) !== -1) {
            result = layout;
            return true;
        }
    });
    return result;
}

export function getValidContentSettings(player, streamData) {
    const validLayouts = getValidLayouts(player, streamData);
    const validIds = getValidContentIds(player, streamData)
    let result = []
    validLayouts.forEach(lo => {
        result = [...result,...lo.config.validContent];
    });
    
    return result.filter(cfg => {
        return validIds.indexOf(cfg.id) !== -1
    });
}

export function getLayoutStructure(player, streamData, contentId) {
    const selectedLayout = getLayoutWithContentId(player, streamData, contentId);
    if (selectedLayout) {
        const structure = selectedLayout.getLayoutStructure(streamData, contentId);
        structure.plugin = selectedLayout;
        return structure;
    }
    return null;
}

export default class VideoLayout extends UserInterfacePlugin {
    
    get type() { return "layout"; }

    // Return the layout identifier, for example, presenter-presentation
    get identifier() { return "default"; }

    get icon() { return "icon.png"; }

    // Return the array of valid content in the configuration of the plugin
    get validContent() {
        return this.config?.validContent;
    }

    get validContentIds() {
        const result = [];
        this.validContent.forEach(c => result.push(c.id));
        return result;
    }

    // Gets the valid content ids that matches the streamData
    getValidContentIds(streamData) {
        const contentIds = [];
        this.validContent.forEach(validContent => {
            if (validContent.content.every(c => {
                return streamData.some(sd => c === sd.content)
            })) {
                contentIds.push(validContent.id);
            }
        });

        return contentIds;
    }

    // Get the valid stream data combination, according to the plugin configuration
    // The result of this function must be an array of arrays with all the possible
    // combinations. For example, for a dual stream layout and three elements in
    // streamData that matches the valid content, the resulting valid streams must be:
    // [
    //      [streamA, streamB],
    //      [streamA, streamC],
    //      [streamC, streamB]   
    // ]
    getValidStreams(streamData) {
        const validStreams = [];
        this.validContent.forEach(validContent => {
            let validStreamCombination = [];
            if (validContent.content.every(c => {
                return streamData.some(sd => {
                    if (c === sd.content) {
                        validStreamCombination.push(sd);
                        return true;
                    }
                })
            })) {
                validStreams.push(validStreamCombination);
            }
        });

        return validStreams;
    }

    canApply(streamData) {
        return this.getValidStreams(streamData).length > 0;
    }

    getLayoutStructure(/* streamData, contentId */) {
        return {};
    }

    // Add buttons to videos
    // [
    //      icon    (required)
    //      click   (required)
    //      tabIndex
    //      ariaLabel
    //      title
    //      className
    //      position (CanvasButtonPosition.LEFT, CanvasButtonPosition.CENTER, CanvasButtonPosition.RIGHT)
    //]
    getVideoCanvasButtons(content, video, videoCanvas) {
        return []
    }
}
