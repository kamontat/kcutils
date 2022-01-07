/**
 * join array with input separator
 * @param arr input array
 * @param separator string separator (default = comma)
 * @returns joined string with separator
 */
export const join = (arr: string[], separator: string = ",") => {
  return arr.reduce((p, c) => {
    if (!p) return `"${c}"`;
    else return `${p}${separator}"${c}"`;
  }, "");
};
