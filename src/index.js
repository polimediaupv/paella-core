import 'paella-core/styles/base.css';

import Paella, { PlayerState, PlayerStateNames } from 'paella-core/js/Paella';
import PopUp from 'paella-core/js/core/PopUp';
import * as utils from 'paella-core/js/core/utils';
import {
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction
} from 'paella-core/js/core/initFunctions';

import Plugin, { importPlugins, getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/Plugin';
import UserInterfacePlugin from 'paella-core/js/core/UserInterfacePlugin';
import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';
import VideoLayout from 'paella-core/js/core/VideoLayout';
import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';
import PlayerResource from 'paella-core/js/core/PlayerResource';
import CanvasPlugin, { CanvasButtonPosition, Canvas } from 'paella-core/js/core/CanvasPlugin';
import Data, { DataPlugin } from 'paella-core/js/core/Data';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';
import AudioTrackData from 'paella-core/js/core/AudioTrackData';
import EventLogPlugin from 'paella-core/js/core/EventLogPlugin';
import ButtonGroupPlugin from 'paella-core/js/core/ButtonGroupPlugin';
import PluginModule from './js/core/PluginModule';

import { DomClass, createElementWithHtmlText, createElement } from 'paella-core/js/core/dom';

import WebVTTParser, { parseWebVTT } from './js/captions/WebVTTParser';
import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import Captions from 'paella-core/js/captions/Captions';

import KeyShortcutPlugin, { KeyCodes, getShortcuts } from './js/core/KeyShortcutPlugin';


import {
    defaultTranslateFunction,
    defaultSetLanguageFunction,
    defaultGetLanguageFunction,
    defaultAddDictionaryFunction,
    translate,
    setLanguage,
    getLanguage,
    addDictionary
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
import TripleVideoLayoutPlugin from './js/layouts/es.upv.paella.tripleVideo';

// Captions
import VttManifestCaptionsPlugin from './js/plugins/es.upv.paella.vttManifestCaptionsPlugin';


// Video canvas
import VideoCanvasPlugin, { VideoCanvas } from './js/canvas/es.upv.paella.videoCanvas';

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
    PlayerResource,
    
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
    Video,
    Canvas,
    CanvasButtonPosition,
    CanvasPlugin,
    VideoQualityItem,
    AudioTrackData,
    EventLogPlugin,
    ButtonGroupPlugin,
    
    Events,
    bindEvent,
    triggerEvent,

    DomClass,
    createElement,
    createElementWithHtmlText,

    WebVTTParser,
    parseWebVTT,
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
    translate,
    setLanguage,
    getLanguage,
    addDictionary,

    Log,
    log,
    LOG_LEVEL,

    DefaultKeyShortcutsPlugin,

    PlayPauseButtonPlugin,

    VttManifestCaptionsPlugin,

    SingleVideoLayoutPlugin,
    DualVideoLayoutPlugin,
    TripleVideoLayoutPlugin,

    VideoCanvasPlugin,
    VideoCanvas
}

