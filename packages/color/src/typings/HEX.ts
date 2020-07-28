import { C } from "./C";
import { Alpha } from "./Alpha";
import { HexType, Type } from "./HexType";
import { nonEmpty } from "../utils/helper";

export type RawHEX = C<"x", string>;
export type OptionalHEX<T extends Type = Type> = RawHEX & Partial<Alpha> & HexType<T>;
export type HEX<T extends Type = Type> = RawHEX & Alpha & HexType<T>;

export const isHex = (c: C<string, any>): c is HEX => {
  const hsl = c as HEX;
  return nonEmpty(hsl.x);
};
