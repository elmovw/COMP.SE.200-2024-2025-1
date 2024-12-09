import { expect } from 'chai'
import every from '../src/every.js'


describe('every()', function () {
    it('returns true with an empty array', () => {
        expect(every([], () => false)).to.be.true
        expect(every(null, () => false)).to.be.true
        expect(every(undefined, () => false)).to.be.true
    })

    it('works with a string', () => {
        expect(every("kissa", () => true)).to.be.true
    })

    it('returns true when all elements match predicate', () => {
        const inputs = ['', 'abc', 0, -1, null, undefined, NaN, {}, () => 1]
        expect(every(inputs, () => true)).to.be.true
    })

    it('returns true when the second parameter function returns a truthy value for all elements', () => {
        const truthys = [
            1,
            {},
            [],
            "0",
            "false",
            12n,
            3.14,
            Infinity,
            -Infinity
        ];
        for (const truthy in truthys) {
            expect(every([1, 2, 3], () => truthy)).to.be.true
        }
    });

    it('returns false when the second parameter function returns a falsy value for one of the elements', () => {
        const falsys = [
            null,
            undefined,
            false,
            NaN,
            0,
            -0,
            ""
        ];

        for (const falsy of falsys) {
            function test(_value, index) {
                if (index == 0) {
                    return falsy;
                } else {
                    return true;
                }
            }
            expect(every([1, 2, 3], test)).to.be.false
        }
    });

    it('returns false when first or last element of element in the middle of array valuates to false', () => {
        for (let i = 0; i < 3; i++) {
            function test(_value, index) {
                if (index == i) {
                    return false;
                } else {
                    return true;
                }
            }
            expect(every([1, 2, 3], test)).to.be.false
        }
    });

    it('passes index and array as second and third parameter to the function', () => {
        function test(value, index, array) {
            if (!(value && (index || index == 0) && array)) {
                throw Error();
            }
        }
        expect(() => every([1, 2, 3], test)).not.to.throw();
    });

    it('returns false when any one element fails predicate', () => {
        let failItem = -1
        const inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const predicate = (x) => x != failItem
        expect(every(inputs, predicate)).to.be.true

        for (let i = 0; i < 10; i++) {
            failItem = i
            expect(every(inputs, predicate)).to.be.false
        }
    })

    // NEGATIVE TESTS

    it('throws an error if the first parameter is not array or string', function () {
        const firstParamOpt = [
            null,
            undefined,
            1,
            1.1,
            () => "kissa",
            NaN,
            {},
        ];
        for (let i = 0; i < firstParamOpt.length; i++) {
            expect(() => every(firstParamOpt[i], () => true)).to.throw(Error);
        }
    });

    it('throws an error if the second parameter is not a function', function () {
        const secondParamOpt = [
            1,
            1.1,
            undefined,
            NaN,
            null,
            [1, 2],
            [],
            {},
            { "a": 1 },
            "kissa",
            ""
        ];
        for (let i = 0; i < secondParamOpt.length; i++) {
            expect(() => every([1, 2, 3], secondParamOpt[i])).to.throw(Error);
        }
    });

});
