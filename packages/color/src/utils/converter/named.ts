import { RGB } from "../../typings/RGB";
import { Named } from "../../typings/Named";
import { colorNames } from "../constants";
import { OptionalHEX } from "../../typings/HEX";
import { hexToRgb } from "./hex";
import { nonEmpty } from "../helper";

export const namedToRgb = (named: Named): RGB | undefined => {
  const hex: string | undefined = colorNames[named.n];
  if (nonEmpty(hex)) return undefined;

  const hexObject: OptionalHEX = {
    type: "hex",
    a: named.a,
    x: hex,
  };

  return hexToRgb(hexObject);
};
