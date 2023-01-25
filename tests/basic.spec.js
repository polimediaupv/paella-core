// @ts-check
const { test, expect } = require('@playwright/test');

const player = '__paella_instances__[0]';

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

const loadUrl = async (page, presenter, presentation = null) => {
  const videos = !presentation ? `["${presenter}"]` : `["${presenter}","${presentation}"]`;
  await page.evaluate(`
    const initParams = {
      defaultVideoPreview: "/config/default_preview_landscape.jpg",
      defaultVideoPreviewPortrait: "/config/default_preview_portrait.jpg"
    };

    
    const paella = new Paella('player-container', initParams);
    paella.loadUrl(${videos})
      .then(() => {})
      .catch(err => console.error(err));
  `);
}

export const getPlayerState = async page => page.evaluate(`${player}.PlayerState`);

export const waitState = async (page, state) => {
  await page.evaluate(`${player}.waitState(${state})`);
}

export const getState = async (page) => await page.evaluate(`${player}.state`);


export const playVideo = async (page) => {
  const PlayerState = await getPlayerState(page);
  await waitState(page, PlayerState.MANIFEST);
  await page.click('#playerContainerClickArea');
  await waitState(page, PlayerState.LOADED);
  await expect(await getState(page)).toBe(PlayerState.LOADED);
}

export const checkPlayVideo = async (page) => {
  await loadPlayer(page);
  await playVideo(page);
}

const checkPlayUrl = async (page, video1, video2 = null) => {
  await loadUrl(page, video1, video2);
  await playVideo(page);
}

test.describe("Play videos using manifest file", () => {
  test('Play mp4 video', async ({ page }) => {
    await page.goto('/?id=belmar-multiresolution-remote');
  
    await checkPlayVideo(page);
  });
  
  test('Play HTML video', async ({ page }) => {
    await page.goto('/?id=belmar-html');
  
    await checkPlayVideo(page);
  });
  
  test('Play HLS video', async ({ page }) => {
    await page.goto('/?id=hls-multiquality');
  
    await checkPlayVideo(page);
  });
});

test.describe("Play videos using file URLs", () => {
  test('Play using one MP4 URL', async ({ page }) => {
    await page.goto('/');
  
    await checkPlayUrl(page,'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4');
  });
  
  test('Play using two MP4 URLs', async ({ page }) => {
    await page.goto('/');
  
    await checkPlayUrl(page,
      'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4',
      'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4'
    );
  });
  
  test('Play using one WEBM URL', async ({ page, browserName }) => {
    if (browserName !== 'webkit') {
      await page.goto('/');
    
      await checkPlayUrl(page,
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.webm'
      );
    }
  });
  
  test('Play using one OGG URL', async ({ page, browserName }) => {
    if (browserName !== 'webkit') {
      await page.goto('/');
    
      await checkPlayUrl(page,
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.ogv'
      );
    }
  });
  
  test('Play using two different format URL', async ({ page, browserName }) => {
    if (browserName !== 'webkit') {
      await page.goto('/');
  
      await checkPlayUrl(page,
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.webm',
        'https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4'
      );
    }
  });
});


