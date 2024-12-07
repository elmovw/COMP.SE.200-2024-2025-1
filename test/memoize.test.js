import { expect } from 'chai'
import memoize from '../src/memoize.js'
import { countCalls } from './util.js'

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

    it('invalid arguments throw errors', () => {
        const func = (a, b) => a + b

        const inputs = [
            [],
            [null, func],
            [func, NaN]
        ]

        for (const args of inputs) {
            expect(() => memoize(...args), `memoize(${args}) should have thrown`).to.throw()
        }
    })

    it('custom Cache constructor is supported', () => {
        expect(memoize.Cache).to.equal(Map)

        const myCaches = []
        function MyCache() {
            this._map = new Map()
            this.get = countCalls(this._map.get.bind(this._map))
            this.set = countCalls((key, value) => {
                this._map.set(key, value)
                return this
            })
            this.has = countCalls(this._map.has.bind(this._map))
            myCaches.push(this)
        }

        // Object.setPrototypeOf(MyCache.prototype, Map.prototype)

        /**
         * @param { string} a a string
         */
        const myFunc = (a) => a.toUpperCase() + '!!!'
        memoize.Cache = MyCache

        const inputs = [
            'kissa',
            'kissa2',
            'kissa',
        ]

        const myMemos = []

        for (let i = 0; i < 10; i++) {
            const memoized = memoize(myFunc)
            expect(memoized.cache).instanceOf(MyCache)
            expect(memoized.cache.get.calls).to.equal(0)
            expect(myCaches.at(-1) === memoized.cache)
            for (let j = 0; j < 100; j++) {
                inputs.map(memoized)
            }

            expect(memoized.cache).instanceOf(MyCache)
            expect(memoized.cache.get.calls).to.equal(298)
            expect(memoized.cache.has.calls).to.equal(100*inputs.length)
            expect(memoized.cache.set.calls).to.equal(2)
            myMemos.push(memoized)
        }
        memoize.Cache = Map
    })
});
