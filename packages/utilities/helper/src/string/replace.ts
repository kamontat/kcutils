import toString from "./toString";

/**
 * replace all {<key>} with data from argument
 *
 * @param format format string
 * @param argument argument object
 * @returns format with object replacement
 * @example
 *    replace("{key} {value}", {key: "hello", value: "world"}) => hello world
 */
const replace = (format: string, argument: Record<string, unknown>) => {
  return format.replace(/{(\w+)}/g, (match, key) => {
    return toString(argument[key]) ?? match;
  });
};

export default replace;
