import {
    Events,
    bindEvent, 
    triggerEvent,
    triggerIfReady
} from '../../dist/paella-core';


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
});
