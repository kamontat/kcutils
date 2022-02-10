import isNumber from "../number/isNumber";
import isBoolean from "../boolean/isBoolean";
import isObject from "../object/isObject";
import stringify from "../object/stringify";
import isString from "./isString";

interface ObjWithToString {
  toString: () => string;
}
const hasToString = (input: unknown): input is ObjWithToString => {
  if (input === undefined || input === null) return false;
  return !!(input as ObjWithToString).toString;
};

/**
 * Cast input to string. This supporting by listed below
 *
 * 1. undefined | null => return undefined
 * 2. boolean | string => return as string
 * 3. number           => return as fix digit not more than 6
 * 4. array            => return as array syntax without space
 * 5. object           => return by object.stringify()
 *
 * @param input input data on any type
 */
const toString = <T = unknown>(input: T): string | undefined => {
  if (Array.isArray(input)) return `[${input.join(",")}]`;
  else if (isNumber(input)) return input.toString(10);
  else if (isString(input)) return input;
  else if (isBoolean(input)) return input ? "true" : "false";
  // Must be JSON object, not custom object
  else if (isObject(input) && (input as any).constructor === Object)
    return stringify(input);
  // Custom object should falling here
  else if (hasToString(input)) return (input as ObjWithToString).toString();
  else return undefined;
};

export default toString;
