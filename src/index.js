import 'paella-core/styles/base.css';

import Paella from 'paella-core/js/Paella';
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
import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';
import VideoLayout from 'paella-core/js/core/VideoLayout';
import VideoPlugin from 'paella-core/js/core/VideoPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';
import PlayerResource from 'paella-core/js/core/PlayerResource';
import CanvasPlugin, { Canvas } from 'paella-core/js/core/CanvasPlugin';
import Data, { DataPlugin } from 'paella-core/js/core/Data';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';
import AudioTrackData from 'paella-core/js/core/AudioTrackData';
import EventLogPlugin from 'paella-core/js/core/EventLogPlugin';

import { DomClass, createElementWithHtmlText, createElement } from 'paella-core/js/core/dom';

import WebVTTParser, { parseWebVTT } from './js/captions/WebVTTParser';
import CaptionsPlugin from 'paella-core/js/captions/CaptionsPlugin';
import Captions from 'paella-core/js/captions/Captions';

// Export the built in video format plugins

import { HlsVideo, getHlsSupport, defaultHlsConfig, HlsSupport } from './js/videoFormats/es.upv.paella.hlsVideoFormat';
import { Mp4Video } from './js/videoFormats/es.upv.paella.mp4VideoFormat';
import { ImageVideo } from './js/videoFormats/es.upv.paella.imageVideoFormat';

import KeyShortcutPlugin, { KeyCodes } from './js/core/KeyShortcutPlugin';

export {
    Paella,
    PopUp,
    utils,
    defaultLoadConfigFunction,
    defaultGetVideoIdFunction,
    defaultGetManifestUrlFunction,
    defaultGetManifestFileUrlFunction,
    defaultLoadVideoManifestFunction,
    PlayerResource,
    
    Plugin,
    importPlugins,
    getPluginsOfType,
    loadPluginsOfType,
    ButtonPlugin,
    PopUpButtonPlugin,
    MenuButtonPlugin,
    VideoLayout,
    VideoPlugin,
    Canvas,
    CanvasPlugin,
    VideoQualityItem,
    AudioTrackData,
    EventLogPlugin,
    
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
    KeyCodes
}

