import { string } from "../src";
import { MaskOption } from "../src/types/string";

describe("String Helper", () => {
  describe("Padding start", () => {
    test("input not exceed length", () => {
      const str = string.padStart("hello", 7);
      expect(str).toEqual("  hello");
    });

    test("input exceed length", () => {
      const str = string.padStart("hello", 3);
      expect(str).toEqual("llo");
    });

    test("default fill value", () => {
      const str = string.padStart("name", 7);
      expect(str).toEqual("   name");
    });

    test("custom fill value", () => {
      const str1 = string.padStart("3", 3, "0");
      const str2 = string.padStart("14", 3, "0");
      const str3 = string.padStart("65", 3, "0");
      const str4 = string.padStart("912", 3, "0");

      expect(str1).toEqual("003");
      expect(str2).toEqual("014");
      expect(str3).toEqual("065");
      expect(str4).toEqual("912");
    });
  });

  describe("Padding end", () => {
    test("input not exceed length", () => {
      const str = string.padEnd("hello", 7);
      expect(str).toEqual("hello  ");
    });

    test("input exceed length", () => {
      const str = string.padEnd("hello", 3);
      expect(str).toEqual("hel");
    });

    test("default fill value", () => {
      const str = string.padEnd("name", 7);
      expect(str).toEqual("name   ");
    });

    test("custom fill value", () => {
      const str1 = string.padEnd("3", 3, "0");
      const str2 = string.padEnd("14", 3, "0");
      const str3 = string.padEnd("65", 3, "0");
      const str4 = string.padEnd("912", 3, "0");

      expect(str1).toEqual("300");
      expect(str2).toEqual("140");
      expect(str3).toEqual("650");
      expect(str4).toEqual("912");
    });
  });

  describe("isNotEmpty", () => {
    test.each([
      [undefined, false],
      [null, false],
      ["", false],
      ["not-empty", true],
    ])("when input is '%s' should return %s", (a, expected) => {
      expect(string.isNotEmpty(a)).toBe(expected);
    });
  });

  describe("Mask string", () => {
    test.each([
      ["very very long string", {} as Partial<MaskOption>, "ver***************ing"],
      ["s", {} as Partial<MaskOption>, "*"],
      ["hello", { front: 100, back: 0 } as Partial<MaskOption>, "hello"],
      ["hello", { front: 0, back: 100 } as Partial<MaskOption>, "hello"],
      [undefined, {} as Partial<MaskOption>, ""],
    ])("Mask '%s' with options %p returns '%s'", (input, option, output) => {
      expect(string.mask(input, option)).toEqual(output);
    });
  });
});
