import { generic } from "@kcutils/helper";

import { C } from "./C";
import { Alpha } from "./Alpha";

export type RawNamed = C<"n", string>;
export type OptionalNamed = RawNamed & Partial<Alpha>;
export type Named = RawNamed & Alpha;

export const isNamed = (c: C<string, any>): c is Named => {
  const hsl = c as Named;
  return generic.nonEmpty(hsl.n);
};
