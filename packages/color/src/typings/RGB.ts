import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";

export type RawRGB = C<"r" | "g" | "b">;
export type OptionalRGB = RawRGB & Partial<Alpha> & NumberType;
export type RGB = RawRGB & Alpha & NumberType;

export const isRGB = (c: C<string, any>): c is RGB => {
  if (!generic.isObject(c)) return false;

  const rgb = c as RGB;
  return generic.isNumber(rgb.r, true) && generic.isNumber(rgb.g, true) && generic.isNumber(rgb.b, true);
};
