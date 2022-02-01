/**
 * @packageDocumentation
 * @module Logger.Builders
 */
import type { Writable } from "../models/custom/Writable";

import { arrowRight } from "figures";
import { isExist, notExist, notEmpty, toArray } from "@kcutils/helper";

import { Levels } from "../constants/levels";
import {
  StrictOption,
  OptionalOption,
  OutputType,
  DateTimeFormat,
  LoggerOption,
  OptionalExtraLoggerOption,
} from "../models/logger/LoggerOption";
import { Types } from "../models/logger/LoggerType";
import { OptionalSetting, StrictSetting } from "../models/logger/LoggerSetting";
import { LoggerTypeBuilder } from "./LoggerTypeBuilder";
import { LoggerSettingBuilder } from "./LoggerSettingBuilder";

export class LoggerOptionBuilder<T extends string> {
  static initial<T extends string = "">(): LoggerOptionBuilder<T> {
    return new LoggerOptionBuilder();
  }

  static load<T extends string = "">(
    option: OptionalOption
  ): LoggerOptionBuilder<T> {
    const builder = LoggerOptionBuilder.initial<T>();

    if (isExist(option.debug)) builder.withDebug(option.debug);
    if (isExist(option.output)) builder.withOutput(option.output);
    if (isExist(option.json)) builder.withJson(option.json);
    if (isExist(option.interactive))
      builder.withInteractive(option.interactive);
    if (isExist(option.disabled)) builder.withDisabled(option.disabled);
    if (isExist(option.color)) builder.withColor(option.color);
    if (isExist(option.level)) builder.withLevel(option.level);
    if (isExist(option.datetime)) builder.withDatetime(option.datetime);
    if (isExist(option.censor)) builder.withCensor(option.censor);
    if (isExist(option.separator)) builder.withSeparator(option.separator);
    if (isExist(option.scopes)) builder.withScopes(option.scopes);
    if (isExist(option.secrets)) builder.withSecrets(option.secrets);
    if (isExist(option.streams))
      builder.withOverrideStream(toArray(option.streams));

    return builder;
  }

  private debug: boolean;
  private output: OutputType[];
  private json: boolean;
  private interactive: boolean;
  private disabled: boolean;
  private color: boolean;
  private level: Levels;

  private datetime: DateTimeFormat;
  private censor: (input: string) => string;
  private separator: string;
  private scopes: string[];
  private secrets: string[];
  private overrideStream: boolean;
  private streams: Writable[];

  private types?: Types<string>;
  private settings?: OptionalSetting;

  constructor() {
    this.debug = false;
    this.output = ["console"];
    this.json = false;
    this.interactive = false;
    this.disabled = false;
    this.color = true;
    this.level = "info";
    this.datetime = "date";
    this.censor = () => "secure";
    this.separator = arrowRight;
    this.scopes = [];
    this.secrets = [];
    this.overrideStream = false;
    this.streams = [];

    this.types = undefined;
    this.settings = undefined;
  }

  withDebug(toggle: boolean = true): this {
    this.debug = toggle;
    return this;
  }

  withJson(toggle: boolean = true): this {
    this.json = toggle;
    return this;
  }

  withInteractive(toggle: boolean = true): this {
    this.interactive = toggle;
    return this;
  }

  withDisabled(toggle: boolean = true): this {
    this.disabled = toggle;
    return this;
  }

  withColor(toggle: boolean = true): this {
    this.color = toggle;
    return this;
  }

  withoutColor(): this {
    return this.withColor(false);
  }

  withLevel(level: Levels): this {
    this.level = level;
    return this;
  }

  withDatetime(type: DateTimeFormat): this {
    this.datetime = type;
    return this;
  }

  withCensor(censor: (input: string) => string): this {
    this.censor = censor;
    return this;
  }

  withSeparator(separator: string): this {
    this.separator = separator;
    return this;
  }

  withScopes(scopes: string[]): this {
    this.scopes = scopes;
    return this;
  }

  withSecrets(secrets: string[]): this {
    this.secrets = secrets;
    return this;
  }

  withOverrideStream(streams: Writable[]): this {
    this.overrideStream = true;
    this.streams = streams;
    return this;
  }

  withoutOverrideStream(): this {
    this.overrideStream = false;
    this.streams = [];
    return this;
  }

  withOutput(output: OutputType[]): this {
    this.output = output;
    return this;
  }

  withType<R extends string>(
    name: R,
    builder: LoggerTypeBuilder
  ): LoggerOptionBuilder<T | R> {
    if (notExist(this.types))
      this.types = {
        [name]: builder.get(),
      };
    else this.types[name] = builder.get();

    return this as LoggerOptionBuilder<T | R>;
  }

  withRawType<N extends string>(types: Types<N>): LoggerOptionBuilder<N> {
    this.types = types;
    return this as LoggerOptionBuilder<N>;
  }

  withSetting<R extends keyof StrictSetting>(
    name: R,
    builder: LoggerSettingBuilder
  ): this {
    if (notExist(this.settings))
      this.settings = {
        [name]: builder.get(),
      };
    else this.settings[name] = builder.get();

    return this;
  }

  withRawSetting(settings: StrictSetting): this {
    this.settings = settings;
    return this;
  }

  /**
   * always create new object
   */
  get(): LoggerOption<T> {
    const opts: OptionalExtraLoggerOption<T> = {};

    if (notEmpty(this.types)) opts["types"] = this.types;
    if (notEmpty(this.settings)) opts["settings"] = this.settings;

    return new LoggerOption(this.internalGet(), opts);
  }

  private internalGet(): StrictOption {
    return {
      debug: this.debug,
      output: this.output,
      json: this.json,
      interactive: this.interactive,
      disabled: this.disabled,
      color: this.color,
      level: this.level,
      datetime: this.datetime,
      censor: this.censor,
      separator: this.separator,
      scopes: this.scopes,
      secrets: this.secrets,
      overrideStream: this.overrideStream,
      streams: this.streams,
    };
  }
}
