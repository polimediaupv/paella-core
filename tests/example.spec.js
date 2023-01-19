// @ts-check
const { test, expect } = require('@playwright/test');

const player = '__paella_instances__[0]';

const waitState = async (page, state) => {
  await page.evaluate(`${player}.waitState(${state})`);
}

const checkPlayVideo = async (page) => {
  const PlayerState = await page.evaluate(`${player}.PlayerState`);

  await waitState(page, PlayerState.MANIFEST);
  const state = await page.evaluate(`${player}.state`);  
  await expect(state).toBe(PlayerState.MANIFEST);

  await page.click('#playerContainerClickArea');
  await waitState(page, PlayerState.LOADED);
}

test('Play mp4 video', async ({ page }) => {
  await page.goto('/?id=belmar-multiresolution-remote');

  await checkPlayVideo(page);
});

test('Play HTML video', async ({page}) => {
  await page.goto('/?id=belmar-html');

  await checkPlayVideo(page);
});

test('Play HLS video', async ({ page }) => {
  await page.goto('/?id=hls-multiquality');

  await checkPlayVideo(page);
});
