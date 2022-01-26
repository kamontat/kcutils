import type { DatetimeKey, ConvertOption } from "./_types";

import { day, month } from "./_constants";
import notExist from "../generic/notExist";

/**
 * convert index of month/day to string
 *
 * @param key input key
 * @param index input index
 * @param option output option
 * @returns string represent day/month of input index
 */
const convertIndex = (
  key: DatetimeKey,
  index: number,
  option: ConvertOption
) => {
  if (notExist(option.lang) || notExist(option.type)) {
    return undefined;
  }

  const base = key === "day" ? day : month;
  const arr = base[option.lang][option.type];
  if (index >= arr.length) {
    return undefined;
  } else {
    return arr[index];
  }
};

export default convertIndex;
