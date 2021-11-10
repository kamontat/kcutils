import { json, generic } from "@kcutils/helper";
import { Throwable } from "@kcutils/error";
import { WithLogger, LoggerBuilder, LoggerSettingBuilder, UpdateOptionFn } from "@kcutils/logger";

import { NumberTypeString, RGB, HSL, HSV, HEX, Named } from "..";

import { boundAlpha, between, bound01, rounding } from "../utils/helper";
import { rgbToHsl, rgbToHsv, rgbToHex, hslToRgb, hsvToRgb, toType } from "../utils/converter";
import { validateRGB } from "../utils/converter/color";
import { rgbToNamed, RGBHexOptions, rgbToRgb } from "../utils/converter/rgb";

import { TypeNotFoundError } from "../errors/converter";
import { InvalidateColorError } from "../errors/color";

export class Color extends WithLogger {
  private static counter: number = 0;
  private static increaseCounter() {
    Color.counter++;
  }

  protected id: number;

  private rgb?: RGB;
  private error?: Throwable;

  private raw: RGB;

  constructor(rgb: RGB, loggerBuilder?: LoggerBuilder<"">) {
    const id = Color.counter;
    Color.increaseCounter();

    super(
      loggerBuilder?.updateOption(b =>
        b.withScopes(["color", id.toString(10)]).withSetting("filename", LoggerSettingBuilder.disabled())
      )
    );

    this.id = id;
    this.raw = rgb;

    if (validateRGB(rgb, false)) this.rgb = json.deepMerge({ a: 1 }, rgb);
    else this.error = InvalidateColorError(this.getId().toString(), JSON.stringify(this.raw));

    if (this.rgb) this.rgb.a = boundAlpha(this.rgb.a);
    this.logger.print("debug", `initiaize color object ${this.id} (valid = ${this.isValid()})`);
  }

  setLoggerOption(fn: UpdateOptionFn<"", "">): this {
    this.updateLoggerOption(fn);
    return this;
  }

  setAlpha(a: number): this {
    return this.setRGB({ a: boundAlpha(a) });
  }

  setRGB(rgb: Partial<RGB>): this {
    const oldRGB = this.toRGB("number");

    try {
      if (rgb.type !== "number")
        return this.setRGB(
          Object.assign(
            {},
            oldRGB,
            toType("number", json.cleanObject(Object.assign({ type: "number" }, rgb)) as RGB, { min: 0, max: 255 })
          )
        );

      const newRGB = Object.assign({}, oldRGB, rgb);
      this.raw = newRGB;
      this.rgb = newRGB; // impossible to be invalid color because toType already fix all invalid data
    } catch (e) {
      const throwable = Throwable.from(e, true);
      this.error = throwable;
    }

    return this;
  }

  getId(): number {
    return this.id;
  }

  getAlpha(): number {
    return this.rgb?.a ?? 1;
  }

  /**
   * http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness(format: NumberTypeString = "number"): number {
    const rgb = this.toRGB();
    const result = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000; // 0 - 255

    if (format === "number") return rounding(result, 3);
    else if (format === "decimal") return bound01(result, { min: 0, max: 255, digit: 2 });
    else if (format === "percent") return rounding(bound01(result, { min: 0, max: 255, digit: 4 }) * 100, 4);
    else throw TypeNotFoundError(format);
  }

  /**
   * http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance(): number {
    const rgb = this.toRGB("decimal");

    let R: number, G: number, B: number;

    if (rgb.r <= 0.03928) {
      R = rgb.r / 12.92;
    } else {
      R = Math.pow((rgb.r + 0.055) / 1.055, 2.4);
    }

    if (rgb.g <= 0.03928) {
      G = rgb.g / 12.92;
    } else {
      G = Math.pow((rgb.g + 0.055) / 1.055, 2.4);
    }

    if (rgb.b <= 0.03928) {
      B = rgb.b / 12.92;
    } else {
      B = Math.pow((rgb.b + 0.055) / 1.055, 2.4);
    }

    const result = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return rounding(result, 4);
  }

  isDark(): boolean {
    return this.getBrightness() < 128;
  }

  isLight(): boolean {
    return !this.isDark();
  }

  isValid(): boolean {
    return generic.noExist(this.error);
  }

  // true only alpha is [0-1], exclusive 1
  hasAlpha(): boolean {
    const a = this.rgb?.a;
    if (generic.nonEmpty(a) && a >= 0 && a < 1) return true;
    else return false;
  }

  throw(): this {
    if (generic.isExist(this.error)) throw this.error;
    return this;
  }

  toRGB(type: NumberTypeString = "number"): RGB {
    this.throw();
    return rgbToRgb(this.rgb as RGB, type);
  }

  toRGBString(): string {
    const rgb = this.toRGB();

    return this.hasAlpha() ? `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})` : `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }

  toHSL(): HSL {
    return rgbToHsl(this.toRGB());
  }

  toHSLString(): string {
    const hsl = this.toHSL();
    return this.hasAlpha() ? `hsla(${hsl.h},${hsl.s},${hsl.l},${hsl.a})` : `hsl(${hsl.h},${hsl.s},${hsl.l})`;
  }

  toHSV(): HSV {
    return rgbToHsv(this.toRGB());
  }

  toHSVString(): string {
    const hsv = this.toHSV();
    return this.hasAlpha() ? `hsva(${hsv.h},${hsv.s},${hsv.v},${hsv.a})` : `hsv(${hsv.h},${hsv.s},${hsv.v})`;
  }

  toHex(opts?: RGBHexOptions): HEX {
    return rgbToHex(this.toRGB(), opts);
  }

  toHexString(opts?: RGBHexOptions): string {
    return this.toHex(opts).x;
  }

  toNamed(): Named | undefined {
    return rgbToNamed(this.toRGB());
  }

  toNamedString(): string {
    const named = this.toNamed();
    if (named === undefined) return "";
    else return named.n;
  }

  clone(): Color {
    return new Color(this.toRGB(), LoggerBuilder.load(this.logger));
  }

  copyRGB(rgb: Partial<RGB>): Color {
    return new Color(Object.assign({}, this.toRGB(), rgb), LoggerBuilder.load(this.logger));
  }

  copyHSL(hsl: Partial<HSL>): Color {
    const newHSL = Object.assign({}, this.toHSL(), hsl);
    return new Color(hslToRgb(newHSL), LoggerBuilder.load(this.logger));
  }

  copyHSV(hsv: Partial<HSV>): Color {
    const newHSV = Object.assign({}, this.toHSV(), hsv);
    return new Color(hsvToRgb(newHSV), LoggerBuilder.load(this.logger));
  }

  toString(): string {
    return this.toRGBString();
  }

  mix(c: Color, amount: number = 50): Color {
    const p = between(amount, { max: 100 }) / 100;
    const rgb1 = this.toRGB("number");
    const rgb2 = c.toRGB("number");

    const rgb: RGB = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a,
      type: rgb1.type,
    };

    return new Color(rgb, LoggerBuilder.load(this.logger));
  }
}
