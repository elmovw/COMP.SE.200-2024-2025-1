import assert from 'node:assert'
import chunk from '../src/chunk.js'


describe('chunk()', function () {

    it('chunks array of numbers', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 2);
        assert.deepEqual(res, [[1, 2], [3, 4], [5, 6], [7]]);
    });

    it('returns the input array as-is, if chunk size equals array length', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 7);
        assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7]);
    });

    it('returns the input array as-is, if chunk size is greater than array length', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 10);
        assert.deepEqual(res, [1, 2, 3, 4, 5, 6, 7]);
    });

    it('chunks array of letters', function () {
        const res = chunk(['a', 'b', 'c', 'd'], 2);
        assert.deepEqual(res, [['a', 'b'], ['c', 'd']]);
    })

    it('works without second parameter', function () {
        const res = chunk(['a', 'b', 'c', 'd']);
        assert.deepEqual(res, [['a'], ['b'], ['c'], ['d']]);
    })

    it('chunks a string like an array', function () {
        const res = chunk("cat");
        assert.deepEqual(res, [['c'], ['a'], ['t']]);
    });

    it('works with arrays containing different types of elements', function () {
        const arr = [
            {1: 1, 2:2, 3:3, b:5},
            null,
            undefined,
            NaN,
            {},
            1,
            0.2,
            "cat",
            "c"
        ];
        const res = chunk(arr, 1);
        assert.deepEqual(res, [
            [{1: 1, 2:2, 3:3, b:5}],
            [null],
            [undefined],
            [NaN],
            [{}],
            [1],
            [0.2],
            ["cat"],
            ["c"]
        ]);
    })

    it('returns empty array if first parameter is not array or string', function () {
        const params = [
            {1: 1, 2:2, 3:3, b:5},
            null,
            undefined,
            NaN,
            {},
            1,
            0.2
        ];
        for (let i=0; i<params.length; i++) {
            assert.deepEqual(chunk(params[i], 1), []);
        }
    });

    it('returns an empty array if second parameter is integer smaller than one', function () {
        const params = [
           0,
           -1,
        ];
        for (let i=0; i<params.length; i++) {
            assert.deepEqual(chunk(params[i], 1), []);
        }
    });

    it('chunks an empty array', function () {
        assert.deepEqual(chunk([,,,,,], 2), [[,,], [,,], [,]]);
    });

    it('chunks partially empty array', function () {
        assert.deepEqual(chunk([1,,4,,,], 2), [[1,], [4,,], [,]]);
    });

    // NEGATIVE TESTS

    it('throws error if second parameter is given but is not an integer', function () {
        const params = [
            0.5,
            1.2,
            7.9,
            -4.9,
            'a',
            'test',
            null,
            undefined,
            NaN,
            [],
            {},
            [1, 2],
            { 1: 'a'}
        ];
        for (let i=0; i<params.length; i++) {
            assert.throws(() => chunk([1, 2, 3], params[i]), Error);
        }
    });
});
