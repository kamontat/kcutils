import { isNumber, toNumber } from "../src/number";

describe("Number Helper", () => {
  describe("isNumber", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, false],
      [0, true],
      [124, true],
      [-124.88, true],
      [-124, true],
      [-0, true],
      ["", false],
      ["exist", false],
      [{}, false],
      [{ a: "test" }, false],

      [NaN, false],
      [Infinity, false],
    ])("called isNumber(%s) should returns %s", (a: any, b: boolean) => {
      expect(isNumber(a)).toEqual(b);
    });

    test.each([
      [undefined, false, false],
      [null, false, false],
      [false, false, false],
      [0, false, true],
      [124, false, true],
      [124.23, false, true],
      [-124, false, true],
      [-0, false, true],
      ["exist", false, false],
      [{}, false, false],
      [{ a: "test" }, false, false],

      [NaN, true, true],
      [Infinity, true, true],

      [NaN, false, false],
      [Infinity, false, false],
    ])(
      "called isNumber(%s, %s) should returns %s",
      (a: any, o: boolean, b: boolean) => {
        expect(isNumber(a, o)).toEqual(b);
      }
    );
  });

  describe("toNumber(any)", () => {
    test.each([
      [undefined, undefined],
      [null, undefined],
      ["string", undefined],
      ["12", 12],
      ["8.99", 8.99],
      [15.5545, 15.5545],
      [0.9998999, 0.9998999],
      [0.1234561, 0.1234561],
      [true, 1],
      [false, 0],
      [["array"], undefined],
      [["multiple", "element"], undefined],
      [{ data: true }, undefined],
      [new Map(), undefined],
      [new Error("helo world"), undefined],
    ])("of '%s' should returns %s", (input, expected) => {
      expect(toNumber(input)).toEqual(expected);
    });

    test.each([
      ["144", parseInt, 144],
      ["321.111", parseInt, 321],
      ["321.789", parseInt, 321],
      ["321.111", parseFloat, 321.111],
      [998.22, parseFloat, 998.22],
      [998.22, parseInt, 998.22],
      [NaN, parseInt, undefined],
      [Infinity, parseFloat, undefined],
    ])("of ('%s', '%p') should returns %s", (input, converter, expected) => {
      expect(toNumber(input, converter)).toEqual(expected);
    });
  });
});
