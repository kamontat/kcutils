import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";

export type RawHSV = C<"h" | "s" | "v">;
export type OptionalHSV = RawHSV & Partial<Alpha> & NumberType;
export type HSV = RawHSV & Alpha & NumberType;

export const isHSV = (c: C<string, any>): c is HSV => {
  if (!generic.isObject(c)) return false;

  const hsv = c as HSV;
  return generic.isNumber(hsv.h, true) && generic.isNumber(hsv.s, true) && generic.isNumber(hsv.v, true);
};
