import Events, {
    bindEvent, 
    triggerEvent,
    triggerIfReady,
    unregisterEvents } from 'paella-core/js/core/Events';


describe('Events', () => {
    test('bindEvent', () => {
        const player = {};
        const cb = () => {}
        const ret = bindEvent(player, Events.PLAY, cb)
        const data = player.__eventListeners__[Events.PLAY];

        expect(ret).toBe(cb)
        expect(data[data.length-1]).toEqual({callback: cb, unregisterOnUnload: true})
    });

    test('trigger one event', () => {
        const player = {};
        const cb = (params) => {
            expect(params).toEqual({a:1, b:2})
        }
        const ret = bindEvent(player, Events.PLAY, cb)
        
        triggerEvent(player, Events.PLAY, {a:1, b:2});
    });

    test('triggerIfReady', () => {
        const player = {};
        const cb = (params) => {
            expect(params).toEqual({a:1, b:2})
        }
        const ret = bindEvent(player, Events.PLAY, cb)
        
        player.ready = true;
        triggerIfReady(player, Events.PLAY, {a:1, b:2});
    });


    test('unregisterEvents', () => {
        const clog = jest.spyOn(console, "log").mockImplementation(() => {});
        
        const player = {};
        unregisterEvents(player);
        expect(player.__eventListeners__).toBeUndefined();

        const cb = () => {}
        bindEvent(player, Events.PLAY, cb, true)
        bindEvent(player, Events.PAUSE, cb, false)
        
        unregisterEvents(player);
        expect(player.__eventListeners__).toEqual({
            "paella:pause": [{"callback": cb, "unregisterOnUnload": false}],
            "paella:play": []}
        );

        clog.mockReset();
    });
});
