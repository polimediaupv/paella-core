

import { DomClass } from './dom';
import Plugin from './Plugin';
import { loadPluginsOfType } from './plugin_tools'
import { getFileExtension } from './utils';
export default class VideoPlugin extends Plugin {
    get type() { return "video"; }

    get streamType() { return "mp4"; }

    isCompatible(/* streamData */) {
        return false;
    }

    async getVideoInstance(/*playerContainer, isMainAudio*/) {
        return null;
    }

    getCompatibleFileExtensions() {
        return [];
    }

    getManifestData(fileUrls) {

    }
}

const g_enabledVideoPlugins = [];

export async function loadVideoPlugins(player) {
    await loadPluginsOfType(player, "video", (plugin) => {
        g_enabledVideoPlugins.push(plugin);
    });
}

export async function unloadVideoPlugins(player) {
    g_enabledVideoPlugins.slice(0);
}

export function getVideoPlugins(player) {
    if (g_enabledVideoPlugins.length === 0) {
        throw Error("No video plugins loaded. Note that `loadVideoPlugins()` must to be called before using `getVideoPlugins()`.")
    }
    return g_enabledVideoPlugins;
}

export function getVideoPluginWithFileUrl(player, url) {
    const ext = getFileExtension(url);
    const videoPlugins = getVideoPlugins(player)
    return videoPlugins.find(p => {
            return p.getCompatibleFileExtensions().indexOf(ext) !== -1;
        });
}

export function getVideoPlugin(player, streamData) {
    const videoPlugins = getVideoPlugins(player);
    let plugin = null;
    
    videoPlugins.some(p => {
        if (p.isCompatible(streamData)) {
            plugin = p;
            return true;
        }
    });
    return plugin;
}

export async function isVolumeApiAvailable() {
    const value = await (new Promise(resolve => {
        const audio = document.createElement('audio');
        const resolveTimer = setTimeout(() => resolve(false), 100);
        audio.addEventListener('volumechange', evt => {
            clearTimeout(resolveTimer);
            resolve(true);
        });
        audio.volume = 0.5;
    }));
    return value
}

export class Video extends DomClass {
    constructor(tag, player, parent) {
        const attributes = {
            "class": "video-player"
        };
        super(player, {tag, attributes, parent});

        this._streamProvider = null;
        this._streamData = null;
        this._ready = false;
    }

    async isVolumeApiAvailable() {
        return await isVolumeApiAvailable()
    }

    get streamData() {
        return this._streamData;
    }

    get ready() {
        return this._ready;
    }

    async load(streamData, streamProvider) {
        this._streamProvider = streamProvider;
        this._streamData = streamData;
        const result = await this.loadStreamData(streamData);
        return result;
    }

    get isMainAudioPlayer() {
        return this._streamProvider.mainAudioPlayer === this;
    }
    
    // The player must call _videoEndedCallback when the video is ended
    onVideoEnded(fn) {
        this._videoEndedCallback = fn;
    }

    // The video instance must implement the following functions and properties
    async play() {
        return false;
    }
    
    async pause() {
        return false;
    }

    async duration() {
        return -1;
    }
    
    get currentTimeSync() {
        return -1;
    }

    async currentTime() {
        return -1;
    }

    async setCurrentTime(/* t */) {
        return false;
    }

    async volume() {
        return -1;
    }

    async setVolume(/* v */) {
        return false;
    }

    initVolume(v) {
        this._initialVolume = v;
    }

    async paused() {
        return true;
    }

    async playbackRate() {
        return -1;
    }

    async setPlaybackRate() {
        return false;
    }

    async getQualities() {
        return null;
    }

    async setQuality(/* q */) {
        return false;
    }

    get currentQuality() {
        return null;
    }

    async getDimensions() {
        return null;
    }
    
    async supportsMultiaudio() {
        return false;
    }

    async getAudioTracks() {
        return null;
    }

    async setCurrentAudioTrack() {

    }

    get currentAudioTrack() {
        return null;
    }

    async loadStreamData(streamData) {
        return false;
    }

    get isEnabled() {
        return this._enabled;
    }

    async enable() {
        this._enabled = true;
    }

    async disable() {
        this._enabled = false;
    }
}
