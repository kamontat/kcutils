import { isNamed } from "../../index";

describe("Named type", () => {
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

    [{ n: undefined }, false],
    [{ n: "" }, false],
    [{ n: null }, false],
    [{ n: true }, false],
    [{ n: -99 }, false],

    [{ n: "red" }, true],
    [{ n: "blue" }, true],
    [{ n: "no-exist" }, true],
    [{ n: "hello" }, true],
  ])("isNamed(%p) => %p", (input: any, output: boolean) => {
    expect(isNamed(input)).toEqual(output);
  });
});
