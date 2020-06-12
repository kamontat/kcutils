import { Writable } from "stream";

export interface LoggerLevel {
  readonly name: string;
  readonly level: number;
  stream: Writable;

  copy(stream: Writable): LoggerLevel;
}

export class LoggerLevelBuilder implements LoggerLevel {
  readonly name: string;
  readonly level: number;
  stream: Writable;

  constructor(_level: number, _name: string, _stream: Writable) {
    this.name = _name;
    this.level = _level;
    this.stream = _stream;
  }

  copy(stream: Writable) {
    return new LoggerLevelBuilder(this.level, this.name, stream);
  }
}
