import type { LoggerFormats } from "../models/LoggerFormat";

const newLoggerFormats = <T extends string>(
  formats: LoggerFormats<T>
): LoggerFormats<T | ""> => {
  const empty: LoggerFormats<""> = { "": {} };
  return Object.assign(empty, formats);
};

export default newLoggerFormats;
