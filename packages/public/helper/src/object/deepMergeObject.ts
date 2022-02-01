import type { NestedJson } from "./types";

import isExist from "../generic/isExist";
import isObject from "./isObject";
import forceObject from "./forceObject";

const deepMergeObject = <T extends NestedJson, U extends NestedJson>(
  _jsonA?: T,
  _jsonB?: U,
  size: number = 20
): T & U => {
  const jsonA: T = forceObject(_jsonA);
  const jsonB: U = forceObject(_jsonB);

  return [jsonB].reduce((prev, obj) => {
    (Object.keys(obj) as Array<keyof typeof obj>).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal) as any;
      } else if (isObject(pVal) && isObject(oVal) && size > 0) {
        prev[key] = deepMergeObject(
          pVal as NestedJson<unknown>,
          oVal as NestedJson<unknown>,
          size - 1
        ) as any;
      } else {
        // replace only when new value is exist
        if (isExist(oVal)) prev[key] = oVal;
      }
    });

    return prev;
  }, jsonA as T & U) as T & U;
};

export default deepMergeObject;
