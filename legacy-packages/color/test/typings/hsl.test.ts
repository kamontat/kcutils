import { isHSL } from "../../src";

describe("HSL type", () => {
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
    [{ l: "blue" }, false],

    [{ h: "hue", s: "s" }, false],
    [{ h: "hue", s: "s", l: "light" }, false],
    [{ h: "123", s: "321", l: "231" }, false],

    [{ h: 4 }, false],
    [{ s: 4, l: 0 }, false],
    [{ s: 4, l: 0 }, false],
    [{ s: 4, l: NaN, h: 0 }, false],
    [{ h: Infinity, s: 5, l: 0 }, false],

    [{ h: 0, s: 0, v: 0 }, false],
    [{ b: 0, g: 0, r: 0 }, false],

    [{ h: 0, s: 0, l: 0 }, true],
    [{ h: 1, s: 20, l: 30 }, true],
    [{ h: 100, s: 1000, l: 10000 }, true],
    [{ h: -999, s: 999, l: -999 }, true],
  ])("isHSL(%p) => %p", (input: any, output: boolean) => {
    expect(isHSL(input)).toEqual(output);
  });
});
