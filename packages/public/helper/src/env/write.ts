import { WithUndefined } from "generic";

/**
 * Set environment and return old (for rollback if needed)
 * You can write `undefined` to delete environment value
 *
 * @param name environment name
 * @param value environment value
 * @returns old value if exist
 */
const write = (
  name: string,
  value: WithUndefined<string>
): WithUndefined<string> => {
  const old = process.env[name];
  process.env[name] = value;
  return old;
};

export default write;
