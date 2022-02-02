import toString from "./toString";

const replace = (format: string, argument: Record<string, unknown>) => {
  return format.replace(/{(\w+)}/g, (match, key) => {
    return toString(argument[key]) ?? match;
  });
};

export default replace;
