import type { Optional } from "generic";
import notEmpty from "../generic/notEmpty";

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

const mask = (str: Optional<string>, opt: Partial<MaskOption>): string => {
  if (!notEmpty(str)) return "";
  const option = Object.assign({}, defaultMaskOption, opt);
  if (!option.enabled) return str;

  const limitFront = parseInt((str.length * (option.front / 100)).toFixed(0));
  const limitBack = parseInt((str.length * (option.back / 100)).toFixed(0));

  const preview = str.substring(0, limitFront);
  const endPreview = str.substring(str.length - limitBack, str.length);

  return preview.padEnd(str.length - limitBack, option.mask).concat(endPreview);
};

export default mask;
