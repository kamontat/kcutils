import { rgbToHex, enforceRGB, rgbToRgb, RGBHexOptions, rgbToNamed } from "../../src/utils/converter/rgb";

import { RGB, HEX, Named, NumberTypeString, HexTypeString } from "../../src";

type EachType<O, T> = [RGB, O, T];
type EachTypes<O, T> = EachType<O, T>[];

const emptyArray = <O, T>(...args: EachType<O, T>[]): EachTypes<O, T> => {
  return args;
};

describe("Utilities Converter", () => {
  describe("RGB to RGB", () => {
    const type: Record<NumberTypeString, NumberTypeString> = {
      number: "number",
      percent: "percent",
      decimal: "decimal",
    };

    test.each([
      [(null as unknown) as RGB, { a: 1, r: 0, b: 0, g: 0, type: type.number }],
      [(undefined as unknown) as RGB, { a: 1, r: 0, b: 0, g: 0, type: type.number }],
      [{ a: 0.5, r: 123, g: 11, b: 21 } as RGB, { a: 0.5, r: 123, g: 11, b: 21, type: type.number }],
      [{ a: 0.5, r: 123 } as RGB, { a: 0.5, r: 123, g: 0, b: 0, type: type.number }],
      [{ r: 11, type: type.decimal } as RGB, { a: 1, r: 11, g: 0, b: 0, type: type.decimal }],
    ])("enforceRGB(%p) returns %p", (rgb, result) => {
      const a = enforceRGB(rgb);
      expect(a).toEqual(result);
    });

    test("convert unknown type object cause exception", () => {
      expect(() => rgbToRgb(undefined as any, type.decimal)).toThrowError();
    });

    test("convert empty type object will throw exception", () => {
      expect(() => rgbToRgb({} as RGB, type.percent)).toThrowError();
    });

    test.each(
      emptyArray<NumberTypeString, RGB>(
        [{ type: type.number } as RGB, type.decimal, { type: type.decimal, a: 1, r: 0, g: 0, b: 0 } as RGB],
        [{ type: type.percent } as RGB, type.percent, { type: type.percent, a: 1, r: 0, g: 0, b: 0 } as RGB]
      )
    )("convert RGB(%p, %s) to RGB(%p)", (rgb, type, result) => {
      expect(rgbToRgb(rgb, type)).toEqual(result);
    });
  });

  describe("RGB to HEX", () => {
    const type: Record<HexTypeString, HexTypeString> = {
      hex: "hex",
      hex3: "hex3",
      hex4: "hex4",
      hex6: "hex6",
      hex8: "hex8",
    };

    test.each(
      emptyArray<RGBHexOptions | undefined, HEX>(
        [{ type: "decimal" } as RGB, {}, { type: type.hex6, a: 1, x: "000000" }],
        [{ type: "decimal" } as RGB, undefined, { type: type.hex6, a: 1, x: "000000" }],
        [{ type: "decimal" } as RGB, { alpha: false }, { type: type.hex6, a: 1, x: "000000" }],
        [{ type: "percent" } as RGB, { minify: true }, { type: type.hex3, a: 1, x: "000" }],
        [{ type: "number" } as RGB, { alpha: true }, { type: type.hex8, a: 1, x: "000000ff" }],
        [{ type: "decimal" } as RGB, { alpha: true, minify: true }, { type: type.hex4, a: 1, x: "000f" }],

        [
          { a: -0.21, r: 155, g: 200, b: 440, type: "number" } as RGB,
          { alpha: false, minify: true },
          { type: type.hex6, a: 1, x: "9bc8ff" },
        ],
        [
          { a: 0.41, r: 0.55, g: 0.41, b: 0.812, type: "decimal" } as RGB,
          { alpha: true, minify: false },
          { type: type.hex8, a: 0.41, x: "8c69cf69" },
        ],
        [
          { r: 255, g: 0, b: 0, a: 0.31, type: "number" } as RGB,
          { alpha: false, minify: true },
          { type: type.hex3, a: 0.31, x: "f00" },
        ]
      )
    )("convert RGB(%p, %p) to HEX(%p)", (rgb, type, result) => {
      expect(rgbToHex(rgb, type)).toEqual(result);
    });
  });

  describe("RGB to Named color", () => {
    test.each([
      [{ r: 255, g: 0, b: 0, a: 0.31, type: "number" } as RGB, { a: 0.31, n: "red" }],
      [{ r: 0, g: 255, b: 0, a: 2, type: "number" } as RGB, { a: 1, n: "lime" } as Named],
      [{ r: 182, g: 168, b: 1, a: -0.001, type: "number" } as RGB, undefined],
    ])("convert RGB(%p) to Named(%p)", (rgb, result) => {
      expect(rgbToNamed(rgb)).toEqual(result);
    });
  });
});
