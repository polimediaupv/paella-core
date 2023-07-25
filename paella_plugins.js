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

import DualVideoDynamicLayout from "paella-core/js/layouts/es.upv.paella.singleVideoDynamic";
import DualVideoLayout from "paella-core/js/layouts/es.upv.paella.dualVideo";
import DualVideoPiPLayout from "paella-core/js/layouts/es.upv.paella.dualVideoPiP";
import SingleVideoLayout from "paella-core/js/layouts/es.upv.paella.singleVideo";
import TripleVideoLayout from "paella-core/js/layouts/es.upv.paella.tripleVideo";

import AudioCanvasPlugin from "paella-core/js/canvas/es.upv.paella.audioCanvas";
import VideoCanvasPlugin from "paella-core/js/canvas/es.upv.paella.videoCanvas";

import CookieDataPlugin from "paella-core/js/data/es.upv.paella.cookieDataPlugin";

export default [
    AudioVideoPlugin,
    HlsVideoPlugin,
    HlsLiveVideoFormat,
    HtmlVideoPlugin,
    ImageVideoPlugin,
    Mp4VideoPlugin,
    DefaultKeyShortcutsPlugin,
    DfxpManifestCaptionsPlugin,
    PlayPauseButtonPlugin,
    VttManifestCaptionsPlugin,
    DualVideoDynamicLayout,
    DualVideoLayout,
    DualVideoPiPLayout,
    SingleVideoLayout,
    DualVideoDynamicLayout,
    TripleVideoLayout,
    AudioCanvasPlugin,
    VideoCanvasPlugin,
    {
        plugin: CookieDataPlugin,
        config: {
            enabled: true,
            context: ["default"]
        }
    }
]
