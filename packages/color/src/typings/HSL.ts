import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";

export type RawHSL = C<"h" | "s" | "l">;
export type OptionalHSL = RawHSL & Partial<Alpha> & NumberType;
export type HSL = RawHSL & Alpha & NumberType;

export const isHSL = (c: C<string, any>): c is HSL => {
  if (!generic.isObject(c)) return false;

  const hsl = c as HSL;
  return generic.isNumber(hsl.h) && generic.isNumber(hsl.s) && generic.isNumber(hsl.l);
};
