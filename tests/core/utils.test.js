import {isAbsoluteUrl} from 'paella-core/js/core/utils';

test('isAbsoluteUrl', () => {
    const a = isAbsoluteUrl("http://www.upv.es");
    expect(a).toBe(true);
});