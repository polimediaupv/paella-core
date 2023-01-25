const { test, expect } = require('@playwright/test');
import { 
    waitState,
    getState,
    getPlayerState,
    playVideo
} from './basic.spec';

const loadPlayer = async (page) => {
    await page.evaluate(`
        const paella = new Paella('player-container', {});

        paella.loadManifest()
            .then(() => {})
            .catch(err => console.error(err));
    `);
}

test.describe("Seek video", () => {
    test("Seeking html video", async ({page}) => {
        await page.goto('/?id=belmar-html');
        await loadPlayer(page);
        await playVideo(page);

        await page.click('#playPauseButton');
        await page.click('.progress-indicator-container');

        const currentTime = await page.evaluate(`__paella_instances__[0].videoContainer.currentTime()`);
        await expect(currentTime / 10).toBeCloseTo(45, 0);
    });

    test("Seeking HLS video", async ({page}) => {
        await page.goto('/?id=hls-multiquality');
        await loadPlayer(page);
        await playVideo(page);

        await page.click('#playPauseButton');
        await page.click('.progress-indicator-container');

        const currentTime = await page.evaluate(`__paella_instances__[0].videoContainer.currentTime()`);
        await expect(currentTime / 10).toBeCloseTo(45, 0);
    });
});

test.describe("Trimming", () => {
    test("Enable and disable trimming", async ({page}) => {

    });

    test("Seek in trimmed video", async ({page}) => {

    });

    test("Load trimming from manifest", async ({page}) => {
        
    })
});