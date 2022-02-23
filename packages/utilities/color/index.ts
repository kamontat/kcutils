import { setProject } from "@kcutils/error";
setProject("@kcutils/color");

export { Color } from "./src/models/Color";
export { WCAG2 } from "./src/models/WCAG2";

export { ColorBuilder } from "./src/services/ColorBuilder";

export { isRGB } from "./src/typings/RGB";
export type { RawRGB, RGB, OptionalRGB } from "./src/typings/RGB";

export { isHSL } from "./src/typings/HSL";
export type { RawHSL, HSL, OptionalHSL } from "./src/typings/HSL";

export { isHSV } from "./src/typings/HSV";
export type { RawHSV, HSV, OptionalHSV } from "./src/typings/HSV";

export { isHex } from "./src/typings/HEX";
export type { RawHEX, HEX, OptionalHEX } from "./src/typings/HEX";

export { isNamed } from "./src/typings/Named";
export type { RawNamed, Named, OptionalNamed } from "./src/typings/Named";

export type {
  NumberType,
  Type as NumberTypeString,
} from "./src/typings/NumberType";
export type { HexType, Type as HexTypeString } from "./src/typings/HexType";

export * from "./src/utils/converter";
