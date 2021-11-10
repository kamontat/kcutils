import { noExist } from "./generic";

export const toArray = <T>(t: T | T[]): T[] => {
  if (Array.isArray(t)) return t;
  else return [t];
};

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

export const flatmap = <T>(...arr: (T[] | T)[]): T[] => {
  return arr.reduce((p: T[], c) => p.concat(...toArray(c)), []);
};
