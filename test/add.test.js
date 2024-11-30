import assert from 'node:assert'

import add from '../src/add.js'


describe('add()', function () {
    it('1 + 1 = 2', function () {
        assert.equal(add(1, 1), 2);
    });
});
