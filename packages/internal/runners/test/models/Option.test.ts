import { Option } from "../..";

describe("Option", () => {
  describe("static function", () => {
    test("none() should works same as GeneralContext.exist()", () => {
      expect(Option.none("test", "default")).toBe("test");
      expect(Option.none(false as any, "default")).toBe(false);
      expect(Option.none(0 as any, "default")).toBe(0);

      expect(Option.none("", "default")).toBe("default");
      expect(Option.none(null as any, "default")).toBe("default");
      expect(Option.none(undefined as any, "default")).toBe("default");
    });

    test("parse string to boolean toBoolean()", () => {
      expect(Option.toBoolean(true, false)).toBe(true);
      expect(Option.toBoolean(false, true)).toBe(false);
      expect(Option.toBoolean("true", false)).toBe(true);
      expect(Option.toBoolean("false", true)).toBe(false);
      expect(Option.toBoolean("", true)).toBe(true);
      expect(Option.toBoolean("999", false)).toBe(false);
    });

    test("parse string to boolean toInt()", () => {
      expect(Option.toInt("1.0", 99)).toBe(1);
      expect(Option.toInt("5", 99)).toBe(5);
      expect(Option.toInt("100", 99)).toBe(100);
      expect(Option.toInt("-5", 99)).toBe(-5);
      expect(Option.toInt("-1-", 99)).toBe(-1);
      expect(Option.toInt("5.99", 99)).toBe(5);

      expect(Option.toInt("a", 99)).toBe(99);
      expect(Option.toInt("-", 99)).toBe(99);
      expect(Option.toInt("", 99)).toBe(99);
    });
  });
});
