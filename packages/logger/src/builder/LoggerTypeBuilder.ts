import { BadgeFn, ColorFn, LoggerType } from "../models/logger/LoggerType";
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
    this.colorFn = c => c.reset;
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
}
