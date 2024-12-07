import { expect } from 'chai';
import get from '../src/get.js'


describe('get()', function () {
    it('gets a value from an existing path expressed as a string from a nested object containing an array', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a[0].b.c')).to.eql(3);
    });

    it('works with a string as the first parameter', function () {
        expect(get("kissa", '0')).to.eql('k');
    });

    it('works with numbers as part of the path given in array form', function () {
        expect(get([1, 2], [1])).to.eql(2);
    });

    it('works with a path deeper than the nesting in the search object', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a[0].b.c.d', 'default')).to.eql('default');
    });

    it('works with a path more shallow than the nesting in the search object', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a[0].b', 'default')).to.eql({ 'c': 3 });
    });

    it('gets a value from an existing path expressed as an array of keys from a nested object containing an array', function () {
        const object = { 'a': { 'b': { 'c': 3 } } };
        expect(get(object, ['a', 'b', 'c'])).to.eql(3);
    });

    it('works with both numbers and string representing numbers when used with a path array', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, ['a', '0', 'b', 'c'])).to.eql(3);
        expect(get(object, ['a', 0, 'b', 'c'])).to.eql(3);
    });

    it('returns a default value given as a third parameter if the given path is not found', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a.b.c', 'default')).to.eql('default');
    });

    it('returns undefined if the given path is not found and a default value is not given', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a.b.c')).to.eql(undefined);
    });

    it('works with an array expressed as an object', function () {
        const object = { 0: 'a', 1: 'b' };
        expect(get(object, '[1]', 'default')).to.eql('b');
    });

    it('works with object keys containing dots and brackets if the array is expressed as a path', function () {
        const object = { '.': [{ '.': { '.': 3 } }] };
        expect(get(object, ['.', 0, '.', '.'], 'default')).to.eql(3)
        const object2 = { '0': 'a', '[0]': 'b' }
        expect(get(object2, ['[0]'], 'default')).to.eql('b');
        expect(get(object2, ['0'], 'default')).to.eql('a');
        const object3 = { 'a': [{ 'b': { 'c': 3 } }], 'a[0]b': 'test' };
        expect(get(object3, ['a[0]b'])).to.eql('test');
    });

    it('interprets a number in brackets in the path string as a literal key or an index based on context', function () {
        const object = { '0': 'a', '[0]': [1, 2] };
        expect(get(object, '[0]', 'default')).to.eql([1, 2]);
        const object2 = [1, 2];
        expect(get(object2, '[0]', 'default')).to.eql(1);
        const object3 = { '0': [1, 2], '[0]': [3, 4] };
        expect(get(object3, '[0][1]', 'default')).to.eql(4);
        const object4 = [{ '0': 'a', '[0]': 'b' }, { '0': 'c', '[0]': 'd' }];
        expect(get(object4, '[0][0]', 'default')).to.eql('b');
        const object5 = [{ '0': 'a', '1': 'b' }, { '0': 'c', '[0]': 'd' }];
        expect(get(object5, '[0][0]', 'default')).to.eql('a');
    });

    it('works without a dot after a bracket when path is given as a string', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] }
        expect(get(object, 'a[0]b.c')).to.eql(3);
    });

    it('works with deeply nested object', function () {
        let object = 'target';
        let path = [];
        const nestingLevel = 1000;
        for (let i = 0; i < nestingLevel; i++) {
            object = { a: object };
            path.push('a');
        }
        expect(get(object, path, 'default')).to.eql('target');
    });


    // NEGATIVE TESTS

    it('throws an error if it\'s called with less than two parameters', function () {
        expect(() => get()).to.throw(Error);
        expect(() => get({})).to.throw(Error);
    });

    it('does not throw an error if the path is a nonsensical string', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] }
        expect(() => get(object, '...', 'default')).to.not.throw();
        expect(() => get(object, '{a}', 'default')).to.not.throw();
        expect(() => get(object, '[[]', 'default')).to.not.throw();
        expect(() => get(object, '-12', 'default')).to.not.throw();
    });

    it('does not throw an error if the path contains negative array indexes', function () {
        const object = { 'a': [{ 'b': { 'c': 3 } }] }
        expect(() => get(object, 'a[-1].b', 'default')).to.not.throw();
        const arr = [1, 2]
        expect(() => get(arr, '[-1]', 'default')).to.not.throw();
        expect(() => get(arr, ['-1'], 'default')).to.not.throw();
    });

    it('throws an error if the first parameter is not an object, array or string', function () {
        const errValues = [
            1,
            1.2,
            () => "Kissa",
            undefined,
            null,
            NaN
        ];
        for (let i = 0; i < errValues.length; i++) {
            expect(() => get(errValues[i], '0', 'default')).to.throw(Error);
        }
    });
});
