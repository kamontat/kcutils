import { NumberTypeString, HSL, converter } from "../../../src";
import { enforceRGB, enforceHSL } from "../../../src/utils/converter";

describe("HSL to HSL", () => {
  const type: Record<NumberTypeString, NumberTypeString> = {
    number: "number",
    percent: "percent",
    decimal: "decimal",
  };

  const definedHSL = (input?: Partial<HSL>): HSL => {
    const defaultHSL: HSL = { a: 1, h: 0, l: 0, s: 0, type: "decimal" };
    if (input) return Object.assign({}, defaultHSL, input);
    else return Object.assign({}, defaultHSL);
  };

  test("enforceHSL with undefined value", () => {
    expect(converter.enforceHSL(undefined)).toEqual(definedHSL());
  });

  test("convert unknown type object to default color object", () => {
    expect(converter.hslToHsl(undefined as any, type.decimal)).toEqual(definedHSL());
    expect(converter.hslToHsl(null as any, type.number)).toEqual(definedHSL({ type: type.number }));
  });

  test("convert empty type object will throw exception", () => {
    expect(converter.hslToHsl({} as HSL, type.percent)).toEqual(definedHSL({ type: type.percent }));
  });

  test("change hsl with default type", () => {
    expect(converter.hslToHsl({ type: "percent", h: 31, s: 12, l: 99 } as HSL)).toEqual(
      definedHSL({ h: 111.6, s: 12, l: 99, type: "number" })
    );
  });

  test.each([
    [{ type: type.number } as HSL, type.decimal, definedHSL()],
    [{ type: type.percent } as HSL, type.percent, definedHSL({ type: type.percent })],
  ])("convert HSL(%p, %s) to HSL(%p)", (hsl, type, result) => {
    expect(converter.hslToHsl(hsl, type)).toEqual(result);
  });

  test.each([
    [
      definedHSL({ a: 0.3, h: 0.3155, s: 0.1142, l: 0.33, type: type.decimal }),
      definedHSL({ a: 0.3, h: 0.316, s: 0.114, l: 0.33, type: type.decimal }),
    ],
    [
      definedHSL({ h: 123, s: 222.45, l: 8.5102, type: type.number }),
      definedHSL({ h: 123, s: 222, l: 9, type: type.number }),
    ],
  ])("roundedHSL(%p) returns %p", (hsl, result) => {
    expect(converter.roundedHSL(hsl)).toEqual(result);
  });

  test.each([
    [definedHSL({ a: 0.5948114, type: type.number }), 3, definedHSL({ a: 0.594811, type: type.number })],
    [definedHSL({ a: 100, type: type.decimal }), 3, definedHSL({ a: 1, type: type.decimal })],
    [
      definedHSL({ a: 0.5123, h: 0.3155, s: 0.1142, l: 0.33, type: type.decimal }),
      2,
      definedHSL({ a: 0.5123, h: 0.32, s: 0.11, l: 0.33, type: type.decimal }),
    ],
    [
      definedHSL({ h: 123, s: 222.45, l: 8.5102, type: type.number }),
      3,
      definedHSL({ h: 123, s: 222.45, l: 8.51, type: type.number }),
    ],
  ])("roundedHSL(%p, %s) returns %p", (hsl, digit, result) => {
    expect(converter.roundedHSL(hsl, digit)).toEqual(result);
  });

  test.each([
    [enforceHSL(), enforceRGB()],

    [enforceHSL({ h: 0.25, s: 0.9, l: 0.49 }), enforceRGB({ r: 124.95, g: 237.41, b: 12.5 })],
    [enforceHSL({ h: 70, s: 20, l: 30, type: "percent" }), enforceRGB({ r: 67.32, g: 61.2, b: 91.8 })],

    [enforceHSL({ h: 300, s: 120, l: 100, a: 100, type: "number" }), enforceRGB({ r: 255, g: 255, b: 255, a: 1 })],
    [enforceHSL({ h: 0.95, s: 0.65, l: 0.6, a: 0.004 }), enforceRGB({ r: 219.3, g: 86.7, b: 126.48, a: 0.004 })],
  ])("convert HSL(%p) to RGB(%p)", (hsl, rgb) => {
    expect(converter.hslToRgb(hsl)).toEqual(rgb);
  });
});
