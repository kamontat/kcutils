/**
 * Add <fill> on the end if not enough or remove character if exceed
 *
 * @param str input string
 * @param length string limitation
 * @param fill character for fill if input is not long enough
 * @returns string with exactly length size
 */
const padEnd = (str: string, length: number, fill: string = " "): string => {
  if (str.length >= length) return str.slice(0, length);
  return str.padEnd(length, fill);
};

export default padEnd;
