import { isHex } from "../../index";

describe("Hex type", () => {
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

    [{ x: undefined }, false],
    [{ x: "" }, false],
    [{ x: null }, false],
    [{ x: true }, false],
    [{ x: -99 }, false],
    [{ v: "name" }, false],
    [{ w: "name" }, false],
    [{ y: "name" }, false],
    [{ z: "name" }, false],
    [{ n: "name" }, false],

    [{ x: "red" }, true],
    [{ x: "blue" }, true],
    [{ x: "no-exist" }, true],
    [{ x: "hello" }, true],
  ])("isHex(%p) => %p", (input: any, output: boolean) => {
    expect(isHex(input)).toEqual(output);
  });
});
