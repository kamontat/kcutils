import * as Badge from "figures";

import { types } from "../src/constants/types";
import { LoggerType } from "../src/models/logger/LoggerType";
import { LoggerTypeBuilder } from "../index";

const supportMockColor = [
  "blue",
  "yellow",
  "gray",
  "green",
  "cyan",
  "red",
  "reset",
];
const mockColor: any = supportMockColor.reduce((p, c) => {
  return Object.assign({}, p, {
    [c]: c,
  });
}, {});

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
      [defaultTypes.silly, "silly", "silly", Badge.circleCircle, "gray"],
      [defaultTypes.debug, "debug", "debug", Badge.circleCircle, "gray"],
      [defaultTypes.info, "info", "info", Badge.info, "blue"],
      [defaultTypes.warn, "warn", "warn", Badge.warning, "yellow"],
      [defaultTypes.error, "error", "error", Badge.cross, "red"],

      [defaultTypes.fatal, "error", "fatal", Badge.cross, "red"],
      [defaultTypes.success, "info", "success", Badge.tick, "green"],
      [defaultTypes.wait, "info", "waiting", Badge.ellipsis, "blue"],
      [defaultTypes.watch, "info", "watching", Badge.ellipsis, "yellow"],
      [defaultTypes.complete, "info", "complete", Badge.checkboxOn, "cyan"],
      [defaultTypes.start, "info", "start", Badge.play, "green"],
      [defaultTypes.stop, "info", "stop", Badge.squareSmallFilled, "yellow"],
    ])(
      "checking as '%p' = { level: %s, label: %s, badge: %s, color: %s }",
      (
        type: LoggerType,
        level: string,
        label: string,
        badge: string,
        color: string
      ) => {
        expect(type.level).toEqual(level);
        expect(type.label).toEqual(label);
        expect(type.badge(Badge)).toEqual(badge);
        expect(type.color(mockColor)).toEqual(color);
      }
    );
  });

  describe("new", () => {
    test("create empty type", () => {
      const t = LoggerTypeBuilder.initial().get();

      expect(t.color(mockColor)).toEqual("reset");
      expect(t.badge(Badge)).toEqual("");
      expect(t.label).toEqual("");
      expect(t.level).toEqual("info");
    });

    test("create new logger type", () => {
      const t = LoggerTypeBuilder.initial()
        .withLevel("silly")
        .withLabel("mock")
        .get();

      expect(t.color(mockColor)).toEqual("reset");
      expect(t.badge(Badge)).toEqual("");
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
