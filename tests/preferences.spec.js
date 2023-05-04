const { test, expect } = require('@playwright/test');
import { playVideo } from './utils';

const loadPlayer = async (page,customConfig) => {
    const configText = JSON.stringify(customConfig);
    await page.evaluate(`
        const paella = new Paella('player-container', {
            loadConfig: async (configUrl,player) => {
                const response = await fetch(configUrl);
                const cfgData = await response.json();
                const customCfg = ${configText};
                Object.entries(customCfg).forEach(([key,value]) => {
                    cfgData[key] = value;
                });
                return cfgData;
            }
        });

        paella.loadManifest()
            .then(() => {})
            .catch(err => console.error(err));
    `);
}

test.describe("Preferences", () => {

    test("Preferences: using cookies", async ({page}) => {
        await page.goto('/?id=belmar-multiresolution-remote');

        const cfg = {
            // Use cookies for preferences
            preferences: {
                currentSource: "cookie",
                sources: {
                    cookie: {
                        consentType: "necessary"
                    }
                }
            },

            cookieConsent: [
                {
                    type: "necessary",
                    title: "Necessary",
                    description: "",
                    required: true
                }
            ]
        };
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        // Save preference
        const testValue = "testValue";
        await page.evaluate(`__paella_instances__[0].preferences.set("playwrightTest", "${ testValue }", { global: false })`);
        await page.evaluate(`__paella_instances__[0].preferences.set("playwrightTestGlobal", "${ testValue }", { global: true })`);

        // Reload page
        await page.goto('/?id=belmar-multiresolution-remote');
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        // Recover preference
        let localValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTest", { global: false })`);
        let globalValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTestGlobal", { global: true })`);
        await expect(localValue).toBe(testValue);
        await expect(globalValue).toBe(testValue);

        // Reload page
        await page.goto('/?id=hls-multiquality');
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        localValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTest", { global: false })`);
        globalValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTestGlobal", { global: true })`);
        await expect(localValue).not.toBeDefined();
        await expect(globalValue).toBe(testValue);
    });

    test("Preferences: using data plugin", async ({page}) => {
        await page.goto('/?id=belmar-multiresolution-remote');

        const cfg = {
            // Use data plugin for preferences
            preferences: {
                currentSource: "dataPlugin",
                sources: {
                    dataPlugin: {
                        context: "preferences"
                    }
                }
            }
        }
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        // Save preference
        const testValue = "testValue";
        await page.evaluate(`__paella_instances__[0].preferences.set("playwrightTest", "${ testValue }", { global: false })`);
        await page.evaluate(`__paella_instances__[0].preferences.set("playwrightTestGlobal", "${ testValue }", { global: true })`);

        // Reload page
        await page.goto('/?id=belmar-multiresolution-remote');
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        // Recover preference
        let localValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTest", { global: false })`);
        let globalValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTestGlobal", { global: true })`);
        await expect(localValue).toBe(testValue);
        await expect(globalValue).toBe(testValue);

        // Reload page
        await page.goto('/?id=hls-multiquality');
        await loadPlayer(page, cfg);
        
        await playVideo(page);

        localValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTest", { global: false })`);
        globalValue = await page.evaluate(`__paella_instances__[0].preferences.get("playwrightTestGlobal", { global: true })`);
        await expect(localValue).not.toBeDefined();
        await expect(globalValue).toBe(testValue);
    })
    
});