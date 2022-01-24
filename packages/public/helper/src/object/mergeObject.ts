import type { Optional } from "generic";
import type { Json } from "./types";

import notExist from "../generic/notExist";
import cleanObject from "./cleanObject";

const mergeObject = <T extends Json<unknown>>(
  base: Optional<Partial<T>>,
  ...obj: Optional<Partial<T>>[]
): T | undefined => {
  if (notExist(base)) return undefined;
  const newObjectList = obj.map((o) => cleanObject(o));
  return Object.assign(cleanObject(base), ...newObjectList);
};

export default mergeObject;
