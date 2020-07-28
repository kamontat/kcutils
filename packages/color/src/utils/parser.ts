export const cParseInt = (val: string | number, radix: number = 10): number => {
  if (typeof val === "string") return parseInt(val, radix);
  else return parseInt(val.toFixed(0), radix);
};

export const cParseFloat = (val: string | number): number => {
  if (typeof val === "string") return parseFloat(val);
  else return val;
};

export const cParseString = (val: string | number): string => {
  const f = cParseFloat(val);
  return f.toString();
};

/**
 * Converts a decimal to a hex value
 * @param val decimal number ([0-1])
 */
export const cParseDecimalToHex = (val: number): string => {
  return Math.round(val * 255).toString(16);
};
