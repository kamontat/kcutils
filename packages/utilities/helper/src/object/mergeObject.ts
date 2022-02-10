import type { Optional } from "generic";
import type { Json } from "./types";

import cleanObject from "./cleanObject";

const mergeObject = <T extends Json<unknown>>(
  base: Partial<T>,
  ...obj: Optional<Partial<T>>[]
): T => {
  const newObjectList = obj.map((o) => cleanObject(o));
  return Object.assign(cleanObject(base), ...newObjectList);
};

export default mergeObject;
