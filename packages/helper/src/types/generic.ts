import { Optional, Null, AnyOptional } from "../models/Optional";

/**
 * return true when match following condition
 *  1. is undefined or null
 *  2. is empty string
 *  3. is empty object ({})
 *  4. is empty array ([])
 *
 * @param t input on any data type
 */
export const isEmpty = <T = unknown>(t: Optional<T>): t is Null => {
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
export const nonEmpty = <T = unknown>(t: Optional<T>): t is T => {
  return !isEmpty(t);
};

export const noExist = <T = unknown>(t: Optional<T>): t is Null => {
  return t === undefined || t === null;
};

export const isFalsy = <T = unknown>(t: Optional<T>): t is T => {
  if (t) return false;
  else return true;
};

export const isString = (t: AnyOptional): t is string => {
  return isExist(t) && typeof t === "string";
};

export const isNumber = (t: AnyOptional, ignoreSpecial: boolean = false): t is number => {
  if (isExist(t)) {
    if (typeof t === "number") {
      if (ignoreSpecial) return true;
      else return !isNaN(t) && isFinite(t);
    }
  }
  return false;
};

export const isBoolean = (t: AnyOptional): t is boolean => {
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

/**
 * Cast input to string. This supporting by listed below
 *
 * 1. undefined | null => return undefined
 * 2. boolean | string => return as string
 * 3. number           => return as fix digit not more than 6
 * 4. array            => return as array syntax without space
 * 5. object           => return by JSON.stringify()
 *
 * @param input input data on any type
 */
export const toString = <T extends any = unknown>(input: T): string | undefined => {
  if (noExist(input)) return undefined;
  else if (isString(input)) return input;
  else if (isBoolean(input)) return input ? "true" : "false";
  else if (isNumber(input)) return input.toString(10);
  else if (Array.isArray(input)) return `[${input.join(",")}]`;
  else if (isObject(input)) return JSON.stringify(input);
  else return undefined;
};

/**
 * Cast input to number, This supported by list below
 *
 * 1. undefined | null  => return undefined
 * 2. boolean           => return 1 if true; otherwise, return 0
 * 3. string            => return by converter function
 *
 * @param input input data on any type
 * @param converter parseFloat or parseInt, applied only when input is string. (default is parseFloat())
 */
export const toNumber = <T extends any = unknown>(
  input: T,
  converter: (s: string) => number = parseFloat
): number | undefined => {
  if (noExist(input)) return undefined;
  else if (isNumber(input)) return input;
  else if (isBoolean(input)) return input ? 1 : 0;
  else if (isString(input)) {
    const n = converter(input);
    return isFinite(n) ? n : undefined;
  } else return undefined;
};

export const toBoolean = <T extends any = unknown>(input: T): boolean | undefined => {
  if (noExist(input)) return undefined;
  else if (isBoolean(input)) return input;
  else if (isNumber(input)) {
    const isTrue = input === 1;
    const isFalse = input === 0;

    if (isTrue) return true;
    else if (isFalse) return false;
    else return undefined;
  } else if (isString(input)) {
    const isTrue = input === "true" || input === "1";
    const isFalse = input === "false" || input === "0";

    if (isTrue) return true;
    else if (isFalse) return false;
    else return undefined;
  } else return undefined;
};
