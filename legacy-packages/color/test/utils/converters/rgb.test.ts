import { RGB, HEX, Named, NumberTypeString, HexTypeString, HSL, converter, HSV } from "../../../src";
import { defaultRGB } from "../../../src/utils/converter";
const { enforceRGB, roundedRGB, rgbToRgb, rgbToHex, rgbToNamed, rgbToHsl, rgbToHsv } = converter;

type EachType<O, T> = [RGB, O, T];
type EachTypes<O, T> = EachType<O, T>[];

const emptyArray = <O, T>(...args: EachType<O, T>[]): EachTypes<O, T> => {
  return args;
};

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

  test.each([
    [
      enforceRGB({ a: 0.5123, r: 0.3155, g: 0.1142, b: 0.33, type: type.decimal }),
      enforceRGB({ a: 0.5123, r: 0.316, g: 0.114, b: 0.33, type: type.decimal }),
    ],
    [
      enforceRGB({ r: 123, g: 222.45, b: 8.5102, type: type.number }),
      enforceRGB({ r: 123, g: 222, b: 9, type: type.number }),
    ],
  ])("roundedRGB(%p) returns %p", (rgb, result) => {
    expect(roundedRGB(rgb)).toEqual(result);
  });

  test.each([
    [
      enforceRGB({ a: 0.5123, r: 0.3155, g: 0.1142, b: 0.33, type: type.decimal }),
      2,
      enforceRGB({ a: 0.5123, r: 0.32, g: 0.11, b: 0.33, type: type.decimal }),
    ],
    [
      enforceRGB({ r: 123, g: 222.45, b: 8.5102, type: type.number }),
      3,
      enforceRGB({ r: 123, g: 222.45, b: 8.51, type: type.number }),
    ],
  ])("roundedRGB(%p, %s) returns %p", (rgb, digit, result) => {
    expect(roundedRGB(rgb, digit)).toEqual(result);
  });

  test("check default rgb color should be the same", () => {
    expect(defaultRGB).toEqual({ a: 1, r: 0, g: 0, b: 0, type: "number" } as RGB);
  });

  test("convert unknown type object will return default value", () => {
    expect(rgbToRgb(undefined as any, type.decimal)).toEqual(enforceRGB({ type: type.decimal }));
  });

  test("convert empty type object will return default value", () => {
    expect(rgbToRgb({} as RGB, type.percent)).toEqual(enforceRGB({ type: type.percent }));
  });

  test.each(
    emptyArray<NumberTypeString, RGB>(
      [{ type: type.number } as RGB, type.decimal, { type: type.decimal, a: 1, r: 0, g: 0, b: 0 } as RGB],
      [{ type: type.percent } as RGB, type.percent, { type: type.percent, a: 1, r: 0, g: 0, b: 0 } as RGB],
      [
        { r: 12, g: 99, b: 200, type: type.number } as RGB,
        type.number,
        { r: 12, g: 99, b: 200, a: 1, type: type.number } as RGB,
      ],
      [
        { r: 12, g: 99, b: 200, type: type.number } as RGB,
        type.percent,
        { r: 5, g: 39, b: 78, a: 1, type: type.percent } as RGB,
      ],
      [
        { r: 12, g: 99, b: 200, type: type.number } as RGB,
        type.decimal,
        { r: 0.05, g: 0.39, b: 0.78, a: 1, type: type.decimal } as RGB,
      ],
      [
        { r: 0.423, g: 0.445, b: 0.98499, type: type.decimal } as RGB,
        type.number,
        { r: 107.87, g: 113.48, b: 251.17, a: 1, type: type.number } as RGB,
      ],
      [
        { r: 51.33, g: 51.35, b: 51.457, type: type.percent } as RGB,
        type.number,
        { r: 130.89, g: 130.94, b: 131.22, a: 1, type: type.number } as RGB,
      ]
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
    emptyArray<converter.RGBHexOptions | undefined, HEX>(
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

describe("RGB to HSL color", () => {
  const definedHSL = (input?: Partial<HSL>): HSL => {
    const defaultHSL: HSL = { a: 1, h: 0, l: 0, s: 0, type: "decimal" };
    if (input) return Object.assign({}, defaultHSL, input);
    else return Object.assign({}, defaultHSL);
  };

  test.each([
    [{ type: "number" } as RGB, definedHSL()],
    [{ r: 123, g: 234, b: 12, type: "number" } as RGB, definedHSL({ h: 0.25, s: 0.9, l: 0.49 })], // no alpha
    [{ r: 36, g: 0, b: 194, type: "number" } as RGB, definedHSL({ h: 0.7, s: 1, l: 0.38 })],
    [{ r: 222, g: 51, b: 1, a: 0.5554445, type: "number" } as RGB, definedHSL({ h: 0.04, s: 1, l: 0.44, a: 0.555445 })],
    [{ r: 222, g: 99, b: 111, a: 0.003, type: "number" } as RGB, definedHSL({ h: 0.98, s: 0.65, l: 0.63, a: 0.003 })],
  ])("convert RGB(%p) to HSL(%p)", (rgb, hsl) => {
    expect(rgbToHsl(rgb)).toEqual(hsl);
  });
});

describe("RGB to HSV color", () => {
  const definedHSV = (input?: Partial<HSV>): HSV => {
    const defaultHSV: HSV = { a: 1, h: 0, v: 0, s: 0, type: "decimal" };
    if (input) return Object.assign({}, defaultHSV, input);
    else return Object.assign({}, defaultHSV);
  };

  test.each([
    [{ type: "number" } as RGB, definedHSV()],
    [{ r: 123, g: 234, b: 12, type: "number" } as RGB, definedHSV({ h: 0.25, s: 0.95, v: 0.92 })], // no alpha
    [{ r: 36, g: 0, b: 194, type: "number" } as RGB, definedHSV({ h: 0.7, s: 1, v: 0.76 })],
    [{ r: 222, g: 51, b: 1, a: 0.5555556, type: "number" } as RGB, definedHSV({ h: 0.04, s: 1, v: 0.87, a: 0.555556 })],
    [{ r: 222, g: 99, b: 111, a: 0.003, type: "number" } as RGB, definedHSV({ h: 0.98, s: 0.55, v: 0.87, a: 0.003 })],
  ])("convert RGB(%p) to HSV(%p)", (rgb, hsv) => {
    expect(rgbToHsv(rgb)).toEqual(hsv);
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
