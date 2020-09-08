import { StrictSettingObject } from "../models/logger/LoggerSetting";

export class LoggerSettingBuilder {
  static initial(): LoggerSettingBuilder {
    return new LoggerSettingBuilder();
  }

  private uppercase: boolean;
  private underline: boolean;
  private bold: boolean;
  private italic: boolean;
  private prefix: string;
  private suffix: string;

  constructor() {
    this.uppercase = false;
    this.underline = false;
    this.bold = false;
    this.italic = false;
    this.prefix = "";
    this.suffix = "";
  }

  withUpperCase(toggle: boolean = true): this {
    this.uppercase = toggle;
    return this;
  }

  withUnderline(toggle: boolean = true): this {
    this.underline = toggle;
    return this;
  }

  withBold(toggle: boolean = true): this {
    this.bold = toggle;
    return this;
  }

  withItalic(toggle: boolean = true): this {
    this.italic = toggle;
    return this;
  }

  withPrefix(prefix: string): this {
    this.prefix = prefix;
    return this;
  }

  withSuffix(suffix: string): this {
    this.suffix = suffix;
    return this;
  }

  get(): StrictSettingObject {
    return {
      uppercase: this.uppercase,
      underline: this.underline,
      bold: this.bold,
      italic: this.italic,
      prefix: this.prefix,
      suffix: this.suffix,
    };
  }
}
