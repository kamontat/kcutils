/**
 * @packageDocumentation
 * @module Logger.Constants
 */

import { stdnull, stderr, stdout, stdebug } from "./writable";
import { LoggerLevel, Levels } from "../models/logger/LoggerLevel";

export const silent: LoggerLevel = new LoggerLevel(0, "silent", stdnull);
export const error: LoggerLevel = new LoggerLevel(1, "error", stderr);
export const warn: LoggerLevel = new LoggerLevel(2, "warn", stderr);
export const info: LoggerLevel = new LoggerLevel(3, "info", stdout);
export const debug: LoggerLevel = new LoggerLevel(4, "debug", stdebug);
export const silly: LoggerLevel = new LoggerLevel(5, "silly", stdebug);

const _levels = new Map([
  ["silent", silent],
  ["error", error],
  ["warn", warn],
  ["info", info],
  ["debug", debug],
  ["silly", silly],
]);

export const levels = Array.from(_levels.values());

export const toLevel = (
  level: string,
  def: LoggerLevel = info
): LoggerLevel => {
  if (_levels.has(level)) return _levels.get(level) as LoggerLevel;
  else return def;
};

export type { Levels };
