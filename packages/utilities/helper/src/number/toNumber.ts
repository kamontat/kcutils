import notExist from "../generic/notExist";
import isNumber from "./isNumber";
import isBoolean from "../boolean/isBoolean";
import isString from "../string/isString";

/**
 * Cast input to number, This supported by list below
 *
 * 1. undefined | null  => return undefined
 * 2. boolean           => return 1 if true; otherwise, return 0
 * 3. string            => return by converter function
 *
 * @param input input data on any type
 * @param converter parseFloat or parseInt, applied only when input is string. (default is parseFloat())
 */
const toNumber = <T = unknown>(
  input: T,
  converter: (s: string) => number = parseFloat
): number | undefined => {
  if (notExist(input)) return undefined;
  else if (isNumber(input)) return input;
  else if (isBoolean(input)) return input ? 1 : 0;
  else if (isString(input)) {
    const n = converter(input);
    return isFinite(n) ? n : undefined;
  } else return undefined;
};

export default toNumber;
