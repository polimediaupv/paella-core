const { test, expect } = require('@playwright/test');
import { waitState, getState, getPlayerState } from './basic.spec';

const loadPlayer = async (page, removePreview = false, addPreviewAtInit = false) => {
    const previewAtInit = `
        defaultVideoPreview: "/config/default_preview_landscape.jpg",
        defaultVideoPreviewPortrait: "/config/default_preview_portrait.jpg",
    `;

    await page.evaluate(`
        const paella = new Paella('player-container', {
            ${addPreviewAtInit ? previewAtInit : ""}

            // Remove preview images to test the preview requirement in manifest
            loadConfig: async (configUrl,player) => {
                const response = await fetch(configUrl);
                const cfgData = await response.json();
                ${ removePreview ? 'delete cfgData.defaultVideoPreview; delete cfgData.defaultVideoPreviewPortrait;' : '' }
                return cfgData;
            }
        });

        
        paella.loadManifest()
            .then(() => {})
            .catch(err => console.error(err));
    `);
}

test.describe("Preview image", () => {
    test('Check preview image error: incorrect manifest', async ({page}) => {
        await page.goto('/?id=belmar-nopreview');

        await loadPlayer(page, true);

        const PlayerState = await getPlayerState(page);

        await waitState(page, PlayerState.ERROR);
        await expect(await getState(page)).toBe(PlayerState.ERROR);
    });

    test('Check preview image error: correct manifest', async ({page}) => {
        await page.goto('/?id=belmar-html');

        await loadPlayer(page);

        const PlayerState = await getPlayerState(page);

        await waitState(page, PlayerState.MANIFEST);
        await expect(await getState(page)).toBe(PlayerState.MANIFEST);

        await page.click('#playerContainerClickArea');
        await waitState(page, PlayerState.LOADED);
        await expect(await getState(page)).toBe(PlayerState.LOADED);
    });

    test('Check preview image: set in config file', async ({page}) => {
        await page.goto('/?id=belmar-nopreview');

        await loadPlayer(page, false);

        const PlayerState = await getPlayerState(page);

        await waitState(page, PlayerState.MANIFEST);
        await expect(await getState(page)).toBe(PlayerState.MANIFEST);

        await page.click('#playerContainerClickArea');
        await waitState(page, PlayerState.LOADED);
        await expect(await getState(page)).toBe(PlayerState.LOADED);
    });

    test('Check preview image: set at initialization', async ({page}) => {
        await page.goto('/?id=belmar-nopreview');

        await loadPlayer(page, true, true);

        const PlayerState = await getPlayerState(page);

        await waitState(page, PlayerState.MANIFEST);
        await expect(await getState(page)).toBe(PlayerState.MANIFEST);

        await page.click('#playerContainerClickArea');
        await waitState(page, PlayerState.LOADED);
        await expect(await getState(page)).toBe(PlayerState.LOADED);
    });
});

