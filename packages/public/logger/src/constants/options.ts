/**
 * @packageDocumentation
 * @module Logger.Constants
 */

import type { Writable } from "../models/custom/Writable";

import { read } from "@kcutils/helper";

import { StrictOption } from "../models/logger/LoggerOption";
import { toLevel } from "./levels";

export const prefix = "KCUTILS_";

/**
 * @deprecated Please use LoggerOptionBuilder instead
 */
export const options: StrictOption = {
  debug: read(`${prefix}DEBUG`, "false") === "true",
  output: ["file", "console"],
  json: read(`${prefix}JSON`, "false") === "true",
  interactive: read(`${prefix}INTERACTIVE`, "false") === "true",
  disabled: read(`${prefix}DISABLED`, "false") === "true",
  color: read(`${prefix}COLORS`, "true") === "true",
  level: toLevel(read(`${prefix}LEVEL`, "info")).name,
  datetime: "date",
  censor: () => "secure",
  separator: "=>",
  scopes: [] as string[],
  secrets: [] as string[],
  overrideStream: false,
  streams: [] as Writable[],
};
