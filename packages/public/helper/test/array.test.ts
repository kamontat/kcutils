import { toArray, equals, flatmap } from "../src/array";

describe("Array", () => {
  describe("toArray", () => {
    test("change string to string array", () => {
      expect(toArray("string")).toHaveLength(1);
    });

    test("change object to object array", () => {
      const obj = { a: 12, b: "hello" };
      const arr = toArray(obj);

      expect(arr).toHaveLength(1);
      expect(arr[0]).toEqual(obj);
    });
  });

  describe("flatmap", () => {
    test("flat array to single level", () => {
      const str = "asdf";
      const a1: (string | string[])[] = [str, [str], str, [str, str, str]];
      const a2: (string | string[])[] = [[str, str], str, str, [str, str]];
      const array = flatmap(a1, a2);
      expect(array).toHaveLength(12);
    });
  });

  describe("equals", () => {
    test.each([
      [undefined, undefined, true],
      [null, null, true],
      [null, undefined, false],
      ["asdf", 123, false],
      [192, false, false],
      [["a"], 123, false],
      [true, ["b"], false],
      [["a"], [], false],
      [["a"], ["b", "c"], false],
      [["a"], ["b"], false],
      [[], [], true],
      [["asdf"], ["asdf"], true],
      [["a", "b"], ["a", "b"], true],
      [["a", "b"], ["a", "b"], true],
    ])("equals(%p, %p) returns %s", (a: any, b: any, output) => {
      expect(equals(a, b)).toEqual(output);
    });
  });
});
