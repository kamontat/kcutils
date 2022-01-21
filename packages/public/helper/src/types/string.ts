import type { Optional } from "generic";

import { isExist } from "./generic";

/**
 * Add <fill> on the end if not enough or remove character if exceed
 *
 * @param str input string
 * @param length string limitation
 * @param fill character for fill if input is not long enough
 * @returns string with exactly length size
 */
export const padEnd = (
  str: string,
  length: number,
  fill: string = " "
): string => {
  if (str.length >= length) return str.slice(0, length);
  return str.padEnd(length, fill);
};

/**
 * Add <fill> on the start if not enough or remove character if exceed
 *
 * @param str input string
 * @param length string limitation
 * @param fill character for fill if input is not long enough
 * @returns string with exactly length size
 */
export const padStart = (
  str: string,
  size: number,
  fill: string = " "
): string => {
  if (str.length >= size) return str.slice(str.length - size, str.length);
  return str.padStart(size, fill);
};

export const isNotEmpty = (str: Optional<string>): str is string => {
  if (isExist(str)) return str !== "";
  else return false;
};

export type MaskOption = {
  enabled: boolean;
  front: number;
  back: number;
  mask: string;
};
export const defaultMaskOption: MaskOption = {
  enabled: true,
  front: 15,
  back: 15,
  mask: "*",
};
export const mask = (
  str: Optional<string>,
  opt: Partial<MaskOption>
): string => {
  if (!isNotEmpty(str)) return "";
  const option = Object.assign({}, defaultMaskOption, opt);
  if (!option.enabled) return str;

  const limitFront = parseInt((str.length * (option.front / 100)).toFixed(0));
  const limitBack = parseInt((str.length * (option.back / 100)).toFixed(0));

  const preview = str.substring(0, limitFront);
  const endPreview = str.substring(str.length - limitBack, str.length);

  return preview.padEnd(str.length - limitBack, option.mask).concat(endPreview);
};
