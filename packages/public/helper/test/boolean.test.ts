import { isBoolean, toBoolean } from "../src/boolean";

describe("Boolean Helper", () => {
  describe("isBoolean(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, true],
      [true, true],
      [0, false],
      [124, false],
      ["", false],
      ["exist", false],
      [{}, false],
      [{ a: "test" }, false],
    ])("called isBoolean(%s) should returns %s", (a: any, b: boolean) => {
      expect(isBoolean(a)).toEqual(b);
    });
  });

  describe("toBoolean(any)", () => {
    test.each([
      [undefined, undefined],
      [null, undefined],
      ["string", undefined],
      ["12", undefined],
      ["8.99", undefined],
      ["false", false],
      ["true", true],
      ["0", false],
      ["1", true],
      [15.5545, undefined],
      [0.9998999, undefined],
      [0.1234561, undefined],
      [1, true],
      [0, false],
      [true, true],
      [false, false],
      [["array"], undefined],
      [["multiple", "element"], undefined],
      [{ data: true }, undefined],
      [new Map(), undefined],
      [new Error("helo world"), undefined],
    ])("of '%s' should returns %s", (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
});
