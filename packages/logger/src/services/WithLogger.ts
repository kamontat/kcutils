import { Logger } from "../models/logger/Logger";
import { OptionalLoggerOption } from "../models/logger/LoggerOption";

export abstract class WithLogger<T extends string = ""> {
  protected logger: Logger<T>;

  constructor(loggerOptions?: OptionalLoggerOption<T>) {
    this.logger = new Logger(loggerOptions);
  }

  /**
   * update current logger object
   *
   * @param fn perform anything you needs to create new logger object, logger in parameters has no side effect
   */
  protected updateLogger(fn: (newObject: Logger<T>) => Logger<T>): void {
    this.logger = fn(this.logger.copy());
  }
}
