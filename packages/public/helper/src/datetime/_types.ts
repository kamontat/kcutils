export type Day = [string, string, string, string, string, string, string];
export type Month = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type DatetimeKey = "day" | "month";
export type DatetimeLang = "en" | "th";
export type DatetimeType = "short" | "long";
export type DatetimeTimezone = "UTC" | "local";
export type DatetimeFormat<T> = Record<DatetimeType, T>;
export type Datetime<T, L extends string = DatetimeLang> = Record<
  L,
  DatetimeFormat<T>
>;

export type ConvertOption = {
  type: DatetimeType;
  lang: DatetimeLang;
};
