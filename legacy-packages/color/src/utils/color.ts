import { Color } from "../models/Color";

import { hslToRgb, rgbToRgb } from "./converter";
import { bound01 } from "./helper";

import { RGB } from "../typings/RGB";

export type Func<V, V2, R> = (v: V, v2: V2) => R;

export type ColorFunc<V, R> = Func<Color, V, R>;

export type ColorModificationFunc<V = number> = ColorFunc<V, RGB>;
export type ColorCombinationFunc<V = number, R = Color> = ColorFunc<V, R>;

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

export const brighten: ColorModificationFunc = (color, amount) => {
  const rgb = color.toRGB();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));

  return Object.assign(rgbToRgb(rgb), { a: rgb.a });
};

export const lighten: ColorModificationFunc = (color, amount) => {
  const hsl = color.toHSL();
  hsl.l += bound01(amount, { max: 100 });
  return Object.assign(hslToRgb(hsl), { a: hsl.a });
};

export const darken: ColorModificationFunc = (color, amount) => {
  const hsl = color.toHSL();
  hsl.l -= bound01(amount, { max: 100 });
  return Object.assign(hslToRgb(hsl), { a: hsl.a });
};

export const desaturate: ColorModificationFunc = (color, amount) => {
  const hsl = color.toHSL();
  hsl.s -= bound01(amount, { max: 100 });
  return Object.assign(hslToRgb(hsl), { a: hsl.a });
};

export const saturate: ColorModificationFunc = (color, amount) => {
  const hsl = color.toHSL();
  hsl.s += bound01(amount, { max: 100 });
  return Object.assign(hslToRgb(hsl), { a: hsl.a });
};

/**
 * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
 * Values outside of this range will be wrapped into this range.
 * @param color
 * @param amount
 */
export const spin: ColorModificationFunc = (color, amount) => {
  const hsl = color.toHSL();
  const hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return Object.assign(hslToRgb(hsl), { a: hsl.a });
};

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

export const complement: ColorCombinationFunc<void> = color => {
  const hsl = color.toHSL();
  return color.copyHSL({ h: (hsl.h + 180) % 360 });
};

export const triad: ColorCombinationFunc<void, [Color, Color, Color]> = color => {
  const hsl = color.toHSL();
  const h = hsl.h;
  return [color, color.copyHSL({ h: (h + 120) % 360 }), color.copyHSL({ h: (h + 240) % 360 })];
};

export const tetrad: ColorCombinationFunc<void, [Color, Color, Color, Color]> = color => {
  const h = color.toHSL().h;
  return [
    color,
    color.copyHSL({ h: (h + 90) % 360 }),
    color.copyHSL({ h: (h + 180) % 360 }),
    color.copyHSL({ h: (h + 270) % 360 }),
  ];
};

export const splitcomplement: ColorCombinationFunc<void, [Color, Color, Color]> = color => {
  const h = color.toHSL().h;
  return [color, color.copyHSL({ h: (h + 72) % 360 }), color.copyHSL({ h: (h + 216) % 360 })];
};

export type AnalogousOption = { results: number; slices: number };
export const analogous: ColorCombinationFunc<Partial<AnalogousOption>, Color[]> = (color, opts) => {
  const options: AnalogousOption = Object.assign({ results: 6, slices: 30 }, opts);

  const hsl = color.toHSL();
  const part = 360 / options.slices;
  const ret = [color];

  for (hsl.h = (hsl.h - ((part * options.results) >> 1) + 720) % 360; --options.results; ) {
    ret.push(color.copyHSL({ h: (hsl.h + part) % 360 }));
  }
  return ret;
};

export type MonochromaticOption = { results: number };
export const monochromatic: ColorCombinationFunc<Partial<MonochromaticOption>, Color[]> = (color, opts) => {
  const options: MonochromaticOption = Object.assign({ results: 6 }, opts);

  let v = color.toHSV().v;

  const ret = [];
  const modification = 1 / options.results;

  while (options.results >= 0) {
    ret.push(color.copyHSV({ v: v }));
    v = (v + modification) % 1;

    options.results--;
  }

  return ret;
};
