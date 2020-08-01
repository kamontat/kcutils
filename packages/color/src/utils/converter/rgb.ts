import { noExist } from "@kcutils/helper/lib/types/generic";

import { toType } from "./type";

import { RGB } from "../../typings/RGB";
import { HSL } from "../../typings/HSL";
import { HSV } from "../../typings/HSV";
import { Type } from "../../typings/NumberType";
import { HEX } from "../../typings/HEX";
import { Type as HexType } from "../../typings/HexType";
import { Named } from "../../typings/Named";

import { hexNames } from "../constants";
import { pad2, percentage, nonEmpty, boundAlpha } from "../helper";

export const defaultRGB: RGB = { r: 0, g: 0, b: 0, a: 1, type: "number" };

export const enforceRGB = (rgb: RGB): RGB => {
  if (noExist(rgb)) return defaultRGB;
  return Object.assign(defaultRGB, rgb);
};

/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 *
 * @param rgb any type of rgb object or incompleted rgb object
 * @return number type of rgb object
 */
export const rgbToRgb = (rgb: RGB, type: Type = "number"): RGB => {
  const _rgb = toType(type, rgb, { min: 0, max: 255 });
  const forceRGB = enforceRGB(_rgb);

  return { ...forceRGB, a: boundAlpha(rgb.a) }; // force a to be [0-1]
};

/**
 * Converts an RGB color value to HSL.
 *
 * @param rgb any type of rgb object
 * @return decimal type of hsl object
 */
export const rgbToHsl = (rgb: RGB): HSL => {
  const _rgb = rgbToRgb(rgb);
  const max = Math.max(_rgb.r, _rgb.g, _rgb.b);
  const min = Math.min(_rgb.r, _rgb.g, _rgb.b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case _rgb.r:
        h = (_rgb.g - _rgb.b) / d + (_rgb.g < _rgb.b ? 6 : 0);
        break;
      case _rgb.g:
        h = (_rgb.b - _rgb.r) / d + 2;
        break;
      case _rgb.b:
        h = (_rgb.r - _rgb.g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l, a: boundAlpha(_rgb.a), type: "decimal" };
};

/**
 * Converts an RGB color value to HSV.
 *
 * @param rgb any type of rgb object
 * @return decimal type of hsv object
 */
export const rgbToHsv = (rgb: RGB): HSV => {
  const _rgb = rgbToRgb(rgb);

  const max = Math.max(_rgb.r, _rgb.g, _rgb.b);
  const min = Math.min(_rgb.r, _rgb.g, _rgb.b);

  let h = 0;
  let s = 0;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case _rgb.r:
        h = (_rgb.g - _rgb.b) / d + (_rgb.g < _rgb.b ? 6 : 0);
        break;
      case _rgb.g:
        h = (_rgb.b - _rgb.r) / d + 2;
        break;
      case _rgb.b:
        h = (_rgb.r - _rgb.g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, v, a: boundAlpha(rgb.a), type: "decimal" };
};

export type RGBHexOptions = { minify?: boolean; alpha?: boolean };

/**
 * Converts an RGBA color plus alpha transparency to hex
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 *
 * @param rgb any type of rgb object
 * @param opts options
 */
export const rgbToHex = (rgb: RGB, opts?: RGBHexOptions): HEX => {
  let result = "";
  const minify = opts?.minify ?? false;
  const alpha = opts?.alpha ?? false;

  const _rgb = rgbToRgb(rgb);
  const hex = [
    pad2(Math.round(_rgb.r).toString(16)),
    pad2(Math.round(_rgb.g).toString(16)),
    pad2(Math.round(_rgb.b).toString(16)),
  ];

  if (alpha) hex.push(pad2(percentage(_rgb.a, { min: 0, max: 1 }, true).toString(16)));

  if (
    minify &&
    hex[0].charAt(0) == hex[0].charAt(1) &&
    hex[1].charAt(0) == hex[1].charAt(1) &&
    hex[2].charAt(0) == hex[2].charAt(1)
  ) {
    const init = hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    if (alpha && hex[3].charAt(0) == hex[3].charAt(1)) result = init + hex[3].charAt(0);
    else result = init;
  }

  result = hex.join("");

  let type: HexType = "hex";

  switch (result.length) {
    case 3:
      type = "hex3";
      break;
    case 4:
      type = "hex4";
      break;
    case 6:
      type = "hex6";
      break;
    case 8:
      type = "hex8";
      break;
  }

  return {
    x: result,
    a: boundAlpha(rgb.a),
    type,
  };
};

/**
 * Converts an RGB color to Named if exist, or undefined
 *
 * @param rgb any type of rgb object
 */
export const rgbToNamed = (rgb: RGB): Named | undefined => {
  const hex = rgbToHex(rgb, { alpha: false, minify: true });
  const name = hexNames[hex.x];
  if (!nonEmpty(name)) return undefined;
  else return { n: name, a: boundAlpha(rgb.a) };
};
