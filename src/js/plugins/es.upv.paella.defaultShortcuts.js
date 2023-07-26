
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";
import PopUp from "paella-core/js/core/PopUp";
import { VideoContainerMessagePosition } from "../core/VideoContainerMessage";

import defaultVolumeMuteIcon from "../../icons/volume-mute.svg"
import defaultVolumeLowIcon from "../../icons/volume-low.svg"
import defaultVolumeMidIcon from "../../icons/volume-mid.svg"
import defaultVolumeHighIcon from "../../icons/volume-high.svg"
import PlayerState from "../core/PlayerState";
import TimeLinePopUp from "../core/TimeLinePopUp";

export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {

    get name() {
		return super.name || "es.upv.paella.defaultShortcuts";
	}

    getVolumeIcon(volume) {
        if (volume === 0) {
            return this.player.getCustomPluginIcon(this.name,"volumeMuteIcon") || defaultVolumeMuteIcon;
        }
        else if (volume < 0.3) {
            return this.player.getCustomPluginIcon(this.name,"volumeLowIcon") || defaultVolumeLowIcon
        }
        else if (volume < 0.6) {
            return this.player.getCustomPluginIcon(this.name,"volumeMidIcon") || defaultVolumeMidIcon;
        }
        else {
            return this.player.getCustomPluginIcon(this.name,"volumeHighIcon") || defaultVolumeHighIcon;
        }
    }

    toggleCaptions() {
        if (this.player?.captionsCanvas?.captions?.length > 0) {
            if (this.player.captionsCanvas.isVisible) {
                this.player.captionsCanvas.disableCaptions();
            }
            else {
                let langIndex = null;
                navigator.languages.some((l) => {
                    return this.player.captionsCanvas.captions.some((cap, idx) => {
                        if (l == cap.language) {
                            langIndex = idx;
                            return true;
                        }
                        return false;
                    });
                });
                this.player.captionsCanvas.enableCaptions({ index: (langIndex || 0) });
            }
        }
    }

    async togglePlayPause() {
        const isPaused = await this.player.paused();
        if (isPaused) {
            await this.player.play();
        }
        else {
            await this.player.pause();
        }
    }

    async toggleFullscreen() {
        if (this.player.isFullscreen) {
            await this.player.exitFullscreen();
        }
        else {
            await this.player.enterFullscreen();
        }
    }

    async seek(seconds) {
        const currentTime = await this.player.videoContainer.streamProvider.currentTime();
        await this.player.videoContainer.streamProvider.setCurrentTime(currentTime + seconds);
        if (seconds < 0) {
            this.player.videoContainer.message.show({
                text: `<< ${Math.abs(seconds)}s`,
                position: VideoContainerMessagePosition.CENTER_LEFT,
                timeout: 500
            });
        }
        else {
            this.player.videoContainer.message.show({
                text: `${seconds}s >>`,
                position: VideoContainerMessagePosition.CENTER_RIGHT,
                timeout: 500
            });
        }
    }

    async incrementVolume(percent) {
        const volume = await this.player.videoContainer.streamProvider.volume();
        const newVolume = Math.min(Math.max(0, volume + percent * 0.01), 1);
        await this.player.videoContainer.setVolume(newVolume);
        const icon = this.getVolumeIcon(newVolume);
        this.player.videoContainer.message.show({
            text: `${ Math.round(newVolume * 100) }%`,
            position: VideoContainerMessagePosition.CENTER_MIDDLE,
            icon
        });
    }

    closePopUp() {
        PopUp.HideTopPopUp();
        TimeLinePopUp.HideAll(this.player);
    }

    async decreaseSpeed() {
        const current = await this.player.videoContainer.playbackRate();
        let selected = 0;
        this._validPlaybackRates.some(p => {
            if (selected === 0) {
                selected = p;
            }
            if (p<current) {
                selected = p;
            }
            else {
                return true;
            }
        });
        await this.player.videoContainer.setPlaybackRate(selected);
        this.player.videoContainer.message.show({
            text: `${ selected }X`,
            position: VideoContainerMessagePosition.CENTER_MIDDLE
        });
    }

    async increaseSpeed() {
        const pr = await this.player.videoContainer.playbackRate();
        let selected = 0;
        this._validPlaybackRates.some(p => {
            if (p>pr) {
                selected = p;
                return true;
            }
        });
        if (selected === 0) {
            selected = this._validPlaybackRates[this._validPlaybackRates.length - 1];
        }
        await this.player.videoContainer.setPlaybackRate(selected);
        this.player.videoContainer.message.show({
            text: `${ selected }X`,
            position: VideoContainerMessagePosition.CENTER_MIDDLE
        });
    }

    async toggleVolume() {
        const vol = await this.player.videoContainer.volume();
        let newVol = 0;
        if (vol>0) {
            this._lastVolume = vol;
            newVol = 0;
        }
        else {
            newVol = this._lastVolume || 1;
        }

        await this.player.videoContainer.setVolume(newVol);
        const icon = this.getVolumeIcon(newVol);
        this.player.videoContainer.message.show({
            text: `volume: ${ Math.round(newVol * 100) }%`,
            position: VideoContainerMessagePosition.CENTER_MIDDLE,
            icon
        });
    }

    async load() {
        this._validPlaybackRates = this.config.validPlaybackRates || [0.75, 1, 1.5, 2];
        this._validPlaybackRates.sort((a,b) => a-b);
    }

    async getKeys() {
        const player = this.player;
        const skipBackwards = this.config.skipBackwards || 30;
        const skipForward = this.config.skipForward || 30;
        const isLoaded = () => player.state === PlayerState.LOADED;
        return [
            {
                keyCode: KeyCodes.KeyM,
                description: "Toggle audio mute",
                keyModifiers: {
                    ctrlKey: false
                },
                action: async () => {
                    if (isLoaded()) await this.toggleVolume();
                }
            },
            {
                keyCode: KeyCodes.KeyK,
                description: "Toggle play/pause",
                action: async () => {
                    await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.KeyJ,
                get description() { return player.translate("Rewind $1 seconds", [skipBackwards]) },
                action: async () => {
                    if (isLoaded()) await this.seek(-skipBackwards);
                }
            },
            {
                keyCode: KeyCodes.KeyL,
                get description() { return player.translate("Forward $1 seconds", [skipForward]) },
                action: async () => {
                    if (isLoaded()) await this.seek(skipForward);
                }
            },
            {
                keyCode: KeyCodes.Space,
                description: "Toggle play/pause",
                action: async () => {
                    if (isLoaded()) await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.KeyF,
                description: "Toggle fullscreen",
                action: async () => {
                    if (isLoaded()) await this.toggleFullscreen();
                }
            },
            {
                keyCode: KeyCodes.KeyC,
                description: "Toggle captions",
                action: async () => {
                    if (isLoaded()) this.toggleCaptions();
                }
            },
            {
                keyCode: KeyCodes.ArrowLeft,
                get description() { return player.translate("Rewind $1 seconds", [skipBackwards]) },
                action: async () => {
                    if (isLoaded()) await this.seek(-skipBackwards);
                }
            },
            {
                keyCode: KeyCodes.ArrowRight,
                get description() { return player.translate("Forward $1 seconds", [skipForward]) },
                action: async () => {
                    if (isLoaded()) await this.seek(skipForward);
                }
            },
            {
                keyCode: KeyCodes.ArrowUp,
                description: "Volume up 10%",
                action: async () => {
                    if (isLoaded()) this.incrementVolume(10);
                }
            },
            {
                keyCode: KeyCodes.ArrowDown,
                description: "Volume down 10%",
                action: async () => {
                    if (isLoaded()) this.incrementVolume(-10);
                }
            },
            {
                keyCode: KeyCodes.Escape,
                description: "Close pop-up",
                action: async () => {
                    if (isLoaded()) this.closePopUp();
                }
            },
            {
                keyCode: KeyCodes.KeyU,
                description: "Decrease playback speed",
                action: async () => {
                    if (isLoaded()) await this.decreaseSpeed();
                }
            },
            {
                keyCode: KeyCodes.KeyO,
                description: "Increase playback speed",
                action: async () => {
                    if (isLoaded()) this.increaseSpeed();
                }
            }
        ]
    }
}