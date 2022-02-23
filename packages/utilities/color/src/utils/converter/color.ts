import { generic, type } from "@kcutils/helper";

import { RGB, OptionalRGB, isRGB, RawRGB } from "../../typings/RGB";
import { OptionalHSL, isHSL, RawHSL } from "../../typings/HSL";
import { OptionalHSV, RawHSV, isHSV } from "../../typings/HSV";
import { OptionalHEX, RawHEX, isHex } from "../../typings/HEX";
import { OptionalNamed, RawNamed, isNamed } from "../../typings/Named";

import { hslToRgb } from "./hsl";
import { rgbToRgb } from "./rgb";
import { bound01 } from "../helper";
import { hsvToRgb } from "./hsv";
import { trimLeft, trimRight, colorNames, colorMatchers } from "../constants";
import { cParseFloat, cParseInt } from "../parser";
import { hexToRgb } from "./hex";
import { namedToRgb } from "./named";
import { C } from "../../typings/C";

export type Input = OptionalRGB | OptionalHSL | OptionalHSV | OptionalHEX | OptionalNamed;
export type RawInput = RawRGB | RawHSL | RawHSV | RawHEX | RawNamed;

/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 *
 * @param color string color
 */
export const stringToInput = (color: string): Input | undefined => {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  if (colorNames[color]) {
    color = colorNames[color];
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, type: "number" };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  let match = colorMatchers.rgb.exec(color);
  if (match) {
    return { r: cParseFloat(match[1]), g: cParseFloat(match[2]), b: cParseFloat(match[3]), type: "number" };
  }

  match = colorMatchers.rgba.exec(color);
  if (match) {
    return {
      r: cParseFloat(match[1]),
      g: cParseFloat(match[2]),
      b: cParseFloat(match[3]),
      a: cParseFloat(match[4]),
      type: "number",
    };
  }

  match = colorMatchers.hsl.exec(color);
  if (match) {
    return { h: cParseFloat(match[1]), s: cParseFloat(match[2]), l: cParseFloat(match[3]), type: "number" };
  }

  match = colorMatchers.hsla.exec(color);
  if (match) {
    return {
      h: cParseFloat(match[1]),
      s: cParseFloat(match[2]),
      l: cParseFloat(match[3]),
      a: cParseFloat(match[4]),
      type: "number",
    };
  }

  match = colorMatchers.hsv.exec(color);
  if (match) {
    return { h: cParseFloat(match[1]), s: cParseFloat(match[2]), v: cParseFloat(match[3]), type: "number" };
  }

  match = colorMatchers.hsva.exec(color);
  if (match) {
    return {
      h: cParseFloat(match[1]),
      s: cParseFloat(match[2]),
      v: cParseFloat(match[3]),
      a: cParseFloat(match[4]),
      type: "number",
    };
  }

  match = colorMatchers.hex8.exec(color);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      a: bound01(cParseInt(match[4], 16), { max: 255, digit: 0 }),
      type: "number",
    };
  }

  match = colorMatchers.hex6.exec(color);
  if (match) {
    return {
      r: cParseInt(match[1], 16),
      g: cParseInt(match[2], 16),
      b: cParseInt(match[3], 16),
      type: "number",
    };
  }

  match = colorMatchers.hex4.exec(color);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      a: bound01(cParseInt(match[4] + match[4], 16), { max: 255, digit: 0 }),
      type: "number",
    };
  }

  match = colorMatchers.hex3.exec(color);
  if (match) {
    return {
      r: cParseInt(match[1] + match[1], 16),
      g: cParseInt(match[2] + match[2], 16),
      b: cParseInt(match[3] + match[3], 16),
      type: "number",
    };
  }

  return undefined;
};

export const inputToRGB = (input: Input): RGB | undefined => {
  if (isRGB(input)) return rgbToRgb(input);
  else if (isHSL(input)) return hslToRgb(input);
  else if (isHSV(input)) return hsvToRgb(input);
  else if (isHex(input)) return hexToRgb(input);
  else if (isNamed(input)) return namedToRgb(input);

  return undefined;
};

type Rule = {
  type: "string" | "number" | "boolean";
  range?: {
    min: number;
    max: number;
  };
};

type Condition = Record<string, Rule>;

export const validateRGB = (rgb: type.Optional<RGB>, withAlpha: boolean = true): boolean => {
  const condition: Condition = {
    r: {
      type: "number",
      range: { min: 0, max: 255 },
    },
    g: {
      type: "number",
      range: { min: 0, max: 255 },
    },
    b: {
      type: "number",
      range: { min: 0, max: 255 },
    },
  };

  if (withAlpha) condition["a"] = { type: "number", range: { min: 0, max: 1 } };
  return validateColorObject(rgb, condition);
};

export const validateColorObject = (obj: type.Optional<C<string, any>>, condition: Condition): boolean => {
  if (generic.isEmpty(obj)) return false;

  const arr = Object.keys(obj);
  return arr.every(key => {
    const value = obj[key];
    const cond = condition[key];
    if (generic.isEmpty(cond)) return true;

    const type = cond.type;
    if (type === "string" && !generic.isString(value)) return false;
    if (type === "number" && !generic.isNumber(value)) return false;
    if (type === "boolean" && !generic.isBoolean(value)) return false;

    if (generic.isNumber(value) && generic.isExist(cond.range))
      return value >= cond.range.min && value <= cond.range.max;
    if (generic.isString(value) && generic.isExist(cond.range))
      return value.length >= cond.range.min && value.length <= cond.range.max;

    return false;
  });
};
