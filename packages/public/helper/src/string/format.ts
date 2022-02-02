import toString from "./toString";

/**
 * this is similar function with util.format()
 * this function modified from {@link https://github.com/tmpfs/format-util/blob/master/format.js}
 *
 * @param format format string
 * @param args argument will replace to format string
 * @returns formatted string
 */
const format = (format: string, ...args: unknown[]): string => {
  let output: string = format;
  if (args.length > 0) {
    output = format.replace(/(%?)(%([ods]))/g, (match, escaped) => {
      const arg = args.shift();
      if (!escaped) {
        return toString(arg) ?? match;
      }
      args.unshift(arg);
      return match;
    });
  }

  if (args.length > 0) {
    output += " " + args.join(" ");
  }

  return output.replace(/%{2,2}/g, "%");
};

export default format;
