import add from '../src/add.js';
import { expect } from 'chai';

describe('add()', function () {

  it('adds numbers', function () {
    // a, b, result
    const cases = [
      [1, 1, 2],
      [1, -1, 0],
      [8900, 101, 9001]
    ]

    for (const [a, b, result] of cases) {
      expect(add(a, b)).to.eql(result);
    }
  });

  it('adds string representing decimal numbers', function () {
    // a, b, result
    const cases = [
      [1, "1", "11"],
      ["10", -1, "10-1"],
      ["8900", "101", "8900101"]
    ]
    for (const [a, b, result] of cases) {
      expect(add(a, b)).to.eql(result);
    }
  })
});
