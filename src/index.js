import 'paella-core/styles/base.css';

import Paella from 'paella-core/js/Paella';
import PopUp from 'paella-core/js/core/PopUp';
import * as utils from 'paella-core/js/core/utils';
import * as initFunctions from 'paella-core/js/core/initFunctions';

import Plugin, { importPlugins, getPluginsOfType, loadPluginsOfType } from 'paella-core/js/core/Plugin';
import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';
import VideoLayout from 'paella-core/js/core/VideoLayout';
import VideoPlugin from 'paella-core/js/core/VideoPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';
import PlayerResource from 'paella-core/js/core/PlayerResource';
import CanvasPlugin, { Canvas } from 'paella-core/js/core/CanvasPlugin';

import { DomClass, createElementWithHtmlText, createElement } from 'paella-core/js/core/dom';

import WebVTTParser, { parseWebVTT } from './js/captions/WebVTTParser';

export {
    Paella,
    PopUp,
    utils,
    initFunctions,
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
    
    Events,
    bindEvent,
    triggerEvent,

    DomClass,
    createElement,
    createElementWithHtmlText,

    WebVTTParser,
    parseWebVTT
}

