import { padStart, padEnd } from "..";

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
});
