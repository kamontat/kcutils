import { generic } from "@kcutils/helper";
import {
  Color,
  RGB,
  ColorBuilder,
  NumberTypeString,
  Named,
  HSL,
  HSV,
  HEX,
  hexToRgb,
  rgbToRgb,
  enforceHSL,
  enforceHSV,
  enforceHex,
  enforceRGB,
  enforceNamed,
} from "../index";

const color = () =>
  ColorBuilder.random()
    .get()
    .setLoggerOption((b) => b.withLevel("warn"));

describe("Color object", () => {
  test("create empty color will no throw exception on default", () => {
    expect(() => {
      new Color({} as RGB);
    }).not.toThrow();
  });

  test("create empty color will throw exception", () => {
    expect(() => {
      new Color({} as RGB).throw();
    }).toThrow();
  });

  describe("Setter", () => {
    test("setAlpha", () => {
      const c = color();
      expect(c.hasAlpha()).toEqual(false);

      c.setAlpha(0);
      expect(c.hasAlpha()).toEqual(true);

      c.setAlpha(0.2);
      expect(c.hasAlpha()).toEqual(true);
    });

    test("setR", () => {
      const c = color();
      const rgb = c.toRGB("number");

      const nrgb = c.setRGB({ r: -1 }).toRGB("number");
      const nnrgb = c.toRGB("number");

      expect(rgb.r).not.toEqual(nrgb.r);

      expect(nrgb.r).toEqual(0);
      expect(nrgb.r).toEqual(nnrgb.r);

      expect(rgb.g).toEqual(nrgb.g);
      expect(nrgb.g).toEqual(nnrgb.g);
    });

    test("setG", () => {
      const c = color();
      const g = c.toRGB("number").g;

      const ng = c.setRGB({ g: 12 }).toRGB("number").g;
      const nng = c.toRGB("number").g;

      expect(g).not.toEqual(ng);

      expect(ng).toEqual(12);
      expect(ng).toEqual(nng);
    });

    test("setB", () => {
      const c = color();
      const b = c.toRGB("number").b;

      const nb = c.setRGB({ b: 1000 }).toRGB("number").b;
      const nnb = c.toRGB("number").b;

      expect(b).not.toEqual(nb);

      expect(nb).toEqual(255);
      expect(nb).toEqual(nnb);
    });

    test("setRGB", () => {
      const c = color();
      const rgb = c.toRGB("number");

      const nrgb = c.setRGB({ r: 0, g: 1, b: 2 }).toRGB("number");
      const nnrgb = c.toRGB("number");

      expect(rgb).not.toEqual(nrgb);

      expect(nrgb.r).toEqual(0);
      expect(nrgb.g).toEqual(1);
      expect(nrgb.b).toEqual(2);

      expect(nrgb).toEqual(nnrgb);
    });

    test("ignore invalid rgb string", () => {
      const c = color();

      const rgb = c.toRGB("number");
      const nrgb = c
        .setRGB({ r: "10", g: true, b: "none" } as any)
        .toRGB("number");

      expect(rgb).toEqual(nrgb);
    });

    test("set new invalid rgb data", () => {
      const c = color();
      expect(c.isValid()).toEqual(true);

      c.setRGB({ type: "hello" } as any);

      expect(c.isValid()).toEqual(false);
      expect(() => c.throw()).toThrowError();
    });

    test("invalid color still creatable", () => {
      const c = new Color({} as RGB);
      expect(c).not.toBeUndefined();
    });
  });

  describe("Getter", () => {
    test.each([
      [false, 1],
      [true, 0.0001],
      [true, 0.001],
      [true, 0.01],
      [true, 0.1],
      [true, 0.9],
      [false, -0.1],
      [false, -1],
    ])("return %s on hasAlpha() when alpha is %s", (result, alpha) => {
      const c = color().setAlpha(alpha);
      expect(c.hasAlpha()).toEqual(result);
    });

    test.each([
      [1, undefined],
      [0, 0],
      [0.05, 0.05],
      [1, 1],
      [1, 5],
    ])("return %s on getAlpha() when alpha is %s", (expected, actual) => {
      const c = new Color({
        a: actual as unknown as number,
        r: 0,
        g: 0,
        b: 0,
        type: "number",
      });
      expect(c.getAlpha()).toEqual(expected);
    });

    test("return 1 on getAlpha() even rgb not exist", () => {
      expect(new Color(undefined as unknown as RGB).getAlpha()).toEqual(1);
    });

    test("non alpha color is a non alpha on hasAlpha()", () => {
      const c = new Color({} as RGB);
      expect(c.hasAlpha()).toEqual(false);
    });

    test.each([
      ["000000", 0],
      ["FFF", 255],
    ])("get color %s brightness should be %s", (hex, brightness) => {
      const rgb = hexToRgb({ type: "hex", x: hex });

      if (generic.isExist(rgb))
        expect(new Color(rgb).getBrightness()).toEqual(brightness);
      else fail("cannot get rgb data from " + hex);
    });

    type TestcaseC = [string, NumberTypeString, number];
    type TestcaseCs = TestcaseC[];

    const testcaseC1: Record<string, [number, number, number]> = {
      "000080": [14.592, 5.72, 0.06],
      "0000CD": [23.37, 9.16, 0.09],
      "191970": [34.918, 13.69, 0.14],
      "0000FF": [29.07, 11.4, 0.11],
      "006400": [58.7, 23.02, 0.23],
      "2F4F4F": [69.432, 27.23, 0.27],
      "483D8B": [73.181, 28.7, 0.29],
      B22222: [77.056, 30.22, 0.3], // eslint-disable-line @typescript-eslint/naming-convention
      A52A2A: [78.777, 30.89, 0.31], // eslint-disable-line @typescript-eslint/naming-convention
      "8B4513": [84.23, 33.03, 0.33],
      "9400D3": [68.306, 26.79, 0.27],
      FF0000: [76.245, 29.9, 0.3], // eslint-disable-line @typescript-eslint/naming-convention
      "228B22": [95.635, 37.5, 0.38],
      "556B2F": [93.582, 36.7, 0.37],
      B03060: [91.744, 35.98, 0.36], // eslint-disable-line @typescript-eslint/naming-convention
      C71585: [86.99, 34.11, 0.34], // eslint-disable-line @typescript-eslint/naming-convention
      "2E8B57": [105.265, 41.28, 0.41],
      A0522D: [101.104, 39.65, 0.4], // eslint-disable-line @typescript-eslint/naming-convention
      "696969": [105, 41.18, 0.41],
      "4169E1": [106.72, 41.85, 0.42],
      "6A5ACD": [107.894, 42.31, 0.42],
      "778899": [132.855, 52.1, 0.52],
      "40E0D0": [174.336, 68.37, 0.68],
      BA55D3: [129.563, 50.81, 0.51], // eslint-disable-line @typescript-eslint/naming-convention
      FF6347: [142.452, 55.86, 0.56], // eslint-disable-line @typescript-eslint/naming-convention
      FF8C00: [158.425, 62.13, 0.62], // eslint-disable-line @typescript-eslint/naming-convention
      "00FF7F": [164.163, 64.38, 0.64],
      "00FA9A": [164.306, 64.43, 0.64],
      DB7093: [147.983, 58.03, 0.58], // eslint-disable-line @typescript-eslint/naming-convention
      BDB76B: [176.13, 69.07, 0.69], // eslint-disable-line @typescript-eslint/naming-convention
      E9967A: [171.625, 67.3, 0.67], // eslint-disable-line @typescript-eslint/naming-convention
      D2B48C: [184.41, 72.32, 0.72], // eslint-disable-line @typescript-eslint/naming-convention
      FFA07A: [184.073, 72.19, 0.72], // eslint-disable-line @typescript-eslint/naming-convention
      FFD700: [202.45, 79.39, 0.79], // eslint-disable-line @typescript-eslint/naming-convention
      "7FFFD4": [211.826, 83.07, 0.83],
      EEDD82: [215.709, 84.59, 0.85], // eslint-disable-line @typescript-eslint/naming-convention
      FFFF00: [225.93, 88.6, 0.89], // eslint-disable-line @typescript-eslint/naming-convention
    };

    const testcaseCGen = (
      data: Record<string, [number, number, number]>
    ): TestcaseCs => {
      const result: TestcaseCs = [];
      for (const key in data) {
        if (generic.isExist(data[key])) {
          const element = data[key];
          result.push([key, ColorBuilder.numberType.number, element[0]]);
          result.push([key, ColorBuilder.numberType.percent, element[1]]);
          result.push([key, ColorBuilder.numberType.decimal, element[2]]);
        }
      }

      return result;
    };

    test.each(testcaseCGen(testcaseC1))(
      "Testcase C%#: get color %s brightness (format = %s) should be %s",
      (hex, format: NumberTypeString, brightness) => {
        const rgb = hexToRgb({ type: "hex", x: hex });

        if (generic.isExist(rgb))
          expect(new Color(rgb).getBrightness(format)).toEqual(brightness);
        else fail("cannot get rgb data from " + hex);
      }
    );

    test("Testcase CX: throw exception when invalid type pass input", () => {
      const rgb = hexToRgb({ type: "hex", x: "000" });
      if (generic.isExist(rgb))
        expect(() =>
          new Color(rgb).getBrightness("error" as any)
        ).toThrowError();
      else fail("cannot get rgb data from hex");
    });

    test.each([
      ["#6A5ACD", false],
      ["#778899", true],
    ])("Testcase E%#: color(%s) lightness is %s", (c, t) => {
      const rgb = hexToRgb({ type: "hex", x: c });
      if (generic.isExist(rgb)) expect(new Color(rgb).isLight()).toEqual(t);
      else fail("cannot get rgb data from hex");
    });

    test.each([
      ["#4169E1", true],
      ["FF8C00", false],
    ])("Testcase F%#: color(%s) lightness is %s", (c, t) => {
      const rgb = hexToRgb({ type: "hex", x: c });
      if (generic.isExist(rgb)) expect(new Color(rgb).isDark()).toEqual(t);
      else fail("cannot get rgb data from hex");
    });

    test.each([
      ["#000", 0],
      ["0000FF", 0.0722],
      ["9400D3", 0.1102],
      ["#FF0000", 0.2126],
      ["FF6347", 0.3073],
      ["E9967A", 0.4054],
      ["EEDD82", 0.7181],
      ["FF0", 0.9278],
      ["#FFF", 1],
    ])("Testcase G%#: color(%s) luminance is %s", (h, r) => {
      expect(ColorBuilder.fromHex(h).get().getLuminance()).toEqual(r);
    });
  });

  describe("duplicate color object", () => {
    test("clone() should return new object", () => {
      const c1 = color().setAlpha(1);
      const c2 = c1.clone();

      expect(c1.getId()).not.toEqual(c2.getId());

      c1.setAlpha(0.05);

      expect(c1.hasAlpha()).toEqual(true);
      expect(c2.hasAlpha()).toEqual(false);
    });
  });

  type TestcaseK = {
    named: undefined | Named;
    rgb: RGB;
    hsl: HSL;
    hsls: string;
    hsv: HSV;
    hsvs: string;
    hex: HEX;
  };

  const testcaseK: Record<string, TestcaseK> = {
    k1: {
      rgb: enforceRGB({
        r: 51,
        g: 88,
        b: 190,
        type: ColorBuilder.numberType.number,
        a: 0.045,
      }),
      named: undefined,
      hsl: enforceHSL({ h: 0.62, s: 0.58, l: 0.48, a: 0.045 }),
      hsls: "hsla(0.62,0.58,0.48,0.045)",
      hsv: enforceHSV({ h: 0.62, s: 0.73, v: 0.75, a: 0.045 }),
      hsvs: "hsva(0.62,0.73,0.75,0.045)",
      hex: enforceHex({ x: "3358be0b", type: "hex8", a: 0.045 }),
    },
    k2: {
      rgb: enforceRGB({
        r: 90,
        g: 120,
        b: 250,
        type: ColorBuilder.numberType.number,
        a: 0.77,
      }),
      named: undefined,
      hsl: enforceHSL({ h: 0.63, s: 0.94, l: 0.67, a: 0.77 }),
      hsls: "hsla(0.63,0.94,0.67,0.77)",
      hsv: enforceHSV({ h: 0.63, s: 0.64, v: 0.98, a: 0.77 }),
      hsvs: "hsva(0.63,0.64,0.98,0.77)",
      hex: enforceHex({ x: "5a78fac4", type: "hex8", a: 0.77 }),
    },
    k3: {
      rgb: enforceRGB({
        r: 0,
        g: 0,
        b: 0,
        type: ColorBuilder.numberType.decimal,
        a: 2,
      }),
      named: enforceNamed({ n: "black" }),
      hsl: enforceHSL({ h: 0, s: 0, l: 0 }),
      hsls: "hsl(0,0,0)",
      hsv: enforceHSV({ h: 0, s: 0, v: 0 }),
      hsvs: "hsv(0,0,0)",
      hex: enforceHex({ x: "000f", type: "hex4", a: 1 }),
    },
    k4: {
      rgb: enforceRGB({
        r: 255,
        g: 255,
        b: 255,
        type: ColorBuilder.numberType.decimal,
        a: 0.55,
      }),
      named: enforceNamed({ n: "white", a: 0.55 }),
      hsl: enforceHSL({ h: 0, s: 0, l: 1, a: 0.55 }),
      hsls: "hsla(0,0,1,0.55)",
      hsv: enforceHSV({ h: 0, s: 0, v: 1, a: 0.55 }),
      hsvs: "hsva(0,0,1,0.55)",
      hex: enforceHex({ x: "ffffff8c", type: "hex8", a: 0.55 }),
    },
  };

  const testcaseKGen = (
    tc: Record<string, TestcaseK>
  ): [RGB, Named | undefined, HSL, string, HSV, string, HEX][] => {
    return Object.keys(tc).reduce((arr, key) => {
      const testcase: TestcaseK = tc[key];

      arr.push([
        testcase.rgb,
        testcase.named,
        testcase.hsl,
        testcase.hsls,
        testcase.hsv,
        testcase.hsvs,
        testcase.hex,
      ]);
      return arr;
    }, [] as [RGB, Named | undefined, HSL, string, HSV, string, HEX][]);
  };

  describe.each(testcaseKGen(testcaseK))(
    "Testcase K%#: %s convertion RGB(%p)",
    (rgb, named, hsl, hsls, hsv, hsvs, hex) => {
      const c = new Color(rgb);

      test(`To named(${JSON.stringify(named)})`, () => {
        expect(c.toNamed()).toEqual(named);
        expect(c.toNamedString()).toEqual(named?.n ?? "");
      });

      test(`To HSL(${JSON.stringify(hsl)})`, () => {
        expect(c.toHSL()).toEqual(hsl);
      });

      test(`To ${hsls}`, () => {
        expect(c.toHSLString()).toEqual(hsls);
      });

      test(`To HSV(${JSON.stringify(hsv)})`, () => {
        expect(c.toHSV()).toEqual(hsv);
      });

      test(`To ${hsvs}`, () => {
        expect(c.toHSVString()).toEqual(hsvs);
      });

      test(`To HEX(${JSON.stringify(hex)})`, () => {
        const opt = { alpha: true, minify: true };
        expect(c.toHex(opt)).toEqual(hex);
        expect(c.toHexString(opt)).toEqual(hex.x);
      });
    }
  );

  test.each([
    [{ type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
    [{ a: 1, type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
    [
      { a: 0.5, type: "number", r: 99, g: 255, b: 1 } as RGB,
      "rgba(99,255,1,0.5)",
    ],
  ])(
    "create '%s' color should equals to '%s'",
    (input: RGB, output: string) => {
      const c = new Color(input);
      expect(c.toString()).toEqual(output);
    }
  );

  describe("Copying color", () => {
    const baseColor = new Color({ a: 1, r: 0, g: 0, b: 0, type: "number" });
    test.each([
      [
        { r: 10, g: 10 } as Partial<RGB>,
        new Color({ a: 1, r: 10, g: 10, b: 0, type: "number" }),
      ],
      [
        { r: 100, b: 255, g: 255 } as Partial<RGB>,
        new Color({ a: 1, r: 100, g: 255, b: 255, type: "number" }),
      ],
      [
        { type: "percent" } as Partial<RGB>,
        new Color({ a: 1, r: 0, g: 0, b: 0, type: "number" }),
      ],
    ])("Copy as RGB(%p)", (rgb, expected) => {
      expect(baseColor.copyRGB(rgb).toRGB("number")).toEqual(
        expected.toRGB("number")
      );
    });

    test.each([
      [
        { h: 10, s: 5, l: 99, type: "number" } as Partial<HSL>,
        new Color({ a: 1, r: 252.58, g: 252.37, b: 252.32, type: "number" }),
      ],
      [
        { h: 50, s: 99, type: "percent" } as Partial<HSL>,
        new Color({ a: 1, r: 0, g: 0, b: 0, type: "number" }),
      ],
      [
        { type: "percent" } as Partial<HSL>,
        new Color({ a: 1, r: 0, g: 0, b: 0, type: "number" }),
      ],
    ])("Copy as HSL(%p)", (hsl, expected) => {
      expect(baseColor.copyHSL(hsl).toRGB("number")).toEqual(
        expected.toRGB("number")
      );
    });

    test.each([
      [
        { h: 10, v: 20, type: "number" } as Partial<HSV>,
        new Color({ a: 1, r: 51, g: 51, b: 51, type: "number" }),
      ],
      [
        { h: 4, s: 99, v: 12, type: "percent" } as Partial<HSV>,
        new Color({ a: 1, r: 30.6, g: 1.52, b: 0.31, type: "number" }),
      ],
      [
        { type: "decimal" } as Partial<HSV>,
        new Color({ a: 1, r: 0, g: 0, b: 0, type: "number" }),
      ],
    ])("Copy as HSV(%p)", (hsv, expected) => {
      expect(baseColor.copyHSV(hsv).toRGB("number")).toEqual(
        expected.toRGB("number")
      );
    });
  });

  describe("Mixup", () => {
    test.each([
      [
        new Color(rgbToRgb({}, "number")),
        new Color(rgbToRgb({}, "number")),
        undefined,
        new Color(rgbToRgb({}, "number")),
      ],
      [
        new Color(rgbToRgb({ r: 255, g: 255, b: 255 }, "number")),
        new Color(rgbToRgb({ r: 255, g: 255, b: 255 }, "number")),
        50,
        new Color(rgbToRgb({ r: 255, g: 255, b: 255 }, "number")),
      ],
      [
        new Color(rgbToRgb({ r: 123, g: 222, b: 187 }, "number")),
        new Color(rgbToRgb({ r: 222, g: 187, b: 123 }, "number")),
        50,
        new Color(rgbToRgb({ r: 172.5, g: 204.5, b: 155 }, "number")),
      ],
      [
        new Color(rgbToRgb({ r: 123, g: 222, b: 187 }, "number")),
        new Color(rgbToRgb({ r: 222, g: 187, b: 123 }, "number")),
        25,
        new Color(rgbToRgb({ r: 147.75, g: 213.25, b: 171 }, "number")),
      ],
      [
        new Color(rgbToRgb({ r: 123, g: 222, b: 187 }, "number")),
        new Color(rgbToRgb({ r: 222, g: 187, b: 123 }, "number")),
        75,
        new Color(rgbToRgb({ r: 197.25, g: 195.75, b: 139 }, "number")),
      ],
    ])("mix %s and %s with (%s) should return %s", (a, b, percent, ab) => {
      expect(a.mix(b, percent).toRGB("number")).toEqual(ab.toRGB("number"));
    });
  });
});
