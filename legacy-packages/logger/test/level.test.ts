import { LoggerLevelBuilder } from "../src";

import * as level from "../src/constants/levels";
import { newMockStream } from "./utils/stream";

describe("Logger level", () => {
  describe("Level builder", () => {
    test.each([
      [LoggerLevelBuilder.get().error, level.error],
      [LoggerLevelBuilder.get().withName("error"), level.error],
      [LoggerLevelBuilder.get().warn, level.warn],
      [LoggerLevelBuilder.get().withName("warn"), level.warn],
      [LoggerLevelBuilder.get().info, level.info],
      [LoggerLevelBuilder.get().withName("info"), level.info],
      [LoggerLevelBuilder.get().debug, level.debug],
      [LoggerLevelBuilder.get().withName("debug"), level.debug],
      [LoggerLevelBuilder.get().silly, level.silly],
      [LoggerLevelBuilder.get().withName("silly"), level.silly],
      [LoggerLevelBuilder.get().silent, level.silent],
      [LoggerLevelBuilder.get().withName("silent"), level.silent],
      [LoggerLevelBuilder.get().withName("silent", level.error), level.silent],

      [LoggerLevelBuilder.get().withName(""), level.info],
      [LoggerLevelBuilder.get().withName("not_found"), level.info],
      [LoggerLevelBuilder.get().withName("not_found", undefined), level.info],
      [LoggerLevelBuilder.get().withName("unknown", level.silent), level.silent],
    ])("builder of '%p' is level '%p'", (actual, expected) => {
      expect(actual).toEqual(expected);
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
