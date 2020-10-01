/**
 * @packageDocumentation
 * @module Logger.Externals
 */

// v2

export { LoggerLevelBuilder } from "./builder/LoggerLevelBuilder";
export { LoggerTypeBuilder } from "./builder/LoggerTypeBuilder";
export { LoggerSettingBuilder } from "./builder/LoggerSettingBuilder";
export { LoggerOptionBuilder } from "./builder/LoggerOptionBuilder";
export { LoggerBuilder } from "./builder/LoggerBuilder";

export { WithLogger } from "./services/WithLogger";

// v1

export {
  /**
   * @deprecated please use LoggerBuilder instead
   */
  Logger,
} from "./models/logger/Logger";

// type

export type { UpdateOptionFn } from "./builder/LoggerBuilder";

export type { Level } from "./models/logger/LoggerLevel";
export type { StrictSettingObject } from "./models/logger/LoggerSetting";
export type { DefaultKeyTypes } from "./constants/types";

export type { InputMessage } from "./models/input/InputMessage";
export type { InputOption } from "./models/input/InputOptions";

export type { OutputMessage } from "./models/output/OutputMessage";
