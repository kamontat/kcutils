import type { NumberType, Type } from "../typings/NumberType";
import { inputToRGB, RawInput, Input } from "../utils/converter/color";
import { Color } from "../models/Color";
import { RawRGB, RGB } from "../typings/RGB";

import { ColorNotFoundError } from "../errors/color";

import {
  ColorModificationFunc,
  ColorCombinationFunc,
  brighten,
  lighten,
  darken,
  saturate,
  desaturate,
  spin,
  complement,
  splitcomplement,
  triad,
  tetrad,
  analogous,
  monochromatic,
  MonochromaticOption,
  AnalogousOption,
} from "../utils/color";
import { generic } from "@kcutils/helper";
import { enforceNamed } from "../utils/converter/named";

import { enforceHex } from "../utils/converter";

const rawToInput = (r: RawInput, t: Type): Input => {
  return Object.assign({ type: t } as NumberType, r) as Input;
};

export class ColorBuilder {
  static get numberType(): Record<Type, Type> {
    return {
      number: "number",
      decimal: "decimal",
      percent: "percent",
    };
  }

  static black(): Color {
    return ColorBuilder.fromPercentage<RawRGB>({ r: 0, g: 0, b: 0 }).get();
  }

  static white(): Color {
    return ColorBuilder.fromPercentage<RawRGB>({
      r: 100,
      g: 100,
      b: 100,
    }).get();
  }

  static fromType<I extends RawInput>(
    input: I,
    t: Type,
    alpha: number = -1
  ): ColorBuilder {
    const _input = rawToInput(input, t);
    const rgb = inputToRGB(_input);
    if (generic.isExist(rgb)) {
      if (alpha >= 0) rgb.a = alpha;
      return new ColorBuilder(new Color(rgb));
    }
    return new ColorBuilder();
  }

  static fromRatio<I extends RawInput>(
    input: I,
    alpha: number = -1
  ): ColorBuilder {
    return ColorBuilder.fromType(input, "decimal", alpha);
  }

  static fromPercentage<I extends RawInput>(
    input: I,
    alpha: number = -1
  ): ColorBuilder {
    return ColorBuilder.fromType(input, "percent", alpha);
  }

  static fromNumber<I extends RawInput>(
    input: I,
    alpha: number = -1
  ): ColorBuilder {
    return ColorBuilder.fromType(input, "number", alpha);
  }

  static fromHex(input: string, alpha?: number): ColorBuilder {
    const rgb = inputToRGB(enforceHex({ x: input, a: alpha }));
    return new ColorBuilder(rgb && new Color(rgb));
  }

  static fromNamed(input: string, alpha?: number): ColorBuilder {
    const rgb = inputToRGB(enforceNamed({ n: input, a: alpha }));
    return new ColorBuilder(rgb && new Color(rgb));
  }

  static fromColor(c: Color): ColorBuilder {
    return new ColorBuilder(c);
  }

  static random(includeAlpha: boolean = false): ColorBuilder {
    const a = includeAlpha ? Math.random() : 1;
    return ColorBuilder.fromRatio<RawRGB>(
      { r: Math.random(), g: Math.random(), b: Math.random() },
      a
    );
  }

  private constructor(private readonly color?: Color) {}

  get(): Color {
    if (this.color === undefined) throw ColorNotFoundError();
    return this.color;
  }

  update(rgb: Partial<RGB>): ColorBuilder {
    if (this.color) this.color.setRGB(rgb);
    return this;
  }

  brighten(amount: number = 10): ColorBuilder {
    return this.applyModification(brighten, amount);
  }

  lighten(amount: number = 10): ColorBuilder {
    return this.applyModification(lighten, amount);
  }

  darken(amount: number = 10): ColorBuilder {
    return this.applyModification(darken, amount);
  }

  saturate(amount: number = 10): ColorBuilder {
    return this.applyModification(saturate, amount);
  }

  desaturate(amount: number = 10): ColorBuilder {
    return this.applyModification(desaturate, amount);
  }

  greyscale(): ColorBuilder {
    return this.desaturate(100);
  }

  spin(amount: number = 0): ColorBuilder {
    return this.applyModification(spin, amount);
  }

  complement(): Color {
    return this.applyCombination(complement, void 0);
  }

  splitcomplement(): [Color, Color, Color] {
    return this.applyCombination(splitcomplement, void 0);
  }

  triad(): [Color, Color, Color] {
    return this.applyCombination(triad, void 0);
  }

  tetrad(): [Color, Color, Color, Color] {
    return this.applyCombination(tetrad, void 0);
  }

  analogous(options: AnalogousOption): Color[] {
    return this.applyCombination(analogous, options);
  }

  monochromatic(options: MonochromaticOption): Color[] {
    return this.applyCombination(monochromatic, options);
  }

  // apply change to current object
  private applyModification<V>(
    fn: ColorModificationFunc<V>,
    args: V
  ): ColorBuilder {
    const color: RGB = fn(this.get(), args);
    return this.update(color);
  }

  // apply change to new object
  private applyCombination<V, R>(fn: ColorCombinationFunc<V, R>, args: V): R {
    return fn(this.get().clone(), args);
  }
}
