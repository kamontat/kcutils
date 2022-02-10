import read from "./read";

/**
 * Checking ENV in env variable must equal one of input value
 *
 * @param d checking value
 * @returns true if ENV has input value
 */
const checkEnv = (...d: string[]) => {
  const env = read("ENV", "");
  return d.some((data) => env === data);
};

export default checkEnv;
