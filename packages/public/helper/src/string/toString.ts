import isNumber from "../number/isNumber";
import isBoolean from "../boolean/isBoolean";
import isObject from "../object/isObject";
import isString from "./isString";

/**
 * Cast input to string. This supporting by listed below
 *
 * 1. undefined | null => return undefined
 * 2. boolean | string => return as string
 * 3. number           => return as fix digit not more than 6
 * 4. array            => return as array syntax without space
 * 5. object           => return by JSON.stringify()
 *
 * @param input input data on any type
 */
const toString = <T = unknown>(input: T): string | undefined => {
  if (isString(input)) return input;
  else if (isBoolean(input)) return input ? "true" : "false";
  else if (isNumber(input)) return input.toString(10);
  else if (Array.isArray(input)) return `[${input.join(",")}]`;
  else if (isObject(input)) return JSON.stringify(input);
  else return undefined;
};

export default toString;
