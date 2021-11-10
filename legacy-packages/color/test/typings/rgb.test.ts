import { isRGB } from "../../src";

describe("RGB type", () => {
  test.each([
    [undefined, false],
    [null, false],
    ["string", false],
    [999, false],
    [true, false],

    [{}, false],
    [{ a: "hello" }, false],
    [{ r: "red" }, false],
    [{ g: "green" }, false],
    [{ b: "blue" }, false],

    [{ r: "red", g: "green" }, false],
    [{ r: "red", g: "green", b: "blue" }, false],
    [{ r: "123", g: "321", b: "231" }, false],

    [{ r: 4 }, false],
    [{ g: 4, b: 0 }, false],
    [{ r: 4, b: 0 }, false],
    [{ r: 4, g: NaN, b: 0 }, false],
    [{ r: Infinity, g: 5, b: 0 }, false],

    [{ h: 0, s: 0, v: 0 }, false],
    [{ h: 0, s: 0, l: 0 }, false],

    [{ r: 0, g: 0, b: 0 }, true],
    [{ r: 1, g: 20, b: 30 }, true],
    [{ r: 100, g: 1000, b: 10000 }, true],
    [{ r: -999, g: 999, b: -999 }, true],
  ])("isRGB(%p) => %p", (input: any, output: boolean) => {
    expect(isRGB(input)).toEqual(output);
  });
});
