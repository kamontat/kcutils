import type { Optional } from "generic";
import isExist from "../generic/isExist";

const isNumber = (
  t: Optional<unknown>,
  ignoreSpecial: boolean = false
): t is number => {
  if (isExist(t)) {
    if (typeof t === "number") {
      if (ignoreSpecial) return true;
      else return !isNaN(t) && isFinite(t);
    }
  }
  return false;
};

export default isNumber;
