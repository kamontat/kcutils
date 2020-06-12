import { json as jsonHelper } from "..";

describe("Json Object Helper", () => {
  describe("is Object", () => {
    test.each([
      [undefined, false],
      [null, false],
      ["string", false],
      [12, false],
      [true, false],
      [["array"], false],
      [{ data: true }, true],
      [new Map(), true],
    ])("%p is a object? answer is %s", (input, expected) => {
      expect(jsonHelper.isObject(input)).toEqual(expected);
    });
  });

  describe("toArray", () => {
    test("empty json", () => {
      const json = {};
      const array = jsonHelper.toArray(json);

      expect(array).toHaveLength(0);
    });

    test("partial json not filter empty string", () => {
      const json = { one: { index: 1, data: "string" }, two: undefined };
      const array = jsonHelper.toArray(json);

      expect(array).toHaveLength(2);
      expect(array).toContain("string");
    });

    test("multiple partial json", () => {
      const json = {
        one: { index: 1, data: "string" },
        two: undefined,
        three: undefined,
        four: undefined,
        five: { index: 2, data: "number" },
      };
      const array = jsonHelper.toArray(json);

      expect(array).toHaveLength(5);
      expect(array).toContain("string");
      expect(array).toContain("number");
    });

    test("complete json", () => {
      const json = {
        two: { index: 1, data: "string" },
        one: { index: 3, data: "number" },
        three: { index: 2, data: "boolean" },
      };
      const array = jsonHelper.toArray(json);

      expect(array).toHaveLength(3);
      expect(array[0]).toEqual("string");
      expect(array[1]).toEqual("boolean");
      expect(array[2]).toEqual("number");
    });

    test("complete json with data as string[]", () => {
      const json = {
        two: { index: 1, data: ["string", "number", "boolean"] },
        one: { index: 3, data: ["number3", "string3"] },
        three: { index: 2, data: "boolean2" },
      };
      const array = jsonHelper.toArray(json);

      expect(array).toHaveLength(6);
      expect(array[0]).toEqual("string");
      expect(array[3]).toEqual("boolean2");
      expect(array[4]).toEqual("number3");
    });
  });

  describe("deepMerge", () => {
    test("merge normal object", () => {
      const objA = { a: 12 };
      const objB = { b: "hello" };
      const result = jsonHelper.deepMerge(objA, objB);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
    });

    test("merge conflict normal object", () => {
      const objA = { a: true, b: "hello", c: 20 };
      const objB = { d: 75, b: false, a: "unknown" };
      const result: { a: string; b: boolean; c: number; d: number } = jsonHelper.deepMerge(objA, objB);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
      expect(result).toHaveProperty("c");
      expect(result).toHaveProperty("d");

      expect(result.a).toEqual("unknown");
      expect(result.b).toEqual(false);
      expect(result.c).toEqual(20);
      expect(result.d).toEqual(75);
    });

    test("merge nested normal object", () => {
      const objA = { a: true, b: "hello", c: { a: true, b: "hello" } };
      const objB = { a: false, c: { d: 99, b: "next" } };
      const result = jsonHelper.deepMerge(objA, objB);

      expect(result).toHaveProperty("c");

      expect(result.c).toHaveProperty("a");
      expect(result.c).toHaveProperty("b");
      expect(result.c).toHaveProperty("d");

      expect(result.c.b).toEqual("next");
    });

    test("merge array on normal object", () => {
      const objA = { a: ["hello"], b: ["old", "array"], c: true };
      const objB = { a: ["next", "world"], b: "hello", c: ["array"] };
      const result: { a: string[]; b: string; c: string[] } = jsonHelper.deepMerge(objA, objB);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
      expect(result).toHaveProperty("c");

      expect(result.a).toHaveLength(3);
      expect(result.b).toEqual("hello");
      expect(result.c).toHaveLength(1);
    });

    test("merge circular object", () => {
      class Foo {
        readonly circular: Foo;
        constructor(readonly a: string) {
          this.circular = this;
        }
      }

      const objA = { b: "string" };
      const objB = new Foo("hello");
      const result = jsonHelper.deepMerge(objA, objB);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
      expect(result).toHaveProperty("circular");

      expect(result.circular.circular.a).toEqual("hello");
    });
  });
});
