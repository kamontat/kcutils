import type { Optional } from "generic";

const isExist = <T = unknown>(t: Optional<T>): t is T => {
  return t !== undefined && t !== null;
};

export default isExist;
