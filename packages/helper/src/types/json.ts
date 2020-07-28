import { nonEmpty, isString, isObject } from "./generic";
import { array } from "..";
import { Optional } from "../models/Optional";

export type JsonSortableData<T> = {
  index: number;
  data: T;
};

export type SortableJson = {
  [key: string]: JsonSortableData<string | string[]>;
};

export type OptionalSortableJson = Partial<SortableJson>;

type PossibleValue = any | any[];
type PossibleValues = PossibleValue | Record<string, PossibleValue>;

type NestedJson = Partial<Record<string, PossibleValues>>;

/**
 * this will convert input to T object
 *
 * @param obj input any type
 * @param def default value if input is not object
 */
export const forceObject = <T = unknown>(obj: Optional<T>, def = {}): T => {
  if (isObject(obj)) return Object.assign({}, obj);
  else return def as T;
};

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
export const equals = <T extends NestedJson>(o1: Optional<T>, o2: Optional<T>, keys: string[] = []): boolean => {
  // for deep equals object data
  if (isObject(o1) && isObject(o2)) {
    // checking all keys
    if (keys.length <= 0) {
      const keys1 = Object.keys(o1 as T);
      const keys2 = Object.keys(o2 as T);

      if (keys1.length !== keys2.length) return false; // force not equals when keys is not equals
      if (keys1.length <= 0 && keys2.length <= 0) return true; // force equals when empty object passed

      return equals(o1, o2, keys1);
      // checking only specify keys
    } else {
      return keys.every(key => {
        const value1: any = getObject(o1 as T, key);
        const value2: any = getObject(o2 as T, key);

        // recusive object again
        if (isObject(value1) && isObject(value2))
          return equals(
            value1,
            value2,
            keys.map(k => k.split(".").slice(1).join("."))
          );
        // checking by
        else if (equals(value1, value2)) return true;
        return false;
      });
    }

    // normal datatype
  } else if (Array.isArray(o1) || Array.isArray(o2)) {
    return array.equals(o1, o2);
  } else {
    return o1 === o2;
  }
};

/**
 *
 * @param obj input object to query
 * @param key object query statment (format as a.b.c)
 * @param all if enable this, getObject will return full object instead of undefined
 */
export const getObject = <T extends NestedJson, R extends any>(
  obj: T,
  key: string,
  all: boolean = false
): R | undefined => {
  const _obj: T = forceObject(obj);
  if (!isString(key)) return all ? (_obj as R) : undefined;

  const keys = key.split(".");
  const result: any = keys.reduce((p, k) => {
    if (p[k]) return p[k];
    else return p;
  }, _obj);

  // if result is the same as input return 'undefined' or 'input' base on `all`
  if (result !== _obj && nonEmpty(result)) {
    return result;
  } else {
    return all ? (_obj as R) : undefined;
  }
};

export const deepMerge = <T extends NestedJson, U extends NestedJson>(
  _jsonA?: T,
  _jsonB?: U,
  size: number = 20
): T & U => {
  const jsonA: T = forceObject(_jsonA);
  const jsonB: U = forceObject(_jsonB);

  return [jsonB].reduce((prev, obj) => {
    (Object.keys(obj) as Array<keyof typeof obj>).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal) && size > 0) {
        prev[key] = deepMerge(pVal, oVal, size - 1);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, jsonA as T & U) as T & U;
};

export const toArray = (json: OptionalSortableJson): string[] => {
  return Object.keys(json)
    .sort((k1, k2) => {
      const v1 = json[k1] ?? { index: -1, data: "" };
      const v2 = json[k2] ?? { index: -1, data: "" };

      if (v1.index > v2.index) return 1;
      else if (v1.index < v2.index) return -1;
      else return 0;
    })
    .map(k => json[k]?.data ?? "")
    .reduce<string[]>((p, c) => (Array.isArray(c) ? [...p, ...c] : [...p, c]), [] as string[]);
};
