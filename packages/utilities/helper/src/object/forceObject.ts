import type { Optional } from "generic";
import isObject from "./isObject";

/**
 * this will convert input to T object
 *
 * @param obj input any type
 * @param def default value if input is not object
 * @return always new object returned
 */
const forceObject = <T = unknown>(obj: Optional<T>, def = {}): T => {
  if (isObject(obj)) return Object.assign({}, obj);
  else return Object.assign({}, def as T);
};

export default forceObject;
