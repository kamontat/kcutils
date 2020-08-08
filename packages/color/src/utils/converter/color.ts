import { generic } from "@kcutils/helper";

import { RGB, OptionalRGB, isRGB, RawRGB } from "../../typings/RGB";
import { OptionalHSL, isHSL, RawHSL } from "../../typings/HSL";
import { OptionalHSV, RawHSV, isHSV } from "../../typings/HSV";
import { OptionalHEX, RawHEX, isHex } from "../../typings/HEX";
import { OptionalNamed, RawNamed, isNamed } from "../../typings/Named";

import { hslToRgb } from "./hsl";
import { rgbToRgb } from "./rgb";
import { bound01, mergeObject } from "../helper";
import { hsvToRgb } from "./hsv";
import { trimLeft, trimRight, colorNames, colorMatchers } from "../constants";
import { cParseFloat, cParseInt } from "../parser";
import { hexToRgb } from "./hex";
import { namedToRgb } from "./named";

export const defaultAlpha = <T extends Input>(input: T): T => {
  return Object.assign({ a: 1 }, input);
};

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
  if (isRGB(input)) return mergeObject<RGB>({ a: 1 }, rgbToRgb(input));
  else if (isHSL(input)) return mergeObject<RGB>({ a: 1 }, hslToRgb(input));
  else if (isHSV(input)) return mergeObject<RGB>({ a: 1 }, hsvToRgb(input));
  else if (isHex(input)) return mergeObject<RGB>({ a: 1 }, hexToRgb(input));
  else if (isNamed(input)) return mergeObject<RGB>({ a: 1 }, namedToRgb(input));

  return undefined;
};

export const validateRGB = (rgb: RGB | undefined, withAlpha: boolean = true): boolean => {
  if (!generic.nonEmpty(rgb)) return false;
  const _rgb = rgbToRgb(rgb as RGB, "number");
  const r = _rgb.r >= 0 && _rgb.r <= 255;
  const g = _rgb.g >= 0 && _rgb.g <= 255;
  const b = _rgb.b >= 0 && _rgb.b <= 255;

  const isRGB = r && g && b;
  if (withAlpha) {
    const a = _rgb.a >= 0 && _rgb.a <= 1;
    return isRGB && a;
  } else return isRGB;
};
