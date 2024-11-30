import assert from 'node:assert'
import add from '../src/add.js'


describe('add()', function () {
  // a, b, result
  const cases = [
    [1, 1, 2],
    [1, -1, 0],
    [8900, 101, 9001]
  ]

  it('basic numerical addition', function () {
    for (const [a, b, result] of cases)
      assert.equal(add(a, b), result);
  });
});
