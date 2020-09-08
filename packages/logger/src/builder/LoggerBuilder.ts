import { Logger } from "../models/logger/Logger";
import { LoggerOptionBuilder } from "./LoggerOptionBuilder";

export class LoggerBuilder<T extends string> {
  static initial<T extends string = "">(): LoggerBuilder<T> {
    return new LoggerBuilder<T>();
  }
  static default(): Logger {
    return LoggerBuilder.initial().get();
  }

  private builder: LoggerOptionBuilder<string>;

  private constructor() {
    this.builder = LoggerOptionBuilder.initial();
  }

  withOption<R extends string>(builder: LoggerOptionBuilder<R>): LoggerBuilder<R> {
    this.builder = builder;
    return this as LoggerBuilder<R>;
  }

  updateOption<R extends string>(
    builder: (b: LoggerOptionBuilder<T>) => LoggerOptionBuilder<T | R>
  ): LoggerBuilder<T | R> {
    const newBuilder = builder(this.builder);
    this.builder = newBuilder;

    return this as LoggerBuilder<T | R>;
  }

  get(): Logger<T> {
    return Logger.create<T>();
  }
}
