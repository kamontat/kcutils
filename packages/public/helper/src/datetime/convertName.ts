import type {
  ConvertOption,
  DatetimeType,
  DatetimeLang,
  DatetimeKey,
} from "./_types";
import { day, month } from "./_constants";

import notExist from "../generic/notExist";

/**
 * convert day/month name into index, returns -1 if not found
 *
 * @param key input key
 * @param name input name
 * @param opt specify type/lang for fast search
 * @returns day/month index start with 0 (Sunday, January)
 */
const convertName = (
  key: DatetimeKey,
  name: string,
  opt?: ConvertOption
): number => {
  if (notExist(opt)) {
    for (const t of ["short", "long"] as Array<DatetimeType>) {
      for (const l of ["en", "th"] as Array<DatetimeLang>) {
        const i = convertName(key, name, { lang: l, type: t });
        if (i >= 0) {
          return i;
        }
      }
    }
    return -1;
  } else {
    const base = key === "day" ? day : month;
    const arr = base[opt.lang][opt.type];
    return arr.findIndex((m) => m.toLowerCase() === name.toLowerCase());
  }
};

export default convertName;
