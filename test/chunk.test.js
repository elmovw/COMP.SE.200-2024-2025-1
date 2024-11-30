import assert from 'node:assert'
import chunk from '../src/chunk.js'


describe('chunk()', function () {

    it('chunks array of numbers', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 2);
        assert.deepEqual(res, [[1, 2], [3, 4], [5, 6], [7]]);
    });

    it('chunks array of letters', function () {
        const res = chunk(['a', 'b', 'c', 'd'], 2);
        assert.deepEqual(res, [['a', 'b'], ['c', 'd']]);
    })
});
