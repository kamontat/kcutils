import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";
import { nonEmpty } from "../utils/helper";

export type RawHSL = C<"h" | "s" | "l">;
export type OptionalHSL = RawHSL & Partial<Alpha> & NumberType;
export type HSL = RawHSL & Alpha & NumberType;

export const isHSL = (c: C<string, any>): c is HSL => {
  const hsl = c as HSL;
  return nonEmpty(hsl.h) && nonEmpty(hsl.s) && nonEmpty(hsl.l);
};
