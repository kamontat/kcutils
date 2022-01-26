import {
  isExist,
  isTruthy,
  isFalsy,
  notEmpty,
  notExist,
  isEmpty,
} from "../src/generic";

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
      expect(isExist(a)).toEqual(b);
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
      expect(isTruthy(a)).toEqual(b);
    });
  });

  describe("generic.notEmpty(any)", () => {
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
    ])("called notEmpty(%s) should returns %s", (a: any, b: boolean) => {
      expect(notEmpty(a)).toEqual(b);
    });
  });

  describe("generic.notExist(any)", () => {
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
    ])("called notExist(%s) should returns %s", (a: any, b: boolean) => {
      expect(notExist(a)).toEqual(b);
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
      expect(isFalsy(a)).toEqual(b);
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
      expect(isEmpty(a)).toEqual(b);
    });
  });
});
