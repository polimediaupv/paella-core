const { expect } = require('@playwright/test');

const player = '__paella_instances__[0]';

export const getPlayerState = async page => page.evaluate(`${player}.PlayerState`);

export const waitState = async (page, state) => {
    await page.evaluate(`${player}.waitState(${state})`);
}
const loadPlayer = async (page) => {
    await page.evaluate(`
      const initParams = {
        defaultVideoPreview: "/config/default_preview_landscape.jpg",
        defaultVideoPreviewPortrait: "/config/default_preview_portrait.jpg"
      };
  
      
      const paella = new Paella('player-container', initParams);
      paella.loadManifest()
        .then(() => {})
        .catch(err => console.error(err));
    `)
}

export const getState = async (page) => await page.evaluate(`${player}.state`);
export const playVideo = async (page) => {
    const PlayerState = await getPlayerState(page);
    await waitState(page, PlayerState.MANIFEST);
    await page.click('#playerContainerClickArea');
    await waitState(page, PlayerState.LOADED);
    await expect(await getState(page)).toBe(PlayerState.LOADED);
}
export const pauseVideo = async (page) => await page.evaluate(`${player}.pause()`);
export const checkPlayVideo = async (page) => {
    await loadPlayer(page);
    await playVideo(page);
}
