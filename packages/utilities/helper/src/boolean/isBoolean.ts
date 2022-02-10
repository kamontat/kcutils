import type { Optional } from "generic";
import isExist from "../generic/isExist";

const isBoolean = (t: Optional<unknown>): t is boolean => {
  return isExist(t) && typeof t === "boolean";
};

export default isBoolean;
