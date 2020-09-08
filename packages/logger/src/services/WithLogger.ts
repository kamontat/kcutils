import { Logger } from "../models/logger/Logger";
import { LoggerBuilder } from "../builder/LoggerBuilder";

export abstract class WithLogger<T extends string = ""> {
  protected logger: Logger<T>;

  constructor(builder: LoggerBuilder<T> = LoggerBuilder.initial()) {
    this.logger = builder.get();
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
