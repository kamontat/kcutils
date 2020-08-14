import { NumberType, Type } from "../typings/NumberType";
import { colorMatchers } from "./constants";

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
