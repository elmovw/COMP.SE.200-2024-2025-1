import add from '../src/add.js';
import { expect } from 'chai';

describe('add()', function () {

  it('adds integers', function () {
    // a, b, result
    const cases = [
      [1, 1, 2],
      [1, -1, 0],
      [-4, -1, -5],
      [0, 0, 0],
      [0, 5, 5],
      [5, 0, 5],
      [-5, 0, -5],
      [0, -5, -5],
      [8900, 101, 9001]
    ];

    for (const [a, b, result] of cases) {
      expect(add(a, b)).to.eql(result);
    }
  });

  it('adds floating point numbers', function () {
    // a, b, result
    const cases = [
      [1.1, 1.2, 2.3],
      [1.4, -1.9, -0.5],
      [-4.1, -1.03, -5.13],
      [0.0, 0.0, 0.0],
      [0.0, 5.003, 5.003],
      [5.002, 0.000, 5.002],
      [-5.0004, 0.00, -5.0004],
      [0.0, -5.323, -5.323],
      [8900.123, 101.00001, 9001.12301]
    ];

    for (const [a, b, result] of cases) {
      expect(add(a, b)).to.eql(result);
    }
  });

  // NEGATIVE CASES

  it('should throw an error either one of the parameters is not a number', function () {
    function name() {
      return 1;
    }
    const params = [
        name,
        {},
        {"kissa": 2},
        undefined,
        NaN,
        null,
        () => "kissa",
        "kissa",
        "",
        "1",

    ];
    for (let i = 0; i<params.length; i++) {
        expect(() => add(params[i], 2)).to.throw(Error);
        expect(() => add(1, params[i])).to.throw(Error);
    }
});

});
