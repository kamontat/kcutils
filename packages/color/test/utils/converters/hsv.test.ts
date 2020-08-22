import { NumberTypeString, HSV, converter } from "../../../src";
import { enforceRGB, enforceHSV } from "../../../src/utils/converter";

describe("HSV color", () => {
  const type: Record<NumberTypeString, NumberTypeString> = {
    number: "number",
    percent: "percent",
    decimal: "decimal",
  };

  const definedHSV = (input?: Partial<HSV>): HSV => {
    const defaultHSV: HSV = { a: 1, h: 0, v: 0, s: 0, type: "decimal" };
    if (input) return Object.assign({}, defaultHSV, input);
    else return Object.assign({}, defaultHSV);
  };

  test("enforceHSV with undefined value", () => {
    expect(converter.enforceHSV(undefined)).toEqual(definedHSV());
  });

  test("convert unknown type object will return default value", () => {
    expect(converter.hsvToHsv(undefined as any, type.decimal)).toEqual(converter.enforceHSV({ type: type.decimal }));
  });

  test("convert empty type object will return default value", () => {
    expect(converter.hsvToHsv({} as HSV, type.decimal)).toEqual(converter.enforceHSV({ type: type.decimal }));
  });

  test("change hsv with default type", () => {
    expect(converter.hsvToHsv({ type: "percent", h: 31, s: 12, v: 99 } as HSV)).toEqual(
      definedHSV({ h: 111.6, s: 12, v: 99, type: "number" })
    );
  });

  test.each([
    [{ type: type.number } as HSV, type.decimal, definedHSV()],
    [{ type: type.percent } as HSV, type.percent, definedHSV({ type: type.percent })],
  ])("convert HSV(%p, %s) to HSV(%p)", (hsv, type, result) => {
    expect(converter.hsvToHsv(hsv, type)).toEqual(result);
  });

  test.each([
    [
      definedHSV({ a: 0.5123, h: 0.3155, s: 0.1142, v: 0.33, type: type.decimal }),
      definedHSV({ a: 0.51, h: 0.316, s: 0.114, v: 0.33, type: type.decimal }),
    ],
    [
      definedHSV({ h: 123, s: 222.45, v: 8.5102, type: type.number }),
      definedHSV({ h: 123, s: 222, v: 9, type: type.number }),
    ],
  ])("roundedHSV(%p) returns %p", (hsv, result) => {
    expect(converter.roundedHSV(hsv)).toEqual(result);
  });

  test.each([
    [definedHSV({ a: 0.59481, type: type.percent }), 3, definedHSV({ a: 0.59, type: type.percent })],
    [definedHSV({ a: 100, type: type.number }), 3, definedHSV({ a: 1, type: type.number })],
    [
      definedHSV({ a: 0.2, h: 0.3155, s: 0.1142, v: 0.33, type: type.decimal }),
      2,
      definedHSV({ a: 0.2, h: 0.32, s: 0.11, v: 0.33, type: type.decimal }),
    ],
    [
      definedHSV({ h: 123, s: 222.45, v: 8.5102, type: type.number }),
      3,
      definedHSV({ h: 123, s: 222.45, v: 8.51, type: type.number }),
    ],
    [
      definedHSV({ h: 123, s: 222.45, v: 8.5102, type: type.number }),
      3,
      definedHSV({ h: 123, s: 222.45, v: 8.51, type: type.number }),
    ],
  ])("roundedHSV(%p, %s) returns %p", (hsv, digit, result) => {
    expect(converter.roundedHSV(hsv, digit)).toEqual(result);
  });

  test.each([
    [enforceHSV(), enforceRGB()],

    [enforceHSV({ h: 0.25, s: 0.9, v: 0.49 }), enforceRGB({ r: 124.95, g: 40.61, b: 12.5 })],
    [enforceHSV({ h: 70, s: 20, v: 30, type: "percent" }), enforceRGB({ r: 76.5, g: 71.91, b: 61.2 })],

    [enforceHSV({ h: 300, s: 120, v: 100, a: 100, type: "number" }), enforceRGB({ r: 255, g: 211.65, b: 0, a: 1 })],
    [enforceHSV({ h: 0.95, s: 0.65, v: 0.6, a: 0.003 }), enforceRGB({ r: 153, g: 148.03, b: 53.55, a: 0 })],
  ])("convert HSV(%p) to RGB(%p)", (hsv, rgb) => {
    expect(converter.hsvToRgb(hsv)).toEqual(rgb);
  });
});
