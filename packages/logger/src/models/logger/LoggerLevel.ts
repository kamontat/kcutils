import { Writable } from "stream";

export type Levels = "silent" | "error" | "warn" | "info" | "debug" | "silly";

export interface LoggerLevel {
  readonly name: Levels;
  readonly level: number;
  stream: Writable;

  copy(stream: Writable): LoggerLevel;
}

export class LoggerLevelBuilder implements LoggerLevel {
  readonly name: Levels;
  readonly level: number;
  stream: Writable;

  constructor(_level: number, _name: Levels, _stream: Writable) {
    this.name = _name;
    this.level = _level;
    this.stream = _stream;
  }

  copy(stream: Writable): LoggerLevelBuilder {
    return new LoggerLevelBuilder(this.level, this.name, stream);
  }
}
