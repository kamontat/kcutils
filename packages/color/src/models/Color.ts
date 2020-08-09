import { json, generic } from "@kcutils/helper";
import { WithLogger, LoggerOption } from "@kcutils/logger";

import { boundAlpha, between } from "../utils/helper";
import { rgbToHsl, rgbToHsv, rgbToHex, hslToRgb, hsvToRgb, toType } from "../utils/converter";
import { validateRGB } from "../utils/converter/color";
import { rgbToNamed, RGBHexOptions, rgbToRgb } from "../utils/converter/rgb";

import { RGB } from "../typings/RGB";
import { HSL } from "../typings/HSL";
import { HSV } from "../typings/HSV";
import { HEX } from "../typings/HEX";
import { Named } from "../typings/Named";
import { Type } from "../typings/NumberType";

import { InvalidateColorError } from "../errors/color";

export class Color extends WithLogger {
  private static counter: number = 0;
  private static increaseCounter() {
    Color.counter++;
  }

  protected id: number;

  private valid: boolean;
  private rgb?: RGB;
  private raw: RGB;

  private readonly loggerOptions?: LoggerOption<"">;

  constructor(rgb: RGB, loggerOptions?: LoggerOption<"">) {
    const id = Color.counter;
    Color.increaseCounter();

    super(Object.assign({ scopes: ["color", id], settings: { filename: false } }, loggerOptions));

    if (validateRGB(rgb, false)) {
      this.valid = true;
      this.rgb = json.deepMerge({ a: 1 }, rgb);
    } else {
      this.valid = false;
    }

    this.raw = rgb;
    this.id = id;
    this.loggerOptions = loggerOptions;

    this.logger.print("start", `initiaize color object (valid = ${this.valid})`);
  }

  setAlpha(a: number): this {
    return this.setRGB({ a: boundAlpha(a) });
  }

  setRGB(rgb: Partial<RGB>): this {
    const oldRGB = this.toRGB("number");
    let newRGB = oldRGB;
    if (rgb.type) {
      if (rgb.type === "number") {
        newRGB = Object.assign({}, oldRGB, rgb);
      } else {
        this.setRGB(toType("number", rgb as RGB, { max: 255, min: 0 }));
      }
    } else {
      newRGB = Object.assign({}, oldRGB, rgb);
    }

    if (validateRGB(newRGB)) {
      this.valid = true;
      this.rgb = newRGB;
    } else {
      this.valid = false;
    }

    return this;
  }

  getId(): number {
    return this.id;
  }

  /**
   * http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness(): number {
    const rgb = this.toRGB();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  /**
   * http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance(): number {
    const rgb = this.toRGB();
    let R: number, G: number, B: number;

    const RsRGB = rgb.r / 255;
    const GsRGB = rgb.g / 255;
    const BsRGB = rgb.b / 255;

    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  isDark(): boolean {
    return this.getBrightness() < 128;
  }

  isLight(): boolean {
    return !this.isDark();
  }

  isValid(): boolean {
    return this.valid;
  }

  check(): this {
    if (this.isValid()) {
      return this;
    }

    throw InvalidateColorError(this.getId().toString(), JSON.stringify(this.raw));
  }

  // true only alpha is [0-1], exclusive 1
  hasAlpha(): boolean {
    const a = this.rgb?.a;
    if (generic.nonEmpty(a) && a >= 0 && a < 1) return true;
    else return false;
  }

  throw(): void {
    if (!this.isValid()) throw InvalidateColorError(this.getId().toString(), JSON.stringify(this.raw));
  }

  toRGB(type: Type = "number"): RGB {
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

  toHex(): HEX {
    return rgbToHex(this.toRGB());
  }

  toHexString(opts?: RGBHexOptions): string {
    return rgbToHex(this.toRGB(), opts).x;
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
    return new Color(this.toRGB(), this.loggerOptions);
  }

  copyRGB(rgb: Partial<RGB>): Color {
    return new Color(Object.assign({}, this.toRGB(), rgb), this.loggerOptions);
  }

  copyHSL(hsl: Partial<HSL>): Color {
    const newHSL = Object.assign({}, this.toHSL(), hsl);
    return new Color(hslToRgb(newHSL), this.loggerOptions);
  }

  copyHSV(hsv: Partial<HSV>): Color {
    const newHSV = Object.assign({}, this.toHSV(), hsv);
    return new Color(hsvToRgb(newHSV), this.loggerOptions);
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

    return new Color(rgb, this.loggerOptions);
  }
}
