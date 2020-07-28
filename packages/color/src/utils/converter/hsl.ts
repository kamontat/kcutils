import { HSL } from "../../typings/HSL";
import { C } from "../../typings/C";
import { NumberType, Type } from "../../typings/NumberType";

import { toType } from "./type";
import { isType } from "../checker";
import { RGB } from "../../typings/RGB";
import { rgbToRgb } from "./rgb";

/**
 * convert hsl object to number type of hsl object
 *
 * @param hsl any type of hsl object
 * @returns number of hsl object
 */
export const hslToHsl = (hsl: HSL, type: Type = "number"): HSL => {
  if (isType(hsl, type)) return hsl;
  const _h: C<"h", number> & NumberType = { h: hsl.h, type: hsl.type };
  const h = toType(type, _h, { max: 360, min: 0 });
  const sl = toType(type, hsl, { max: 100, min: 0 });
  return { ...sl, h: h.h, a: hsl.a };
};

/**
 * Converts an HSL color value to RGB.
 *
 * @param hsl any type of hsl object
 *
 * @return rgb object with number 0-255
 */
export const hslToRgb = (hsl: HSL): RGB => {
  const _hsl = hslToHsl(hsl, "decimal");

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r = 0;
  let g = 0;
  let b = 0;

  if (_hsl.s === 0) {
    r = g = b = _hsl.l; // achromatic
  } else {
    const q = _hsl.l < 0.5 ? _hsl.l * (1 + _hsl.s) : _hsl.l + _hsl.s - _hsl.l * _hsl.s;
    const p = 2 * _hsl.l - q;
    r = hue2rgb(p, q, _hsl.h + 1 / 3);
    g = hue2rgb(p, q, _hsl.h);
    b = hue2rgb(p, q, _hsl.h - 1 / 3);
  }

  const rgb: RGB = { r, g, b, a: hsl.a, type: "decimal" };
  return rgbToRgb(rgb);
};
