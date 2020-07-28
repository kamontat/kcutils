import { Optional } from "../models/Optional";

/**
 * return true when match following condition
 *  1. is undefined or null
 *  2. is empty string
 *  3. is empty object ({})
 *  4. is empty array ([])
 *
 * @param t input on any data type
 */
export const isEmpty = <T = unknown>(t: T): boolean => {
  if (noExist(t)) return true;
  if (isObject(t) && isEmpty(Object.keys(t))) return true;
  else if (Array.isArray(t) && t.length <= 0) return true;
  else if (typeof t === "string" && t === "") return true;

  return false;
};

export const isExist = <T = unknown>(t: Optional<T>): t is T => {
  return t !== undefined && t !== null;
};

export const isTruthy = <T = unknown>(t: Optional<T>): t is T => {
  if (t) return true;
  else return false;
};

/**
 * The reverse function of isEmpty
 *
 * @param t input on any data type
 */
export const nonEmpty = <T = unknown>(t: T): boolean => {
  return !isEmpty(t);
};

export const noExist = <T = unknown>(t: Optional<T>): boolean => {
  return t === undefined || t === null;
};

export const isFalsy = <T = unknown>(t: Optional<T>): t is T => {
  if (t) return false;
  else return true;
};

export const isString = (t: Optional<any>): t is string => {
  return isExist(t) && typeof t === "string";
};

export const isNumber = (t: Optional<any>): t is number => {
  return isExist(t) && typeof t === "number";
};

export const isBoolean = (t: Optional<any>): t is boolean => {
  return isExist(t) && typeof t === "boolean";
};

/**
 * checking is input is object datatype (object mean typeof input will return object)
 *
 * @param obj input of any type
 */
export const isObject = <T = unknown>(obj: Optional<T>): obj is T => {
  if (obj === undefined || obj === null) return false;
  else return typeof obj === "object" && !Array.isArray(obj);
};
