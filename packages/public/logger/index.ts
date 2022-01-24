/**
 * @packageDocumentation
 * @module Logger.Externals
 */

// v2

export { LoggerLevelBuilder } from "./src/builder/LoggerLevelBuilder";
export { LoggerTypeBuilder } from "./src/builder/LoggerTypeBuilder";
export { LoggerSettingBuilder } from "./src/builder/LoggerSettingBuilder";
export { LoggerOptionBuilder } from "./src/builder/LoggerOptionBuilder";
export { LoggerBuilder } from "./src/builder/LoggerBuilder";

export { WithLogger } from "./src/services/WithLogger";

// v1

export {
  /**
   * @deprecated Please use LoggerBuilder instead
   */
  Logger,
} from "./src/models/logger/Logger";

// type

export type { UpdateOptionFn } from "./src/builder/LoggerBuilder";

export type { Level } from "./src/models/logger/LoggerLevel";
export type { StrictSettingObject } from "./src/models/logger/LoggerSetting";
export type { DefaultKeyTypes } from "./src/constants/types";

export type { InputMessage } from "./src/models/input/InputMessage";
export type { InputOption } from "./src/models/input/InputOptions";

export type { OutputMessage } from "./src/models/output/OutputMessage";
