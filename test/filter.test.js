import { expect } from 'chai'
import filter from '../src/filter.js'


describe('filter()', function () {
    it('basic usage works', () => {
        const users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false },
            { 'user': 'donald', 'active': true }
        ]

        const result = filter(users, ({ active }) => active)
        expect(result).to.deep.equal([
            { 'user': 'barney', 'active': true },
            { 'user': 'donald', 'active': true }
        ])
    })

    it('empty array results in an empty array', () => {
        const input = []
        expect(filter(input, () => true)).to.deep.equal([])
    })

    it('undefined input results in an empty array', () => {
        const input = undefined
        expect(filter(input, () => true)).to.deep.equal([])
    })

    it('null input results in an empty array', () => {
        const input = null
        expect(filter(input, () => true)).to.deep.equal([])
    })

    it('zero matches result in an empty array', () => {
        const input = [1, 2, 3, 4]
        expect(filter(input, () => false)).to.deep.equal([])
    })

    it('the input array is not modified', () => {
        const users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false },
            { 'user': 'donald', 'active': true }
        ]
        const usersCopy = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false },
            { 'user': 'donald', 'active': true }
        ]

        const result = filter(users, ({ active}) => active )
        expect(users).to.deep.equal(usersCopy)
    })

    it('predicate function receives all three arguments', () => {
        const input = [1, 2, 2, 4, 3, 5, 11, -1, -2, -1, 0]
        const predicate = (value, index, array) => {
            expect(array).to.deep.equal(input)
            expect(array[index]).to.equal(value)
            if (index < 1) {
                return true
            }
            return array[index-1] < value
        }
        const expectedOutput = [1, 2, 4, 5, 11, -1, 0]

        const result = filter(input, predicate)
        expect(result).to.deep.equal(expectedOutput)
    })
});
