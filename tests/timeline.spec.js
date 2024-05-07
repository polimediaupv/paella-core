const { test, expect } = require('@playwright/test');
import { playVideo, pauseVideo } from './utils';

const loadPlayer = async (page) => {
    await page.evaluate(`
        const paella = new Paella('player-container', {});

        paella.loadManifest()
            .then(() => {})
            .catch(err => console.error(err));
    `);
}

test.describe("Pause synchronization", () => {
    const playPauseVideo = async (page, manifest) => {
        await page.route('**', async route => {
            // Slow down network requests
            setTimeout(() => route.continue(), 1500);
        });

        await page.goto(`/?id=${manifest}`);
        await loadPlayer(page);
        await playVideo(page);
        await pauseVideo(page);
        await page.waitForTimeout(1000);

        const currentTime = await page.evaluate('__paella_instances__[0].videoContainer.currentTime()');
        await expect(currentTime).toBeCloseTo(0, 0);
    }

    test("Synchronize pause mp4 dual stream", async ({page}) => {
        await playPauseVideo(page, 'belmar-multiresolution-remote');        
    });

    test("Synchronize pause mp4 single stream", async ({page}) => {
        await playPauseVideo(page, 'belmar-single');        
    });

    test("Synchronize pause mp4 trimming", async ({page}) => {
        await playPauseVideo(page, 'belmar-trimming');        
    });

    test("Synchronize pause hls dual stream", async ({page}) => {
        await playPauseVideo(page, 'hls-multiquality');        
    });

    test("Synchronize pause hls single stream", async ({page}) => {
        await playPauseVideo(page, 'hls-single');        
    });
});

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
        await page.goto('/?id=belmar-html');
        await loadPlayer(page);
        await playVideo(page);

        const duration = await page.evaluate('__paella_instances__[0].videoContainer.duration()');
        await expect(duration).toBeCloseTo(908, 0);

        await page.evaluate('__paella_instances__[0].videoContainer.setTrimming({ start: 100, end: 200, enabled: true })');

        const newDuration = await page.evaluate('__paella_instances__[0].videoContainer.duration()');
        await expect(newDuration).toBeCloseTo(100, 0);
    });

    test("Seek in trimmed video", async ({page}) => {
        await page.goto('/?id=belmar-html');
        await loadPlayer(page);
        await playVideo(page);

        await page.click('#playPauseButton');

        await page.evaluate('__paella_instances__[0].videoContainer.setTrimming({ start: 100, end: 200, enabled: true })');

        // seek to half time
        await page.click('.progress-indicator-container');

        const currentTime = await page.evaluate('__paella_instances__[0].videoContainer.currentTime()');
        await expect(currentTime).toBeCloseTo(50, 0);
    });

    test("Load trimming from manifest", async ({page}) => {
        await page.goto('/?id=belmar-trimming');
        await loadPlayer(page);
        await playVideo(page);

        await page.click('#playPauseButton');

        const duration = await page.evaluate('__paella_instances__[0].videoContainer.duration()');
        await expect(duration).toBeCloseTo(300, 0);

        await page.click('.progress-indicator-container');
        
        const currentTime = await page.evaluate('__paella_instances__[0].videoContainer.currentTime()');
        await expect(currentTime).toBeCloseTo(150, 0);
    })
});