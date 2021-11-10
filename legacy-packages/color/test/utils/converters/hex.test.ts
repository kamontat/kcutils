import { converter, HEX } from "../../../src";
import { enforceRGB } from "../../../src/utils/converter";

describe("Hex color", () => {
  const definedHex = (input?: Partial<HEX>): HEX => {
    const defaultHSV: HEX = { a: 1, type: "hex", x: "000000" };
    if (input) return Object.assign({}, defaultHSV, input);
    else return Object.assign({}, defaultHSV);
  };

  test.each([
    [undefined, definedHex()],
    [null, definedHex()],
    [{ a: 0.9 }, definedHex({ a: 0.9 })],
    [{ x: 123 }, definedHex({ x: "123" })],
    [{ n: 123 }, definedHex()],
  ])("enforce %p to be hex '%p' color", (input: any, output) => {
    expect(converter.enforceHex(input)).toEqual(output);
  });

  test.each([
    [definedHex(), enforceRGB()],
    [definedHex({ a: 0.6659417 }), enforceRGB({ a: 0.665942 })],

    [definedHex({ a: 20 }), enforceRGB({ a: 1 })],
    [definedHex({ type: "hex6" }), enforceRGB()],
    [definedHex({ x: "start" }), undefined],
    [definedHex({ x: "123" }), enforceRGB({ a: 1, b: 51, g: 34, r: 17 })],
    [definedHex({ x: "true" }), undefined],

    [definedHex({ x: "#FFF" }), enforceRGB({ r: 255, g: 255, b: 255 })],
    [definedHex({ x: "FFF" }), enforceRGB({ r: 255, g: 255, b: 255 })],
    [definedHex({ x: "#FFF0" }), enforceRGB({ r: 255, g: 255, b: 255, a: 0 })],

    [definedHex({ x: "#122448" }), enforceRGB({ r: 18, g: 36, b: 72, a: 1 })],
    [definedHex({ x: "133672" }), enforceRGB({ r: 19, g: 54, b: 114, a: 1 })],

    [definedHex({ x: "#00000000" }), enforceRGB({ a: 0 })],
    [definedHex({ x: "00000001" }), enforceRGB({ a: 0 })],
    [definedHex({ x: "#00000005" }), enforceRGB({ a: 0.02 })],
    [definedHex({ x: "00000010" }), enforceRGB({ a: 0.06 })],
    [definedHex({ x: "#00000020" }), enforceRGB({ a: 0.13 })],
    [definedHex({ x: "00000050" }), enforceRGB({ a: 0.31 })],
    [definedHex({ x: "00000099" }), enforceRGB({ a: 0.6 })],
    [definedHex({ x: "000000EF" }), enforceRGB({ a: 0.94 })],
  ])("convert Hex(%p) to RGB(%p)", (hex, rgb) => {
    expect(converter.hexToRgb(hex)).toEqual(rgb);
  });
});
