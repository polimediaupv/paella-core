# Init params

We discussed the configuration file in [the first tutorial](quick_start.md), which is where you set the player's settings. But there are certain operating parameters that cannot be specified in the configuration: some of these parameters are required before the configuration is loaded, while others are dynamic parameters that cannot be set in a file. A special parameter object is used for this type of setting, which is passed to the player. This is the `initParams` object:

```js
import { Paella } from 'paella-core';

const initParams = {
    // Initialization parameters
};
const player = new Paella('player-container', initParams);

await player.loadManifest();
```

