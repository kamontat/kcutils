import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";
import { nonEmpty } from "../utils/helper";

export type RawHSV = C<"h" | "s" | "v">;
export type OptionalHSV = RawHSV & Partial<Alpha> & NumberType;
export type HSV = RawHSV & Alpha & NumberType;

export const isHSV = (c: C<string, any>): c is HSV => {
  const hsv = c as HSV;
  return nonEmpty(hsv.h) && nonEmpty(hsv.s) && nonEmpty(hsv.v);
};
