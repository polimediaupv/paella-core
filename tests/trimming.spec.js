const { test, expect } = require('@playwright/test');
import { playVideo } from './utils';

const loadPlayer = async (page) => {
    await page.evaluate(`
    const paella = new Paella('player-container', {});
    
    paella.loadManifest()
        .then(() => {})
        .catch(err => console.error(err));
    `);
}

test.describe("Trimming", () => {
    test("Seek in trimmed video", async ({page}) => {
        await page.goto('/?id=belmar-multiresolution-remote');
        await loadPlayer(page);
        await playVideo(page);

        await page.evaluate(`__paella_instances__[0].videoContainer.setTrimming({ start: 100, end: 160, enabled: true })`);
        await page.click('#playPauseButton');
        await page.click('.progress-indicator-container');

        const currentTime = await page.evaluate(`__paella_instances__[0].videoContainer.currentTime()`);
        await expect(currentTime).toBeCloseTo(30, 0);
    });

    test("Captions in trimmed video", async ({page}) => {
        await page.goto('/?id=webvtt-captions');
        await loadPlayer(page);
        await playVideo(page);

        await page.evaluate(`__paella_instances__[0].videoContainer.setTrimming({ start: 100, end: 160, enabled: true })`);
        await page.evaluate(`__paella_instances__[0].captionsCanvas.enableCaptions({ lang: 'es' })`);
        await page.evaluate(`__paella_instances__[0].videoContainer.setCurrentTime(32)`);
        await page.click('#playPauseButton');

        const elem = page.getByText('es un enfoque');
        await expect(elem).toBeVisible();
    });

    test("Enable and disable trimming", async ({page}) => {
        await page.goto('/?id=belmar-multiresolution-remote');
        await loadPlayer(page);
        await playVideo(page);

        await page.evaluate(`__paella_instances__[0].videoContainer.setTrimming({ start: 100, end: 160, enabled: true })`);
        await page.click('#playPauseButton');
        await page.click('.progress-indicator-container');

        let currentTime = await page.evaluate(`__paella_instances__[0].videoContainer.currentTime()`);
        await expect(currentTime).toBeCloseTo(30, 0);

        await page.evaluate(`__paella_instances__[0].videoContainer.setTrimming({ enabled: false })`);
        await page.click('.progress-indicator-container');

        currentTime = await page.evaluate(`__paella_instances__[0].videoContainer.currentTime()`);
        await expect(Math.floor(currentTime)).toBeCloseTo(454);
    });
});

