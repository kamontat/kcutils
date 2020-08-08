import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { NumberType } from "./NumberType";

export type RawRGB = C<"r" | "g" | "b">;
export type OptionalRGB = RawRGB & Partial<Alpha> & NumberType;
export type RGB = RawRGB & Alpha & NumberType;

export const isRGB = (c: C<string, any>): c is RGB => {
  const rgb = c as RGB;
  return generic.nonEmpty(rgb.r) && generic.nonEmpty(rgb.g) && generic.nonEmpty(rgb.b);
};
