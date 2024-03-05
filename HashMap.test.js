const { HashMap, HashSet } = require('./HashMap');

describe('HashMap', () => {
    let hashMap;

    beforeEach(() => {
        hashMap = new HashMap();
    });

    test('set and get a key-value pair', () => {
        hashMap.set('key1', 'value1');
        expect(hashMap.get('key1')).toBe('value1');
    });

    test('update value for existing key', () => {
        hashMap.set('key1', 'value1');
        hashMap.set('key1', 'value2');
        expect(hashMap.get('key1')).toBe('value2');
    });

    test('remove a key', () => {
        hashMap.set('key1', 'value1');
        expect(hashMap.remove('key1')).toBe(true);
        expect(hashMap.get('key1')).toBe(null);
    });

    test('check presence of a key', () => {
        hashMap.set('key1', 'value1');
        expect(hashMap.has('key1')).toBe(true);
        expect(hashMap.has('nonExistingKey')).toBe(false);
    });

    test('clear the hashmap', () => {
        hashMap.set('key1', 'value1');
        hashMap.set('key2', 'value2');
        hashMap.clear();
        expect(hashMap.length()).toBe(0);
    });

    test('retrieve all keys', () => {
        hashMap.set('key1', 'value1');
        hashMap.set('key2', 'value2');
        expect(hashMap.keys()).toEqual(expect.arrayContaining(['key1', 'key2']));
    });

    test('retrieve all values', () => {
        hashMap.set('key1', 'value1');
        hashMap.set('key2', 'value2');
        expect(hashMap.values()).toEqual(expect.arrayContaining(['value1', 'value2']));
    });

    test('retrieve all entries', () => {
        hashMap.set('key1', 'value1');
        hashMap.set('key2', 'value2');
        expect(hashMap.entries()).toEqual(expect.arrayContaining([['key1', 'value1'], ['key2', 'value2']]));
    });

    test('length returns the correct number of stored keys', () => {
        expect(hashMap.length()).toBe(0);
        hashMap.set('key1', 'value1');
        hashMap.set('key2', 'value2');
        expect(hashMap.length()).toBe(2);
    });
});
