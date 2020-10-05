/**
 * @packageDocumentation
 * @module Logger.Constants
 */

import { stream } from "@kcutils/helper";

import { LoggerLevel, Levels } from "../models/logger/LoggerLevel";

export const silent: LoggerLevel = new LoggerLevel(0, "silent", stream.null);
export const error: LoggerLevel = new LoggerLevel(1, "error", process.stderr);
export const warn: LoggerLevel = new LoggerLevel(2, "warn", process.stderr);
export const info: LoggerLevel = new LoggerLevel(3, "info", process.stdout);
export const debug: LoggerLevel = new LoggerLevel(4, "debug", process.stdout);
export const silly: LoggerLevel = new LoggerLevel(5, "silly", process.stdout);

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
