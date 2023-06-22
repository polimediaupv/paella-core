import 'paella-core/styles/base.css';

import Paella, { PlayerStateNames } from 'paella-core/js/Paella';
import PlayerState from './js/core/PlayerState';
import PopUp from 'paella-core/js/core/PopUp';
import * as utils from 'paella-core/js/core/utils';
import {
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction
} from 'paella-core/js/core/initFunctions';
import {
    defaultGetCookieConsentCallback,
    defaultGetCookieDescriptionCallback
} from './js/core/CookieConsent';

import Plugin from 'paella-core/js/core/Plugin';
import { importPlugins, getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/plugin_tools';
import UserInterfacePlugin from 'paella-core/js/core/UserInterfacePlugin';
import ButtonPlugin, { getNextTabIndex, getCurrentTabIndex } from 'paella-core/js/core/ButtonPlugin';
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';
import VideoLayout from 'paella-core/js/core/VideoLayout';
import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import ProgressIndicatorPlugin from 'paella-core/js/core/ProgressIndicatorPlugin';
import Events, { bindEvent, triggerEvent, triggerIfReady } from 'paella-core/js/core/Events';
import PlayerResource from 'paella-core/js/core/PlayerResource';
import CanvasPlugin, { CanvasButtonPosition, Canvas } from 'paella-core/js/core/CanvasPlugin';
import Data, { DataPlugin } from 'paella-core/js/core/Data';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';
import AudioTrackData from 'paella-core/js/core/AudioTrackData';
import EventLogPlugin from 'paella-core/js/core/EventLogPlugin';
import ButtonGroupPlugin from 'paella-core/js/core/ButtonGroupPlugin';
import PluginModule from './js/core/PluginModule';
import { checkManifestIntegrity } from './js/core/StreamProvider';
import Loader from './js/core/Loader';

import { DomClass, createElementWithHtmlText, createElement } from 'paella-core/js/core/dom';

import WebVTTParser, { parseWebVTT } from './js/captions/WebVTTParser';
import DFXPParser, { parseDFXP } from './js/captions/DFXPParser';
import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import Captions from 'paella-core/js/captions/Captions';

import KeyShortcutPlugin, { KeyCodes, getShortcuts } from './js/core/KeyShortcutPlugin';

import { VideoContainerMessagePosition } from './js/core/VideoContainerMessage';

import {
    defaultTranslateFunction,
    defaultSetLanguageFunction,
    defaultGetLanguageFunction,
    defaultAddDictionaryFunction,
    defaultGetDictionariesFunction,
    defaultGetDefaultLanguageFunction,
    translate,
    setLanguage,
    getLanguage,
    addDictionary,
    getDictionaries,
    getDefaultLanguage
} from "paella-core/js/core/Localization";

import Log, {
    log,
    LOG_LEVEL
} from "paella-core/js/core/Log";

/******* Export the built-in plugin classes *******/
// video formats
import { HlsVideo, getHlsSupport, defaultHlsConfig, HlsSupport } from './js/videoFormats/es.upv.paella.hlsVideoFormat';
import { Mp4Video } from './js/videoFormats/es.upv.paella.mp4VideoFormat';
import { ImageVideo } from './js/videoFormats/es.upv.paella.imageVideoFormat';

// Buttons
import PlayPauseButtonPlugin from './js/plugins/es.upv.paella.playPauseButton';

// Shortcuts
import DefaultKeyShortcutsPlugin from './js/plugins/es.upv.paella.defaultShortcuts';

// Video layouts
import SingleVideoLayoutPlugin from './js/layouts/es.upv.paella.singleVideo';
import DualVideoLayoutPlugin from './js/layouts/es.upv.paella.dualVideo';
import DualVideoDynamicLayoutPlugin from './js/layouts/es.upv.paella.dualVideoDynamic';
import TripleVideoLayoutPlugin from './js/layouts/es.upv.paella.tripleVideo';

// Captions
import VttManifestCaptionsPlugin from './js/plugins/es.upv.paella.vttManifestCaptionsPlugin';
import DfxpManifestCaptionsPlugin from './js/plugins/es.upv.paella.dfxpManifestCaptionsPlugin';


// Video canvas
import VideoCanvasPlugin, { VideoCanvas } from './js/canvas/es.upv.paella.videoCanvas';

// Canvas button
import CanvasButtonPlugin from './js/core/CanvasButtonPlugin';

export {
    Paella,
    PlayerState,
    PlayerStateNames,
    PopUp,
    utils,
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction,
    defaultGetCookieConsentCallback,
    defaultGetCookieDescriptionCallback,
    PlayerResource,
    Loader,
    
    Plugin,
    PluginModule,
    importPlugins,
    getPluginsOfType,
    loadPluginsOfType,
    UserInterfacePlugin,
    ButtonPlugin,
    PopUpButtonPlugin,
    MenuButtonPlugin,
    VideoLayout,
    VideoPlugin,
    ProgressIndicatorPlugin,
    Video,
    Canvas,
    CanvasButtonPosition,
    CanvasPlugin,
    VideoQualityItem,
    AudioTrackData,
    EventLogPlugin,
    ButtonGroupPlugin,

    getNextTabIndex,
    getCurrentTabIndex,

    checkManifestIntegrity,
    
    Events,
    bindEvent,
    triggerEvent,
    triggerIfReady,

    DomClass,
    createElement,
    createElementWithHtmlText,

    WebVTTParser,
    parseWebVTT,
    DFXPParser,
    parseDFXP,
    CaptionsPlugin,
    Captions,

    Data,
    DataPlugin,

    HlsVideo,
    getHlsSupport,
    defaultHlsConfig,
    HlsSupport,
    Mp4Video,
    ImageVideo,

    KeyShortcutPlugin,
    KeyCodes,
    getShortcuts,

    defaultTranslateFunction,
    defaultSetLanguageFunction,
    defaultGetLanguageFunction,
    defaultAddDictionaryFunction,
    defaultGetDictionariesFunction,
    defaultGetDefaultLanguageFunction,
    translate,
    setLanguage,
    getLanguage,
    addDictionary,
    getDictionaries,
    getDefaultLanguage,

    Log,
    log,
    LOG_LEVEL,

    DefaultKeyShortcutsPlugin,

    PlayPauseButtonPlugin,

    VttManifestCaptionsPlugin,
    DfxpManifestCaptionsPlugin,

    SingleVideoLayoutPlugin,
    DualVideoLayoutPlugin,
    DualVideoDynamicLayoutPlugin,
    TripleVideoLayoutPlugin,

    VideoCanvasPlugin,
    VideoCanvas,

    CanvasButtonPlugin,

    VideoContainerMessagePosition
}

