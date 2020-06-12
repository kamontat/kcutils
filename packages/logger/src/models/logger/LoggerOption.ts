import { Types } from "./LoggerType";
import { OptionalSetting } from "./LoggerSetting";
import { Levels } from "../../constants/levels";
import { Writable } from "stream";

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

  secrets: string[]; // regex is excepted

  overrideStream: boolean;
  streams: Writable | Writable[];

  censor: (input: string) => string;
}

export interface StrictLoggerOption<T extends string> extends StrictOption {
  types: Types<T>;
  settings: OptionalSetting;
}

export type OptionalOption = Partial<StrictOption>;

export type OptionalLoggerOption<T extends string> = Partial<StrictLoggerOption<T>>;
