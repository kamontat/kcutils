import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";

export type RawHSV = C<"h" | "s" | "v">;
export type OptionalHSV = RawHSV & Partial<Alpha> & NumberType;
export type HSV = RawHSV & Alpha & NumberType;

export const isHSV = (c: C<string, any>): c is HSV => {
  const hsv = c as HSV;
  return generic.nonEmpty(hsv.h) && generic.nonEmpty(hsv.s) && generic.nonEmpty(hsv.v);
};
