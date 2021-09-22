
import Plugin, { getPluginsOfType } from "./Plugin";


export function getValidLayouts(player, streamData) {
    // Find the valid layouts that matches the streamData content
    return getPluginsOfType(player, "layout")
        .filter(layout => layout.config && layout.canApply(streamData));
}

export function getValidContentIds(player, streamData) {
    return getValidLayouts(player, streamData)
        .flatMap(lo => lo.getValidContentIds(streamData));
}

export function getValidContentSettings(player, streamData) {
    const validIds = getValidContentIds(player, streamData)
    return getValidLayouts(player, streamData)
        .flatMap(lo => lo.config.validContent)
        .filter(cfg => validIds.includes(cfg.id));
}

export function getLayoutStructure(player, streamData, contentId) {
    getValidLayouts(player, streamData)
        .find(layout => layout.getValidContentIds(streamData).includes(contentId));
    if (selectedLayout) {
        const structure = selectedLayout.getLayoutStructure(streamData, contentId);
        structure.plugin = selectedLayout;
        return structure;
    }
    return null;
}

export default class VideoLayout extends Plugin {
    
    get type() { return "layout"; }

    // Return the layout identifier, for example, presenter-presentation
    get identifier() { return "default"; }

    get icon() { return "icon.png"; }

    // Return the array of valid content in the configuration of the plugin
    get validContent() {
        return this.config?.validContent;
    }

    get validContentIds() {
        return this.validContent.map(c => c.id);
    }

    // Gets the valid content ids that matches the streamData
    getValidContentIds(streamData) {
        return this.validContent
            .filter(validContent => {
                validContent.content.every(c => streamData.some(sd => c === sd.content))
            })
            .map(validContent => validContent.id);
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
}
