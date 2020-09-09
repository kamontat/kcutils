import { Logger } from "../models/logger/Logger";
import { LoggerBuilder, UpdateOptionFn } from "../builder/LoggerBuilder";

export abstract class WithLogger<T extends string = ""> {
  protected logger: Logger<T>;

  constructor(private builder: LoggerBuilder<T> = LoggerBuilder.initial()) {
    this.logger = builder.get();
  }

  /**
   * @deprecated
   * update current logger object
   *
   * @param fn perform anything you needs to create new logger object, logger in parameters has no side effect
   */
  protected updateLogger(fn: (newObject: Logger<T>) => Logger<T>): void {
    this.logger = fn(this.logger.copy());
  }

  /**
   * update logger options and settings
   *
   * @param fn update logger option via builder
   */
  protected updateLoggerOption<R extends string>(fn: UpdateOptionFn<T, R>): void {
    this.builder = this.builder.updateOption(fn);
    this.logger = this.builder.get();
  }
}
