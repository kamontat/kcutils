import { NumberTypeString, HSL, converter } from "../../../src";

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

  test("convert unknown type object cause exception", () => {
    expect(() => converter.hslToHsl(undefined as any, type.decimal)).toThrowError();
  });

  test("convert empty type object will throw exception", () => {
    expect(() => converter.hslToHsl({} as HSL, type.percent)).toThrowError();
  });

  test.each([
    [{ type: type.number } as HSL, type.decimal, definedHSL()],
    [{ type: type.percent } as HSL, type.percent, definedHSL({ type: type.percent })],
  ])("convert HSL(%p, %s) to HSL(%p)", (rgb, type, result) => {
    expect(converter.hslToHsl(rgb, type)).toEqual(result);
  });
});
