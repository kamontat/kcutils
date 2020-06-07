export const byDefault = <T>(defaults: T, ...partials: Partial<T>[]): T => {
  const array = [...partials];

  return array.reduce((p, c) => {
    return Object.assign(p, c) as T;
  }, defaults) as T;
};

export const getOrElse = <T extends string>(defaults: T, elses: T) => {
  if (defaults === "") return elses;
  else return defaults;
};
