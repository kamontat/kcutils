import type { Optional } from "generic";

import cleanObject from "./cleanObject";

const mergeObject = <T>(base: T, ...obj: Optional<Partial<T>>[]): T => {
  const newObjectList = obj.map((o) => cleanObject(o));
  return Object.assign(cleanObject(base), ...newObjectList);
};

export default mergeObject;
