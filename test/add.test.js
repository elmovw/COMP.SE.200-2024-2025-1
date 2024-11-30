import assert from 'node:assert'
import add from '../src/add.js'


describe('add()', function () {

  it('basic numerical addition', function () {
    // a, b, result
    const cases = [
      [1, 1, 2],
      [1, -1, 0],
      [8900, 101, 9001]
    ]

    for (const [a, b, result] of cases) {
      assert.equal(add(a, b), result);
    }
  });

  it ('addition with strings', function () {
    // a, b, result
    const cases = [
      [1, "1", "11"],
      ["10", -1, "10-1"],
      ["8900", "101", "8900101"]
    ]
    for (const [a, b, result] of cases) {
      assert.equal(add(a, b), result);
    }
  })
});
