import { generic, json } from "@kcutils/helper";

import { TypeNotFoundError } from "../../errors/converter";

import { isPercentage, isNumber, isDecimal } from "../checker";
import { BetweenOption, bound01, percentage, between, rounding } from "../helper";

import { C } from "../../typings/C";
import { NumberType, Type } from "../../typings/NumberType";

export type LoopFn = (n: number) => number;
export const loop = <K extends string, V extends C<K>>(
  k: V & NumberType,
  fn: LoopFn,
  newType: Type
): V & NumberType => {
  const keys = Object.keys(k) as Array<K>;
  const obj = keys.reduce((p, key) => {
    if (key === "type") return p;
    else if (generic.isNumber(k[key])) return { ...p, [key]: fn(k[key]) };
    else return p;
  }, {} as V);
  return { ...obj, type: newType };
};

export const toPercentage = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isPercentage(o))
    return loop<K, V>(
      o,
      v => rounding(between(v, json.deepMerge(limit, { max: 100, min: 0 })), limit.digit),
      "percent"
    );
  else if (isNumber(o)) return loop<K, V>(o, v => rounding(bound01(v, limit) * 100, limit.digit), "percent");
  else if (isDecimal(o)) return loop<K, V>(o, v => rounding(v * 100, limit.digit), "percent");
  else throw TypeNotFoundError(JSON.stringify(o));
};

export const toNumber = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isNumber(o)) return loop<K, V>(o, v => between(v, json.deepMerge(limit, { digit: 0 })), "number");
  else if (isPercentage(o)) return loop<K, V>(o, v => percentage(v, limit), "number");
  else if (isDecimal(o)) return loop<K, V>(o, v => percentage(v, limit, true), "number");
  else throw TypeNotFoundError(JSON.stringify(o));
};

export const toDecimal = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isDecimal(o)) return loop<K, V>(o, v => bound01(v, json.deepMerge(limit, { max: 1, min: 0 })), "decimal");
  else if (isPercentage(o))
    return loop<K, V>(o, v => bound01(v, json.deepMerge(limit, { min: 0, max: 100 })), "decimal");
  else if (isNumber(o)) return loop<K, V>(o, v => bound01(v, limit), "decimal");
  else throw TypeNotFoundError(JSON.stringify(o));
};

export const toType = <K extends string, V extends C<K>>(
  newType: Type,
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (newType === "percent") return toPercentage(o, limit);
  else if (newType === "decimal") return toDecimal(o, limit);
  else if (newType === "number") return toNumber(o, limit);
  else throw TypeNotFoundError(JSON.stringify(o));
};
