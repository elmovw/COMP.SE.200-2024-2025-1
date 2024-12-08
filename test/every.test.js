import { expect } from 'chai'
import every from '../src/every.js'


describe('every()', function () {
    it('returns true with an empty array', () => {
        expect(every([], () => false)).to.be.true
        expect(every(null, () => false)).to.be.true
        expect(every(undefined, () => false)).to.be.true
    })

    it('returns true when all elements match predicate', () => {
        const inputs = ['', 'abc', 0, -1, null, undefined, NaN, {}, () => 1]
        expect(every(inputs, () => true)).to.be.true
    })

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
});
