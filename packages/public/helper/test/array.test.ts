import { toArray, flatmap } from "../src/array";

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
});
