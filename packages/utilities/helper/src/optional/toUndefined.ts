import type { Optional, WithUndefined } from "generic";
import isExist from "../generic/isExist";

/**
 * remove null possibility and return as undefined instead
 *
 * @param input input as any type and undefined | null
 * @return input if input is exist; otherwise, return undefined. This function will never return null
 */
const toUndefined = <T = unknown>(input: Optional<T>): WithUndefined<T> => {
  return isExist(input) ? input : undefined;
};

export default toUndefined;
