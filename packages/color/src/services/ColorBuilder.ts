import { NumberType, Type } from "../typings/NumberType";
import { inputToRGB, RawInput, Input } from "../utils/converter/color";
import { Color } from "../models/Color";
import { RawRGB, RGB } from "../typings/RGB";

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

const rawToInput = (r: RawInput, t: Type): Input => {
  return Object.assign({ type: t } as NumberType, r) as Input;
};

export class ColorBuilder {
  static black(): Color {
    return ColorBuilder.fromPercentage<RawRGB>({ r: 0, g: 0, b: 0 }).get();
  }

  static white(): Color {
    return ColorBuilder.fromPercentage<RawRGB>({ r: 100, g: 100, b: 100 }).get();
  }

  static fromType<I extends RawInput>(input: I, t: Type): ColorBuilder {
    const _input = rawToInput(input, t);
    const rgb = inputToRGB(_input);
    return new ColorBuilder(rgb && new Color(rgb));
  }

  static fromRatio<I extends RawInput>(input: I): ColorBuilder {
    return ColorBuilder.fromType(input, "decimal");
  }

  static fromPercentage<I extends RawInput>(input: I): ColorBuilder {
    return ColorBuilder.fromType(input, "percent");
  }

  static fromNumber<I extends RawInput>(input: I): ColorBuilder {
    return ColorBuilder.fromType(input, "number");
  }

  static fromNamed(input: string, a?: number): ColorBuilder {
    const rgb = inputToRGB(Object.assign({}, a && { a }, { n: input }));
    return new ColorBuilder(rgb && new Color(rgb));
  }

  static random(): ColorBuilder {
    return ColorBuilder.fromRatio<RawRGB>({ r: Math.random(), g: Math.random(), b: Math.random() });
  }

  private constructor(private color?: Color) {}

  get(): Color {
    if (this.color === undefined) throw new Error("cannot get color from color builder");
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
  private applyModification<V>(fn: ColorModificationFunc<V>, args: V): ColorBuilder {
    const color: RGB = fn(this.get(), args);
    return this.update(color);
  }

  // apply change to new object
  private applyCombination<V, R>(fn: ColorCombinationFunc<V, R>, args: V): R {
    return fn(this.get().clone(), args);
  }
}
