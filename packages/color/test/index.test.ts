import { Color, RGB } from "../src";

describe("Color object", () => {
  test("create empty color will throw exception", () => {
    expect(() => {
      new Color({} as RGB);
    }).toThrow();
  });

  test.each([
    [{ type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
    [{ a: 1, type: "number", r: 24, g: 12, b: 100 } as RGB, "rgb(24,12,100)"],
  ])("create '%s' color should equals to '%s'", (input: RGB, output: string) => {
    const c = new Color(input);
    expect(c.toString()).toEqual(output);
  });
});
