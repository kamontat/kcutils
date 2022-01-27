import type { Optional } from "generic";
import type { NestedJson } from "./types";

import toArray from "../array/toArray";
import isObject from "./isObject";
import getObject from "./getObject";

/**
 * deepEquals object data with specify keys
 *
 * @param o1 base object
 * @param o2 checking object with o1
 * @param keys only specify key to check, empty means check all. The keys can cover nested object by . (see on example)
 *
 * @returns true if two object is identical
 *
 * @example
 *  equals({a: 1}, {a: 2}, ["a"]) - check only keys 'a'
 *  equals({a: 2, b: 3}, {a: 2, b: 3}) - check all keys ('a' and 'b')
 *  equals({a: {aa: 1, ab: 2}}, {a: {aa: 2, bb: 3, cc: 1}, ["a.ab"]}) - check only 'b' key inside a object
 */
const equals = <T extends NestedJson<unknown>>(
  o1: Optional<T>,
  o2: Optional<T>,
  keys: string[] = []
): boolean => {
  // for deep equals object data
  if (isObject(o1) && isObject(o2)) {
    // checking all keys
    if (keys.length <= 0) {
      const keys1 = Object.keys(o1);
      const keys2 = Object.keys(o2);

      if (keys1.length !== keys2.length) return false; // force not equals when keys is not equals
      if (keys1.length <= 0 && keys2.length <= 0) return true; // force equals when empty object passed

      return equals(o1, o2, keys1);
      // checking only specify keys
    } else {
      return keys.every((key) => {
        const value1: any = getObject(o1, key);
        const value2: any = getObject(o2, key);

        // recusive object again
        if (isObject(value1) && isObject(value2))
          return equals(
            value1,
            value2,
            keys.map((k) => k.split(".").slice(1).join("."))
          );
        // checking by
        else if (equals(value1, value2)) return true;
        return false;
      });
    }

    // normal datatype
  } else if (Array.isArray(o1) || Array.isArray(o2)) {
    const arr1 = toArray(o1);
    const arr2 = toArray(o2);
    if (arr1.length !== arr2.length) return false;

    const clone1 = Array.from(arr1).sort();
    const clone2 = Array.from(arr2).sort();
    for (let i = 0; i < clone1.length; ++i) {
      if (clone1[i] !== clone2[i]) return false;
    }
    return true;
  } else {
    return o1 === o2;
  }
};

export default equals;
