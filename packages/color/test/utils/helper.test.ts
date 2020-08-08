import { rounding, bound01, boundAlpha, pad2, duplicateChar, flip } from "../../src/utils/helper";

describe.only("Helper", () => {
  test.each([
    ["2.13579", undefined, "2.14"],
    ["3.1901", undefined, "3.19"],

    ["0.13579", "-10.0", "0"],
    ["0.13579", "-5.4", "0"],
    ["0.13579", "-3", "0"],
    ["0.13579", "-1", "0"],
    ["0.13579", "0", "0"],
    ["0.13579", "1", "0.1"],
    ["0.13579", "2", "0.14"],
    ["0.13579", "3", "0.136"],
    ["0.13579", "4", "0.1358"],
    ["0.13579", "5", "0.13579"],
    ["0.13579", "6", "0.13579"],

    ["4912.20391", "-4", "4912"],
    ["4912.20391", "-2.55", "4912"],
    ["4912.20391", "0", "4912"],
    ["4912.20391", "1", "4912.2"],
    ["4912.20391", "2.4", "4912.20"],
    ["4912.20391", "2.5", "4912.204"],
    ["4912.20391", "2.6", "4912.204"],

    ["1999.99955", "-10", "2000"],
    ["1999.99955", "-1", "2000"],
    ["1999.99955", "0", "2000"],
    ["1999.99955", "1", "2000"],
    ["1999.99955", "3", "2000"],
    ["1999.99955", "4", "1999.9996"],
    ["1999.99955", "7", "1999.99955"],
  ])("result of rounding %s to %s digit is %s", (_num, _digit, _result) => {
    const num = parseFloat(_num);
    const result = parseFloat(_result);

    if (_digit) {
      const digit = parseFloat(_digit);
      expect(rounding(num, digit)).toEqual(result);
    } else {
      expect(rounding(num)).toEqual(result);
    }
  });

  test.each([
    [5, { max: 10 }, 0.5],
    [5, { min: 5, max: 10 }, 0],
    [8, { min: 0, max: 43, digit: 3 }, 0.186],
    [-5, { min: -10, max: 10 }, 0.25],
    [0, { min: -99, max: -10 }, 1],
    [19, { min: 20, max: -10 }, 0.97],
    [0, {}, 0],
    [1, {}, 1],
    [1, undefined, 1],
    [0, undefined, 0],
  ])("bounding '%s' with settings '%p' to [%s]", (input, opts, result) => {
    expect(bound01(input, opts)).toEqual(result);
  });

  test.each([
    [-100, 1],
    [-3.6, 1],
    [-3, 1],
    [-2.4, 1],
    [-2, 1],
    [-1.3, 1],
    [-1, 1],
    [-0.2, 1],
    [-0, 0],
    [0, 0],
    [0.3, 0.3],
    [0.5, 0.5],
    [0.7, 0.7],
    [0.74, 0.74],
    [0.7409, 0.74],
    [0.77, 0.77],
    [0.777, 0.78],
    [0.949, 0.95],
    [0.989, 0.99],
    [0.999, 1],
    [1, 1],
    [1.2, 1],
    [1.5, 1],
    [2, 1],
    [3, 1],
    [100, 1],
    [Infinity, 1],
    [NaN, 1],
  ])("bounding alpha value '%s' to [%s]", (input, result) => {
    expect(boundAlpha(input)).toEqual(result);
  });

  test.each([
    ["", "00"],
    ["A", "0A"],
    ["AA", "AA"],
    ["AABB", "AABB"],
  ])("transform '%s' to '%s' by pad2()", (i, o) => {
    expect(pad2(i)).toEqual(o);
  });

  test.each([
    ["ABA", false],
    ["AA", true],
    ["AaAa", true],
    ["aaaAA", true],
    ["..", true],
    ["ABAAAAAA", false],
    ["0OOO0", false],
    ["a", false],
    ["", false],
  ])("checking is %s is duplicate character: %s", (i, o) => {
    expect(duplicateChar(i)).toEqual(o);
  });

  test.each([
    [{ a: "b" }, { b: "a" }],
    [
      { b: "bb", c: "cc", d: "dd" },
      { bb: "b", cc: "c", dd: "d" },
    ],
    [{ a: "z", b: "z" }, { z: "b" }],
    [{ a: undefined, b: "a" }, { a: "b" }],
  ])("filp object %s to %s", (a, b) => {
    expect(flip<string, string>(a as any)).toEqual(b);
  });
});
