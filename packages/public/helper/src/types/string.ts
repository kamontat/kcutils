import type { Optional } from "generic";

import { isExist } from "./generic";

export const padEnd = (
  str: string,
  length: number,
  fill: string = " "
): string => {
  if (str.length >= length) return str.slice(0, length);
  return str.padEnd(length, fill);
};

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

  const limitFront = parseInt((str.length * (option.front / 100)).toFixed(0));
  const limitBack = parseInt((str.length * (option.back / 100)).toFixed(0));

  const preview = str.substr(0, limitFront);
  const endPreview = str.substring(str.length - limitBack, str.length);

  return preview.padEnd(str.length - limitBack, option.mask).concat(endPreview);
};
