
import KeyShortcutPlugin, { KeyCodes } from "paella-core/js/core/KeyShortcutPlugin";


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

    async getKeys() {
        return [
            {
                keyCode: KeyCodes.KeyK,
                description: "Toggle play/pause",
                action: async (event) => {
                    await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.Space,
                description: "Toggle play/pause",
                action: async (event) => {
                    await this.togglePlayPause();
                }
            },
            {
                keyCode: KeyCodes.KeyF,
                description: "Toggle fullscreen",
                action: async (event) => {
                    await this.toggleFullscreen();
                }
            },
            {
                keyCode: KeyCodes.ArrowLeft,
                description: "Rewind 30 seconds",
                action: async (event) => {
                    await this.seek(-30);
                }
            },
            {
                keyCode: KeyCodes.ArrowRight,
                description: "Forward 30 seconds",
                action: async (event) => {
                    await this.seek(30);
                }
            },
            {
                keyCode: KeyCodes.ArrowUp,
                description: "Volume up 10%",
                action: async (event) => {
                    this.incrementVolume(10);
                }
            },
            {
                keyCode: KeyCodes.ArrowDown,
                description: "Volume down 10%",
                action: async (event) => {
                    this.incrementVolume(-10);
                }
            }
        ]
    }
}