import {LOG_LEVEL, Log, printMessage} from '../../dist/paella-core';


const player = {}
const log = new Log();
const playerLog = new Log(player, "playerLog");



describe('Logs', () => {
    test('Check boundary errors', () => {        
        expect(()=> {
            log.setLevel(-1);
        }).toThrow(Error);

        expect(()=> {
            log.setLevel(6);
        }).toThrow(Error);

        expect(()=> {
            printMessage({msg:"msg", level:-1});
        }).toThrow(Error);

        expect(()=> {
            printMessage({msg:"msg", player: {}});
        }).toThrow(Error);
    });

    test('Log context and player getters', () => {
        const defaultLog = new Log();
        expect(defaultLog.context).toBe("paella-core");
        expect(defaultLog.player).toBeUndefined();

        const player = {};
        const contextLog = new Log(player, "new-context");
        expect(contextLog.context).toBe("new-context");
        expect(contextLog.player).toBe(player);
    });

    test('setLevel/currentLevel globally', () => {
        log.setLevel("DISABLED");
        expect(log.currentLevel()).toBe(LOG_LEVEL.DISABLED);
        log.setLevel(1);
        expect(log.currentLevel()).toBe(1); 
    });

    test('setLevel/currentLevel to player', () => {        
        playerLog.setLevel(0);
        expect(playerLog.currentLevel()).toBe(0);
        playerLog.setLevel(1);
        expect(playerLog.currentLevel()).toBe(1);
    });

    test('Log messages', () => {
        const cerror = jest.spyOn(console, "error").mockImplementation(() => {});
        const cwarn = jest.spyOn(console, "warn").mockImplementation(() => {});
        const clog = jest.spyOn(console, "log").mockImplementation(() => {});

        log.setLevel(5);
        log.error("error");
        log.warn("warn");
        log.info("info");
        log.debug("debug");
        log.verbose("verbose");

        expect(cerror).toBeCalledWith('paella-core - Error: error');
        expect(cwarn).toBeCalledWith('paella-core - Warning: warn');
        expect(clog).toBeCalledWith('paella-core - Info: info');
        expect(clog).toBeCalledWith('paella-core - Debug: debug');
        expect(clog).toBeCalledWith('paella-core - Info: info');

        expect(clog).toHaveBeenCalledTimes(3);

        cerror.mockReset();
        cwarn.mockReset();
        clog.mockReset();
    });

    test('Log messages when disabled', () => {
        const cerror = jest.spyOn(console, "error").mockImplementation(() => {});
        const cwarn = jest.spyOn(console, "warn").mockImplementation(() => {});
        const clog = jest.spyOn(console, "log").mockImplementation(() => {});

        log.setLevel(LOG_LEVEL.DISABLED);
        log.error("error");
        log.warn("warn");
        log.info("info");
        log.debug("debug");
        log.verbose("verbose");

        expect(cerror).not.toHaveBeenCalled();
        expect(cwarn).not.toHaveBeenCalled();
        expect(clog).not.toHaveBeenCalled();

        cerror.mockReset();
        cwarn.mockReset();
        clog.mockReset();

    });

});
