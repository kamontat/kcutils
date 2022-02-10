/**
 * Add <fill> on the start if not enough or remove character if exceed
 *
 * @param str input string
 * @param length string limitation
 * @param fill character for fill if input is not long enough
 * @returns string with exactly length size
 */
const padStart = (str: string, size: number, fill: string = " "): string => {
  if (str.length >= size) return str.slice(str.length - size, str.length);
  return str.padStart(size, fill);
};

export default padStart;
