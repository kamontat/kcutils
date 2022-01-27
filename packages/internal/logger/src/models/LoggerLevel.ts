import type { Writable } from "./Writable";

export type LoggerLevels<T extends string> = Record<T, LoggerLevel>;

export interface LoggerLevel {
  readonly level: number;

  /**
   * Custom writable.
   */
  readonly stream?: Writable | Writable[];
}
