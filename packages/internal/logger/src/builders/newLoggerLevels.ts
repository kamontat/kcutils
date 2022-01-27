import type { LoggerLevels } from "../models/LoggerLevel";

const newLoggerLevels = <T extends string>(
  levels: LoggerLevels<T>
): LoggerLevels<T> => levels;

export default newLoggerLevels;
