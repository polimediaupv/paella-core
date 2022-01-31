
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";
import PopUp from "paella-core/js/core/PopUp";

export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {

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
    }

    async incrementVolume(percent) {
        const volume = await this.player.videoContainer.streamProvider.volume();
        const newVolume = Math.min(Math.max(0, volume + percent * 0.01), 1);
        await this.player.videoContainer.streamProvider.setVolume(newVolume);
    }

    closePopUp() {
        PopUp.HideAllPopUps(false);
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
            this._validPlaybackRates[this._validPlaybackRates.length - 1];
        }
        await this.player.videoContainer.setPlaybackRate(selected);
    }

    async load() {
        this._validPlaybackRates = this.config.validPlaybackRates || [0.75, 1, 1.5, 2];
        this._validPlaybackRates.sort((a,b) => a-b);
    }

    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyK,
                description: "Toggle play/pause",
                action: async () => {
                    await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.KeyJ,
                description: "Rewind 30 seconds",
                action: async () => {
                    await this.seek(-30);
                }
            },
            {
                keyCode: KeyCodes.KeyL,
                description: "Rewind 30 seconds",
                action: async () => {
                    await this.seek(30);
                }
            },
            {
                keyCode: KeyCodes.Space,
                description: "Toggle play/pause",
                action: async () => {
                    await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.KeyF,
                description: "Toggle fullscreen",
                action: async () => {
                    await this.toggleFullscreen();
                }
            },
            {
                keyCode: KeyCodes.ArrowLeft,
                description: "Rewind 30 seconds",
                action: async () => {
                    await this.seek(-30);
                }
            },
            {
                keyCode: KeyCodes.ArrowRight,
                description: "Forward 30 seconds",
                action: async () => {
                    await this.seek(30);
                }
            },
            {
                keyCode: KeyCodes.ArrowUp,
                description: "Volume up 10%",
                action: async () => {
                    this.incrementVolume(10);
                }
            },
            {
                keyCode: KeyCodes.ArrowDown,
                description: "Volume down 10%",
                action: async () => {
                    this.incrementVolume(-10);
                }
            },
            {
                keyCode: KeyCodes.Escape,
                description: "Close Pop Up",
                action: async () => {
                    this.closePopUp();
                }
            },
            {
                keyCode: KeyCodes.KeyU,
                description: "Decrease playback speed",
                action: async () => {
                    await this.decreaseSpeed();
                }
            },
            {
                keyCode: KeyCodes.KeyO,
                description: "Increase playback speed",
                action: async () => {
                    this.increaseSpeed();
                }
            }
        ]
    }
}