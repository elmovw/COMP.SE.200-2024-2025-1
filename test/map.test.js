import map from '../src/map.js';
import { expect } from "chai";

describe.only('map()', function () {

  it("can map integer array to their squares with squaring function", function () {
    const arr = [4, 8];
    function square(n) {
      return n * n;
    }
    expect(map(arr, square)).to.deep.eql([16, 64]);
  });

  it("works with, but does nothing to an empty array", function () {
    const arr = [];
    function square(n) {
      return n * n;
    }
    expect(map(arr, square)).to.deep.eql([]);
  });

  it("does not change the parameter array", function () {
    const arr = [4, 8];
    function square(n) {
      return n * n;
    }
    map(arr, square);
    expect(arr).to.deep.eql([4, 8]);
  });

  it("works with a string (char array)", function () {
    const arr = "kissa";
    function addI(s) {
      return s + 'i';
    }
    expect(map(arr, addI)).to.deep.eql(['ki', 'ii', 'si', 'si', 'ai']);
  });

  it("works with mixed types of elements", function () {
    const arr = ["kissa", [1, 2]];
    function length(s) {
      return s.length;
    }
    expect(map(arr, length)).to.deep.eql([5, 2]);
  });

  it("passes value, index, array to function", function () {
    const arr = [[1, 2, 3], [4, 5, 6]];
    function test(a, b, c) {
      return a + b + c;
    }
    expect(map(arr, test)).to.deep.eql(['1,2,301,2,3,4,5,6', '4,5,611,2,3,4,5,6']);
  });

  // NEGATIVE CASES

  it("extra parameters do not have unexpected side-effects", function () {
    const arr = [4, 8];
    function square(n) {
      return n * n;
    }
    expect(map(arr, square, 2, 2, 2, 2, 2, 2)).to.deep.eql([16, 64]);
  });

  it("throws an error if there are less than two parameters", function () {
    expect(() => map()).to.throw(Error);
    expect(() => map([])).to.throw(Error);
  });

  it("throws an error if the first arguments is not an array", function () {
    const params = [
      2,
      2.3,
      {},
      { "kissa": 2 },
      undefined,
      NaN,
      null,
      () => "kissa"
    ];
    function length(n) {
      return n.length;
    }
    for (let i = 0; i < params.length; i++) {
      expect(() => map(params[i], length)).to.throw(Error);
    }
  });

  it("throws an error if the second arguments is not a function", function () {
    const params = [
      2,
      2.3,
      {},
      { "kissa": 2 },
      undefined,
      NaN,
      null,
      "kissa",
      ""
    ];
    for (let i = 0; i < params.length; i++) {
      expect(() => map([1, 2], params[i])).to.throw(Error);
    }
  });

  it("throws an error if function cannot be applied to elements", function () {
    const arr = [4, 8];
    function length(n) {
      return n.length;
    }
    expect(() => map(arr, length)).to.throw(Error);
  });

  it("throws an error if function requires more parameters than array length", function () {
    const arr = [1, 3];
    function length(a, b, c) {
      return a + b + c;
    }
    expect(() => map(arr, length)).to.throw(Error);
  });
});
