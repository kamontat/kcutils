import isExist from "../generic/isExist";

/**
 * Read environment with default value if value not exist
 *
 * @param name environment name
 * @param def default value if environment is not exist
 * @returns output
 */
const read = (name: string, def: string): string => {
  const env = process.env[name];
  if (isExist(env)) return env;
  else return def;
};

export default read;
