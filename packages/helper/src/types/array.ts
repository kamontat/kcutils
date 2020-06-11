export const toArray = <T>(t: T | T[]): T[] => {
  if (Array.isArray(t)) return t;
  else return [t];
};

export const flatmap = <T>(...arr: (T[] | T)[]) => {
  return arr.reduce((p: T[], c) => p.concat(...toArray(c)), []);
};
