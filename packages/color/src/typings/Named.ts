import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";

export type RawNamed = C<"n", string>;
export type OptionalNamed = RawNamed & Partial<Alpha>;
export type Named = RawNamed & Alpha;

export const isNamed = (c: C<string, any>): c is Named => {
  if (!generic.isObject(c)) return false;

  const named = c as Named;
  return generic.nonEmpty(named.n) && generic.isString(named.n);
};
