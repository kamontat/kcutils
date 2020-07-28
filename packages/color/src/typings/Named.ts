import { C } from "./C";
import { Alpha } from "./Alpha";
import { nonEmpty } from "../utils/helper";

export type RawNamed = C<"n", string>;
export type OptionalNamed = RawNamed & Partial<Alpha>;
export type Named = RawNamed & Alpha;

export const isNamed = (c: C<string, any>): c is Named => {
  const hsl = c as Named;
  return nonEmpty(hsl.n);
};
