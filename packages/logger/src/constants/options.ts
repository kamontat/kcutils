/**
 * @packageDocumentation
 * @module Logger.Constants
 */

import { arrowRight } from "figures";
import { Writable } from "stream";
import { env } from "@kcutils/helper";

import { StrictOption } from "../models/logger/LoggerOption";
import { toLevel } from "./levels";

export const prefix = "KCUTILS_";

/**
 * @deprecated
 */
export const options: StrictOption = {
  debug: env.read(`${prefix}DEBUG`, "false") === "true",
  output: ["file", "console"],
  json: env.read(`${prefix}JSON`, "false") === "true",
  interactive: env.read(`${prefix}INTERACTIVE`, "false") === "true",
  disabled: env.read(`${prefix}DISABLED`, "false") === "true",
  color: env.read(`${prefix}COLORS`, "true") === "true",
  level: toLevel(env.read(`${prefix}LEVEL`, "info")).name,
  datetime: "date",
  censor: () => "secure",
  separator: arrowRight,
  scopes: [] as string[],
  secrets: [] as string[],
  overrideStream: false,
  streams: [] as Writable[],
};
