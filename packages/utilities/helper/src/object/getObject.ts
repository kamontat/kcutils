import type { NestedJson } from "./types";

import notEmpty from "../generic/notEmpty";
import isString from "../string/isString";
import forceObject from "./forceObject";

/**
 *
 * @param obj input object to query
 * @param key object query statment (format as a.b.c)
 * @param all if enable this, getObject will return full object instead of undefined
 */
const getObject = <R, T extends NestedJson<R>>(
  obj: T,
  key: string,
  all: boolean = false
): R | T | undefined => {
  const _obj: T = forceObject(obj);
  if (!isString(key)) return all ? _obj : undefined;

  const keys = key.split(".");
  const result: any = keys.reduce((p, k) => {
    if (p[k]) return p[k];
    else return p;
  }, _obj as any);

  // if result is the same as input return 'undefined' or 'input' base on `all`
  if (result !== _obj && notEmpty(result)) {
    return result;
  } else {
    return all ? _obj : undefined;
  }
};

export default getObject;
