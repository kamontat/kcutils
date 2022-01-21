import { json as jsonHelper } from "../index";

describe("Json Object Helper", () => {
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
      const result: { a: string; b: boolean; c: number; d: number } =
        jsonHelper.deepMerge(objA, objB);

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
      const result: { a: string[]; b: string; c: string[] } =
        jsonHelper.deepMerge(objA, objB);

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
      const result = jsonHelper.deepMerge<any, any>(objA, objB);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
      expect(result).toHaveProperty("circular");

      expect(result.circular.circular.a).toEqual("hello");
    });

    test("not merge when new object is undefined", () => {
      const objA = { a: "test", b: "bbb", c: true };
      const objB = { a: undefined as any, b: null as any, d: 999 };
      const result = jsonHelper.deepMerge(objA, objB);

      expect(Object.keys(result).length).toEqual(4);

      expect(result).toHaveProperty("a");
      expect(result).toHaveProperty("b");
      expect(result).toHaveProperty("c");
      expect(result).toHaveProperty("d");

      expect(result.a).toEqual(objA.a);
      expect(result.b).toEqual(objA.b);
      expect(result.c).toEqual(objA.c);
      expect(result.d).toEqual(objB.d);
    });

    test.each([
      ["string", { s: "test" }, ["s"]],
      [{ a: "test" }, 123, ["a"]],
      [false, "string", []],
      [{ a: "a" }, null, ["a"]],
      [undefined, { b: "b" }, ["b"]],
      [null, undefined, []],
    ])("merge '%p' with '%p'", (a: any, b: any, output) => {
      const result = jsonHelper.deepMerge(a, b);
      if (output.length <= 0) expect(result).toEqual({});
      else output.forEach((e) => expect(result).toHaveProperty(e));
    });
  });

  describe("equals", () => {
    test.each([
      [{}, {}, undefined, true],
      [{}, {}, undefined, true],
      [[], [], undefined, true],
      [["a"], ["a"], undefined, true],
      [["a", "b", "c"], ["a", "b", "c"], undefined, true],
      [[true, false], [false, true], undefined, true],
      [
        { nested: { a: "a", b: "b" }, a: { a: { a: { b: "b" } } } },
        { nested: { a: "a", b: "b" }, a: { a: { a: { b: "b" } } } },
        undefined,
        true,
      ],

      [{ a: "ant" }, {}, undefined, false],
      [{}, { b: "boy" }, undefined, false],
      [{ str: "test" }, { num: 123 }, undefined, false],
      [
        { nested: { a: "a", b: "b" }, a: { a: { a: { b: "b" } } } },
        { nested: { a: "a", b: "b" }, a: { a: { a: { b: "c" } } } },
        undefined,
        true,
      ],

      [undefined, undefined, undefined, true],
      [null, null, undefined, true],
      [8121, 8121, undefined, true],
      ["string", "string", undefined, true],

      [undefined, null, undefined, false],
      [123, "123", undefined, false],
      [true, false, undefined, false],
      [[], {}, undefined, false],
      [["aa"], {}, undefined, false],
      [{ a: "abc" }, ["abc"], undefined, false],
      [{ a: "abc" }, ["abc"], ["a"], false],
    ])(
      "json.equals(%p, %p, %p) returns %s",
      (a: any, b: any, keys: string[] | undefined, result: boolean) => {
        expect(jsonHelper.equals(a, b, keys)).toEqual(result);
      }
    );
  });

  describe("getObject", () => {
    test.each([
      [undefined, undefined, false, undefined],
      [undefined, false, false, undefined],
      [undefined, false, true, {}],
      [undefined, "key", false, undefined],
      [undefined, "key", true, {}],
      [null, "key", false, undefined],
      [12, "key", false, undefined],
      ["string", "key", false, undefined],
      [false, "key", false, undefined],
      [{}, "key", false, undefined],
      [{}, "key", true, {}],
      [{ a: true, b: 123, c: "bigC" }, "", false, undefined],
      [
        { a: true, b: 123, c: "bigC" },
        "",
        true,
        { a: true, b: 123, c: "bigC" },
      ],
      [{ a: true, b: 123, c: "bigC" }, "a", false, true],
      [{ a: true, b: 123, c: "bigC" }, "b", false, 123],
      [{ a: true, b: 123, c: "bigC" }, "c", false, "bigC"],
      [{ a: { b: { c: "abc" } } }, "a.b.c", false, "abc"],
    ])(
      "getObject(%p, %s) returns %s",
      (obj: any, key: any, all: boolean, result: any) => {
        expect(jsonHelper.getObject(obj, key, all)).toEqual(result);
      }
    );
  });

  describe("forceObject", () => {
    test.each([
      ["string", {}, {}],
      ["string", { a: true }, { a: true }],
      [undefined, {}, {}],
      [null, {}, {}],
      [true, {}, {}],
      [9182, {}, {}],
      [new Map(), {}, {}],
      [{ a: "start" }, {}, { a: "start" }],
      [{}, {}, {}],
      [{}, { a: "test" }, {}],
    ])(
      "forceObject(%s, %s) returns %s",
      (input: any, def: any, result: any) => {
        expect(jsonHelper.forceObject(input, def)).toEqual(result);
      }
    );
  });

  describe("cleanObject", () => {
    test.each([
      [{ a: "b" }, { a: "b" }],
      [{ b: "undefined" }, { b: "undefined" }],
      [{ b: undefined, a: "aa" }, { a: "aa" }],
      [{ a: null, b: "bb" }, { b: "bb" }],
      [undefined, {}],
    ])("clean object '%p' to '%p'", (a: any, b: any) => {
      expect(jsonHelper.cleanObject(a)).toEqual(b);
    });
  });

  test.each([
    [undefined, { a: "aa" }, undefined],
    [{}, {}, {}],
    [{ a: "a" }, { b: "b" }, { a: "a", b: "b" }],
    [{ a: "a" }, { a: "aa" }, { a: "aa" }],
    [{ a: "a" }, { a: undefined }, { a: "a" }],
  ])("merge %p and %p to %p", (a, b, c) => {
    expect(jsonHelper.merge<Record<string, string>>(a, b)).toEqual(c);
  });
});
