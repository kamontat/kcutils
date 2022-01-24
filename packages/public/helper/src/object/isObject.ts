import type { Optional } from "generic";

/**
 * checking is input is object datatype (object mean typeof input will return object)
 *
 * @param obj input of any type
 */
const isObject = <T = unknown>(obj: Optional<T>): obj is T => {
  if (obj === undefined || obj === null) return false;
  else return typeof obj === "object" && !Array.isArray(obj);
};

export default isObject;
