import { stream } from "@kcutils/helper";

import { LoggerLevelBuilder, LoggerLevel } from "../models/logger/LoggerLevel";

export const silent: LoggerLevel = new LoggerLevelBuilder(0, "silent", stream.null);
export const error: LoggerLevel = new LoggerLevelBuilder(1, "error", process.stderr);
export const warn: LoggerLevel = new LoggerLevelBuilder(2, "warn", process.stderr);
export const info: LoggerLevel = new LoggerLevelBuilder(3, "info", process.stdout);
export const debug: LoggerLevel = new LoggerLevelBuilder(4, "debug", process.stdout);
export const silly: LoggerLevel = new LoggerLevelBuilder(5, "silly", process.stdout);

const _levels = new Map([
  ["silent", silent],
  ["error", error],
  ["warn", warn],
  ["info", info],
  ["debug", debug],
  ["silly", silly],
]);

export const levels = Array.from(_levels.values());
export type Levels = "silent" | "error" | "warn" | "info" | "debug" | "silly";

export const toLevel = (level: string): LoggerLevel => {
  if (_levels.has(level)) return _levels.get(level) as LoggerLevel;
  else return info;
};
