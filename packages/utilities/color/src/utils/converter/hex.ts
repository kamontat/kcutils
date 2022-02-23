import { generic, json } from "@kcutils/helper";

import { colorMatchers } from "../constants";

import { cParseInt, cParseString } from "../parser";
import { bound01, boundAlpha } from "../helper";

import { RGB } from "../../typings/RGB";
import { OptionalHEX, HEX } from "../../typings/HEX";

export const defaultHex: HEX = { a: 1, type: "hex", x: "000000" };

export const enforceHex = (hex?: Partial<HEX>): HEX => {
  const result = generic.isEmpty(hex) ? json.deepMerge(defaultHex) : json.deepMerge(defaultHex, hex);

  return {
    x: cParseString(result.x),
    a: result.a,
    type: result.type,
  };
};

export const hexToRgb = (hex?: OptionalHEX): RGB | undefined => {
  const digit = 2;
  const _hex = enforceHex(hex);

  let match = colorMatchers.hex8.exec(_hex.x);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      a: bound01(cParseInt(match[4], 16), { max: 255, digit }),
      type: "number",
    };
  }

  match = colorMatchers.hex6.exec(_hex.x);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      a: boundAlpha(_hex.a),
      type: "number",
    };
  }

  match = colorMatchers.hex4.exec(_hex.x);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      a: bound01(cParseInt(match[4] + match[4], 16), { max: 255, digit }),
      type: "number",
    };
  }

  match = colorMatchers.hex3.exec(_hex.x);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      a: boundAlpha(_hex.a),
      type: "number",
    };
  }
};
