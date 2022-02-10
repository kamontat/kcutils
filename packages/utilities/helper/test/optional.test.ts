import { toUndefined, toOptional } from "../src/optional";

describe("Optional", () => {
  describe("toUndefined(any)", () => {
    test.each([
      [undefined, undefined],
      [null, undefined],
      ["string", "string"],
      ["12", "12"],
      [33, 33],
      [new Map(), new Map()],
      [new Error("helo world"), new Error("helo world")],
    ])("of '%s' should return '%s'", (input, expected) => {
      expect(toUndefined(input)).toEqual(expected);
    });
  });

  describe("Optional object", () => {
    test("create new Optional data", () => {
      const opt = toOptional("data");
      expect(opt).not.toBeUndefined();
    });

    test("create valid data in Optional", () => {
      const opt = toOptional("data");

      expect(opt.isNotEmpty()).toEqual(true);

      expect(opt.get()).toEqual("data");

      expect(opt.getOrElse("new")).toEqual("data");

      expect(opt.orUndefined()).toEqual("data");
    });

    test.each([
      [undefined, false],
      [null, false],
    ])("create invalid data in Optional (%s)", (input, expected) => {
      const opt = toOptional<string>(input);

      expect(opt.isNotEmpty()).toEqual(expected);

      expect(opt.getOrElse("new")).toEqual("new");

      expect(opt.orUndefined()).toBeUndefined();
    });

    test("custom checking method", () => {
      const opt = toOptional("", (d) => d !== "");
      expect(opt.isEmpty()).toEqual(true);
    });

    test("get with throw exception", () => {
      const opt = toOptional("", (d) => d !== "");
      const fn = () => {
        opt.get();
      };
      expect(fn).toThrow();
    });
  });
});
