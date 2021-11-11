import "regenerator-runtime/runtime";
import {
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction
} from 'paella-core/js/core/initFunctions';
import { resolveResourcePath, setupAutoHideUiTimer, clearAutoHideTimer } from 'paella-core/js/core/utils';
import { createElement } from 'paella-core/js/core/dom';
import { registerPlugins, unregisterPlugins } from 'paella-core/js/core/Plugin';
import VideoContainer from 'paella-core/js/core/VideoContainer';
import PreviewContainer from 'paella-core/js/core/PreviewContainer';
import PlaybackBar from 'paella-core/js/core/PlaybackBar';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';
import PopUp from 'paella-core/js/core/PopUp';
import Data from 'paella-core/js/core/Data';
import CaptionCanvas from 'paella-core/js/captions/CaptionsCanvas';
import { loadLogEventPlugins, unloadLogEventPlugins } from "paella-core/js/core/EventLogPlugin";
import { loadKeyShortcutPlugins, unloadKeyShortcutPlugins } from "paella-core/js/core/KeyShortcutPlugin";

import {
    defaultTranslateFunction,
    defaultSetLanguageFunction,
    defaultAddDictionaryFunction,
    setTranslateFunction,
    setGetLanguageFunction,
    setSetLanguageFunction,
    setAddDictionaryFunction,
    addDictionary,
    translate,
    setLanguage,
    getLanguage
} from "paella-core/js/core/Localization";

import 'paella-core/styles/base.css';
import { defaultGetLanguageFunction } from "./core/Localization";

import Log, { LOG_LEVEL } from "paella-core/js/core/Log";

import defaultDictionaries from "./default-dictionaries.js";

export const PlayerState = {
    UNLOADED: 0,
    MANIFEST: 1,
    LOADED: 2
};

export const PlayerStateNames = [
    'UNLOADED',
    'MANIFEST',
    'LOADED'
];

function buildPreview() {
    const preview = resolveResourcePath(this, this.videoManifest?.metadata?.preview);
    this._previewContainer = new PreviewContainer(this, this._containerElement, preview);
}

export default class Paella {

    constructor(containerElement, initParams = {}) {
        this._log = new Log(this);

        // The default log level before loading the configuration is
        // VERBOSE, to ensure that all previous messages are displayed
        this._log.setLevel(LOG_LEVEL.VERBOSE);

        // Debug: create an array of all paella player instances
        window.__paella_instances__ = window.__paella_instances__ || [];
        window.__paella_instances__.push(this);

        this.log.debug("New paella player instance");
        
        
        if (typeof(containerElement) === "string") {
            containerElement = document.getElementById(containerElement);
        }
        
        containerElement.classList.add("player-container");
        
        this._containerElement = containerElement;
        this._initParams = initParams;
        
        // Default initParams values:
        this._initParams.manifestFileName = this._initParams.manifestFileName || "data.json";
        this._initParams.loadConfig = this._initParams.loadConfig || defaultLoadConfigFunction;
        this._initParams.getVideoId = this._initParams.getVideoId || defaultGetVideoIdFunction;
        this._initParams.getManifestUrl = this._initParams.getManifestUrl || defaultGetManifestUrlFunction;
        this._initParams.getManifestFileUrl = this._initParams.getManifestFileUrl || defaultGetManifestFileUrlFunction;
        this._initParams.loadVideoManifest = this._initParams.loadVideoManifest || defaultLoadVideoManifestFunction;
        this._initParams.customPluginContext = this._initParams.customPluginContext || [];
        this._initParams.translateFunction = this._initParams.translateFunction || defaultTranslateFunction;
        this._initParams.getLanguageFunction = this._initParams.getLanguageFunction || defaultGetLanguageFunction;
        this._initParams.setLanguageFunction = this._initParams.setLanguageFunction || defaultSetLanguageFunction;
        this._initParams.addDictionaryFunction = this._initParams.addDictionaryFunction || defaultAddDictionaryFunction;

        this._initParams.loadDictionaries = this._initParams.loadDictionaries || async function(player) {
            addDictionary("en", {
                "Hello": "Hello",
                "World": "World"
            });

            addDictionary("es", {
                "Hello": "Hola",
                "World": "Mundo"
            });

            setLanguage(navigator.language.substring(0,2));
        }

        setTranslateFunction(this._initParams.translateFunction);
        setSetLanguageFunction(this._initParams.setLanguageFunction);
        setGetLanguageFunction(this._initParams.getLanguageFunction);
        setAddDictionaryFunction(this._initParams.addDictionaryFunction);

        this._config = null;
        this._videoId = null;
        this._manifestUrl = null;
        this._manifestFileUrl = null;
        this._manifestData = null;
        this._videoManifest = null;

        // Load status flags
        this._playerLoaded = false;

        const resize = () => {
            this.resize();
        }
        window.addEventListener("resize", resize);
        
        this.containerElement.addEventListener("fullscreenchange", () => {
            triggerEvent(this, Events.FULLSCREEN_CHANGED, { status: this.isFullscreen });
        });

        this._playerState = PlayerState.UNLOADED; 
    }

    get log() {
        return this._log;
    }

    get ready() {
        return this._playerState === PlayerState.LOADED;
    }

    get state() {
        return this._playerState;
    }

    get Events() {
        return Events;
    }

    translate(word) {
        return translate(word);
    }

    setLanguage(lang) {
        setLanguage(lang);
    }

    getLanguage() {
        return getLanguage();
    }

    addDictionary(lang,dict) {
        addDictionary(lang,dict);
    }

    bindEvent(eventName, fn) {
        bindEvent(this, eventName, data => fn(data));
    }

    get hideUiTime() {
        return this._hideUiTime;
    }

    set hideUiTime(val) {
        this._hideUiTime = val;
    }
    
    get containerSize() { return { w: this._containerElement.offsetWidth, h: this._containerElement.offsetHeight }; }
    
    get containerElement() { return this._containerElement; }

    get initParams() { return this._initParams; }

    // Status flags getters
    // The configuration is loaded
    get configLoaded() {
        return this.configUrl !== null;
    }

    // The video manifest file is loaded
    get videoManifestLoaded() {
        return this.videoManifest !== null;
    }

    // The video streams are loaded
    get videoLoaded() {
        return this.videoContainer?.ready || false;
    }

    // The player user interface is loaded
    get playerLoaded() {
        return this._playerLoaded;
    }

    get configResourcesUrl() {
        return this._initParams?.configResourcesUrl || 'config/';
    }
    
    get configUrl() {
        return this._initParams?.configUrl || 'config/config.json';
    }

    get config() {
        return this._config;
    }

    get videoId() {
        return this._videoId;
    }

    // Base URL where the video repository is located, for example "repository/"
    get repositoryUrl() {
        return this._initParams?.repositoryUrl || this.config?.repositoryUrl || "";
    }

    // Base URL where the video manifest file is located, for example "repository/[video_id]"
    get manifestUrl() {
        return this._manifestUrl;
    }

    // Video manifest file name, for example "data.json"
    get manifestFileName() {
        return this.config?.manifestFileName || this._initParams?.manifestFileName || "";
    }

    // Full path of the video manifest, for example "repository/[video_id]/data.json"
    get manifestFileUrl() {
        return this._manifestFileUrl;
    }

    // Video manifest file content (data.json)
    get videoManifest() {
        return this._videoManifest;
    }

    get previewContainer() {
        return this._previewContainer;
    }

    get videoContainer() {
        return this._videoContainer;
    }

    get playbackBar() {
        return this._playbackBar;
    }

    get captionsCanvas() {
        return this._captionsCanvas;
    }

    get data() {
        return this._data;
    }
    
    async loadManifest() {
        if (this._playerState !== PlayerState.UNLOADED) {
            throw new Error(`loadManifest(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        if (this._manifestLoaded) return;
        this._manifestLoaded = true;

        this.log.debug("Loading paella player");
        this._config = await this.initParams.loadConfig(this.configUrl,this);

        const logLevel = this._config.logLevel || "INFO";
        this._log.setLevel(logLevel);

        // Load localization dictionaries
        await this._initParams.loadDictionaries(this);

        registerPlugins(this);

        // EventLogPlugin plugins are loaded first, so that all lifecycle events can be captured.
        await loadLogEventPlugins(this);

        // KeyShortcutPlugins are loaded before UI load to allow the video load using shortcuts
        await loadKeyShortcutPlugins(this);

        this._videoId = await this.initParams.getVideoId(this._config, this);

        this._manifestUrl = await this.initParams.getManifestUrl(this.repositoryUrl,this.videoId,this._config,this);
        
        this._manifestFileUrl = await this.initParams.getManifestFileUrl(this._manifestUrl, this.manifestFileName,this._config,this);

        this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);

        this._videoManifest = await this.initParams.loadVideoManifest(this.manifestFileUrl,this._config,this);

        this.log.debug("Video manifest loaded:");
        this.log.debug(this.videoManifest);

        // Load data plugins
        this._data = new Data(this);

        triggerEvent(this, Events.MANIFEST_LOADED);

        // The video preview is required to use the lazy load
        if (!this.videoManifest?.metadata?.preview) {
            await this.loadPlayer();
        }
        else {
            buildPreview.apply(this);
        }

        // Load default dictionaries
        for (const lang in defaultDictionaries) {
            const dict = defaultDictionaries[lang];
            addDictionary(lang, dict);
        }

        this._playerState = PlayerState.MANIFEST;
    }

    async loadPlayer() {
        if (this._playerState !== PlayerState.MANIFEST) {
            throw new Error(`loadPlayer(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        this._videoContainer = new VideoContainer(this, this._containerElement);
        
        await this.videoContainer.load(this.videoManifest?.streams);

        this._captionsCanvas = new CaptionCanvas(this, this._containerElement);

        triggerEvent(this, Events.STREAM_LOADED);
        
        this._playbackBar = new PlaybackBar(this, this.containerElement);

        this._previewContainer?.removeFromParent();
        
        await this._playbackBar.load();
        
        // UI hide timer
        this._hideUiTime = 5000;
        setupAutoHideUiTimer(this);
        
        this._captionsCanvas.load();

        triggerEvent(this, Events.PLAYER_LOADED);

        this._playerState = PlayerState.LOADED;
    }

    async load() {
        if (this._playerState !== PlayerState.UNLOADED) {
            throw new Error(`load(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        await this.loadManifest();
        await this.loadPlayer();
    }

    async unload() {
        if (this._playerState !== PlayerState.LOADED) {
            throw new Error(`load(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        await this.unloadPlayer();        
        await this.unloadManifest();
    }
    
    async unloadManifest() {
        if (this._playerState !== PlayerState.MANIFEST) {
            throw new Error(`unloadManifest(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        this._playerState = PlayerState.UNLOADED;

        this.log.debug("Unloading paella player");
    
        // EventLogPlugin plugins are loaded first, so that all lifecycle events can be captured.
        await unloadLogEventPlugins(this);

        // KeyShortcutPlugins are loaded before UI load to allow the video load using shortcuts
        await unloadKeyShortcutPlugins(this);

        await unregisterPlugins(this);

        this._manifestLoaded = false;
        this._previewContainer?.removeFromParent();
    }

    async unloadPlayer() {
        if (this._playerState !== PlayerState.LOADED) {
            throw new Error(`unloadManifest(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        this._playerState = PlayerState.MANIFEST;

        await this._videoContainer.unload();
        this._videoContainer = null;

        await this._playbackBar.unload();
        this._playbackBar = null;

        this._captionsCanvas.unload();
        this._captionsCanvas = null;

        clearAutoHideTimer(this);

        triggerEvent(this, Events.PLAYER_UNLOADED);

        PopUp.Unload();

        TimeLinePopUp.Unload(this);

        if (this.videoManifest?.metadata?.preview) {
            buildPreview.apply(this);
        }
    }

    async reload(onUnloadFn = null) {
        await this.unload();
        if (typeof(onUnloadFn) === "function") {
            await onunloadFn();
        }
        await this.load();
    }

    async resize() {
        this.videoContainer?.updateLayout();
        this.playbackBar?.onResize();
    }
    
    async hideUserInterface() {
        if (!(await this.videoContainer?.paused())) {
            this.videoContainer?.hideUserInterface();
            this.playbackBar?.hideUserInterface();
            TimeLinePopUp.HideUserInterface(this);
        }
    }
    
    async showUserInterface() {
        this.videoContainer?.showUserInterface();
        this.playbackBar?.showUserInterface();
        TimeLinePopUp.ShowUserInterface(this);
    }

    // Playback functions
    async play() {
        if (!this.videoContainer) {
            await this.loadPlayer();
        }

        await this.videoContainer.play();
    }

    async pause() {
        await this.videoContainer?.pause();
    }

    async paused() {
        if (!this.videoContainer) {
            return true;
        }
        else {
            return this.videoContainer.paused();
        }
    }

    async stop() {
        await this.videoContainer?.stop();
    }
    
    async isFullScreenSupported() {
        return this.containerElement.requestFullscreen !== null;
    }
    
    async enterFullscreen() {
        if (this.containerElement.requestFullscreen) {
            return this.containerElement.requestFullscreen();
        }
    } 

    async exitFullscreen() {
        if (document.exitFullscreen && this.isFullscreen) {
            return document.exitFullscreen();
        }
    }
    
    get isFullscreen() {
        return document.fullscreenElement === this.containerElement;
    }
}
