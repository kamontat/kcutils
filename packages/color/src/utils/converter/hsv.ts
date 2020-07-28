import { HSV } from "../../typings/HSV";
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
export const hsvToHsv = (hsv: HSV, type: Type = "number"): HSV => {
  if (isType(hsv, type)) return hsv;
  const _h: C<"h", number> & NumberType = { h: hsv.h, type: hsv.type };
  const h = toType(type, _h, { max: 360, min: 0 });
  const sl = toType(type, hsv, { max: 100, min: 0 });
  return { ...sl, h: h.h, a: hsv.a };
};

/**
 * Converts an HSL color value to RGB.
 *
 * @param hsl any type of hsl object
 *
 * @return rgb object with number 0-255
 */
export const hsvToRgb = (hsl: HSV): RGB => {
  const _hsv = hsvToHsv(hsl, "decimal");

  const i = Math.floor(_hsv.h);
  const f = _hsv.h - i;
  const p = _hsv.v * (1 - _hsv.s);
  const q = _hsv.v * (1 - f * _hsv.s);
  const t = _hsv.v * (1 - (1 - f) * _hsv.s);
  const mod = i % 6;
  const r = [_hsv.v, q, p, p, t, _hsv.v][mod];
  const g = [t, _hsv.v, _hsv.v, q, p, p][mod];
  const b = [p, p, t, _hsv.v, _hsv.v, q][mod];

  const rgb: RGB = { r, g, b, a: hsl.a, type: "decimal" };
  return rgbToRgb(rgb, "number");
};
