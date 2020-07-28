import { OptionalRGB } from "../typings/RGB";
import { OptionalHSL } from "../typings/HSL";
import { OptionalHEX } from "../typings/HEX";
import { OptionalHSV } from "../typings/HSV";
import { OptionalNamed } from "../typings/Named";

export type ColorMapping = {
  rgb: OptionalRGB;
  rgba: OptionalRGB;

  hsl: OptionalHSL;
  hsla: OptionalHSL;

  hsv: OptionalHSV;
  hsva: OptionalHSV;

  hex: OptionalHEX;
  hex3: OptionalHEX<"hex3">;
  hex4: OptionalHEX<"hex4">;
  hex6: OptionalHEX<"hex6">;
  hex8: OptionalHEX<"hex8">;

  named: OptionalNamed;
};
