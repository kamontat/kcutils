import { generic, type } from "@kcutils/helper";
import { format } from "util";

export const cParseString = (val: type.AnyOptional): string => {
  if (generic.isString(val)) return val;
  else if (generic.isNumber(val)) return val.toString();
  else if (generic.isTruthy(val) && val.toString) return val.toString();
  else return format("%s", val);
};

export const cParseInt = <T = unknown>(val: T, radix: number = 10): number => {
  const str = cParseString(val);
  const num = parseInt(str, radix);

  if (isNaN(num) || !isFinite(num)) return 0;
  else return num;
};

export const cParseFloat = (val: type.AnyOptional): number => {
  const str = cParseString(val);
  const num = parseFloat(str);

  if (isNaN(num) || !isFinite(num)) return 0;
  else return num;
};
