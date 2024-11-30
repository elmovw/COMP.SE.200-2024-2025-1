import assert from 'node:assert'
import clamp from '../src/clamp.js'


describe('clamp()', function () {

    describe('with negative and positive limit', function () {
        it('clamps negative input number outside of limits', function () {
            const res = clamp(-10, -5, 5);
            assert.equal(res, -5);
        });
    
        it('clamps positive input number outside of limits', function () {
            const res = clamp(10, -5, 5);
            assert.equal(res, 5);
        });
    
        it('clamps negative input between limits to itself', function () {
            const res = clamp(-2, -5, 5);
            assert.equal(res, -2);
        });
    
        it('clamps positive input between limits to itself', function () {
            const res = clamp(2, -5, 5);
            assert.equal(res, 2);
        });

        it('clamps zero between limits to itself', function () {
            const res = clamp(0, -5, 5);
            assert.equal(res, 0);
        });
    
        it('clamps lower limit to itself', function () {
            const res = clamp(-5, -5, 5);
            assert.equal(res, -5);
        });
    
        it('clamps upper limit to itself', function () {
            const res = clamp(5, -5, 5);
            assert.equal(res, 5);
        });
    });

    describe('with two positive limits', function () {
        it('clamps negative input number outside of limits', function () {
            const res = clamp(-10, 1, 5);
            assert.equal(res, 1);
        });
    
        it('clamps positive input number over the upper limit', function () {
            const res = clamp(10, 1, 5);
            assert.equal(res, 5);
        });

        it('clamps positive input number under the lower limit', function () {
            const res = clamp(1, 2, 5);
            assert.equal(res, 2);
        });

        it('clamps zero', function () {
            const res = clamp(0, 1, 5);
            assert.equal(res, 1);
        });
    
        it('clamps number input between limits to itself', function () {
            const res = clamp(2, 1, 5);
            assert.equal(res, 2);
        });
    
        it('clamps lower limit to itself', function () {
            const res = clamp(-5, 1, 5);
            assert.equal(res, -5);
        });
    
        it('clamps upper limit to itself', function () {
            const res = clamp(5, 1, 5);
            assert.equal(res, 5);
        });
    });

    describe('with two negative limits', function () {
        it('clamps positive', function () {
            const res = clamp(10, -10, -5);
            assert.equal(res, -5);
        });
    
        it('clamps negative input number over the upper limit', function () {
            const res = clamp(-3, -10, -5);
            assert.equal(res, -5);
        });

        it('clamps negative input number under the upper limit', function () {
            const res = clamp(-11, -10, -5);
            assert.equal(res, -10);
        });

        it('clamps zero', function () {
            const res = clamp(0, -10, -5)
            assert.equal(res, -5);
        });
    
        it('clamps number between limits to itself', function () {
            const res = clamp(-6, -10, -5)
            assert.equal(res, -6);
        });
    
        it('clamps lower limit to itself', function () {
            const res = clamp(-10, -10, -5)
            assert.equal(res, -10);
        });
    
        it('clamps upper limit to itself', function () {
            const res = clamp(-5, -10, -5)
            assert.equal(res, -5);
        });
    });

    describe('with zero and positive limits', function () {
        it('clamps negative', function () {
            const res = clamp(-10, 0, 5);
            assert.equal(res, 0);
        });
    
        it('clamps number over the upper limit', function () {
            const res = clamp(6, 0, 5);
            assert.equal(res, 5);
        });
    
        it('clamps number between limits to itself', function () {
            const res = clamp(3, 0, 5);
            assert.equal(res, 3);
        });
    
        it('clamps lower limit to itself', function () {
            const res = clamp(0, 0, 5);
            assert.equal(res, 0);
        });
    
        it('clamps upper limit to itself', function () {
            const res = clamp(5, 0, 5);
            assert.equal(res, 5);
        });
    });

    describe('with negative and zero limits', function () {
        it('clamps positive', function () {
            const res = clamp(10, -5, 0);
            assert.equal(res, 0);
        });
    
        it('clamps number under the lower limit', function () {
            const res = clamp(-6, -5, 0);
            assert.equal(res,-5);
        });
    
        it('clamps number between limits to itself', function () {
            const res = clamp(-3, -5, 0);
            assert.equal(res, -3);
        });
    
        it('clamps lower limit to itself', function () {
            const res = clamp(-5, -5, 0);
            assert.equal(res, -5);
        });
    
        it('clamps upper limit to itself', function () {
            const res = clamp(0, -5, 0);
            assert.equal(res, 0);
        });
    });


});
