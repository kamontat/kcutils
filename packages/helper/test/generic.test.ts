import { generic } from "../src";

describe("Generic checker", () => {
  describe("generic.isExist(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, true],
      [true, true],
      [0, true],
      [124, true],
      ["", true],
      ["exist", true],
      [{}, true],
      [{ a: "test" }, true],
      [{ b: 123 }, true],
    ])("called isExist(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.isExist(a)).toEqual(b);
    });
  });

  describe("generic.isTruthy(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, false],
      [true, true],
      [0, false],
      [124, true],
      ["", false],
      ["exist", true],
      [{}, true],
      [{ a: "test" }, true],
      [{ b: 123 }, true],
    ])("called isTruthy(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.isTruthy(a)).toEqual(b);
    });
  });

  describe("generic.nonEmpty(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, true],
      [true, true],
      [0, true],
      [124, true],
      ["", false],
      ["exist", true],
      [{}, false],
      [{ a: "test" }, true],
      [{ b: 123 }, true],
    ])("called nonEmpty(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.nonEmpty(a)).toEqual(b);
    });
  });

  describe("generic.noExist(any)", () => {
    test.each([
      [undefined, true],
      [null, true],
      [false, false],
      [true, false],
      [0, false],
      [124, false],
      ["", false],
      ["exist", false],
      [{}, false],
      [{ a: "test" }, false],
      [{ b: 123 }, false],
    ])("called noExist(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.noExist(a)).toEqual(b);
    });
  });

  describe("generic.isFalsy(any)", () => {
    test.each([
      [undefined, true],
      [null, true],
      [false, true],
      [true, false],
      [0, true],
      [124, false],
      ["", true],
      ["exist", false],
      [{}, false],
      [{ a: "test" }, false],
      [{ b: 123 }, false],
    ])("called isFalsy(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.isFalsy(a)).toEqual(b);
    });
  });

  describe("generic.isEmpty(any)", () => {
    test.each([
      [undefined, true],
      [null, true],
      [false, false],
      [true, false],
      [0, false],
      [124, false],
      ["", true],
      ["exist", false],
      [{}, true],
      [{ a: "test" }, false],
      [{ b: 123 }, false],
    ])("called isEmpty(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.isEmpty(a)).toEqual(b);
    });
  });

  describe("generic.isString(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      [false, false],
      [0, false],
      [124, false],
      ["", true],
      ["exist", true],
      [{}, false],
      [{ a: "test" }, false],
    ])("called isString(%s) should returns %s", (a: any, b: boolean) => {
      expect(generic.isString(a)).toEqual(b);
    });
  });

  describe("generic.isNumber(any)", () => {
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
      expect(generic.isNumber(a)).toEqual(b);
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
    ])("called isNumber(%s, %s) should returns %s", (a: any, o: boolean, b: boolean) => {
      expect(generic.isNumber(a, o)).toEqual(b);
    });
  });

  describe("generic.isBoolean(any)", () => {
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
      expect(generic.isBoolean(a)).toEqual(b);
    });
  });

  describe("generic.isObject(any)", () => {
    test.each([
      [undefined, false],
      [null, false],
      ["string", false],
      [12, false],
      [true, false],
      [["array"], false],
      [{ data: true }, true],
      [new Map(), true],
    ])("called isEmpty(%s) should returns %s", (input, expected) => {
      expect(generic.isObject(input)).toEqual(expected);
    });
  });
});
