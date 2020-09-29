import { json, generic, string } from "..";

type Day = [string, string, string, string, string, string, string];
type Month = [string, string, string, string, string, string, string, string, string, string, string, string];

export type DatetimeKey = "day" | "month";
export type DatetimeLang = "en" | "th";
export type DatetimeType = "short" | "long";
export type DatetimeTimezone = "UTC" | "local";
export type DatetimeFormat<T> = Record<DatetimeType, T>;
export type Datetime<T, L extends string = DatetimeLang> = Record<L, DatetimeFormat<T>>;

const enDayShort: Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const enDayLong: Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const thDayShort: Day = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
const thDayLong: Day = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];

const day: Datetime<Day> = {
  en: {
    short: enDayShort,
    long: enDayLong,
  },
  th: {
    short: thDayShort,
    long: thDayLong,
  },
};

const enMonthShort: Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enMonthLong: Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const thMonthShort: Month = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
const thMonthLong: Month = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const month: Datetime<Month> = {
  en: {
    short: enMonthShort,
    long: enMonthLong,
  },
  th: {
    short: thMonthShort,
    long: thMonthLong,
  },
};

export type NewDateOption = {
  year?: number;
  month?: number;
  date?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};
/**
 * create new Date object by input object
 *
 * @param opt datetime object (each key start point is 0)
 * @param type datetime timezone
 */
export const newDate = (opt?: NewDateOption, type: DatetimeTimezone = "UTC"): Date => {
  const option = json.forceObject(
    json.merge({ year: 0, month: 0, date: 0, hour: 0, minute: 0, second: 0, millisecond: 0 } as NewDateOption, opt)
  );

  if (
    option.year === 0 &&
    option.month === 0 &&
    option.date === 0 &&
    option.hour === 0 &&
    option.minute === 0 &&
    option.second === 0 &&
    option.millisecond === 0
  )
    return new Date();
  else {
    if (type === "UTC")
      return new Date(
        Date.UTC(option.year, option.month, option.date, option.hour, option.minute, option.second, option.millisecond)
      );
    else
      return new Date(
        option.year,
        option.month,
        option.date,
        option.hour,
        option.minute,
        option.second,
        option.millisecond
      );
  }
};

export type ConvertDayNameOption = {
  type: DatetimeType;
  lang: DatetimeLang;
};
/**
 * convert day name to day index start with 0, returns -1 if not found
 *
 * @param dayName day name in string
 * @param opt specify the name type, passes undefined will search all day name in database
 */
export const convertDayName = (dayName: string, opt?: ConvertMonthNameOption): number => {
  if (generic.noExist(opt)) {
    for (const t of ["short", "long"] as Array<DatetimeType>) {
      for (const l of ["en", "th"] as Array<DatetimeLang>) {
        const i = convertDayName(dayName, { lang: l, type: t });
        if (i >= 0) return i;
      }
    }
    return -1;
  } else {
    const arr = day[opt.lang][opt.type];
    return arr.findIndex(m => m.toLowerCase() === dayName.toLowerCase());
  }
};

export type ConvertMonthNameOption = {
  type: DatetimeType;
  lang: DatetimeLang;
};
/**
 * convert month name to month index start with 0, returns -1 if not found
 *
 * @param monthName month name in string
 * @param opt specify the name type, passes undefined will search all month name in database
 */
export const convertMonthName = (monthName: string, opt?: ConvertMonthNameOption): number => {
  if (generic.noExist(opt)) {
    for (const t of ["short", "long"] as Array<DatetimeType>) {
      for (const l of ["en", "th"] as Array<DatetimeLang>) {
        const i = convertMonthName(monthName, { lang: l, type: t });
        if (i >= 0) return i;
      }
    }
    return -1;
  } else {
    const arr = month[opt.lang][opt.type];
    return arr.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
  }
};

export type GetIndexOption = {
  key: DatetimeKey;
  type: DatetimeType;
  lang: DatetimeLang;
};
export const getIndex = (name: string, key: DatetimeKey, opt?: GetIndexOption): number => {
  if (key === "day") return convertDayName(name, opt);
  else if (key === "month") return convertMonthName(name, opt);
  else return -1;
};

export type GetNameOption = {
  key: DatetimeKey;
  type: DatetimeType;
  lang: DatetimeLang;
};
export const getName = (index: number, opt: GetNameOption): string | undefined => {
  if (generic.noExist(opt.key) || generic.noExist(opt.type) || generic.noExist(opt.lang)) return undefined;

  const base = opt.key === "day" ? day : month;
  const arr = base[opt.lang][opt.type];
  if (index >= arr.length) return undefined;
  else return arr[index];
};

export type YearType = "thai" | "global";
/**
 * convert year from type to global year number
 *
 * Thai year example:
 *   - 54    => 2011
 *   - 61    => 2018
 *   - 2544  => 2001
 *   - 2565  => 2022
 *   - 5     => 1962
 *   - 612   => 2037
 *   - Y65   => 2022
 *
 * Global year example
 *   - 12    => 2012
 *   - 25    => 2525
 *   - 2044  => 2044
 *   - 2001  => 2001
 *   - 5     => 2005
 *   - 612   => 2612
 *   - Y18   => 2018
 *
 * @param year year string
 * @param type year type
 */
export const convertYear = (year: string, type: YearType = "thai"): number => {
  const prefix = type === "thai" ? "25" : "20";
  const converter = type === "thai" ? -543 : 0;

  const yearn = year.split("").reduce((p, c) => (isNaN(parseInt(c)) ? p : p + c), ""); // remove all non-number string
  const year1 = yearn.padStart(2, "0"); // padding start with 0 if string length is 1
  const year2 = year1.length === 2 ? `${prefix}${year1}` : year1; // add 25 if year length is 2
  const year3 = year2.length === 3 ? `${prefix.charAt(0)}${year2}` : year2; // add 2 if year length is 3
  const year4 = year3.length > 4 ? year3.substr(year3.length - 4, 4) : year3; // trim all string more than 4

  const int = parseInt(year4);
  return int + converter;
};

export type TimestampType = "second" | "millisecond";
export const timestamp = (input: string | number | Date, type: TimestampType = "millisecond"): number => {
  const date = generic.isString(input) || generic.isNumber(input) ? new Date(input) : input;
  const ms = date.getTime();
  return type === "millisecond" ? ms : Math.round(ms / 1000);
};

export const getDateFromTimestamp = (timestamp: string | number): Date | undefined => {
  if (generic.isString(timestamp)) {
    if (/^(\d)+$/.test(timestamp)) {
      const number = parseInt(timestamp, 10);
      return new Date(number);
    } else return undefined;
  }

  return isNaN(timestamp) || !isFinite(timestamp) ? undefined : new Date(timestamp);
};
