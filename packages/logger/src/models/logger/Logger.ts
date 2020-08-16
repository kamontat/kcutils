import { format, inspect } from "util";
import { basename } from "path";
import { Writable } from "stream";
import { moveCursor, clearLine, cursorTo } from "readline";

import { json, string, array } from "@kcutils/helper";

import { Chalk, Instance as ChalkInstance, level as defaultColorLevel } from "chalk";
import * as Badge from "figures";

import { StrictOption, OptionalLoggerOption, OptionalOption } from "./LoggerOption";
import { Types, LoggerType } from "./LoggerType";
import { OptionalSetting, StrictSetting, StrictCommonSetting } from "./LoggerSetting";

import { settings, settingBuilder } from "../../constants/settings";
import { types, DefaultKeyTypes } from "../../constants/types";
import { options } from "../../constants/options";
import { levels, toLevel } from "../../constants/levels";
import { OutputMessageMetadata } from "../output/OutputMessageMetadata";
import { OutputMessagePrefix } from "../output/OutputMessagePrefix";
import { OutputMessageData } from "../output/OutputMessageData";
import { OutputMessageSuffix } from "../output/OutputMessageSuffix";
import { InputMessage } from "../input/InputMessage";
import { InputOption } from "../input/InputOptions";
import { OutputMessage } from "../output/OutputMessage";
import { LoggerLevel } from "./LoggerLevel";

const longestLabel = "longest-label";

type Parameters = typeof longestLabel;

//* [ metadata                                ] [ prefix      ] [ data            ] [suffix]
//* [datetime]   [scope] [filename] [separator] [badge] [label] [message]           [suffix]
//* [YYYY-MM-DD] global  text.js    ↦           ¤       [label] this this a message (suffix)

export class Logger<T extends string = ""> {
  private static counter: number = 0;

  static create<T extends string = "">(opts?: OptionalLoggerOption<T>): Logger<T> {
    return new Logger(opts);
  }

  private readonly _id: number;
  private _option: StrictOption;
  private _setting: StrictSetting;

  private _color: Chalk;
  private _isPreviousLogInteractive: boolean;

  private readonly _types: Types<DefaultKeyTypes | T>;

  private readonly _timers: Map<string, number>;

  private readonly _parameters: Map<Parameters, string>;

  constructor(opts?: OptionalLoggerOption<T>) {
    this._id = Logger.counter;
    Logger.counter++;

    this._option = json.deepMerge(options, opts);
    this._types = json.deepMerge(types, opts?.types);
    this._setting = json.deepMerge(settings, opts?.settings);

    this.idebug(`create new logger (id = ${this._id})`);
    this.idebug("option: ", JSON.stringify(this._option));
    this.idebug("setting: ", JSON.stringify(this._setting));
    this.idebug("types: ", JSON.stringify(this._types));

    this._timers = new Map();
    this._color = new ChalkInstance(this._option.color ? {} : { level: 0 });
    this._isPreviousLogInteractive = false;

    this._parameters = new Map();
    this._parameters.set(longestLabel, this.getLongestLabel());
  }

  get id(): number {
    return this._id;
  }

  /**
   * all log levels
   */
  get levels(): LoggerLevel[] {
    return levels;
  }

  /**
   * current scopes
   */
  get scopes(): string[] {
    return this._option.scopes;
  }

  /**
   * get current options as readonly
   */
  get option(): StrictOption {
    return Object.assign(this._option);
  }

  // print logger message to stream
  print(_type: DefaultKeyTypes | T, data: InputMessage | InputOption): void {
    const type = this._types[_type];
    if (!this.shouldLog(type)) return;

    const level = toLevel(type.level);

    const inputOption = typeof data === "string" ? { message: data } : data;

    const _stream = this._option.overrideStream ? this._option.streams : level.stream;
    let _streams = array.toArray(_stream);
    if (inputOption.stream) {
      const streams = array.toArray(inputOption.stream);
      _streams = inputOption.appendStream ? _streams.concat(...streams) : streams;
    }

    const message = this.build(_type, data);
    this.writing(_streams, message);
  }

  // build logger message
  build(_type: DefaultKeyTypes | T, input: InputMessage | InputOption): string {
    const type = this._types[_type];
    if (!this.shouldLog(type)) return "";

    const inputOption = typeof input === "string" ? { message: input } : input;

    const metadata = this.buildMetadata();
    const prefix = this.buildPrefix(type, inputOption.label, inputOption.prefix);
    const data = this.buildMessage(inputOption.message);
    const suffix = this.buildSuffix(inputOption.suffix);

    if (this._option.json) return this.buildAsJson(type, { metadata, prefix, data, suffix });
    else return this.buildAsString(type, { metadata, prefix, data, suffix });
  }

  startTimer(_label?: string, message?: string): string {
    const label = _label ?? `timer_${this._timers.size}`;
    this._timers.set(label, Date.now());
    this.print("start", { message: message ?? "Initialized timer...", label });

    return label;
  }

  endTimer(label?: string, message?: string): { label?: string; timestamp: number } {
    if (this._timers.size < 1) return { label: label, timestamp: 0 };

    let _label = label;
    if (!_label) {
      const is = (s: string) => s && s.includes("timer_");
      _label = Array.from(this._timers.keys()).reduceRight((x, y) => {
        return is(x) ? x : is(y) ? y : "";
      }, "");
    }

    if (this._timers.has(_label)) {
      const previous = this._timers.get(_label) as number;
      const current = Date.now();
      const timestamp = current - previous;
      const time = timestamp < 1000 ? `${timestamp} ms` : `${(timestamp / 1000).toFixed(2)} s`;

      this._timers.delete(_label);

      this.print("stop", {
        message: message ?? "Timer run for: ",
        suffix: time,
        label: _label,
      });

      return { label: _label, timestamp };
    }

    return { label: _label, timestamp: 0 };
  }

  /**
   * remove all secret found in input string
   *
   * @param message input string
   */
  censor(message: string): string {
    if (this._option.secrets.length === 0) return message;

    return this._option.secrets.reduce((msg, secret) => {
      const regex = new RegExp(secret, "gi");
      const s = this._option.censor(secret);
      const formatting = this.format(s, this._setting.secret, undefined, false);
      return msg.replace(regex, formatting);
    }, message);
  }

  isContainSecret(message: string): boolean {
    if (this._option.secrets.length === 0) return false;
    return this._option.secrets.some(secret => {
      const regex = new RegExp(secret, "g");
      return regex.test(message);
    });
  }

  /**
   * merge and replace new options
   * @param option new partial option
   */
  options(option: OptionalOption): this {
    this.idebug("options parameters: ", option);
    this._option = json.deepMerge(this._option, option);
    this.idebug("new options: ", option);
    return this;
  }

  /**
   * merge and replace new settings
   * @param option new partial setting
   */
  settings(setting: OptionalSetting): this {
    this.idebug("settings parameters: ", setting);
    this._setting = json.deepMerge(this._setting, setting);
    this.idebug("new settings: ", setting);
    return this;
  }

  /**
   * create new logger base on current configuration
   * @param option new option merged with current option
   * @param setting new setting merged with current setting
   * @param type new type merged with current type
   */
  copy<U extends string = "">(option?: OptionalOption, setting?: OptionalSetting, type?: Types<U>): Logger<T | U> {
    const options = json.deepMerge(this._option, option);
    const settings = json.deepMerge(this._setting, setting);
    const types = json.deepMerge(this._types, type);

    const o = { ...options, settings, types };
    return new Logger(o);
  }

  isEnabled(): boolean {
    return !this._option.disabled;
  }

  /**
   * remove all scope on this logger
   */
  unscope(): this {
    this._option.scopes = [];
    return this;
  }

  /**
   * remove all secret on this logger
   */
  unsecret(): this {
    this._option.secrets = [];
    return this;
  }

  /**
   * enable color
   */
  color(): this {
    this._option.color = true;
    this._color.level = defaultColorLevel;
    return this;
  }

  /**
   * disable color
   */
  uncolor(): this {
    this._option.color = false;
    this._color.level = 0;
    return this;
  }

  /**
   * is color enabled
   */
  isColor(): boolean {
    return this._color.level > 0 && this._option.color;
  }

  equals(l: Logger): boolean {
    const keys = Object.keys(this.importantData()) as (keyof StrictOption)[];
    return keys.every(k => {
      const cond = json.equals(l.option[k] as Record<string, any>, this.option[k] as Record<string, any>);
      if (!cond) this.idebug("input logger is not equals because '%s'(%s !== %s)", k, this.option[k], l.option[k]);
      return cond;
    });
  }

  toString(): string {
    const data = this.importantData();
    return `Logger(${(Object.keys(data) as (keyof StrictOption)[]).map(key => `${key}=${data[key]}`).join(", ")})`;
  }

  private importantData(): Partial<Record<keyof StrictOption, any>> {
    return {
      debug: this.option.debug,
      level: this.option.level,
      interactive: this.option.interactive,
      color: this.option.color,
      scopes: this.option.scopes,
    };
  }

  /**
   * get current filename
   */
  private get filename() {
    const _ = Error.prepareStackTrace;
    Error.prepareStackTrace = (_error, stack) => stack;
    const error = new Error();
    const callers = ((error.stack as unknown) as NodeJS.CallSite[]).map(x => x.getFileName());
    const firstExternalFilePath = callers.find(x => x !== callers[0]);
    Error.prepareStackTrace = _;
    return firstExternalFilePath ? basename(firstExternalFilePath) : "anonymous";
  }

  private get date() {
    const _ = new Date();

    const year = string.padStart(_.getFullYear().toFixed(0), 2, "0");
    const month = string.padStart((_.getMonth() + 1).toFixed(0), 2, "0");
    const day = string.padStart(_.getDate().toFixed(0), 2, "0");

    return [year, month, day].join("-");
  }

  private get time() {
    const _ = new Date();

    const hour = string.padStart(_.getHours().toFixed(0), 2, "0");
    const min = string.padStart(_.getMinutes().toFixed(0), 2, "0");
    const sec = string.padStart(_.getSeconds().toFixed(0), 2, "0");
    const ms = string.padStart(_.getMilliseconds().toFixed(0), 3, "0");

    return [hour, min, sec].join(":").concat(".", ms);
  }

  private get datetime() {
    return `${this.date} ${this.time}`;
  }

  private get timestamp() {
    const timestamp = +new Date();
    return timestamp.toFixed(0);
  }

  private buildAsJson(_type: LoggerType, output: OutputMessage) {
    const level = toLevel(_type.level);
    return JSON.stringify({ ...output, level: { name: level.name, code: level.level } });
  }

  private buildAsString(type: LoggerType, output: OutputMessage) {
    const withSpace = (i: string) => {
      if (string.isNotEmpty(i)) return ` ${i}`;
      else return i;
    };

    const datetime = this.format(output.metadata.datetime.data, this._setting.datetime, this._color.gray);
    const scopes = output.metadata.scopes.data
      .map(scope => this.format(scope, this._setting.scope, this._color.gray))
      .filter(v => string.isNotEmpty(v))
      .join(" ");
    const filename = this.format(output.metadata.filename.data, this._setting.filename);
    const separator = this.format(output.metadata.seperator.data, this._setting.seperator);
    const _paddingBadge = string.padEnd(output.prefix.badge.data, 2);
    const badge = this.format(_paddingBadge, this._setting.badge, type.color(this._color));
    const _longestLabelLength = (this._parameters.get(longestLabel) ?? "").length;
    const _paddingLabel = string.padEnd(output.prefix.label.data, _longestLabelLength + 1);
    const label = this.format(_paddingLabel, this._setting.label, type.color(this._color));
    const customPrefix = this.format(output.prefix.custom.data, this._setting.prefix);
    const message = this.format(output.data.messages.data, this._setting.message);
    const suffix = this.format(output.suffix.custom.data, this._setting.suffix);

    const metadata = `${datetime}${withSpace(scopes)}${withSpace(filename)}${withSpace(separator)}`;
    const prefix = `${badge}${withSpace(label)}${withSpace(customPrefix)}`;

    return `${metadata}${withSpace(prefix)}${withSpace(message)}${withSpace(suffix)}`;
  }

  private buildMetadata() {
    let d: string;
    if (this._option.datetime === "time") d = this.time;
    else if (this._option.datetime === "date") d = this.date;
    else if (this._option.datetime === "datetime") d = this.datetime;
    else if (this._option.datetime === "timestamp") d = this.timestamp;
    else d = this.date; // default

    const datetime = { index: 1, data: d };

    const scopes = { index: 2, data: this._option.scopes };
    const filename = { index: 3, data: this.filename };
    const seperator = { index: 4, data: this._option.separator };

    const metadata: OutputMessageMetadata = { datetime, scopes, filename, seperator };
    this.idebug("build metadata object: ", metadata);
    return metadata;
  }

  private buildPrefix(type: LoggerType, overrideLabel?: string, customPrefix?: string | string[]) {
    const _label = string.isNotEmpty(overrideLabel) ? overrideLabel : type.label;
    const label = { index: 1, data: _label };

    const _badge = type.badge(Badge);
    const badge = { index: 2, data: _badge };

    const custom = { index: 3, data: array.toArray(customPrefix ?? "") };

    const prefix: OutputMessagePrefix = { label, badge, custom };
    this.idebug("build prefix object: ", prefix);
    return prefix;
  }

  private buildMessage(msg: string | string[]) {
    const messages = { index: 1, data: array.toArray(msg) };

    const data: OutputMessageData = { messages };
    this.idebug("build data object: ", data);
    return data;
  }

  private buildSuffix(customSuffix?: string | string[]) {
    const custom = { index: 1, data: array.toArray(customSuffix ?? "") };

    const suffix: OutputMessageSuffix = { custom };
    this.idebug("build metadata object: ", suffix);
    return suffix;
  }

  /**
   * check log type should be log or not
   * @param type log type
   */
  private shouldLog(type: LoggerType) {
    const level = toLevel(this._option.level);
    const typeLevel = toLevel(type.level);

    let msg = `${type.label}(${typeLevel.name}) type for log level ${level.name}`;
    const res = typeLevel.level <= level.level;
    if (res) msg += " is runnable";
    else msg += " is disabled";

    this.idebug(msg);
    return res;
  }

  /**
   * Never call this method outside constructor. use parameters instead
   */
  private getLongestLabel() {
    const type = this._types;
    const keys = Object.keys(type) as Array<keyof typeof type>;

    return keys.reduce((p, key) => {
      const label: string = type[key].label;
      return p.length > label.length ? p : label;
    }, "");
  }

  /**
   * format msg with settings
   *
   * @param msg message to format
   * @param settings formatting settings
   * @param color with color format
   */
  private format(input: string | string[], _settings: StrictCommonSetting, color?: Chalk, censor: boolean = true) {
    const msg = array.toArray(input).join(" ");
    this.idebug(`formatting ${msg} by`, _settings);
    if (_settings === undefined || _settings === false) return "";
    const settings = settingBuilder(_settings);

    type Execute = [string, boolean, (s: string) => string];
    const executes: Execute[] = [
      ["uppercase", settings.uppercase, m => m.toUpperCase()],
      ["append", settings.prefix !== "" || settings.suffix !== "", m => settings.prefix + m + settings.suffix],
      ["underline", settings.underline, m => this._color.underline(m)],
      ["bold", settings.bold, m => this._color.bold(m)],
      ["italic", settings.italic, m => this._color.italic(m)],
      ["color", color !== undefined, m => (color as Chalk)(m)],
      ["censor", this.isContainSecret(msg) && censor, m => this.censor(m)],
    ];

    return executes.reduce((p, c) => {
      const name = c[0];
      const condition = c[1];
      const fn = c[2];

      if (condition && p !== "") {
        this.idebug(`start execute ${name}`);
        return fn(p);
      } else {
        this.idebug(`skip execute ${name}`);
        return p;
      }
    }, msg);
  }

  /**
   * write message to stream
   * @param stream writable stream
   * @param message message
   */
  private writing(stream: Writable | Writable[], message: string) {
    const streams = array.toArray(stream);

    this.idebug(`write message to ${streams.length} output`);
    streams.forEach(stream => {
      if (this._option.interactive && this._isPreviousLogInteractive) {
        moveCursor(stream, 0, -1);
        clearLine(stream, 0);
        cursorTo(stream, 0);
      }

      stream.write(`${message}\n`);
      this._isPreviousLogInteractive = this._option.interactive;
    });
  }

  /**
   * internal debug log with debug is enabled
   *
   * @param formatter format string
   * @param data message data
   */
  private idebug(formatter: string, ...data: any[]) {
    if (this._option.debug)
      if (data.length === 1) console.log(format(formatter, inspect(data[0], false, 1, false)));
      else console.log(format(formatter, ...data));
  }
}

const l = new Logger();
l.options({ secrets: ["new secret"] }).options({ secrets: [""] });
