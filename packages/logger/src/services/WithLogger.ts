import { Logger } from "../models/logger/Logger";
import { OptionalLoggerOption } from "../models/logger/LoggerOption";

export abstract class WithLogger<T extends string = ""> {
  protected logger: Logger<T>;

  constructor(loggerOptions?: OptionalLoggerOption<T>) {
    this.logger = new Logger(loggerOptions);
  }
}
