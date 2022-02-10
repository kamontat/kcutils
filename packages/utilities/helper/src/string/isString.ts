import { Optional } from "generic";
import isExist from "../generic/isExist";

const isString = (t: Optional<unknown>): t is string => {
  return isExist(t) && typeof t === "string";
};

export default isString;
