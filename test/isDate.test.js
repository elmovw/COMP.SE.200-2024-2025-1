import isDate from '../src/isDate.js';
import { expect } from "chai";


describe('isDate()', function () {
    it('returns true for real Date objects', function () {
        const cases = [
            new Date(),
            new Date(0),
            new Date('2024-11-30'),
            new Date(''), // Invalid Date, but still a Date object
        ]

        for (const d of cases) {
            const result = isDate(d);
            expect(result).to.eql(true);
        }
    })

    it('returns false for trivial non-Date objects', function () {
        const d = new Date();

        const cases = [
            '',
            'Date',
            '2024-11-30',
            'Mon April 23 2012',
            'a',
            undefined,
            NaN,
            null,
            9001,
            -1,
            [],
            {},
            d.toString(),
            d.constructor,
            Date
        ];

        for (const c of cases) {
            const result = isDate(c);
            expect(result).to.eql(false);
        }
    });

    it('returns false for specially constructed object', function () {
        const nastyObject = {
            msg: 'pwned',
            get [Symbol.toStringTag]() {
                return 'Date'
            }
        };
        const result = isDate(nastyObject);
        expect(result).to.eql(false);
    })
});
