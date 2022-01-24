/**
 * @packageDocumentation
 * @module Logger.Builders
 */

import { Writable } from "stream";

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

  static new<T extends string = "">(): LoggerNewLevelBuilder<T> {
    return new LoggerNewLevelBuilder<T>();
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

export class LoggerNewLevelBuilder<T extends string> {
  private level: number;
  private name: string;
  private stream: Writable;

  constructor() {
    this.level = -1;
    this.name = "" as T;
    this.stream = process.stdout;
  }

  withLevel(lv: number): this {
    this.level = lv;
    return this;
  }

  withName<N extends string>(name: N): LoggerNewLevelBuilder<N> {
    this.name = name;
    return (this as unknown) as LoggerNewLevelBuilder<N>;
  }

  withStream(writer: Writable): this {
    this.stream = writer;
    return this;
  }

  get(): LoggerLevel<T> {
    return new LoggerLevel<T>(this.level, this.name as T, this.stream);
  }
}
