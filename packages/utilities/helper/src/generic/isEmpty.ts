import type { Optional, Null } from "generic";
import notExist from "./notExist";
import isObject from "../object/isObject";

/**
 * return true when match following condition
 *  1. is undefined or null
 *  2. is empty string
 *  3. is empty object ({})
 *  4. is empty array ([])
 *
 * @param t input on any data type
 */
const isEmpty = <T = unknown>(t: Optional<T>): t is Null => {
  if (notExist(t)) return true;
  if (isObject(t) && isEmpty(Object.keys(t))) return true;
  else if (Array.isArray(t) && t.length <= 0) return true;
  else if (typeof t === "string" && t === "") return true;

  return false;
};

export default isEmpty;
