/**
 * check input must not be empty
 * @param input any string
 * @returns true if input string is not empty or error string
 */
export const mustNotEmpty = (input: string) =>
  input === "" ? "Input cannot be empty" : true;
