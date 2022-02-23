import { Named, enforceRGB, namedToRgb } from "../../../index";

describe("Named color", () => {
  const definedNamed = (input?: Partial<Named>): Named => {
    const defaultNamed: Named = { a: 1, n: "" };
    if (input) return Object.assign({}, defaultNamed, input);
    else return Object.assign({}, defaultNamed);
  };

  test("convert undefined to undefined", () => {
    expect(namedToRgb(undefined)).toBeUndefined();
  });

  test("convert null to undefined", () => {
    expect(namedToRgb(null as any)).toBeUndefined();
  });

  test("convert non-object to undefined", () => {
    expect(namedToRgb("string" as any)).toBeUndefined();
    expect(namedToRgb(12 as any)).toBeUndefined();
  });

  test("convert empty object to undefined", () => {
    expect(namedToRgb({} as any)).toBeUndefined();
  });

  test.each([
    [definedNamed(), undefined],
    [definedNamed({ n: "red" }), enforceRGB({ r: 255 })],
    [definedNamed({ a: 0.44, n: "unknown" }), undefined],
    [
      definedNamed({ a: 0.44, n: "blancHedaLmoND" }),
      enforceRGB({ r: 255, g: 235, b: 205, a: 0.44 }),
    ],
    [
      definedNamed({ a: 9, n: "ChOcOlatE" }),
      enforceRGB({ r: 210, g: 105, b: 30, a: 1 }),
    ],
  ])("convert Named(%p) to Rgb(%p)", (named, rgb) => {
    expect(namedToRgb(named)).toEqual(rgb);
  });
});
