import type { Optional } from "generic";
import isEmpty from "./isEmpty";

/**
 * The reverse function of isEmpty
 *
 * @param t input on any data type
 */
const notEmpty = <T = unknown>(t: Optional<T>): t is T => {
  return !isEmpty(t);
};

export default notEmpty;
