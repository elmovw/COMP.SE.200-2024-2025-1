import { expect } from 'chai'
import memoize from '../src/memoize.js'

// Elmo hoitamassa

/**
 * @param {Function} func the function
 * @returns {Function & { calls: number } }
 */
function countCalls(func) {
    function wrapped(...args) {
        wrapped.calls += 1
        return func(...args)
    }
    wrapped.calls = 0
    return wrapped
}


describe('memoize()', function () {
    it('function calls work with various arguments', () => {
        const myFunc = (a) => a + 'a'
        const wrapped = countCalls(myFunc)

        // [input, output]
        const cases = [
            [1, '1a'],
            [undefined, 'undefineda'],
            [NaN, 'NaNa'],
            [null, 'nulla'],
            [-1, '-1a']
        ]
        let outputs = cases.map(([i, _o]) => wrapped(i))
        const expected = cases.map(([_i, o]) => o)

        expect(outputs).to.deep.equal(expected)
        expect(wrapped.calls).to.equal(cases.length)
    })

    it('default behavior caches results from the first argument', () =>{
        const myFunc = (host, port) => `${host}:${port}`
        const counter = countCalls(myFunc)
        const cacheKeyFunc = (host, port) => host
        const memoized = memoize(counter, cacheKeyFunc)

        expect(memoized.cache).to.be.a('Map')

        // [[args...], output]
        const cases = [
            [['a', 80], 'a:80'],
            [['b', 22], 'b:22'],
            [['a', 443], 'a:80'], // memoized, alters result
            [['b', 23], 'b:22'],
            [['a', 80], 'a:80'],
            [['a', 80], 'a:80'],
            [['b', 23], 'b:22'],
        ]
        let outputs = cases.map(([args, _o]) => memoized(...args))
        const expected = cases.map(([_args, o]) => o)

        console.log(memoized.cache)
        expect(outputs).to.deep.equal(expected)
        expect(counter.calls).to.equal(2)
    })

    it('cache resolver function is used properly', () => {
        const myFunc = (a, b) => a + b + '.'
        const cacheResolver = (a, b) => a + b
        const counter = countCalls(myFunc)
        const memoized = memoize(counter, cacheResolver)

        const inputs = [
            ['goodbye cruel', ' world'],
            ['goodbye ', 'cruel world'],
            ['goodbye cruel world', '']
        ]

        const results = inputs.map((x) => memoized(...x))
        expect(counter.calls).to.equal(1)
        expect(results).to.deep.equal([
            'goodbye cruel world.',
            'goodbye cruel world.',
            'goodbye cruel world.',
        ])
    })

    // it('1 + 1 = 2', function () {
    //     assert.equal(add(1, 1), 2);
    // });
});
