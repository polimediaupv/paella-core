import AudioVideoPlugin from "paella-core/js/videoFormats/es.upv.paella.audioVideoFormat";
import HlsVideoPlugin from "paella-core/js/videoFormats/es.upv.paella.hlsVideoFormat";
import HlsLiveVideoFormat from "paella-core/js/videoFormats/es.upv.paella.hlsLiveVideoFormat";
import HtmlVideoPlugin from "paella-core/js/videoFormats/es.upv.paella.htmlVideoFormat";
import ImageVideoPlugin from "paella-core/js/videoFormats/es.upv.paella.imageVideoFormat";
import Mp4VideoPlugin from "paella-core/js/videoFormats/es.upv.paella.mp4VideoFormat";

import DefaultKeyShortcutsPlugin from "paella-core/js/plugins/es.upv.paella.defaultShortcuts";
import DfxpManifestCaptionsPlugin from "paella-core/js/plugins/es.upv.paella.dfxpManifestCaptionsPlugin";
import PlayPauseButtonPlugin from "paella-core/js/plugins/es.upv.paella.playPauseButton";
import VttManifestCaptionsPlugin from "paella-core/js/plugins/es.upv.paella.vttManifestCaptionsPlugin";

import DualVideoDynamicLayout from "paella-core/js/layouts/es.upv.paella.dualVideoDynamic";
import DualVideoLayout from "paella-core/js/layouts/es.upv.paella.dualVideo";
import DualVideoPiPLayout from "paella-core/js/layouts/es.upv.paella.dualVideoPiP";
import SingleVideoLayout from "paella-core/js/layouts/es.upv.paella.singleVideo";
import SingleVideoDynamicLayout from "paella-core/js/layouts/es.upv.paella.singleVideoDynamic";
import TripleVideoLayout from "paella-core/js/layouts/es.upv.paella.tripleVideo";

import AudioCanvasPlugin from "paella-core/js/canvas/es.upv.paella.audioCanvas";
import VideoCanvasPlugin from "paella-core/js/canvas/es.upv.paella.videoCanvas";

import CookieDataPlugin from "paella-core/js/data/es.upv.paella.cookieDataPlugin";

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
    }
]
