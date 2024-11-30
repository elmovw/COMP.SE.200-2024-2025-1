import assert from 'node:assert'
import clamp from '../src/clamp.js'


describe('clamp()', function () {
    it('clamps negative input number outside of limits between negative limit and positive limit', function () {
        const res = clamp(-10, -5, 5)
        assert.deepEqual(res, -5);
    });

    it('clamps positive input number outside of limits between negative limit and positive limit', function () {
        clamp(10, -5, 5);
        assert.deepEqual(res, 5);
    });

    it('clamps negative input between negative limit and positive limit to itself', function () {
        const res = clamp(-2, -5, 5)
        assert.deepEqual(res, -2);
    });

    it('clamps positive input between negative limit and positive limit to itself', function () {
        const res = clamp(2, -5, 5)
        assert.deepEqual(res, 2);
    });

    it('clamps lower limit of negative limit and positive limit to itself', function () {
        const res = clamp(-5, -5, 5)
        assert.deepEqual(res, -5);
    });

    it('clamps upper limit of negative limit and positive limit to itself', function () {
        const res = clamp(5, -5, 5)
        assert.deepEqual(res, 5);
    });
});
