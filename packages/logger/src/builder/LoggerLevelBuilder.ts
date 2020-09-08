import { silent, error, warn, info, debug, silly, toLevel } from "../constants/levels";
import { LoggerLevel } from "../models/logger/LoggerLevel";

export class LoggerLevelBuilder {
  private static cached?: LoggerLevelBuilder;

  static get(): LoggerLevelBuilder {
    if (LoggerLevelBuilder.cached !== undefined) {
      return LoggerLevelBuilder.cached;
    } else {
      LoggerLevelBuilder.cached = new LoggerLevelBuilder();
      return LoggerLevelBuilder.cached;
    }
  }

  get silent(): LoggerLevel {
    return silent;
  }

  get error(): LoggerLevel {
    return error;
  }

  get warn(): LoggerLevel {
    return warn;
  }

  get info(): LoggerLevel {
    return info;
  }

  get debug(): LoggerLevel {
    return debug;
  }

  get silly(): LoggerLevel {
    return silly;
  }

  withName(str: string, def: LoggerLevel = info): LoggerLevel {
    return toLevel(str, def);
  }
}
