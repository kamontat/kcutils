import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";
import { HexType, Type } from "./HexType";

export type RawHEX = C<"x", string>;
export type OptionalHEX<T extends Type = Type> = RawHEX & Partial<Alpha> & HexType<T>;
export type HEX<T extends Type = Type> = RawHEX & Alpha & HexType<T>;

export const isHex = (c: C<string, any>): c is HEX => {
  if (!generic.isObject(c)) return false;

  const hex = c as HEX;
  return generic.nonEmpty(hex.x) && generic.isString(hex.x);
};
