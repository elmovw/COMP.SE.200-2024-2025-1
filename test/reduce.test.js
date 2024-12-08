import _ from 'lodash';
import { expect } from 'chai';
import reduce from '../src/reduce.js';

describe('reduce()', function () {
    it('works with an array and a simple summing function', function () {
        expect(reduce([1, 2], (sum, n) => sum + n, 0)).to.eql(3);
    });

    it('works with an object as the first parameter', function () {
        expect(reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
            (result[value] || (result[value] = [])).push(key)
            return result
        }, {})).to.deep.eql({ '1': ['a', 'c'], '2': ['b'] });
    });

    it('works with a string as the first parameter', function () {
        expect(reduce("kissa", (acc, cur) => {
            return acc + "i" + cur;
        })).to.eql("kiiisisia");
    });

    it('works with any type of value as the third parameter', function () {
        const thirdParamOpt = [
            1,
            1.1,
            "kissa",
            () => "kissa",
            undefined,
            NaN,
            null,
            [],
            {},
            [1, 2],
            { a: "kissa" }
        ];
        for (let i = 0; i < thirdParamOpt.length; i++) {
            expect(reduce([1, 2, 3], (acc) => {
                return acc;
            }, thirdParamOpt[i])).to.deep.eql(thirdParamOpt[i]);
        }
    });

    it('works with lodash assign', function () {
        expect(reduce([{ a: 0 }, { a: 1, c: 3 }, { d: 4 }], _.assign)).to.deep.eql({ a: 1, c: 3, d: 4 });
    });

    it('works with lodash defaults', function () {
        expect(reduce([{ a: 0 }, { a: 1, c: 3 }, { d: 4 }], _.defaults)).to.deep.eql({ a: 0, c: 3, d: 4 });
    });

    it('works with lodash defaults', function () {
        expect(reduce([{
            'x': { 'y': 20 }
        },
        {
            'x': { 'y': 10, 'z': 30 }
        }
        ], _.defaultsDeep)).to.deep.eql({ 'x': { 'y': 20, 'z': 30 } });
    });

    it('works with lodash merge', function () {
        expect(reduce([{ cpp: "12" }, { cpp: "23" },
        { java: "23" }, { python: "35" }], _.merge)).to.deep.eql({ cpp: '23', java: '23', python: '35' });
    });

    it('does not throw an error with any types for the third parameter', function () {
        const thirdParamOpt = [
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
            "",
            () => "kissa"
        ];
        for (let i = 0; i < thirdParamOpt.length; i++) {
            expect(() => reduce([1, 2, 3], (acc, cur) => acc + cur, thirdParamOpt[i])).to.not.throw();
        }
    });

    it('works with an empty array as first parameter', function () {
        expect(reduce([], (acc, cur) => acc + cur, 0)).to.eql(0);
    });

    it('works with an empty object as first parameter', function () {
        expect(reduce({}, (acc, cur) => acc + cur, "")).to.eql("");
    });

    it('works with an object with keys 0...n (an array like object)', function () {
        expect(reduce({ 2: 3, 0: 1, 1: 2 }, (_acc, cur) => cur)).to.eql(3);
        expect(reduce({ '2': 3, '0': 1, '1': 2 }, (_acc, cur) => cur)).to.eql(3);
    });

    it('works with an object with keys 0...n (an array like object)', function () {
        expect(reduce({ 2: 3, 0: 1, 1: 2 }, (_acc, cur) => cur)).to.eql(3);
    });

    it('passes arrays and objects in parameters as references (not making copies), so they might be modified', function () {
        let obj = { 0: 0 };
        reduce([1, 2, 3], (acc, cur) => { acc[cur] = cur; return acc; }, obj);
        expect(obj).to.deep.eql({ 0: 0, 1: 1, 2: 2, 3: 3 });

        let arr = [1, 2, 3];
        reduce([4, 5, 6], (acc, cur) => { acc.push(cur); return acc; }, arr);
        expect(arr).to.deep.eql([1, 2, 3, 4, 5, 6]);

        let arr2 = [{ a: 1 }, {}];
        reduce(arr2, (acc) => acc['b'] = 2);
        expect(arr2).to.deep.eql([{ a: 1, b: 2 }, {}]);

        let arr3 = [{ a: 1 }];
        reduce(arr3, (_acc, cur) => cur['b'] = 2, {});
        expect(arr3).to.deep.eql([{ a: 1, b: 2 }]);
    });

    const arrTargetLength = 100000;

    it(`works with a big array (${arrTargetLength} elems)`, function () {
        let arr = [];

        for (let i = 0; i < arrTargetLength; i++) {
            arr.push(1);
        }
        expect(reduce(arr, (acc, cur) => acc + cur)).to.eql(arrTargetLength);
    })

    // NEGATIVE TESTS

    it('extra parameters do not have unexpected side-effects', function () {
        expect(reduce([1, 2], (sum, n) => sum + n, 0, 2, 2, 2, 2)).to.eql(3);
    });

    it('throws an error if the first parameter is not array, string or object', function () {
        const firstParamOpt = [
            1,
            1.1,
            () => "kissa",
            undefined,
            NaN,
            null
        ];
        for (let i = 0; i < firstParamOpt.length; i++) {
            expect(() => reduce(firstParamOpt[i], (acc) => {
                return acc;
            }, 0)).to.throw(Error);
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
            expect(() => reduce([1, 2, 3], secondParamOpt[i], 0)).to.throw(Error);
        }
    });

    it('throws an error if no initial value is given, and the first value of the array is undefined', function () {
        expect(() => reduce([undefined, 1, 2], (sum, n) => sum + n)).to.throw(Error);
    });

    it('thows an error mid-execution if function can not be applied to an item in the array', function () {
        let error = null;
        let arr = [{ a: 1 }, 1];
        try {
            reduce(arr, (_acc, cur) => cur['b'] = Object.keys(cur), "");
        } catch (e) {
            error = e;
        }
        expect(error).to.not.be.null;
        expect(arr).to.deep.eql([{ a: 1, b: ['a'] }, 1]);
    });

    it('throws an error if called with less than two parameters', function () {
        expect(() => reduce()).to.throw(Error);
        expect(() => reduce([1, 2])).to.throw(Error);
    });

});
