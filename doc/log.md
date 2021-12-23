# Log

`paella-core` incorporates a message logging system that allows you to write messages that will be displayed depending on the verbosity level set.

You can access to the logging system through the player instance:

```javascript
const log = myPlayerInstance.log;
...
```

To write messages to the console, you can call the following five functions, depending on the verbosity level you want to use:

```javascript
...
log.error("This is an error message");
log.warn("This is a warning message");
log.info("This is an information message");
log.debug("This is a debug message");
log.verbose("This is a more verbose debug message");
```

The default verbosity level, if it is not set in the `config.json` file, is `INFO`. However, befor the player configuration is completed, the initial verbosity level is `VERBOSE`. If you want to explicitly modify the verbosity level before the configuration is load, you must do so after creating the paella player instance.

```javascript
import { Paella, LOG_LEVEL } from 'paella-core';

const initParams = { ... };

const playerInstance = new Paella('player-container', initParams);
playerInstance.log.setLevel(LOG_LEVEL.WARN);

playerInstance.loadManifest()
    .then(() => {
        // Done
    })
    .catch((e) => {
        playerInstance.log.error(e.message);
    })
```

If you want to override the `config.json` settings and set your own verbosity level using the JavaScript API, you must do so AFTER loading the configuration, for example, in the `then` callback or inside a plugin:

```javascript

playerInstance.loadManifest()
    .then(() => {
        // Done
        playerInstance.log.setLevel(LOG_LEVEL.DEBUG);
    })
    .catch((e) => {
        playerInstance.log.error(e.message);
    })
```

To set the verbosity level you can use the `LOG_LEVEL` object, the numeric value of the verbosity level or the verbosity level string:

```javascript
export const LOG_LEVEL = {
    DISABLED: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    VERBOSE: 5
};
```

```javascript
import { Paella, LOG_LEVEL } from 'paella-core`;
...
playerInstance.log.setLevel(LOG_LEVEL.DEBUG);
playerInstance.log.setLevel(0); // DISABLED
playerInstance.log.setLevel("INFO");
```

It is also possible to set the verbosity level by adding the `logLevel` parameter in the URL. As a value it is possible to set any of the elements of the `LOG_LEVEL` object:

`https://my-paella.com/?id=video_id&logLevel=VERBOSE`




