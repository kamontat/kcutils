import { Color, RGB, ColorBuilder, NumberTypeString } from "../src";
import { hexToRgb } from "../src/utils/converter";
import { generic } from "@kcutils/helper";

const color = () => ColorBuilder.random().get().setLoggerOption({ level: "warn" });

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
      const nrgb = c.setRGB({ r: "10", g: true, b: "none" } as any).toRGB("number");

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

    test("non alpha color is a non alpha on hasAlpha()", () => {
      const c = new Color({} as RGB);
      expect(c.hasAlpha()).toEqual(false);
    });

    test.each([
      ["000000", 0],
      ["FFF", 255],
    ])("get color %s brightness should be %s", (hex, brightness) => {
      const rgb = hexToRgb({ type: "hex", x: hex });

      if (generic.isExist(rgb)) expect(new Color(rgb).getBrightness()).toEqual(brightness);
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

    const testcaseCGen = (data: Record<string, [number, number, number]>): TestcaseCs => {
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

        if (generic.isExist(rgb)) expect(new Color(rgb).getBrightness(format)).toEqual(brightness);
        else fail("cannot get rgb data from " + hex);
      }
    );

    test("Testcase CX: throw exception when invalid type pass input", () => {
      const rgb = hexToRgb({ type: "hex", x: "000" });
      if (generic.isExist(rgb)) expect(() => new Color(rgb).getBrightness("error" as any)).toThrowError();
      else fail("cannot get rgb data from hex");
    });
  });

  test.each([
    [{ type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
    [{ a: 1, type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
    [{ a: 0.5, type: "number", r: 99, g: 255, b: 1 } as RGB, "rgba(99,255,1,0.5)"],
  ])("create '%s' color should equals to '%s'", (input: RGB, output: string) => {
    const c = new Color(input);
    expect(c.toString()).toEqual(output);
  });
});
