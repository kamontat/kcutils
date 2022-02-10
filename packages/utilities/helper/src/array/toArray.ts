/**
 * convert input to array size 1 if not,
 * or return input if already be array type
 *
 * @param t input value
 * @returns array
 */
const toArray = <T>(t: T | T[]): T[] => {
  if (Array.isArray(t)) return t;
  else return [t];
};

export default toArray;
