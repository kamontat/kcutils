import { isHSV } from "../../src";

describe("HSV type", () => {
  test.each([
    [undefined, false],
    [null, false],
    ["string", false],
    [999, false],
    [true, false],

    [{}, false],
    [{ a: "hello" }, false],
    [{ h: "red" }, false],
    [{ s: "green" }, false],
    [{ v: "blue" }, false],

    [{ h: "hue", s: "s" }, false],
    [{ h: "hue", s: "s", v: "light" }, false],
    [{ h: "123", s: "321", v: "231" }, false],

    [{ h: 4 }, false],
    [{ s: 4, v: 0 }, false],
    [{ s: 4, v: 0 }, false],
    [{ s: 4, v: NaN, h: 0 }, false],
    [{ h: Infinity, s: 5, v: 0 }, false],

    [{ h: 0, s: 0, l: 0 }, false],
    [{ b: 0, g: 0, r: 0 }, false],

    [{ h: 0, s: 0, v: 0 }, true],
    [{ h: 1, s: 20, v: 30 }, true],
    [{ h: 100, s: 1000, v: 10000 }, true],
    [{ h: -999, s: 999, v: -999 }, true],
  ])("isHSV(%p) => %p", (input: any, output: boolean) => {
    expect(isHSV(input)).toEqual(output);
  });
});
