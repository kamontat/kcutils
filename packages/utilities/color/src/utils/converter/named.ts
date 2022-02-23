import { generic, json } from "@kcutils/helper";

import { RGB } from "../../typings/RGB";
import { Named } from "../../typings/Named";
import { colorNames } from "../constants";
import { HEX } from "../../typings/HEX";
import { hexToRgb } from "./hex";
import { boundAlpha } from "../helper";

export const defaultNamed: Named = { a: 1, n: "" };

export const enforceNamed = (named?: Partial<Named>): Named => {
  const result = generic.isEmpty(named) ? json.deepMerge(defaultNamed) : json.deepMerge(defaultNamed, named);
  result.n = result.n.toLowerCase();

  return result;
};

export const namedToRgb = (named?: Partial<Named>): RGB | undefined => {
  const _named = enforceNamed(named);

  if (generic.isEmpty(_named.n)) return undefined;
  const hex: string | undefined = colorNames[_named.n];
  if (generic.isEmpty(hex)) return undefined;

  const hexObject: HEX = {
    type: "hex",
    a: boundAlpha(_named.a),
    x: hex,
  };

  return hexToRgb(hexObject);
};
