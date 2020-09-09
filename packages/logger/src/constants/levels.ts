import { stream } from "@kcutils/helper";

import { LoggerLevel, Levels } from "../models/logger/LoggerLevel";

import { LoggerLevelBuilder } from "../builder/LoggerLevelBuilder";

export const silent: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(0)
  .withName("silent")
  .withStream(stream.null)
  .get();
export const error: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(1)
  .withName("error")
  .withStream(process.stderr)
  .get();
export const warn: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(2)
  .withName("warn")
  .withStream(process.stderr)
  .get();
export const info: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(3)
  .withName("info")
  .withStream(process.stdout)
  .get();
export const debug: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(4)
  .withName("debug")
  .withStream(process.stdout)
  .get();
export const silly: LoggerLevel = LoggerLevelBuilder.new()
  .withLevel(5)
  .withName("silly")
  .withStream(process.stdout)
  .get();

const _levels = new Map([
  ["silent", silent],
  ["error", error],
  ["warn", warn],
  ["info", info],
  ["debug", debug],
  ["silly", silly],
]);

export const levels = Array.from(_levels.values());

export const toLevel = (level: string, def: LoggerLevel = info): LoggerLevel => {
  if (_levels.has(level)) return _levels.get(level) as LoggerLevel;
  else return def;
};

export type { Levels };
