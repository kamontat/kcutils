import { cParseString, cParseInt, cParseFloat } from "../../src/utils/parser";

describe("Parser utilities", () => {
  test.each([
    [undefined, "undefined"],
    [null, "null"],
    ["undefined", "undefined"],
    ["null", "null"],
    ["normal string", "normal string"],
    [false, "false"],
    [123, "123"],
    [-33.331, "-33.331"],
    [NaN, "NaN"],
    [new Map(), "[object Map]"],
  ])("change '%s' to string '%s'", (input, output) => {
    expect(cParseString(input)).toEqual(output);
  });

  test.each([
    [undefined, undefined, 0],
    [null, undefined, 0],
    ["undefined", undefined, 0],
    ["null", undefined, 0],
    ["normal string", undefined, 0],
    [false, undefined, 0],
    [123, undefined, 123],
    [-33.331, undefined, -33],
    [-33.567, undefined, -33],
    [NaN, undefined, 0],
    [Infinity, undefined, 0],
    [new Map(), undefined, 0],

    [1, 2, 1],
    [3, 2, 0],
    [222, 5, 62],
    [123.11, 10, 123],
    [-91.91, 16, -145],
  ])("change '%s' to int '%s' radix '%s'", (input, radix, output) => {
    if (radix) expect(cParseInt(input, radix)).toEqual(output);
    else expect(cParseInt(input)).toEqual(output);
  });

  test.each([
    [undefined, 0],
    [null, 0],
    ["undefined", 0],
    ["null", 0],
    ["normal string", 0],
    [false, 0],
    [123, 123],
    [-33.331, -33.331],
    [-33.567, -33.567],
    [NaN, 0],
    [Infinity, 0],
    [new Map(), 0],
  ])("change '%s' to float '%s'", (input, output) => {
    expect(cParseFloat(input)).toEqual(output);
  });
});
