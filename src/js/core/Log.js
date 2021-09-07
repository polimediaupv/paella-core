
export const LOG_LEVEL = {
    DISABLED: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    VERBOSE: 5
};

let g_globalLogLevel = LOG_LEVEL.INFO;

export const setLogLevel = (l,player = null) => {
    const level = typeof(l) === "string" ? LOG_LEVEL[l] : l;

    if (level<LOG_LEVEL.DISABLED || level>LOG_LEVEL.VERBOSE) {
        throw Error(`setLogLevel: invalid log level ${ level }`);
    }
    if (player) {
        player.__logSettings = player.__logSettings || {};
        player.__logSettings.logLevel = level;
    }
    else {
        g_globalLogLevel = level;
    }
}

export const currentLogLevel = (player = null) => {
    return player ? player.__logSettings.logLevel : g_globalLogLevel;
}

export const printMessage = ({
    msg,
    level = LOG_LEVEL.INFO, 
    player = null,
    context = 'paella-core'
}) => {
    if (player && !player.__logSettings) {
        setLogLevel(player, LOG_LEVEL.INFO);
    }

    const current = currentLogLevel(player);
    if (level<LOG_LEVEL.DISABLED) {
        throw Error(`printMessage: invalid log level ${ level }`);
    }

    if (level<=current) {
        switch (level) {
        case LOG_LEVEL.ERROR:
            console.error(`${ context } - Error: ${msg}`);
            break;
        case LOG_LEVEL.WARN:
            console.warn(`${ context }  - Warning: ${msg}`);
            break;
        case LOG_LEVEL.INFO:
            console.log(`${ context } - Info: ${msg}`);
            break;
        case LOG_LEVEL.DEBUG:
            console.log(`${ context } - Debug: ${msg}`);
            break;
        case LOG_LEVEL.VERBOSE:
            console.log(`${ context } - Verbose: ${msg}`);
            break;
        }
    }
};

export const log = {
    setLevel: (level, player = null) => {
        setLogLevel(level, player);
    },

    currentLevel: (player = null) => {
        return currentLogLevel(player);
    },

    error: (msg, player = null, context = 'paella-core') => {
        printMessage({
            msg, 
            level: LOG_LEVEL.ERROR, 
            player, 
            context 
        });
    },

    warn: (msg, player = null, context = 'paella-core') => {
        printMessage({
            msg, 
            level: LOG_LEVEL.WARN, 
            player, 
            context 
        });
    },

    info: (msg, player = null, context = 'paella-core') => {
        printMessage({
            msg, 
            level: LOG_LEVEL.INFO, 
            player, 
            context 
        });
    },

    debug: (msg, player = null, context = 'paella-core') => {
        printMessage({
            msg, 
            level: LOG_LEVEL.DEBUG, 
            player, 
            context 
        });
    },

    verbose: (msg, player = null, context = 'paella-core') => {
        printMessage({
            msg, 
            level: LOG_LEVEL.VERBOSE, 
            player, 
            context 
        });
    }
}


export default class Log {
    constructor(player, context = "paella-core") {
        this._player = player;
        this._context = context;
    }

    get context() {
        return this._context;
    }

    get player() {
        return this._player;
    }

    setLevel(level) {
        log.setLevel(level, this._player);
    }

    currentLevel() {
        log.currentLevel(this._player);
    }

    error(msg, context = null) {
        log.error(msg, this._player, context || this._context);
    }

    warn(msg, context = null) {
        log.warn(msg, this._player, context || this._context);
    }

    info(msg, context = null) {
        log.info(msg, this._player, context || this._context);
    }

    debug(msg, context = null) {
        log.debug(msg, this._player, context || this._context);
    }

    verbose(msg, context = null) {
        log.verbose(msg, this._player, context || this._context);
    }
}
