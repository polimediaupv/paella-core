import {joinPath, isAbsoluteUrl, secondsToTime, timeToSeconds, resolveResourcePath} from 'paella-core/js/core/utils';

describe('joinPath(parts, sep)', () => {
    test('default sep is /', () => {
        expect(joinPath(['foo','bar'])).toBe('foo/bar')
    });

    test('sep is used', () => {
        expect(joinPath(['foo','bar'], "&")).toBe('foo&bar')
    });

    test('empty array parts', () => {
        expect(joinPath([])).toBe('');
    });
});

test('isAbsoluteUrl', () => {
    expect(isAbsoluteUrl("http://www.upv.es")).toBeTruthy();
    expect(isAbsoluteUrl("/foo/bar")).toBeTruthy();
    expect(isAbsoluteUrl("foo/bar")).not.toBeTruthy();
});

describe('secondsToTime(timestamp)', () => {
    test('timestamp not defined', () => {
        expect(secondsToTime()).toBe("NaN:NaN");
    });
    test('timestamp = 0', () => {
        expect(secondsToTime(0)).toBe("00:00");
    });
    test('timestamp = 59', () => {
        expect(secondsToTime(59)).toBe("00:59");
    });
    test('timestamp = 60', () => {
        expect(secondsToTime(60)).toBe("01:00");
    });
    test('timestamp = 150', () => {
        expect(secondsToTime(150)).toBe("02:30");
    });
    test('timestamp = 15020', () => {
        expect(secondsToTime(15020)).toBe("04:10:20");
    });
    test('timestamp = 15020', () => {
        expect(secondsToTime(15020)).toBe("04:10:20");
    });
    test('timestamp = 1502000', () => {
        expect(secondsToTime(1502000)).toBe("417:13:20");
    });
});


describe('timeToSeconds(timeString)', () => {
    test('timeString is not defined', () => {
        expect(timeToSeconds()).toBeNull();
    });
    test('timeString not well formed', () => {
        expect(timeToSeconds("1a:00")).toBeNull();
        expect(timeToSeconds("2:17:13:20")).toBe(null);
    });
    test('check various timeStrings', () => {
        expect(timeToSeconds("00:00")).toBe(0);
        expect(timeToSeconds("00:59")).toBe(59);
        expect(timeToSeconds("01:00")).toBe(60);
        expect(timeToSeconds("02:30")).toBe(150);
        expect(timeToSeconds("04:10:20")).toBe(15020);
        expect(timeToSeconds("417:13:20")).toBe(1502000);
    });
})

describe('resolveResourcePath(player, src)', () => {
    test('absolute paths', () => {
        expect(resolveResourcePath(null, '/foo')).toBe('/foo');
    })

    test('relative paths to player', () => {
        const player = { manifestUrl: 'http://paellaplayer.upv.es'}

        expect(resolveResourcePath(player, 'foo/bar')).toBe('http://paellaplayer.upv.es/foo/bar');
    })

})