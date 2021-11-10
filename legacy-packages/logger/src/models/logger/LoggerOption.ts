import { Types } from "./LoggerType";
import { OptionalSetting } from "./LoggerSetting";
import { Levels, info, toLevel } from "../../constants/levels";
import { Writable } from "stream";
import { generic, env, array, json } from "@kcutils/helper";
import { arrowRight } from "figures";

export type DateTimeFormat = "date" | "time" | "datetime" | "timestamp";
export type OutputType = "file" | "console";

export interface StrictOption {
  debug: boolean;
  json: boolean;
  interactive: boolean;
  disabled: boolean;
  color: boolean;

  output: OutputType[];
  level: Levels;
  datetime: DateTimeFormat;

  separator: string;

  scopes: string[];

  /**
   * contains string or regex are accepted.
   */
  secrets: string[];

  overrideStream: boolean;
  streams: Writable | Writable[];

  censor: (input: string) => string;
}

export type OptionalOption = Partial<StrictOption>;

/**
 * @deprecated Please use LoggerOptionBuilder instead
 */
export interface StrictLoggerOption<T extends string> extends StrictOption {
  types: Types<T>;
  settings: OptionalSetting;
}

/**
 * @deprecated Please use LoggerOptionBuilder instead
 */
export type OptionalLoggerOption<T extends string> = Partial<StrictLoggerOption<T>>;

export type StrictExtraLoggerOption<T extends string> = { types: Types<T>; settings: OptionalSetting };
export type OptionalExtraLoggerOption<T extends string> = Partial<StrictExtraLoggerOption<T>>;

export class LoggerOption<T extends string> {
  private static readonly envPrefix = "KCUTILS";

  constructor(private option: StrictOption, private readonly extra?: OptionalExtraLoggerOption<T>) {}

  set<K extends keyof StrictOption, V extends StrictOption[K] = StrictOption[K]>(key: K, value: V): void {
    this.option[key] = value;
  }

  isDebug(override?: boolean): boolean {
    return this.getBoolean(`DEBUG`, "debug", false, override);
  }

  isJson(override?: boolean): boolean {
    return this.getBoolean(`JSON`, "json", false, override);
  }

  isInteractive(override?: boolean): boolean {
    return this.getBoolean(`INTERACTIVE`, "interactive", false, override);
  }

  isDisabled(override?: boolean): boolean {
    return this.getBoolean(`DISABLED`, "disabled", false, override);
  }

  isColor(override?: boolean): boolean {
    return this.getBoolean(`COLOR`, "color", true, override);
  }

  isOverrideStream(override?: boolean): boolean {
    if (generic.isExist(override)) return override;
    return this.option.overrideStream;
  }

  getOverrideStream(override?: Writable[]): Writable[] {
    if (generic.isExist(override)) return override;
    return array.toArray(this.option.streams);
  }

  getLevel(override?: Levels): Levels {
    return this.getString("LEVEL", "level", info.name, s => toLevel(s).name, override);
  }

  getSeparator(override?: string): string {
    return this.getString("SEPARATOR", "separator", arrowRight, s => s, override);
  }

  getDatetime(override?: DateTimeFormat): DateTimeFormat {
    const def: DateTimeFormat = "date";
    return this.getString(
      "DATETIME",
      "datetime",
      def,
      s => (s === "date" || s === "datetime" || s === "time" || s === "timestamp" ? (s as DateTimeFormat) : def),
      override
    );
  }

  getOutputList(override?: OutputType[]): OutputType[] {
    return this.getArray(
      "OUTPUT_LIST",
      "output",
      v => v === "file" || v === "console",
      t => t as OutputType,
      this.onlyExistArray,
      override
    );
  }

  getScopes(override?: string[]): string[] {
    return this.getArray(
      "SCOPES",
      "scopes",
      () => true,
      s => s,
      this.appendArray,
      override
    );
  }

  getSecrets(override?: string[]): string[] {
    return this.getArray(
      "SECRETS",
      "secrets",
      () => true,
      s => s,
      this.appendArray,
      override
    );
  }

  onCensor(secert: string): string {
    return this.option.censor(secert);
  }

  getTypes(): Types<T> | undefined {
    return this.extra?.types;
  }

  getSettings(): OptionalSetting | undefined {
    return this.extra?.settings;
  }

  private getString<T extends string>(
    envName: string,
    key: keyof StrictOption,
    def: T,
    mapFn: (s: string) => T,
    override?: T
  ): T {
    if (generic.isExist(override)) return override;

    const envData = env.read(`${LoggerOption.envPrefix}_${envName}`, generic.toString(this.option[key]) ?? def);
    return mapFn(envData);
  }

  private getBoolean(envName: string, key: keyof StrictOption, def: boolean, override?: boolean): boolean {
    if (generic.isExist(override)) return override;

    const envData = env.read(
      `${LoggerOption.envPrefix}_${envName}`,
      generic.toString(this.option[key]) ?? def.toString()
    );
    return generic.toBoolean(envData) ?? def;
  }

  private getArray<K extends keyof StrictOption = keyof StrictOption, T = unknown>(
    envName: string,
    key: K,
    filterFn: (t: string) => boolean,
    mapFn: (t: string) => T,
    selectFn: (t1: T[], t2: T[]) => T[],
    override?: T[]
  ): T[] {
    if (generic.isExist(override)) return override;

    const output = env
      .read(`${LoggerOption.envPrefix}_${envName}`, "")
      .split(",")
      .filter(generic.nonEmpty)
      .filter(filterFn)
      .map(mapFn);
    const defaultOutput = (this.option[key] as unknown) as T[];

    return selectFn(defaultOutput, output);
  }

  private onlyExistArray<T>(t1?: T[], t2?: T[]): T[] {
    const tt1 = generic.nonEmpty(t1) ? t1 : [];
    const tt2 = generic.nonEmpty(t2) ? t2 : [];

    if (tt2.length > 0) return tt2;
    else return tt1;
  }

  private appendArray<T>(t1?: T[], t2?: T[]): T[] {
    const tt1 = generic.nonEmpty(t1) ? t1 : [];
    const tt2 = generic.nonEmpty(t2) ? t2 : [];
    return tt1.concat(tt2);
  }

  copy<R extends string = T>(inOpt?: OptionalOption, inExt?: OptionalExtraLoggerOption<R>): LoggerOption<T | R> {
    const option = json.deepMerge(this.option, inOpt);
    const extra = json.deepMerge(this.extra, inExt);

    return new LoggerOption(option, extra);
  }

  clone(): LoggerOption<T> {
    const option = Object.assign({}, this.option);
    const extra = Object.assign({}, this.extra);

    return new LoggerOption(option, extra);
  }

  toStrictOption(): StrictOption {
    return this.option;
  }
}
