import { noExist } from "./generic";

/**
 * convert input to array size 1 if not,
 * or return input if already be array type
 *
 * @param t input value
 * @returns array
 */
export const toArray = <T>(t: T | T[]): T[] => {
  if (Array.isArray(t)) return t;
  else return [t];
};

/**
 * Check unorder array equal.
 *
 * This can be very slow on large array size
 * due to implementation with sorting twice
 * and one loop
 *
 * @param t1 first array
 * @param t2 second array
 * @returns true if first and second are equals
 */
export const equals = <T>(t1: T | T[], t2: T | T[]): boolean => {
  if (noExist(t1) || noExist(t2)) return t1 === t2;

  const arr1 = toArray(t1);
  const arr2 = toArray(t2);
  if (arr1.length !== arr2.length) return false;

  const clone1 = Array.from(arr1).sort();
  const clone2 = Array.from(arr2).sort();
  for (let i = 0; i < clone1.length; ++i) {
    if (clone1[i] !== clone2[i]) return false;
  }
  return true;
};

/**
 * flat input to single array with values
 *
 * @param arr input array / multiple array
 * @returns flat array without nested array
 */
export const flatmap = <T>(...arr: (T[] | T)[]): T[] => {
  return arr.reduce((p: T[], c) => p.concat(...toArray(c)), []);
};
