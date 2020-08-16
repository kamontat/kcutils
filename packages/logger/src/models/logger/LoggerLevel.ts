import { Writable } from "stream";

export type Levels = "silent" | "error" | "warn" | "info" | "debug" | "silly";

export interface LoggerLevel<L extends string = Levels> {
  readonly name: L;
  readonly level: number;
  stream: Writable;

  copy(stream: Writable): LoggerLevel<L>;
}

export class LoggerLevelBuilder<L extends string = Levels> implements LoggerLevel<L> {
  readonly name: L;
  readonly level: number;
  stream: Writable;

  constructor(_level: number, _name: L, _stream: Writable) {
    this.name = _name;
    this.level = _level;
    this.stream = _stream;
  }

  copy(stream: Writable): LoggerLevelBuilder<L> {
    return new LoggerLevelBuilder(this.level, this.name, stream);
  }
}
