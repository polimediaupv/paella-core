
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";
import PopUp from "paella-core/js/core/PopUp";

export default class DefaultKeyShortcutsPlugin extends KeyShortcutPlugin {

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
    }

    async incrementVolume(percent) {
        const volume = await this.player.videoContainer.streamProvider.volume();
        const newVolume = Math.min(Math.max(0, volume + percent * 0.01), 1);
        await this.player.videoContainer.setVolume(newVolume);
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

    async toggleVolume() {
        const vol = await this.player.videoContainer.volume();
        if (vol>0) {
            this._lastVolume = vol;
            await this.player.videoContainer.setVolume(0);
        }
        else {
            await this.player.videoContainer.setVolume(this._lastVolume || 1);
        }
    }

    async load() {
        this._validPlaybackRates = this.config.validPlaybackRates || [0.75, 1, 1.5, 2];
        this._validPlaybackRates.sort((a,b) => a-b);
    }

    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyM,
                description: "Toggle audio mute",
                keyModifiers: {
                    ctrlKey: false
                },
                action: async () => {
                    await this.toggleVolume();
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
                description: "Rewind 30 seconds",
                action: async () => {
                    await this.seek(-30);
                }
            },
            {
                keyCode: KeyCodes.KeyL,
                description: "Forward 30 seconds",
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
                keyCode: KeyCodes.KeyC,
                description: "Toggle Captions",
                action: async () => {
                    this.toggleCaptions();
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

    async getDictionaries() {
        return {
            "es": {
                "Select the active audio track": "Seleccione la pista de audio activa",
                "Toggle audio mute": "Conmutar el silencio de audio",
                "Toggle play/pause": "Activar la reproducción/pausa",
                "Toggle Captions": "Alternar subtítulos",
                "Rewind 30 seconds": "Rebobinar 30 segundos",
                "Forward 30 seconds": "Avanzar 30 segundos",
                "Volume up 10%": "Aumenta el volumen un 10%.",
                "Volume down 10%": "Reduce el volumen un 10%.",
                "Close Pop Up": "Cerrar Pop Up",
                "Decrease playback speed": "Reducir la velocidad de reproducción",
                "Increase playback speed": "Aumentar la velocidad de reproducción"
            }
        }
    }
}