import type { Optional } from "generic";

const isTruthy = <T = unknown>(t: Optional<T>): t is T => {
  if (t) return true;
  else return false;
};

export default isTruthy;
