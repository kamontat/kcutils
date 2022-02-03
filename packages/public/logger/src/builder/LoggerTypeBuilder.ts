/**
 * @packageDocumentation
 * @module Logger.Builders
 */

import {
  BadgeFn,
  ColorFn,
  LoggerType,
  Types,
} from "../models/logger/LoggerType";
import { Levels } from "../constants/levels";

/**
 * start by run LoggerTypeBuilder.initial()
 * and chain with many option
 */
export class LoggerTypeBuilder {
  static initial(): LoggerTypeBuilder {
    return new LoggerTypeBuilder();
  }

  private badgeFn: BadgeFn;
  private colorFn: ColorFn;
  private label: string;
  private level: Levels;

  constructor() {
    this.badgeFn = () => "";
    this.colorFn = (c) => c;
    this.label = "";
    this.level = "info";
  }

  withNewBadge(fn: BadgeFn): this {
    this.badgeFn = fn;
    return this;
  }

  withNewColor(fn: ColorFn): this {
    this.colorFn = fn;
    return this;
  }

  withLabel(label: string): this {
    this.label = label;
    return this;
  }

  withLevel(lv: Levels): this {
    this.level = lv;
    return this;
  }

  get(): LoggerType {
    return {
      badge: this.badgeFn,
      color: this.colorFn,
      label: this.label,
      level: this.level,
    };
  }

  getType<N extends string>(name: N): Types<N> {
    return {
      [name]: this.get(),
    } as Types<N>;
  }
}
