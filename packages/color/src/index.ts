import { setProject } from "@kcutils/error";
setProject("@kcutils/color");

export { Color } from "./models/Color";
export { WCAG2 } from "./models/WCAG2";

export { ColorBuilder } from "./services/ColorBuilder";

export { isRGB } from "./typings/RGB";
export type { RawRGB, RGB, OptionalRGB } from "./typings/RGB";

export { isHSL } from "./typings/HSL";
export type { RawHSL, HSL, OptionalHSL } from "./typings/HSL";

export { isHSV } from "./typings/HSV";
export type { RawHSV, HSV, OptionalHSV } from "./typings/HSV";

export { isHex } from "./typings/HEX";
export type { RawHEX, HEX, OptionalHEX } from "./typings/HEX";

export { isNamed } from "./typings/Named";
export type { RawNamed, Named, OptionalNamed } from "./typings/Named";

export type { NumberType, Type as NumberTypeString } from "./typings/NumberType";
export type { HexType, Type as HexTypeString } from "./typings/HexType";
