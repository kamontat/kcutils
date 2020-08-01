import { TypeNotFoundError } from "../../errors/converter";

import { isPercentage, isNumber, isDecimal } from "../checker";
import { BetweenOption, bound01, percentage } from "../helper";

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
    else if (k[key] === undefined) return p;
    else return { ...p, [key]: fn(k[key]) };
  }, {} as V);
  return { ...obj, type: newType };
};

export const toPercentage = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isPercentage(o)) return o;
  else if (isNumber(o)) return loop<K, V>(o, v => bound01(v, limit) * 100, "percent");
  else if (isDecimal(o)) return loop<K, V>(o, v => v * 100, "percent");
  else throw TypeNotFoundError(o?.type);
};

export const toNumber = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isNumber(o)) return o;
  else if (isPercentage(o)) return loop<K, V>(o, v => percentage(v, limit), "number");
  else if (isDecimal(o)) return loop<K, V>(o, v => percentage(v, limit, true), "number");
  else throw TypeNotFoundError(o?.type);
};

export const toDecimal = <K extends string, V extends C<K>>(
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (isDecimal(o)) return o;
  else if (isPercentage(o)) return loop<K, V>(o, v => bound01(v, { max: 100 }), "decimal");
  else if (isNumber(o)) return loop<K, V>(o, v => bound01(v, limit), "decimal");
  else throw TypeNotFoundError(o?.type);
};

export const toType = <K extends string, V extends C<K>>(
  newType: Type,
  o: V & NumberType,
  limit: Partial<BetweenOption>
): V & NumberType => {
  if (newType === "percent") return toPercentage(o, limit);
  else if (newType === "decimal") return toDecimal(o, limit);
  else if (newType === "number") return toNumber(o, limit);
  else throw TypeNotFoundError(o?.type);
};
