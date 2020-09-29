import { generic, json } from "@kcutils/helper";

import { HSV } from "../../typings/HSV";
import { C } from "../../typings/C";
import { NumberType, Type } from "../../typings/NumberType";

import { toType } from "./type";
import { isType } from "../checker";
import { boundAlpha, rounding } from "../helper";

import { RGB } from "../../typings/RGB";
import { rgbToRgb } from "./rgb";

export const defaultHSV: HSV = { h: 0, s: 0, v: 0, a: 1, type: "decimal" };

export const enforceHSV = (hsv?: Partial<HSV>): HSV => {
  if (generic.isEmpty(hsv)) return json.deepMerge(defaultHSV);
  return json.deepMerge(defaultHSV, hsv);
};

export const roundedHSV = (hsv: HSV, digit?: number): HSV => {
  const defaultDigit = hsv.type === "decimal" ? 3 : 0;
  const _digit = generic.isNumber(digit) ? digit : defaultDigit;

  return {
    type: hsv.type,
    a: boundAlpha(hsv.a),
    h: rounding(hsv.h, _digit),
    s: rounding(hsv.s, _digit),
    v: rounding(hsv.v, _digit),
  };
};

/**
 * convert hsl object to number type of hsl object
 *
 * @param hsl any type of hsl object
 * @returns number of hsl object
 */
export const hsvToHsv = (hsv: Partial<HSV>, type: Type = "number"): HSV => {
  const _hsv = enforceHSV(hsv);
  if (isType(_hsv, type)) return _hsv;
  const _h: C<"h", number> & NumberType = { h: _hsv.h, type: _hsv.type };
  const h = toType(type, _h, { max: 360, min: 0 });
  const sl = toType(type, _hsv, { max: 100, min: 0 });
  const result = Object.assign(sl, { h: h.h }, { a: boundAlpha(_hsv.a) });

  return enforceHSV(result); // fill all missing data
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
