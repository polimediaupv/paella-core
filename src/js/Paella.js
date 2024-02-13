import "regenerator-runtime/runtime";
import {
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction
} from 'paella-core/js/core/initFunctions';
import { 
    resolveResourcePath,
    setupAutoHideUiTimer,
    clearAutoHideTimer,
    getUrlFileName,
    removeExtension,
    removeFileName
} from 'paella-core/js/core/utils';
import Loader from "./core/Loader";
import ErrorContainer from "./core/ErrorContainer";
import { registerPlugins, unregisterPlugins } from 'paella-core/js/core/plugin_tools';
import VideoContainer, {
    getSourceWithUrl
} from 'paella-core/js/core/VideoContainer';
import PreviewContainer from 'paella-core/js/core/PreviewContainer';
import PlaybackBar from 'paella-core/js/core/PlaybackBar';
import Events, { bindEvent, triggerEvent, unregisterEvents } from 'paella-core/js/core/Events';
import TimeLinePopUp from 'paella-core/js/core/TimeLinePopUp';
import PopUp from 'paella-core/js/core/PopUp';
import Data from 'paella-core/js/core/Data';
import CaptionCanvas from 'paella-core/js/captions/CaptionsCanvas';
import { loadLogEventPlugins, unloadLogEventPlugins } from "paella-core/js/core/EventLogPlugin";
import { loadKeyShortcutPlugins, unloadKeyShortcutPlugins, getShortcuts } from "paella-core/js/core/KeyShortcutPlugin";
import { checkManifestIntegrity } from "paella-core/js/core/StreamProvider";
import CookieConsent, {
    defaultGetCookieConsentCallback,
    defaultGetCookieDescriptionCallback
} from "./core/CookieConsent";
import { getAvailableContentIds } from "./core/VideoLayout";

import {
    defaultTranslateFunction,
    defaultSetLanguageFunction,
    defaultAddDictionaryFunction,
    setTranslateFunction,
    setGetLanguageFunction,
    setSetLanguageFunction,
    setAddDictionaryFunction,
    setGetDefaultLanguageFunction,
    addDictionary,
    getDictionaries,
    translate,
    setLanguage,
    getLanguage,
    getDefaultLanguage,
    defaultGetDictionariesFunction,
    setGetDictionariesFunction,
    defaultGetDefaultLanguageFunction,
    setupDefaultLanguage
} from "paella-core/js/core/Localization";

import 'paella-core/styles/colors.css';
import 'paella-core/styles/sizes.css';
import 'paella-core/styles/base.css';
import { defaultGetLanguageFunction } from "./core/Localization";

import Log, { LOG_LEVEL } from "paella-core/js/core/Log";

import defaultDictionaries from "./default-dictionaries.js";

import Preferences from "./core/Preferences";

import Skin, { overrideSkinConfig, loadSkinStyleSheets, loadSkinIcons, unloadSkinStyleSheets } from "./core/Skin";

import "../css/ForcedColors.css";

import PlayerState from "./core/PlayerState";

export const PlayerStateNames = Object.freeze([
    'UNLOADED',
    'LOADING_MANIFEST',
    'MANIFEST',
    'LOADING_PLAYER',
    'LOADED',
    'UNLOADING_MANIFEST',
    'UNLOADING_PLAYER',
    'ERROR'
]);

function buildPreview() {
    const preview = (this.videoManifest?.metadata?.preview && resolveResourcePath(this, this.videoManifest?.metadata?.preview)) || this.defaultVideoPreview;
    const previewPortrait = (this.videoManifest?.metadata?.previewPortrait && resolveResourcePath(this, this.videoManifest?.metadata?.previewPortrait)) || this.defaultVideoPreviewPortrait;
    this._previewContainer = new PreviewContainer(this, this._containerElement, preview, previewPortrait);
}

import packageData from "../../package.json";
import ManifestParser from "./core/ManifestParser";

// Used in the first step of loadManifest and loadUrl
async function preLoadPlayer() {
    this._playerState = PlayerState.LOADING_MANIFEST;
    this._manifestLoaded = true;

    this.log.debug("Loading paella player");
    this._config = await this.initParams.loadConfig(this.configUrl,this);

    // Override config.json options from skin
    overrideSkinConfig.apply(this.skin, [this._config]);

    setupDefaultLanguage(this);

    this._defaultVideoPreview = this._config.defaultVideoPreview || this._initParams.defaultVideoPreview || "";
    this._defaultVideoPreviewPortrait = this._config.defaultVideoPreviewPortrait || this._initParams.defaultVideoPreviewPortrait || "";

    this._cookieConsent = new CookieConsent(this, {
        getConsent: this._initParams.getCookieConsentFunction, 
        getDescription: this._initParams.getCookieDescriptionFunction
    });

    this._preferences = new Preferences(this);

    const urlSearch = new URLSearchParams(window.location.search);
    const caseInsensitiveParams = new URLSearchParams();
    for (const [name, value] of urlSearch) {
        caseInsensitiveParams.append(name.toLowerCase(), value);
    }
    const urlParamLogLevel = caseInsensitiveParams.get("loglevel");
    const logLevel = (urlParamLogLevel && Array.from(Object.keys(LOG_LEVEL)).indexOf(urlParamLogLevel.toUpperCase()) !== -1) ?
        urlParamLogLevel.toUpperCase() :
        this._config.logLevel || "INFO";
    this._log.setLevel(logLevel);

    // Load localization dictionaries
    await this._initParams.loadDictionaries(this);

    registerPlugins(this);

    // EventLogPlugin plugins are loaded first, so that all lifecycle events can be captured.
    await loadLogEventPlugins(this);

    // KeyShortcutPlugins are loaded before UI load to allow the video load using shortcuts
    await loadKeyShortcutPlugins(this);

    // Create video container.
    this._videoContainer = new VideoContainer(this, this._containerElement);

    // This function will load the video plugins
    await this.videoContainer.create();

    // Load plugin modules dictionaries
    for (const module of this.pluginModules) {
        const dict = module.getDictionaries && await module.getDictionaries();
        if (dict) {
            for (const lang in dict) {
                addDictionary(lang, dict[lang]);
            }
        }
    }
}

// Used in the last step of loadManifest and loadUrl
async function postLoadPlayer() {
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

    // The video preview is required
    if (!this.videoManifest?.metadata?.preview) {
        throw new Error("No preview image found in video manifest, and no default preview image defined.");
    }
    else {
        buildPreview.apply(this);
    }

    checkManifestIntegrity(this._videoManifest);

    // Register a keyboard event to enable the playback button, but only if there are only one player in the page
    if (__paella_instances__.length === 1)
    {
        this._loadKeypressHandler = this._loadKeypressHandler || (async (evt) => {
            if (/space/i.test(evt.code))
            {
                await this.play();
            }
        });
        // This event listener is removed in Paella.play() function
        window.addEventListener('keypress', this._loadKeypressHandler, true);
    }
}

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

        this.log.debug("Loading skin manager");
        this._skin = new Skin(this);
        
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
        this._initParams.getDictionariesFunction = this._initParams.getDictionariesFunction || defaultGetDictionariesFunction;
        this._initParams.getDefaultLanguageFunction = this._initParams.getDefaultLanguageFunction || defaultGetDefaultLanguageFunction;
        this._initParams.Loader = this._initParams.customLoader || Loader;
        this._initParams.getCookieConsentFunction = this._initParams.getCookieConsentFunction || defaultGetCookieConsentCallback;
        this._initParams.getCookieDescriptionFunction = this._initParams.getCookieDescriptionFunction || defaultGetCookieDescriptionCallback;
        

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

        const userPlugins = this._initParams.plugins || [];
        this._initParams.plugins = [
            ...userPlugins
        ]

        setTranslateFunction(this._initParams.translateFunction);
        setSetLanguageFunction(this._initParams.setLanguageFunction);
        setGetLanguageFunction(this._initParams.getLanguageFunction);
        setAddDictionaryFunction(this._initParams.addDictionaryFunction);
        setGetDictionariesFunction(this._initParams.getDictionariesFunction);
        setGetDefaultLanguageFunction(this._initParams.getDefaultLanguageFunction);

        this._config = null;
        this._defaultVideoPreview = "";
        this._defaultVideoPreviewPortrait = "";
        this._videoId = null;
        this._manifestUrl = null;
        this._manifestFileUrl = null;
        this._manifestData = null;
        this._videoManifest = null;

        // Load status flags
        this._playerLoaded = false;

        this._resizeEventListener = () => {
            this.resize();
        }
        window.addEventListener("resize", this._resizeEventListener);
        
        this.containerElement.addEventListener("fullscreenchange", () => {
            triggerEvent(this, Events.FULLSCREEN_CHANGED, { status: this.isFullscreen });
            this.isFullscreen ? triggerEvent(this, Events.ENTER_FULLSCREEN) : triggerEvent(this, Events.EXIT_FULLSCREEN);
        });

        this._playerState = PlayerState.UNLOADED;

        this._customPluginIcons = {};
    }

    get version() {
        return this._packageData.version;
    }

    get pluginModules() {
        return this.__pluginModules || [];
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

    get preferences() {
        return this._preferences;
    }

    get skin() {
        return this._skin;
    }

    translate(word, keys = null) {
        return translate(word, keys);
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

    getDictionaries() {
        return getDictionaries();
    }

    getDefaultLanguage() {
        return getDefaultLanguage(this);
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

    get cookieConsent() { return this._cookieConsent; }

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

    get defaultVideoPreview() {
        return this._defaultVideoPreview;
    }

    get defaultVideoPreviewPortrait() {
        return this._defaultVideoPreviewPortrait;
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

    get PlayerState() {
        return PlayerState;
    }

    get PlayerStateNames() {
        return PlayerStateNames;
    }

    // Manifest query functions
    get metadata() {
        return this._manifestParser.metadata;
    }

    get streams() {
        return this._manifestParser.streams;
    }

    get frameList() {
        return this._manifestParser.frameList;
    }

    get captions() {
        return this._manifestParser.captions;
    }

    get trimming() {
        return this._manifestParser.trimming;
    }

    get visibleTimeLine() {
        return this._manifestParser.visibleTimeLine;
    }

    waitState(state) {
        return new Promise((resolve, reject) => {
            const checkState = () => {
                if (this.state === state) {
                    resolve();
                }
                else {
                    setTimeout(checkState, 50);
                }
            }
            if (typeof(state) === 'string') {
                state = PlayerState[state];
            }
            
            if (state<0 || state>Object.values(PlayerState).length) {
                reject(Error(`Invalid player state '${state}'`));
            }
    
            checkState();
        })
    }

    async loadUrl(url, { title, duration, preview, previewPortrait } = {}) {
        if (this._playerState !== PlayerState.UNLOADED) {
            throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
        }
        if (this._manifestLoaded) {
            throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
        }
        if (!url) {
            throw new Error(this.translate("loadUrl(): No URL specified."));
        }

        if (!Array.isArray(url)) {
            url = [url];
        }

        if (!title) {
            title = getUrlFileName(url[0]);
            this.log.warn("Paella.loadUrl(): no title specified. Using URL file name as video name.");
        }

        try {
            await preLoadPlayer.apply(this);

            if (!preview && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== "")) {
                preview = this.defaultVideoPreview;
                previewPortrait = this.defaultVideoPreviewPortrait;
                this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.");
            }
            else if (!preview && !previewPortrait) {
                throw new Error("Paella.loadUrl(): no preview image specified and no default preview image configured.");
            }

            this._videoId = removeExtension(getUrlFileName(url[0]));
            
            this._manifestUrl = removeFileName(url[0]);
            this._manifestFileUrl = url[0];

            this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);

            const validContents = getAvailableContentIds(this, url.length)[0];
            this._videoManifest = {
                metadata: {
                    duration,
                    title,
                    preview,
                    previewPortrait
                },

                streams: url.map((u,i) => {
                    const sources = getSourceWithUrl(this, u);
                    return {
                        sources,
                        content: validContents[i],
                        role: i === 0 ? 'mainAudio' : null
                    };
                })
            };

            await postLoadPlayer.apply(this);
        }
        catch (err) {
            this._playerState = PlayerState.ERROR;
            this.log.error(err);
            this._errorContainer = new ErrorContainer(this, this.translate(err.message));
            throw err;
        }
    }

    async loadManifest() {
        if (this._playerState !== PlayerState.UNLOADED) {
            throw new Error(this.translate("loadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
        }
        if (this._manifestLoaded) return;

        try {
            await preLoadPlayer.apply(this);
    
            this._videoId = await this.initParams.getVideoId(this._config, this);
            if (this.videoId === null) {
                throw new Error('No video identifier specified');
            }
    
            this._manifestUrl = await this.initParams.getManifestUrl(this.repositoryUrl,this.videoId,this._config,this);
            
            this._manifestFileUrl = await this.initParams.getManifestFileUrl(this._manifestUrl, this.manifestFileName,this._config,this);
    
            this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);
    
            this._videoManifest = await this.initParams.loadVideoManifest(this.manifestFileUrl,this._config,this);
            this._videoManifest.metadata = this._videoManifest.metadata || {};
            if (!this._videoManifest.metadata.preview && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== "")) {
                this._videoManifest.metadata.preview = this.defaultVideoPreview;
                this._videoManifest.metadata.previewPortrait = this.defaultVideoPreviewPortrait;
                this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.");
            }

            this._manifestParser = new ManifestParser(this.videoManifest, this);
    
            // Load custom icons from skin
            unloadSkinStyleSheets.apply(this.skin);
            await loadSkinIcons.apply(this.skin);

            // Load custom style sheets
            await loadSkinStyleSheets.apply(this.skin);

            await postLoadPlayer.apply(this);
        }
        catch (err) {
            this._playerState = PlayerState.ERROR;
            this.log.error(err);
            this._errorContainer = new ErrorContainer(this, this.translate(err.message));
            throw err;
        }
    }

    async loadPlayer() {
        try {
            this._captionsCanvas = new CaptionCanvas(this, this._containerElement);

            if (this._playerState !== PlayerState.MANIFEST) {
                throw new Error(this.translate("loadPlayer(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
            }
    
            this._playerState = PlayerState.LOADING_PLAYER;
    
            this._previewContainer?.removeFromParent();
    
            this._loader = new this.initParams.Loader(this);
            await this._loader.create();
    
            await this.videoContainer.load(this.videoManifest?.streams);
    
            triggerEvent(this, Events.STREAM_LOADED);
            
            this._playbackBar = new PlaybackBar(this, this.containerElement);
            
            await this._playbackBar.load();
            
            // UI hide timer
            this._hideUiTime = this.config.ui?.hideUITimer ?? 5000;
            setupAutoHideUiTimer(this);
            
            this._captionsCanvas.load();
    
            this._playerState = PlayerState.LOADED;
    
            triggerEvent(this, Events.PLAYER_LOADED);
    
            const hideTimeLine = !(this.videoManifest.metadata.visibleTimeLine ?? true);
            if (hideTimeLine) {
                this.playbackBar.progressIndicator.hideTimeLine();
            }
            
            if (!this._loader.debug) {
                this._loader.removeFromParent();
                this._loader = null;
            }
                
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
            throw new Error(this.translate("Could not load player: state transition in progress: $1", [PlayerStateNames[this.state]]));
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
            throw new Error(this.translate("Could not unload player: state transition in progress: $1", [PlayerStateNames[this.state]]));
        }
    }
    
    async unloadManifest() {
        if (this._playerState !== PlayerState.MANIFEST && this._playerState !== PlayerState.ERROR) {
            throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
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
        this._preferences = null;
        this._playerState = PlayerState.UNLOADED;

        // Unload skin style sheets
        unloadSkinStyleSheets.apply(this.skin);
    }

    async unloadPlayer() {
        if (this._playerState !== PlayerState.LOADED && this._playerState !== PlayerState.ERROR) {
            throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
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

    /**
     * Unloads and then completely removes this Paella instance. Reverts all
     * effects of the constructor. This method is useful for SPAs where the
     * instance should be completely removed on navigation, for example. The
     * Paella instance cannot be used anymore after this method is called.
     */
    async destroy() {
        await this.unload();

        // Now undo every side effects that the constructor caused, in reverse order.
        window.removeEventListener("resize", this._resizeEventListener);

        setTranslateFunction(defaultTranslateFunction);
        setSetLanguageFunction(defaultSetLanguageFunction);
        setGetLanguageFunction(defaultGetLanguageFunction);
        setAddDictionaryFunction(defaultAddDictionaryFunction);
        setGetDictionariesFunction(defaultGetDictionariesFunction);
        setGetDefaultLanguageFunction(defaultGetDefaultLanguageFunction);

        // The constructor add `player-container` to the element's class list,
        // but we don't know if it was present before. We just leave it as this
        // is unlikely to cause problems.

        if (window.__paella_instances__ && typeof(window.__paella_instances__) === "array") {
            const index = window.__paella_instances__.indexOf(this);
            if (index > -1) {
                window.__paella_instances__.splice(index, 1);
            }
        }
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
        if (this._loadKeypressHandler) {
            window.removeEventListener('keypress', this._loadKeypressHandler, true);
            this._loadKeypressHandler = null;
        }

        if (!this.videoContainer.ready) {
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
    
    isFullScreenSupported() {
        return this.containerElement.requestFullscreen ||
            this.containerElement.webkitRequestFullScreen;
    }
    
    async enterFullscreen() {
        let result = null;
        if (this.containerElement.requestFullscreen) {
            result = this.containerElement.requestFullscreen();
        }
        else if (this.containerElement.webkitRequestFullScreen) {
            this.log.debug("Safari enter fullscreen");
            result = this.containerElement.webkitRequestFullScreen();
        }
        setTimeout(() => this.resize(), 500);
        return result;
    } 

    async exitFullscreen() {
        if (document.exitFullscreen && this.isFullscreen) {
            return document.exitFullscreen();
        }
        else if (document.webkitCancelFullScreen && this.isFullscreen) {
            this.log.debug("Safari exit fullscreen");
            return document.webkitCancelFullScreen();
        }
    }
    
    get isFullscreen() {
        return  document.fullscreenElement === this.containerElement ||
                document.webkitFullscreenElement === this.containerElement;
    }

    addCustomPluginIcon(pluginName, iconName, svgData) {
        this._customPluginIcons[`${pluginName}-${iconName}`] = svgData;
    }

    removeCustomPluginIcon(pluginName, iconName) {
        this._customPluginIcons[`${pluginName}-${iconName}`] = null;
    }

    getCustomPluginIcon(pluginName, iconName) {
        this._requestedCustomIcons = this._requestedCustomIcons || [];
        if (!this._requestedCustomIcons.find(item => item.pluginName === pluginName && item.iconName === iconName)) {
            this._requestedCustomIcons.push({
                pluginName,
                iconName
            });
        }
        return this._customPluginIcons[`${pluginName}-${iconName}`];
    }

    get requestedCustomIcons() {
        return this._requestedCustomIcons || [];
    }
}
