import chunk from '../src/chunk.js';
import { expect } from "chai";


describe('chunk()', function () {

    it('chunks array of numbers', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 2);
        expect(res).to.deep.eql([[1, 2], [3, 4], [5, 6], [7]]);
    });

    it('returns the input array as-is, if chunk size equals array length', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 7);
        expect(res).to.deep.eql([1, 2, 3, 4, 5, 6, 7]);
    });

    it('returns the input array as-is, if chunk size is greater than array length', function () {
        const res = chunk([1, 2, 3, 4, 5, 6, 7], 10);
        expect(res).to.deep.eql([1, 2, 3, 4, 5, 6, 7]);
    });

    it('chunks array of letters', function () {
        const res = chunk(['a', 'b', 'c', 'd'], 2);
        expect(res).to.deep.eql([['a', 'b'], ['c', 'd']]);
    })

    it('works without second parameter – default is 1', function () {
        const res = chunk(['a', 'b', 'c', 'd']);
        expect(res).to.deep.eql([['a'], ['b'], ['c'], ['d']]);
    })

    it('chunks a string like an array', function () {
        const res = chunk("cat");
        expect(res).to.deep.eql([['c'], ['a'], ['t']]);
    });

    it('works with arrays containing different types of elements', function () {
        const arr = [
            { 1: 1, 2: 2, 3: 3, b: 5 },
            null,
            undefined,
            NaN,
            {},
            1,
            0.2,
            "cat",
            "c",
        ];
        const res = chunk(arr, 1);
        expect(res).to.deep.eql([
            [{ 1: 1, 2: 2, 3: 3, b: 5 }],
            [null],
            [undefined],
            [NaN],
            [{}],
            [1],
            [0.2],
            ["cat"],
            ["c"],
        ]);
    })

    it('returns empty array if first parameter is not array or string', function () {
        const params = [
            { 1: 1, 2: 2, 3: 3, b: 5 },
            null,
            undefined,
            NaN,
            {},
            1,
            0.2
        ];
        for (let i = 0; i < params.length; i++) {
            expect(chunk(params[i], 1)).to.deep.eql([]);
        }
    });

    it('returns an empty array if second parameter is integer smaller than one', function () {
        const params = [
            0,
            -1,
        ];
        for (let i = 0; i < params.length; i++) {
            expect(chunk(params[i], 1)).to.deep.eql([]);
        }
    });

    it('chunks an empty array', function () {
        expect(chunk([, , , , ,], 2)).to.deep.eql([[, ,], [, ,], [,]]);
    });

    it('chunks partially empty array', function () {
        expect(chunk([1, , 4, , ,], 2)).to.deep.eql([[1,], [4, ,], [,]]);
    });

    // NEGATIVE TESTS

    it('extra parameters do not have unexpected side-effects', function () {
        const res = chunk([1], 1, 2, 2, 2, 2, 2);
        expect(res).to.deep.eql([[1]]);
    });

    it('throws error if second parameter is given but is not an integer', function () {
        function name(t) {
            return t;
        }
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
            { 1: 'a' },
            () => "kissa",
            name
        ];
        for (let i = 0; i < params.length; i++) {
            expect(() => chunk([1, 2, 3], params[i])).to.throw(Error);
        }
    });

    it('throws an error if called without arguments', function () {
        expect(() => chunk()).to.throw(Error);
    });
});
