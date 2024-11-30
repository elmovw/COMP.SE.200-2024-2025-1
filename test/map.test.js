import map from '../src/map.js';
import { expect } from "chai";

describe('map()', function () {

    it("maps integer array to their squares", function () {
        const arr = [4, 8];
        function square(n) {
          return n * n;
        }
        expect(map(arr, square)).to.deep.eql([16, 64]);
    });
    
    // NEGATIVE CASES

    it("throws an error if function cannot be applied to elements", function () {
        const arr = [4, 8];
        function length(n) {
          return n.length;
        }
        expect(() => map(arr, length)).to.throw(Error);
    });
});
