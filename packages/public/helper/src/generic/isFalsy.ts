import type { Optional } from "generic";

const isFalsy = <T = unknown>(t: Optional<T>): t is T => {
  if (t) return false;
  else return true;
};

export default isFalsy;
