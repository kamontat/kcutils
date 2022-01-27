export type LoggerFormats<T extends string> = Record<T, LoggerFormat>;

export type PrefixType = string | string[] | Record<string, unknown>;
export type SuffixType = string | string[] | Record<string, unknown>;

export interface LoggerFormat {
  readonly prefix?: PrefixType;
  readonly suffix?: SuffixType;
}
