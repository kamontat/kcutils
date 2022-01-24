import type { Optional } from "generic";
import type { PossibleValue, Json } from "./types";

import notExist from "../generic/notExist";
import isExist from "../generic/isExist";

/**
 * clean object mean remove undefined and null object
 *
 * @param obj massy object
 */
const cleanObject = <T>(
  obj: Optional<Json<T>>
): Record<string, PossibleValue<T>> => {
  if (notExist(obj)) return {};
  else
    return Object.keys(obj).reduce((p, k) => {
      const v = obj[k] as T;
      if (isExist<T>(v)) return { ...p, [k]: v };
      else return p;
    }, {} as Record<string, T>);
};

export default cleanObject;
