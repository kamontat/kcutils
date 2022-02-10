import toArray from "./toArray";

/**
 * flat input to single array with values
 *
 * @param arr input array / multiple array
 * @returns flat array without nested array
 */
const flatmap = <T>(...arr: (T[] | T)[]): T[] => {
  return arr.reduce((p: T[], c) => p.concat(...toArray(c)), []);
};

export default flatmap;
