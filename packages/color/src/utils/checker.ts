import { NumberType, Type } from "../typings/NumberType";
import { colorMatchers } from "./constants";

/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 *
 * @param n check input is 1.0
 */
export const isOnePointZero = (n: string | number): boolean => {
  if (typeof n === "number") return n === 1;
  return n.indexOf(".") !== -1 && parseFloat(n) === 1;
};

export const isValidCSSUnit = (color: string): boolean => {
  return colorMatchers.cssUnit.test(color);
};

export const isType = (n: NumberType, type: Type): boolean => {
  return n?.type === type;
};

/**
 *  Check to see if input passed in is a percentage type
 */
export const isPercentage = (n: NumberType): boolean => {
  return isType(n, "percent");
};

/**
 *  Check to see if input passed in is a number type
 */
export const isNumber = (n: NumberType): boolean => {
  return isType(n, "number");
};

/**
 *  Check to see if input passed in is a decimal type
 */
export const isDecimal = (n: NumberType): boolean => {
  return isType(n, "decimal");
};
