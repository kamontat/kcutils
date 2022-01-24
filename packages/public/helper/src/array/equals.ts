import notExist from "../generic/notExist";
import toArray from "./toArray";

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
const equals = <T>(t1: T | T[], t2: T | T[]): boolean => {
  if (notExist(t1) || notExist(t2)) return t1 === t2;

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

export default equals;
