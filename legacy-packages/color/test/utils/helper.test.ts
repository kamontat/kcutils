import { rounding, bound01, boundAlpha, pad2, duplicateChar, flip, percentage } from "../../src/utils/helper";

describe("Helper", () => {
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

    ["9.4545", "0", "9"],
    ["9.4545", "1", "9.5"],
    ["9.4545", "2", "9.45"],
    ["9.4545", "3", "9.455"],
    ["9.4545", "4", "9.4545"],
    ["9.4545", "5", "9.4545"],

    ["222.45", "0", "222"],
    ["222.454", "0", "222"],
    ["222.455", "0", "222"],
    ["222.4545", "0", "222"],
    ["222.4555", "0", "222"],
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
    [0.7409, 0.7409],
    [0.77, 0.77],
    [0.111777, 0.111777],
    [0.111949, 0.111949],
    [0.111989, 0.111989],
    [0.999999, 0.999999],
    [0.9999995, 1],
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

  test.each([
    [-5, { max: 10 }, undefined, 0],
    [100, { max: 10 }, undefined, 10],
    [-5, { min: -2, max: 5 }, undefined, -2],
    [5, { min: -8, max: 10 }, undefined, -7.1], // 5% of -8 to 10

    [0.12, { min: 100, max: 12 }, true, 22.56], // 12% of 12 to 100
    [100, { max: 10 }, true, 10],
    [-0.11, { min: -66, max: -12 }, true, -66],

    [0.3241, { min: -94, max: 1023 }, false, -90.38],
    [59, { min: 12, max: 99 }, false, 63.33],
  ])("run percentage(%s, %p, %s) returns %s", (input, option, noparser, result) => {
    if (noparser) expect(percentage(input, option, noparser)).toEqual(result);
    else expect(percentage(input, option)).toEqual(result);
  });
});
