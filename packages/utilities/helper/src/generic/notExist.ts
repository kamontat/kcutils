import type { Optional, Null } from "generic";

const notExist = <T = unknown>(t: Optional<T>): t is Null => {
  return t === undefined || t === null;
};

export default notExist;
