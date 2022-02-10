import type { MaskOption } from "../src/string";
import {
  mask,
  padStart,
  padEnd,
  isString,
  toString,
  replace,
  format,
} from "../src/string";

describe("String Helper", () => {
  describe("Padding start", () => {
    test("input not exceed length", () => {
      const str = padStart("hello", 7);
      expect(str).toEqual("  hello");
    });

    test("input exceed length", () => {
      const str = padStart("hello", 3);
      expect(str).toEqual("llo");
    });

    test("default fill value", () => {
      const str = padStart("name", 7);
      expect(str).toEqual("   name");
    });

    test("custom fill value", () => {
      const str1 = padStart("3", 3, "0");
      const str2 = padStart("14", 3, "0");
      const str3 = padStart("65", 3, "0");
      const str4 = padStart("912", 3, "0");

      expect(str1).toEqual("003");
      expect(str2).toEqual("014");
      expect(str3).toEqual("065");
      expect(str4).toEqual("912");
    });
  });

  describe("Padding end", () => {
    test("input not exceed length", () => {
      const str = padEnd("hello", 7);
      expect(str).toEqual("hello  ");
    });

    test("input exceed length", () => {
      const str = padEnd("hello", 3);
      expect(str).toEqual("hel");
    });

    test("default fill value", () => {
      const str = padEnd("name", 7);
      expect(str).toEqual("name   ");
    });

    test("custom fill value", () => {
      const str1 = padEnd("3", 3, "0");
      const str2 = padEnd("14", 3, "0");
      const str3 = padEnd("65", 3, "0");
      const str4 = padEnd("912", 3, "0");

      expect(str1).toEqual("300");
      expect(str2).toEqual("140");
      expect(str3).toEqual("650");
      expect(str4).toEqual("912");
    });
  });

  describe("Mask string", () => {
    test.each([
      [
        "very very long string",
        {} as Partial<MaskOption>,
        "ver***************ing",
      ],
      ["s", {} as Partial<MaskOption>, "*"],
      ["s", { enabled: false } as Partial<MaskOption>, "s"],
      ["hello", { front: 100, back: 0 } as Partial<MaskOption>, "hello"],
      ["hello", { front: 0, back: 100 } as Partial<MaskOption>, "hello"],
      [
        "0123456789",
        { front: 20, back: 30 } as Partial<MaskOption>,
        "01*****789",
      ],
      [
        "0123456789",
        { front: 30, back: 20 } as Partial<MaskOption>,
        "012*****89",
      ],
      [undefined, {} as Partial<MaskOption>, ""],
    ])("Mask '%s' with options %p returns '%s'", (input, option, output) => {
      expect(mask(input, option)).toEqual(output);
    });
  });

  describe("isString(any)", () => {
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
      expect(isString(a)).toEqual(b);
    });
  });

  describe("toString(any)", () => {
    test.each([
      [undefined, undefined],
      [null, undefined],
      ["string", "string"],
      [12, "12"],
      [15.5545, "15.5545"],
      [0.9998999, "0.9998999"],
      [0.1234561, "0.1234561"],
      [true, "true"],
      [false, "false"],
      [["array"], "[array]"],
      [["multiple", "element"], "[multiple,element]"],
      [{ data: true }, `{"data":true}`],
      [new Map(), "[object Map]"],
      [new Map().set("a", "b"), "[object Map]"],
      [new Error("helo world"), "Error: helo world"],
    ])("of '%s' should returns %s", (input, expected) => {
      expect(toString(input)).toEqual(expected);
    });
  });

  describe("Replace", () => {
    test.each([
      ["{a}, {b}", { a: "hello", b: "world" }, "hello, world"],
      ["{c}, {d}", { a: "hello", b: "world" }, "{c}, {d}"],
      ["{a}", {}, "{a}"],
    ])("replace(%s, %p) should return %s", (a, b, c) => {
      expect(replace(a, b)).toEqual(c);
    });
  });

  describe("Format", () => {
    test.each([
      ["%s %o", ["string", { a: "hello" }], `string {"a":"hello"}`],
      ["%d %s", [123, "don't care"], `123 don't care`],
    ])("format(%s, %p) should return %s", (a, b, c) => {
      expect(format(a, ...b)).toEqual(c);
    });
  });
});
