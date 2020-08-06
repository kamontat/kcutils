import { colorMatchers } from "../constants";

import { cParseInt } from "../parser";
import { bound01 } from "../helper";

import { RGB } from "../../typings/RGB";
import { OptionalHEX } from "../../typings/HEX";

export const hexToRgb = (hex: OptionalHEX): RGB | undefined => {
  const a = hex.a ?? 1;

  let match = colorMatchers.hex8.exec(hex.x);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      a: bound01(cParseInt(match[4], 16), { max: 255, digit: 0 }),
      type: "number",
    };
  }

  match = colorMatchers.hex6.exec(hex.x);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      a,
      type: "number",
    };
  }

  match = colorMatchers.hex4.exec(hex.x);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      a: bound01(cParseInt(match[4] + match[4], 16), { max: 255, digit: 0 }),
      type: "number",
    };
  }

  match = colorMatchers.hex3.exec(hex.x);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      a,
      type: "number",
    };
  }
};
