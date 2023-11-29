import AudioVideoPlugin from "./videoFormats/es.upv.paella.audioVideoFormat";
import HlsVideoPlugin from "./videoFormats/es.upv.paella.hlsVideoFormat";
import HlsLiveVideoFormat from "./videoFormats/es.upv.paella.hlsLiveVideoFormat";
import HtmlVideoPlugin from "./videoFormats/es.upv.paella.htmlVideoFormat";
import ImageVideoPlugin from "./videoFormats/es.upv.paella.imageVideoFormat";
import Mp4VideoPlugin from "./videoFormats/es.upv.paella.mp4VideoFormat";

import DefaultKeyShortcutsPlugin from "./plugins/es.upv.paella.defaultShortcuts";
import DfxpManifestCaptionsPlugin from "./plugins/es.upv.paella.dfxpManifestCaptionsPlugin";
import PlayPauseButtonPlugin from "./plugins/es.upv.paella.playPauseButton";
import VttManifestCaptionsPlugin from "./plugins/es.upv.paella.vttManifestCaptionsPlugin";

import DualVideoDynamicLayout from "./layouts/es.upv.paella.dualVideoDynamic";
import DualVideoLayout from "./layouts/es.upv.paella.dualVideo";
import DualVideoPiPLayout from "./layouts/es.upv.paella.dualVideoPiP";
import SingleVideoLayout from "./layouts/es.upv.paella.singleVideo";
import SingleVideoDynamicLayout from "./layouts/es.upv.paella.singleVideoDynamic";
import TripleVideoLayout from "./layouts/es.upv.paella.tripleVideo";

import AudioCanvasPlugin from "./canvas/es.upv.paella.audioCanvas";
import VideoCanvasPlugin from "./canvas/es.upv.paella.videoCanvas";

import CookieDataPlugin from "./data/es.upv.paella.cookieDataPlugin";
import LocalStorageDataPlugin from "./data/es.upv.paella.localStorageDataPlugin";

export default [
    {
        plugin: AudioVideoPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: HlsVideoPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: HlsLiveVideoFormat,
        config: {
            enabled: false
        }
    },
    {
        plugin: HtmlVideoPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: ImageVideoPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: Mp4VideoPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: DefaultKeyShortcutsPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: DfxpManifestCaptionsPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: PlayPauseButtonPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: VttManifestCaptionsPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: DualVideoDynamicLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: DualVideoLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: DualVideoPiPLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: SingleVideoLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: SingleVideoDynamicLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: DualVideoDynamicLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: TripleVideoLayout,
        config: {
            enabled: false
        }
    },
    {
        plugin: AudioCanvasPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: VideoCanvasPlugin,
        config: {
            enabled: false
        }
    },
    {
        plugin: CookieDataPlugin,
        config: {
            enabled: false,
            context: ["default"]
        }
    },
    {
        plugin: LocalStorageDataPlugin,
        config: {
            enable: true,
            context: ["default"]
        }
    }
]
