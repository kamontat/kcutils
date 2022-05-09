import type { OptionTransformer } from "../../src/commandline/Option";
import { OptionBuilder, Option, Context } from "../../index";

describe("Option", () => {
  describe("OptionBuilder", () => {
    test.each([
      // case: normal flow when user pass some flag
      [
        {
          defaultValue: false,
          fn: Option.toBoolean,
        } as OptionTransformer<boolean>,
        ["--flag"],
        true,
      ],
      // case: normal flow when use default value
      [
        {
          defaultValue: 99,
          fn: Option.toInt,
        } as OptionTransformer<number>,
        ["--flag"],
        99,
      ],
    ])(
      "Option(%p), arguments '%p' will return flag=%p",
      (config, args, output) => {
        const option = OptionBuilder.initial<unknown>({
          flag: config,
        }).build();

        const result = option.transform(args, Context.build());
        expect(result).toHaveProperty("flag", output);
      }
    );
    test("empty will create default option builder", () => {
      const option = OptionBuilder.empty().build();
      expect(option.name).toEqual("option");

      const rawOptions = [
        "arguments",
        "next-arguments",
        "--d",
        "--help",
        "--",
        "extra-argument",
      ];
      const output = option.transform(rawOptions, Context.build());

      expect(output).toHaveProperty("help", true);
      expect(output).toHaveProperty("dryrun", true);
      expect(output).toHaveProperty("debug", false);
      expect(output).toHaveProperty("args", ["arguments", "next-arguments"]);
      expect(output).toHaveProperty("extraArgs", ["extra-argument"]);
      expect(output).toHaveProperty("raw", rawOptions);
    });
  });

  describe("static function", () => {
    test("none() should works same as GeneralContext.exist()", () => {
      expect(Option.none("test", "default")).toBe("test");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(Option.none(false as any, "default")).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(Option.none(0 as any, "default")).toBe(0);

      expect(Option.none("", "default")).toBe("default");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(Option.none(null as any, "default")).toBe("default");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
