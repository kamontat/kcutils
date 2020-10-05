import { Writable } from "stream";

export type Levels = "silent" | "error" | "warn" | "info" | "debug" | "silly";

export interface Level<L extends string = Levels> {
  readonly name: L;
  readonly level: number;
  stream: Writable;

  copy(stream: Writable): Level<L>;
}

export class LoggerLevel<L extends string = Levels> implements Level<L> {
  readonly name: L;
  readonly level: number;
  stream: Writable;

  constructor(_level: number, _name: L, _stream: Writable) {
    this.name = _name;
    this.level = _level;
    this.stream = _stream;
  }

  copy(stream: Writable): LoggerLevel<L> {
    return new LoggerLevel(this.level, this.name, stream);
  }
}
