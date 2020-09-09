import * as level from "../src/constants/levels";

import { LoggerLevelBuilder } from "../src";

import { newMockStream } from "./stream";

describe("Logger level", () => {
  describe("convert string to Level", () => {
    test.each([
      ["error", level.error],
      ["warn", level.warn],
      ["info", level.info],
      ["debug", level.debug],
      ["silly", level.silly],
      ["silent", level.silent],
      ["not_found", level.info],
      ["", level.info],
    ])("convert %s to level %p", (input, expected) => {
      const l = LoggerLevelBuilder.get().withName(input);

      expect(l.name).toEqual(expected.name);
      expect(l.level).toEqual(expected.level);
    });
  });

  test.each([
    [level.error, LoggerLevelBuilder.get().error],
    [level.warn, LoggerLevelBuilder.get().warn],
    [level.info, LoggerLevelBuilder.get().info],
    [level.debug, LoggerLevelBuilder.get().debug],
    [level.silly, LoggerLevelBuilder.get().silly],
    [level.silent, LoggerLevelBuilder.get().silent],
  ])("Checking level in LoggerLevelBuilder must match to constants, (level=%s)", (lv1, lv2) => {
    expect(lv1.name).toEqual(lv2.name);
    expect(lv1.level).toEqual(lv2.level);
  });

  test("custom writable stream", () => {
    const level = -1;
    const name = "custom";

    const mock1 = newMockStream();
    const mock2 = newMockStream();

    const old = LoggerLevelBuilder.new().withLevel(level).withName(name).withStream(mock1.stream).get();

    expect(old.level).toEqual(level);
    expect(old.name).toEqual(name);
    expect(old.stream).toEqual(mock1.stream);

    const newLevel = old.copy(mock2.stream);

    expect(newLevel.level).toEqual(level);
    expect(newLevel.name).toEqual(name);
    expect(newLevel.stream).toEqual(mock2.stream);
  });
});
