import "regenerator-runtime/runtime";
import {
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction
} from 'paella-core/js/core/initFunctions';
import { resolveResourcePath, setupAutoHideUiTimer, clearAutoHideTimer } from 'paella-core/js/core/utils';
import Loader from "./core/Loader";
import ErrorContainer from "./core/ErrorContainer";
import { registerPlugins, unregisterPlugins } from 'paella-core/js/core/Plugin';
import VideoContainer from 'paella-core/js/core/VideoContainer';
import PreviewContainer from 'paella-core/js/core/PreviewContainer';
import PlaybackBar from 'paella-core/js/core/PlaybackBar';
import Events, { bindEvent, triggerEvent, unregisterEvents } from 'paella-core/js/core/Events';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';
import PopUp from 'paella-core/js/core/PopUp';
import Data from 'paella-core/js/core/Data';
import CaptionCanvas from 'paella-core/js/captions/CaptionsCanvas';
import { loadLogEventPlugins, unloadLogEventPlugins } from "paella-core/js/core/EventLogPlugin";
import { loadKeyShortcutPlugins, unloadKeyShortcutPlugins, getShortcuts } from "paella-core/js/core/KeyShortcutPlugin";

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

import 'paella-core/styles/colors.css';
import 'paella-core/styles/base.css';
import { defaultGetLanguageFunction } from "./core/Localization";

import Log, { LOG_LEVEL } from "paella-core/js/core/Log";

import defaultDictionaries from "./default-dictionaries.js";

export const PlayerState = {
    UNLOADED: 0,
    LOADING_MANIFEST: 1,
    MANIFEST: 2,
    LOADING_PLAYER: 3,
    LOADED: 4,
    UNLOADING_MANIFEST: 5,
    UNLOADING_PLAYER: 6,
    ERROR: 7
};

export const PlayerStateNames = [
    'UNLOADED',
    'LOADING_MANIFEST',
    'MANIFEST',
    'LOADING_PLAYER',
    'LOADED',
    'UNLOADING_MANIFEST',
    'UNLOADING_PLAYER',
    'ERROR'
];

function buildPreview() {
    const preview = resolveResourcePath(this, this.videoManifest?.metadata?.preview);
    this._previewContainer = new PreviewContainer(this, this._containerElement, preview);
}

import packageData from "../../package.json";

export default class Paella {

    constructor(containerElement, initParams = {}) {
        this._log = new Log(this);

        this._packageData = packageData;

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

    get version() {
        return this._packageData.version;
    }

    get pluginModules() {
        return this.__pluginModules;
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

    get stateText() {
        return PlayerStateNames[this.state];
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

    bindEvent(eventName, fn, unregisterOnUnload = true) {
        bindEvent(this, eventName, data => fn(data), unregisterOnUnload);
    }

    getShortcuts() {
        return getShortcuts(this);
    }

    getPlugin(name, type = null) {
        if (type) {
            const plugins = this.__pluginData__.pluginInstances[type];
            if (plugins) {
                return plugins.find(p => {
                    if (p.name === name) {
                        return p;
                    }
                });
            }
        }
        else {
            const result = {};
            for (const t in this.__pluginData__.pluginInstances) {
                const instances = this.__pluginData__.pluginInstances[t];
                const p = instances.find(p => {
                    if (p.name === name) {
                        return p;
                    }
                });
                if (p) {
                    result[t] = p;
                }
            }
            return result;
        }
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

        try {

            this._playerState = PlayerState.LOADING_MANIFEST;
            this._manifestLoaded = true;
    
            this.log.debug("Loading paella player");
            this._config = await this.initParams.loadConfig(this.configUrl,this);
    
            const urlSearch = new URLSearchParams(window.location.search);
            const urlParamLogLevel = urlSearch.get("logLevel");
            const logLevel = (Array.from(Object.keys(LOG_LEVEL)).indexOf(urlParamLogLevel) !== -1) ?
                urlParamLogLevel :
                this._config.logLevel || "INFO";
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
    
            // Load default dictionaries
            for (const lang in defaultDictionaries) {
                const dict = defaultDictionaries[lang];
                addDictionary(lang, dict);
            }
    
            this._playerState = PlayerState.MANIFEST;
            triggerEvent(this, Events.MANIFEST_LOADED);
    
            // The video preview is required to use the lazy load
            if (!this.videoManifest?.metadata?.preview) {
                await this.loadPlayer();
            }
            else {
                buildPreview.apply(this);
            }
        }
        catch (err) {
            this._playerState = PlayerState.ERROR;
            console.log(err);
            this._errorContainer = new ErrorContainer(this, err.message);
            throw err;
        }
    }

    async loadPlayer() {
        try {
            this._captionsCanvas = new CaptionCanvas(this, this._containerElement);

            if (this._playerState !== PlayerState.MANIFEST) {
                throw new Error(`loadPlayer(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
            }
    
            this._playerState = PlayerState.LOADING_PLAYER;
    
            this._previewContainer?.removeFromParent();
    
            this._loader = new Loader(this);
            
            this._videoContainer = new VideoContainer(this, this._containerElement);
    
            await this.videoContainer.load(this.videoManifest?.streams);
    
            triggerEvent(this, Events.STREAM_LOADED);
            
            this._playbackBar = new PlaybackBar(this, this.containerElement);
            
            await this._playbackBar.load();
            
            // UI hide timer
            this._hideUiTime = 5000;
            setupAutoHideUiTimer(this);
            
            this._captionsCanvas.load();
    
            this._playerState = PlayerState.LOADED;
    
            triggerEvent(this, Events.PLAYER_LOADED);
    
    
            this._loader.removeFromParent();
            this._loader = null;
        }
        catch (err) {
            this._playerState = PlayerState.ERROR;
            if (this._loader) {
                this._loader.removeFromParent();
                this._loader = null;
            }
            this._errorContainer = new ErrorContainer(this, err.message);
            throw err;
        }
    }

    async load() {
        switch (this.state) {
        case PlayerState.UNLOADED:
            await this.loadManifest();
            await this.loadPlayer();
            break;
        case PlayerState.MANIFEST:
            await this.loadPlayer();
            break;
        case PlayerState.LOADED:
            break;
        default:
            throw new Error(`Could not load player: state transition in progress: ${PlayerStateNames[this.state]}`);
        }
    }

    async unload() {
        switch (this.state) {
        case PlayerState.UNLOADED:
            break;
        case PlayerState.MANIFEST:
            await this.unloadManifest();
            break;
        case PlayerState.LOADED:
        case PlayerState.ERROR:
            await this.unloadPlayer();        
            await this.unloadManifest();
            break;
        default:
            throw new Error(`Could not unload player: state transition in progress: ${PlayerStateNames[this.state]}`);
        }
    }
    
    async unloadManifest() {
        if (this._playerState !== PlayerState.MANIFEST && this._playerState !== PlayerState.ERROR) {
            throw new Error(`unloadManifest(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        if (this._errorContainer) {
            this._errorContainer.removeFromParent();
            this._errorContainer = null;
        }
        this._playerState = PlayerState.UNLOADING_MANIFEST;
        
        this.log.debug("Unloading paella player");
        
        // EventLogPlugin plugins are loaded first, so that all lifecycle events can be captured.
        await unloadLogEventPlugins(this);
        
        // KeyShortcutPlugins are loaded before UI load to allow the video load using shortcuts
        await unloadKeyShortcutPlugins(this);
        
        await unregisterPlugins(this);
        
        this._manifestLoaded = false;
        this._previewContainer?.removeFromParent();
        this._playerState = PlayerState.UNLOADED;
    }

    async unloadPlayer() {
        if (this._playerState !== PlayerState.LOADED && this._playerState !== PlayerState.ERROR) {
            throw new Error(`unloadManifest(): Invalid current player state: ${ PlayerStateNames[this._playerState]}`);
        }
        if (this._errorContainer) {
            this._errorContainer.removeFromParent();
            this._errorContainer = null;
        }
        this._playerState = PlayerState.UNLOADING_PLAYER;
        
        await this._videoContainer?.unload();
        this._videoContainer = null;
        
        await this._playbackBar?.unload();
        this._playbackBar = null;
        
        this._captionsCanvas?.unload();
        this._captionsCanvas = null;
        
        clearAutoHideTimer(this);
        
        triggerEvent(this, Events.PLAYER_UNLOADED);
        
        PopUp.Unload();
        
        TimeLinePopUp.Unload(this);
        
        if (this.videoManifest?.metadata?.preview) {
            buildPreview.apply(this);
        }
        
        unregisterEvents(this);
        this._playerState = PlayerState.MANIFEST;
    }

    async reload(onUnloadFn = null) {
        switch (this.state) {
        case PlayerState.UNLOADED:
            break;
        case PlayerState.MANIFEST:
            await this.unloadManifest();
            break;
        case PlayerState.LOADED:
            await this.unload();
            break;
        }
        
        if (typeof(onUnloadFn) === "function") {
            await onUnloadFn();
        }
        await this.load();
    }

    async resize() {
        this.videoContainer?.updateLayout();
        this.playbackBar?.onResize();

        if (this.videoContainer) {    
            const getSize = () => {
                return {
                    w: this.videoContainer.element.offsetWidth,
                    h: this.videoContainer.element.offsetHeight
                }
            };
            triggerEvent(this, Events.RESIZE, { size: getSize() });

            if (this._resizeEndTimer) {
                clearTimeout(this._resizeEndTimer);
            }

            this._resizeEndTimer = setTimeout(() => {
                triggerEvent(this, Events.RESIZE_END, { size: getSize() });
            }, 1000);
        }
    }
    
    async hideUserInterface() {
        if (!(await this.videoContainer?.paused())) {
            this._uiHidden = true;
            this.videoContainer?.hideUserInterface();
            this.playbackBar?.hideUserInterface();
            TimeLinePopUp.HideUserInterface(this);
            triggerEvent(this, Events.HIDE_UI);
        }
    }
    
    async showUserInterface() {
        this.videoContainer?.showUserInterface();
        this.playbackBar?.showUserInterface();
        TimeLinePopUp.ShowUserInterface(this);
        this._uiHidden && triggerEvent(this, Events.SHOW_UI);
        this._uiHidden = false;
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
