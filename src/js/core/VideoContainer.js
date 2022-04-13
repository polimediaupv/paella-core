
import { DomClass, createElementWithHtmlText,createElement } from 'paella-core/js/core/dom';
import { 
    getValidLayouts, 
    getValidContentIds, 
    getLayoutStructure, 
    getLayoutWithId,
    getValidContentSettings } from 'paella-core/js/core/VideoLayout';
import StreamProvider from 'paella-core/js/core/StreamProvider';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';
import { addButtonPlugin } from 'paella-core/js/core/ButtonPlugin';
import { translate } from 'paella-core/js/core/Localization';

import 'paella-core/styles/VideoContainer.css';
import 'paella-core/styles/VideoLayout.css';
import { loadPluginsOfType, unloadPluginsOfType } from './Plugin';
import { loadVideoPlugins, unloadVideoPlugins } from './VideoPlugin';
import { addVideoCanvasButton } from './CanvasPlugin';

export async function getContainerBaseSize(player) {
    // TODO: In the future, this function can be modified to support different
    // aspect ratios, which can be loaded from the video manifest.
    return { w: 1280, h: 720 }
}

export default class VideoContainer extends DomClass {

    constructor(player, parent) {
        const baseVideoRectClass = "base-video-rect";

        const attributes = {
            "class": "video-container"
        };
        const children = `
            <div class="${ baseVideoRectClass }">
            </div>
        `
        super(player, {attributes, children, parent});

        this._baseVideoRect = this.element.getElementsByClassName(baseVideoRectClass)[0];
        this.element.addEventListener("click", async () => {
            if (await this.paused()) {
                await this.play();
            }
            else {
                await this.pause();
            }
        });

        this._ready = false;

        this._layoutId = window.localStorage.getItem("videoLayout") || player.config.defaultLayout;

        this._players = [];
        
        this._streamProvider = new StreamProvider(this.player, this.baseVideoRect);
    }

    get layoutId() {
        return this._layoutId;
    }
    
    async setLayout(layoutId) {
        if (this.validContentIds.indexOf(layoutId) === -1) {
            return false;
        }
        else {
            window.localStorage.setItem("videoLayout", layoutId);
            this._layoutId = layoutId;
            this.updateLayout();
        }
    }
    
    get validContentIds() {
        return this._validContentIds;
    }
    
    get validContentSettings() {
        return this._validContentSettings;
    }

    get validLayouts() {
        return getValidLayouts(this.player, this.streamData);
    }

    get streamData() {
        return this._streamData;
    }

    get baseVideoRect() {
        return this._baseVideoRect;
    }
    
    get streamProvider() {
        return this._streamProvider;
    }

    async load(streamData) {
        this._streamData = streamData;

        this._baseVideoRect.style.display = "none";

        await loadPluginsOfType(this.player, "layout");

        await loadVideoPlugins(this.player);

        await this.streamProvider.load(streamData);
        
        // Find the content identifiers that are compatible with the stream data
        this._validContentIds = getValidContentIds(this.player, streamData);
        
        this._validContentSettings = getValidContentSettings(this.player, streamData);
        
        // Load video layout
        await this.updateLayout();

        const leftSideButtons = createElementWithHtmlText(
            `<div class="button-plugins left-side"></div>`, this.element
        );
        const rightSideButtons = createElementWithHtmlText(
            `<div class="button-plugins right-side"></div>`, this.element
        );
        this._buttonPlugins = [ leftSideButtons, rightSideButtons ];

        // Load videoContainer plugins
        this.player.log.debug("Loading videoContainer button plugins");
        await loadPluginsOfType(this.player,"button",async (plugin) => {
            this.player.log.debug(` Button plugin: ${ plugin.name }`);
            if (plugin.side === "left") {
                await addButtonPlugin(plugin, leftSideButtons);
            }
            else if (plugin.side === "right") {
                await addButtonPlugin(plugin, rightSideButtons);
            }
        }, async plugin => {
            if (plugin.parentContainer === "videoContainer") {
                return await plugin.isEnabled();
            }
            else {
                return false;
            }
        });
        
        this._baseVideoRect.style.display = "";
        this._ready = true;
    }

    async unload() {
        this.removeFromParent();

        // Button plugins are unloaded in PlaybackBar

        await unloadPluginsOfType(this.player, "layout");

        await unloadVideoPlugins(this.player);

        await this.streamProvider.unload();
    }

    // Return true if the layout this.layoutId is compatible with the current stream data.
    async updateLayout() {
        let status = true;
        
        this._layoutButtons = [];
        
        // Current layout: if not selected, or the selected layout is not compatible, load de default layout
        if (!this._layoutId || this._validContentIds.indexOf(this._layoutId) === -1) {
            this._layoutId = this.player.config.defaultLayout;

            // Check if the default layout is compatible
            if (this._validContentIds.indexOf(this._layoutId) === -1) {
                this._layoutId = this._validContentIds[0];
            }
            status = false;
        }

        const layoutStructure = getLayoutStructure(this.player, this.streamProvider.streamData, this._layoutId);

        for (const content in this.streamProvider.streams) {
            const isPresent = layoutStructure?.videos?.find(video => video.content === content) != null;
            const video = this.streamProvider.streams[content];
            if (video.isEnabled === undefined) {
                video.isEnabled = true;
            }
            
            if (isPresent && !video.isEnabled) {
                video.isEnabled = await video.player.enable();
            }
            else if (!isPresent && video.isEnabled) {
                video.isEnabled = await video.player.disable();
            }
        }

        // Hide all video players
        for (const key in this.streamProvider.streams) {
            const videoData = this.streamProvider.streams[key];
            videoData.canvas.element.style.display = "none";
        }

        // Conversion factors for video rect
        const baseSize = await getContainerBaseSize(this.player);
        const playerSize = this.player.containerSize;
        const wFactor = 100 / baseSize.w;
        const hFactor = 100 / baseSize.h;
        const playerRatio = playerSize.w / playerSize.h;
        const baseRatio = baseSize.w / baseSize.h; 
        const containerCurrentSize = playerRatio>baseRatio ?
            { w: playerSize.h * baseRatio, h: playerSize.h } :
            { w: playerSize.w, h: playerSize.w / baseRatio };

        this.baseVideoRect.style.width = containerCurrentSize.w + "px";
        this.baseVideoRect.style.height = containerCurrentSize.h + "px";

        await layoutStructure?.videos?.forEach(async video => {
            const videoData = this.streamProvider.streams[video.content];
            const { stream, player, canvas } = videoData;
            const res = await player.getDimensions();
            const videoAspectRatio = res.w / res.h;
            let difference = Number.MAX_VALUE;
            let resultRect = null;

            canvas.buttonsArea.innerHTML = "";
            addVideoCanvasButton(layoutStructure, canvas, video);
            
            video.rect.forEach((videoRect) => {
                const aspectRatioData = /^(\d+.?\d*)\/(\d+.?\d*)$/.exec(videoRect.aspectRatio);
                const rectAspectRatio = aspectRatioData ? Number(aspectRatioData[1]) / Number(aspectRatioData[2]) : 1;
                const d = Math.abs(videoAspectRatio - rectAspectRatio);
                if (d < difference) {
                    resultRect = videoRect;
                    difference = d;
                }
            });

            canvas.element.style.display = "block";
            canvas.element.style.position = "absolute";
            canvas.element.style.left = `${ resultRect.left * wFactor }%`;
            canvas.element.style.top = `${ resultRect.top * hFactor }%`;
            canvas.element.style.width = `${ resultRect.width * wFactor }%`;
            canvas.element.style.height = `${ resultRect.height * hFactor }%`;
            canvas.element.style.zIndex = video.layer;
        });
        
        const prevButtons = this.baseVideoRect.getElementsByClassName('video-layout-button');
        Array.from(prevButtons).forEach(btn => this.baseVideoRect.removeChild(btn));
        layoutStructure?.buttons?.forEach(buttonData => {
            const button = createElement({
                tag: 'button',
                attributes: {
                    "class": "video-layout-button",
                    "aria-label": translate(buttonData.ariaLabel),
                    "title": translate(buttonData.title),
                    style: `
                        left: ${buttonData.rect.left * wFactor}%;
                        top: ${buttonData.rect.top * hFactor}%;
                        width: ${buttonData.rect.width * wFactor}%;
                        height: ${buttonData.rect.height * hFactor}%;
                        z-index: ${ buttonData.layer };
                    `
                },
                parent: this.baseVideoRect,
                children: buttonData.icon
            });
            button.layout = layoutStructure;
            button.buttonAction = buttonData.onClick;
            button.addEventListener("click", (evt) => {
                triggerEvent(this.player, Events.BUTTON_PRESS, {
                    plugin: layoutStructure.plugin,
                    layoutStructure: layoutStructure
                });
                evt.target.buttonAction.apply(evt.target.layout);
                evt.stopPropagation();
            });
            this._layoutButtons.push(button);
        });
        
        triggerEvent(this.player, Events.LAYOUT_CHANGED);

        return status;
    }
    
    hideUserInterface() {
        if (this._layoutButtons && this._buttonPlugins) {
            this.player.log.debug("Hide video container user interface");
            const hideFunc = button => {
                button._prevDisplay = button.style.display;
                button.style.display = "none";
            }
            this._layoutButtons.forEach(hideFunc);
            this._buttonPlugins.forEach(hideFunc);
            for (const content in this.streamProvider.streams) {
                const stream = this.streamProvider.streams[content];
                stream.canvas.hideButtons();
            }
        }
    }
    
    showUserInterface() {
        if (this._layoutButtons && this._buttonPlugins) {
            const showFunc = button => button.style.display = button._prevDisplay || "block";
            this._layoutButtons.forEach(showFunc);
            this._buttonPlugins.forEach(showFunc);
            for (const content in this.streamProvider.streams) {
                const stream = this.streamProvider.streams[content];
                stream.canvas.showButtons();
            }
        }
    }

    get ready() {
        return this._ready;
    }

    async play() {
        const result = await this.streamProvider.play();
        triggerEvent(this.player, Events.PLAY);
        return result;
    }

    async pause() {
        const result = await this.streamProvider.pause();
        triggerEvent(this.player, Events.PAUSE);
        return result;
    }
    
    async stop() {
        this.streamProvider.stop();
        triggerEvent(this.player, Events.STOP);
    }
    
    async paused() {
        return this.streamProvider.paused();
    }

    async setCurrentTime(t) {
        const result = await this.streamProvider.setCurrentTime(t);
        triggerEvent(this.player, Events.SEEK, { prevTime: result.prevTime, newTime: result.newTime });
        return result.result;
    }
    
    async currentTime() {
        return this.streamProvider.currentTime();
    }
    
    async volume() {
        return this.streamProvider.volume();
    }
    
    async setVolume(v) {
        const result = await this.streamProvider.setVolume(v);
        triggerEvent(this.player, Events.VOLUME_CHANGED, { volume: v });
        return result;
    }
    
    async duration() {
        return await this.streamProvider.duration();
    }

    async playbackRate() {
        return await this.streamProvider.playbackRate();
    }

    async setPlaybackRate(r) {
        const result = await this.streamProvider.setPlaybackRate(r);
        triggerEvent(this.player, Events.PLAYBACK_RATE_CHANGED, { newPlaybackRate: r })
        return result;
    }

    get isTrimEnabled() {
        return this.streamProvider.isTrimEnabled;
    }

    get trimStart() {
        return this.streamProvider.trimStart;
    }

    get trimEnd() {
        return this.streamProvider.trimEnd;
    }

    async setTrimming({ enabled, start, end }) {
        const result = await this.streamProvider.setTrimming({
            enabled,
            start,
            end
        });
        triggerEvent(this.player, Events.TRIMMING_CHANGED, { 
            enabled, 
            start, 
            end 
        });
        return result;
    }

    getVideoRect(target = null) {
        let element = this.baseVideoRect;
        if (typeof(target) === "string") {
            element = this.streamProvider.streams[target]?.canvas.element;
        }
        
        return {
            x: element?.offsetLeft, 
            y: element?.offsetTop, 
            width: element?.offsetWidth, 
            height: element?.offsetHeight,            
            element
        };
    }

    appendChild(element, rect = null, zIndex = 1) {
        if (rect) {
            const { width, height } = this.getVideoRect();
            rect.x = rect.x * 100 / width;
            rect.width = rect.width * 100 / width;
            rect.y = rect.y * 100 / height;
            rect.height = rect.height * 100 / height;
            element.style.position = "absolute";
            element.style.left = `${ rect.x }%`;
            element.style.top = `${ rect.y }%`;
            element.style.width = `${ rect.width }%`;
            element.style.height = `${ rect.height }%`;
            if (zIndex!==null) element.style.zIndex = zIndex;
        }
        this.baseVideoRect.appendChild(element);
        return element;
    }

    removeChild(element) {
        this.baseVideoRect.removeChild(element);
    }
}

