export const padEnd = (str: string, length: number, fill: string = " ") => {
  if (str.length >= length) return str.slice(0, length);
  return str.padEnd(length, fill);
};

export const padStart = (str: string, size: number, fill: string = " ") => {
  if (str.length >= size) return str.slice(str.length - size, str.length);
  return str.padStart(size, fill);
};

export const isNotEmpty = (str: string | undefined | null): str is string => {
  if (str === undefined) return false;
  if (str === null) return false;

  return str !== "";
};
