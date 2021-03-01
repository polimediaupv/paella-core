import 'paella-core/styles/base.css';

import Paella from 'paella-core/js/Paella';
import PopUp from 'paella-core/js/core/PopUp';
import * as utils from 'paella-core/js/core/utils';

import Plugin, { importPlugins } from 'paella-core/js/core/Plugin';
import ButtonPlugin from 'paella-core/js/core/ButtonPlugin';
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import VideoLayout from 'paella-core/js/core/VideoLayout';
import VideoPlugin from 'paella-core/js/core/VideoPlugin';
import Events, { bindEvent, triggerEvent } from 'paella-core/js/core/Events';

export {
    Paella,
    PopUp,
    utils,
    
    Plugin,
    importPlugins,
    ButtonPlugin,
    PopUpButtonPlugin,
    VideoLayout,
    VideoPlugin,
    
    Events,
    bindEvent,
    triggerEvent
}

