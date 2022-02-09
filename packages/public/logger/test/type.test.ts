import { types } from "../src/constants/types";
import { LoggerType } from "../src/models/logger/LoggerType";
import { LoggerTypeBuilder } from "../index";

describe("Logger type", () => {
  const defaultTypes = Object.assign({}, types);

  describe("predefined", () => {
    test("has default type defined in default types", () => {
      expect(defaultTypes).toHaveProperty("fatal");
      expect(defaultTypes).toHaveProperty("debug");
      expect(defaultTypes).toHaveProperty("info");
      expect(defaultTypes).toHaveProperty("warn");
      expect(defaultTypes).toHaveProperty("error");
      expect(defaultTypes).toHaveProperty("silly");
    });

    test.each([
      [defaultTypes.silly, "silly", "silly", "()"],
      [defaultTypes.debug, "debug", "debug", "()"],
      [defaultTypes.info, "info", "info", "#"],
      [defaultTypes.warn, "warn", "warn", "!!"],
      [defaultTypes.error, "error", "error", "x"],

      [defaultTypes.fatal, "error", "fatal", "X"],
      [defaultTypes.success, "info", "success", "/"],
      [defaultTypes.wait, "info", "waiting", "..."],
      [defaultTypes.watch, "info", "watching", "..."],
      [defaultTypes.complete, "info", "complete", "[X]"],
      [defaultTypes.start, "info", "start", "|>"],
      [defaultTypes.stop, "info", "stop", "[O]"],
    ])(
      "checking as '%p' = { level: %s, label: %s, badge: %s }",
      (type: LoggerType, level: string, label: string, badge: string) => {
        expect(type.level).toEqual(level);
        expect(type.label).toEqual(label);
        expect(type.badge()).toEqual(badge);
      }
    );
  });

  describe("new", () => {
    test("create empty type", () => {
      const t = LoggerTypeBuilder.initial().get();

      expect(t.badge()).toEqual("");
      expect(t.label).toEqual("");
      expect(t.level).toEqual("info");
    });

    test("create new logger type", () => {
      const t = LoggerTypeBuilder.initial()
        .withLevel("silly")
        .withLabel("mock")
        .get();

      expect(t.badge()).toEqual("");
      expect(t.label).toEqual("mock");
      expect(t.level).toEqual("silly");
    });

    test("create new types", () => {
      const t = LoggerTypeBuilder.initial()
        .withLevel("debug")
        .withLabel("hello")
        .getType("hello");

      expect(t).toHaveProperty("hello");

      expect(t.hello.level).toEqual("debug");
      expect(t.hello.label).toEqual("hello");
    });
  });
});
