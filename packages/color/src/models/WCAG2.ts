import { WCAG2Param } from "../typings/WCAG2Param";
import { Color } from "./Color";
import { ColorBuilder } from "../services/ColorBuilder";

export interface MostReadableOption extends WCAG2Param {
  fallbackColors: boolean;
}

export class WCAG2 {
  private base: Color;
  constructor(private builder: ColorBuilder) {
    this.base = builder.get();
  }

  build(fn: (builder: ColorBuilder) => Color): this {
    this.base = fn(this.builder);
    return this;
  }

  new(c: Color): this {
    this.base = c;
    return this;
  }

  /**
   * Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
   *
   * @param color second color
   *
   * @return readability number for foreground or background color
   */
  readability(color: Color): number {
    return (
      (Math.max(this.base.getLuminance(), color.getLuminance()) + 0.05) /
      (Math.min(this.base.getLuminance(), color.getLuminance()) + 0.05)
    );
  }

  isReadable(color: Color, wcag2?: Partial<WCAG2Param>): boolean {
    const readabilityIndex = this.readability(color);
    const params = this.validateWCAG2Parms(wcag2);

    switch (params.level + params.size) {
      case "AAsmall":
      case "AAAlarge":
        return readabilityIndex >= 4.5;
      case "AAlarge":
        return readabilityIndex >= 3;
      case "AAAsmall":
        return readabilityIndex >= 7;
      default:
        return false;
    }
  }

  mostReadable(colors: Color[], opts?: Partial<MostReadableOption>): Color | undefined {
    const options = Object.assign({ fallbackColors: true }, opts);

    let bestColor: Color | undefined = undefined;
    let bestScore = 0;

    for (let i = 0; i < colors.length; i++) {
      const readabilityIndex = this.readability(colors[i]);
      if (readabilityIndex > bestScore) {
        bestScore = readabilityIndex;
        bestColor = colors[i];
      }
    }

    if ((bestColor && this.isReadable(bestColor, options)) || !options.fallbackColors) {
      return bestColor;
    } else {
      return this.mostReadable(
        [ColorBuilder.white(), ColorBuilder.black()],
        Object.assign(options, { fallbackColors: false })
      );
    }
  }

  /**
   * return valid WCAG2 parms for isReadable.
   * If input parms are invalid, return {"level":"AA", "size":"small"}
   *
   * @param parms input wcag2 param object
   */
  private validateWCAG2Parms(params?: Partial<WCAG2Param>): WCAG2Param {
    const defaultParams: WCAG2Param = { level: "AA", size: "small" };
    const newParams = Object.assign({}, defaultParams, params);

    if (newParams.level !== "AA" && newParams.level !== "AAA") newParams.level = defaultParams.level;
    if (newParams.size !== "small" && newParams.size !== "large") newParams.size = defaultParams.size;
    return newParams;
  }
}
