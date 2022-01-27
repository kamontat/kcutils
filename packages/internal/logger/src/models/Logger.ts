import type { LoggerLevels } from "./LoggerLevel";
import type { LoggerFormats } from "./LoggerFormat";

class Logger<L extends string, F extends string> {
  constructor(
    private readonly _levels: LoggerLevels<L>,
    private readonly _formats: LoggerFormats<F>
  ) {}
}

export default Logger;
