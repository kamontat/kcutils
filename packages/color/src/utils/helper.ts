import { type } from "@kcutils/helper";

const defaultMax = 1;
const defaultMin = 0;

export type BetweenOption = { max: number; min: number; digit: number };
const assignDefaultBetweenOption = (o?: Partial<BetweenOption>): BetweenOption => {
  const max = o?.max ?? defaultMax;
  const min = o?.min ?? defaultMin;
  const digit = o?.digit ?? 2;
  if (max > min) return { max, min, digit };
  else return { max: min, min: max, digit };
};

/**
 * Take input from [0, n] and return it as [0, 1]
 *
 * @param n n variable
 * @param max maximum possible number
 */
export const bound01 = (n: number, opts?: Partial<BetweenOption>): number => {
  const options = assignDefaultBetweenOption(opts);
  const num = between(n, options);

  // Handle floating point rounding errors
  if (Math.abs(num - options.max) < 0.000001) {
    return 1; // return max
  }

  // Convert into [0, 1] range if it isn't already
  const result = (num % options.max) / options.max;
  return rounding(result, options.digit);
};

/**
 * convert percent type to number format
 *
 * @param percent number in format of [0-100] or [0-1] if set noparser to true
 * @param opts between options
 * @param noparser false if percent is format [0-100], or true if you input number as [0-1]
 */
export const percentage = (percent: number, opts?: Partial<BetweenOption>, noparser: boolean = false): number => {
  const options = assignDefaultBetweenOption(opts);
  const percentage = noparser ? percent : bound01(percent, { max: 100 });

  const result = options.min + (options.max - options.min) * percentage;
  return rounding(result, options.digit);
};

/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 *
 * @param a string or number
 * @returns float number in range [0, 1]
 */
export const boundAlpha = (a: number): number => {
  if (isNaN(a) || a < 0 || a > 1) return 1;
  else return rounding(a, 2);
};

/**
 * Force a hex value to have 2 characters
 *
 * @param c input hex string
 */
export const pad2 = (c: string): string => {
  return c.length === 1 ? `0${c}` : c;
};

export const duplicateChar = (str: string): boolean => {
  if (str.length <= 1) return false;
  const init = str.charAt(0);
  return str.split("").every(c => c === init);
};

//
/**
 * { 'name1': 'val1' }` becomes `{ 'val1': 'name1' }
 *
 * @param o input object
 * @returns flip of input object
 */
export const flip = <K extends string, V extends string>(o: Record<K, V>): Record<V, K> => {
  const flipped: any = {}; // eslint-disable-line
  for (const i in o) {
    if (o[i] !== undefined) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
};

/**
 * round input n to digit
 *
 * @param n integer or double
 * @param digit how many digit to return (default = 2)
 *
 * @return number
 */
export const rounding = (n: number, digit: number = 2): number => {
  if (digit <= 0) return parseInt(n.toFixed(0));

  const str = n.toFixed(digit);
  return parseFloat(str);
};

/**
 * Force a number between min option and max option, min, max included
 *
 * @param val input number
 * @param opts between options (default is [0, 1])
 *
 * @return number between option
 */
export const between = (val: number, opts?: Partial<BetweenOption>): number => {
  const options = assignDefaultBetweenOption(opts);
  return Math.min(options.max, Math.max(options.min, val));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const nonEmpty = <T = any>(a: any): a is T => {
  return a !== undefined && a !== null;
};

export const cleanObject = <T = any>(obj: Record<string, type.Optional<T>>): Record<string, T> => {
  return Object.keys(obj)
    .filter(key => nonEmpty<T>(obj[key]))
    .reduce((p, k) => {
      const v = obj[k] as T;
      return { ...p, [k]: v };
    }, {} as Record<string, T>);
};

export const mergeObject = <T extends Record<string, any>>(
  base: Partial<T> | undefined,
  ...obj: (Partial<T> | undefined)[]
): T | undefined => {
  if (base === undefined) return undefined;
  const newObjectList = obj.filter(v => nonEmpty(v)).map(o => cleanObject(o as Partial<T>));
  return Object.assign(cleanObject(base), ...newObjectList);
};
