import clamp from '../src/clamp.js';
import { expect } from "chai";


describe('clamp()', function () {

    // HAPPY CASES

    describe('with negative and positive limit', function () {
        it('clamps negative input number outside of limits', function () {
            let res = clamp(-10, -5, 5);
            expect(res).to.eql(-5);
            res = clamp(-10.0, -5.0, 5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps positive input number outside of limits', function () {
            let res = clamp(10, -5, 5);
            expect(res).to.eql(5);
            res = clamp(10.0 - 5.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps negative input between limits to itself', function () {
            let res = clamp(-2, -5, 5);
            expect(res).to.eql(-2);
            res = clamp(-2.0, -5.0, 5.0);
            expect(res).to.eql(-2.0);
        });

        it('clamps positive input between limits to itself', function () {
            let res = clamp(2, -5, 5);
            expect(res).to.eql(2);
            res = clamp(2.0, -5.0, 5.0);
            expect(res).to.eql(2.0);
        });

        it('clamps zero between limits to itself', function () {
            let res = clamp(0, -5, 5);
            expect(res).to.eql(0);
            res = clamp(0.0, -5.0, 5.0);
            expect(res).to.eql(0.0);
        });

        it('clamps lower limit to itself', function () {
            let res = clamp(-5, -5, 5);
            expect(res).to.eql(-5);
            res = clamp(-5.0, -5.0, 5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps upper limit to itself', function () {
            let res = clamp(5, -5, 5);
            expect(res).to.eql(5);
            res = clamp(5.0, -5.0, 5.0);
            expect(res).to.eql(5.0);
        });
    });

    describe('with two different positive limits', function () {
        it('clamps negative input number outside of limits', function () {
            let res = clamp(-10, 1, 5);
            expect(res).to.eql(1);
            res = clamp(-10.0, 1.0, 5.0);
            expect(res).to.eql(1.0);
        });

        it('clamps positive input number over the upper limit', function () {
            let res = clamp(10, 1, 5);
            expect(res).to.eql(5);
            res = clamp(10.0, 1.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps positive input number under the lower limit', function () {
            let res = clamp(1.0, 2.0, 5.0);
            expect(res).to.eql(2.0);
        });

        it('clamps zero', function () {
            let res = clamp(0.0, 1.0, 5.0);
            expect(res).to.eql(1.0);
        });

        it('clamps number input between limits to itself', function () {
            let res = clamp(2, 1, 5);
            expect(res).to.eql(2);
            res = clamp(2.0, 1.0, 5.0);
            expect(res).to.eql(2.0);
        });

        it('clamps lower limit to itself', function () {
            let res = clamp(-5, 1, 5);
            expect(res).to.eql(1);
            res = clamp(-5.0, 1.0, 5.0);
            expect(res).to.eql(1.0);
            res = clamp(-5.0, 1.0, 5.0);
            expect(res).to.eql(1.0);
        });

        it('clamps upper limit to itself', function () {
            let res = clamp(5, 1, 5);
            expect(res).to.eql(5);
            res = clamp(5.0, 1.0, 5.0);
            expect(res).to.eql(5.0);
        });
    });

    describe('with two different negative limits', function () {
        it('clamps positive', function () {
            let res = clamp(10, -10, -5);
            expect(res).to.eql(-5);
            res = clamp(10.0, -10.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps negative input number over the upper limit', function () {
            let res = clamp(-3, -10, -5);
            expect(res).to.eql(-5);
            res = clamp(-3.0, -10.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps negative input number under the upper limit', function () {
            let res = clamp(-11, -10, -5);
            expect(res).to.eql(-10);
            res = clamp(-11.0, -10.0, -5.0);
            expect(res).to.eql(-10.0);
        });

        it('clamps zero', function () {
            let res = clamp(0, -10, -5)
            expect(res).to.eql(-5);
            res = clamp(0.0, -10.0, -5.0)
            expect(res).to.eql(-5.0);
        });

        it('clamps number between limits to itself', function () {
            let res = clamp(-6, -10, -5)
            expect(res).to.eql(-6);
            res = clamp(-6.0, -10.0, -5.0)
            expect(res).to.eql(-6.0);
        });

        it('clamps lower limit to itself', function () {
            let res = clamp(-10, -10, -5)
            expect(res).to.eql(-10);
            res = clamp(-10.0, -10.0, -5.0);
            expect(res).to.eql(-10.0);
        });

        it('clamps upper limit to itself', function () {
            let res = clamp(-5, -10, -5)
            expect(res).to.eql(-5);
            res = clamp(-5.0, -10.0, -5.0)
            expect(res).to.eql(-5.0);
        });
    });

    describe('with zero and positive limits', function () {
        it('clamps negative', function () {
            let res = clamp(-10, 0, 5);
            expect(res).to.eql(0);
            res = clamp(-10.0, 0.0, 5.0);
            expect(res).to.eql(0.0);
        });

        it('clamps number over the upper limit', function () {
            let res = clamp(6, 0, 5);
            expect(res).to.eql(5);
            res = clamp(6.0, 0.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps number between limits to itself', function () {
            let res = clamp(3, 0, 5);
            expect(res).to.eql(3);
            res = clamp(3.0, 0.0, 5.0);
            expect(res).to.eql(3.0);
        });

        it('clamps lower limit to itself', function () {
            let res = clamp(0, 0, 5);
            expect(res).to.eql(0);
            res = clamp(0.0, 0.0, 5.0);
            expect(res).to.eql(0.0);
        });

        it('clamps upper limit to itself', function () {
            let res = clamp(5, 0, 5);
            expect(res).to.eql(5);
            res = clamp(5.0, 0.0, 5.0);
            expect(res).to.eql(5.0);
        });

    });

    describe('with negative and zero limits', function () {
        it('clamps positive', function () {
            let res = clamp(10, -5, 0);
            expect(res).to.eql(0);
            res = clamp(10.0, -5.0, 0.0);
            expect(res).to.eql(0.0);
        });

        it('clamps number under the lower limit', function () {
            let res = clamp(-6, -5, 0);
            expect(res).to.eql(-5);
            res = clamp(-6.0, -5.0, 0.0);
            expect(res).to.eql(-5.0);

        });

        it('clamps number between limits to itself', function () {
            let res = clamp(-3, -5, 0);
            expect(res).to.eql(-3);
            res = clamp(-3.0, -5.0, 0.0);
            expect(res).to.eql(-3.0);
        });

        it('clamps lower limit to itself', function () {
            let res = clamp(-5, -5, 0);
            expect(res).to.eql(-5);
            res = clamp(-5.0, -5.0, 0.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps upper limit to itself', function () {
            let res = clamp(0, -5, 0);
            expect(res).to.eql(0);
            res = clamp(0.0, -5.0, 0.0);
            expect(res).to.eql(0.0);
        });
    });


    describe('with two same positive limits', function () {
        it('clamps negative input number outside of limits', function () {
            let res = clamp(-10, 5, 5);
            expect(res).to.eql(5);
            res = clamp(-10.0, 5.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps number over the upper limit', function () {
            let res = clamp(10, 5, 5);
            expect(res).to.eql(5);
            res = clamp(10.0, 5.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps positive number under the lower limit', function () {
            let res = clamp(1, 5, 5);
            expect(res).to.eql(5);
            res = clamp(1.0, 5.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps zero', function () {
            let res = clamp(0, 5, 5);
            expect(res).to.eql(5);
            res = clamp(0.0, 5.0, 5.0);
            expect(res).to.eql(5.0);
        });

        it('clamps limit to itself', function () {
            let res = clamp(5, 5, 5);
            expect(res).to.eql(5);
            res = clamp(5.0, 5.0, 5.0);
            expect(res).to.eql(5.0);
        });
    });

    describe('with two same negative limits', function () {
        it('clamps positive', function () {
            let res = clamp(10, -5, -5);
            expect(res).to.eql(-5);
            res = clamp(10.0, -5.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps negative input number over the limit', function () {
            let res = clamp(-3, -5, -5);
            expect(res).to.eql(-5);
            res = clamp(-3.0, -5.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps negative input number under the limit', function () {
            let res = clamp(-11, -5, -5);
            expect(res).to.eql(-5);
            res = clamp(-11.0, -5.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps zero', function () {
            let res = clamp(0, -5, -5);
            expect(res).to.eql(-5);
            res = clamp(0.0, -5.0, -5.0);
            expect(res).to.eql(-5.0);
        });

        it('clamps limit to itself', function () {
            const res = clamp(-5, -5 - 5);
            expect(res).to.eql(-5);
        });
    });

    describe('with two zero limits', function () {
        it('clamps positive', function () {
            let res = clamp(10, 0, 0);
            expect(res).to.eql(0);
            res = clamp(10.0, 0.0, 0.0);
            expect(res).to.eql(0.0);
        });

        it('clamps negative', function () {
            let res = clamp(-3, 0, 0);
            expect(res).to.eql(0);
            res = clamp(-3.0, 0.0, 0.0);
            expect(res).to.eql(0.0);
        });

        it('clamps zero to itself', function () {
            let res = clamp(0, 0, 0);
            expect(res).to.eql(0);
            res = clamp(0.0, 0.0, 0.0);
            expect(res).to.eql(0.0);
        });
    });

    it('clamps number with good precision', function () {
        let res = clamp(1.0, 1.1, 2.0);
        expect(res).to.eql(1.1);
        res = clamp(1.0, 1.01, 2.0);
        expect(res).to.eql(1.01);
        res = clamp(1.0, 1.000001, 2.0);
        expect(res).to.eql(1.000001);
    });

    it('clamps big number with extreme (but safe) limits', function () {
        let res = clamp(Number.MAX_SAFE_INTEGER - 2, Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER);
        expect(res).to.eql(Number.MAX_SAFE_INTEGER - 1);
        res = clamp(Number.MIN_SAFE_INTEGER + 2, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1);
        expect(res).to.eql(Number.MIN_SAFE_INTEGER + 1);
    });


    // NEGATIVE CASES

    it('extra parameters do not have unexpected side-effects', function () {
        let res = clamp(-5, -5, 5, 2, 2, 2, 2);
        expect(res).to.eql(-5);
    });

    it('throws error if parameters are too extreme', function () {
        expect(() => clamp(Number.MAX_SAFE_INTEGER - 2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER + 1)).to.throw(Error);
        expect(() => clamp(Number.MIN_SAFE_INTEGER + 2, Number.MIN_SAFE_INTEGER - 1, Number.MIN_SAFE_INTEGER)).to.throw(Error);
        expect(() => clamp(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER)).to.throw(Error);
        expect(() => clamp(Number.MIN_SAFE_INTEGER - 1, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1)).to.throw(Error);
    });

    it('throws error if limits are negative but wrong way around', function () {
        const params = [
            [-3, -5, -10],
            [-3, 0, -10],
            [-3, 9, 0],
            [-3, 4, 1],
        ];
        for (let i = 0; i < params.length; i++) {
            expect(() => clamp(...params[i])).to.throw(Error);
        }
    });

    it('throws an error if called with less parameters than three', function () {
        expect(() => clamp()).to.throw(Error);
        expect(() => clamp(1)).to.throw(Error);
        expect(() => clamp(1, 2)).to.throw(Error);
    });

    // wrong type of parameters

    it('throws error if some of the parameters is not number', function () {
        const params = [
            {},
            { "kissa": 2 },
            undefined,
            NaN,
            null,
            () => "kissa",
            "kissa",
            "",
            "1"
        ];
        for (let i = 0; i < params.length; i++) {
            expect(() => clamp(params[i], 2, 3)).to.throw(Error);
            expect(() => clamp(1, params[i], 3)).to.throw(Error);
            expect(() => clamp(1, 2, params[i])).to.throw(Error);
        }
    });

    it('throws error if one or all of the parameters are strings representing numbers', function () {
        expect(() => clamp('0', '1', '2')).to.throw(Error);
    });

});
