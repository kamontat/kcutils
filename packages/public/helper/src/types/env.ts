import { isExist } from "./generic";

type Data = string;

/**
 * Checking ENV in env variable must equal one of input value
 *
 * @param d checking value
 * @returns true if ENV has input value
 */
const check = (...d: Data[]) => {
  const env =
    process.env.ENV === undefined || process.env.ENV === "undefined"
      ? ""
      : process.env.ENV;
  return d.some((data) => env === data);
};

/**
 * Check ENV must be either 'development' or 'develop' or 'dev' or 'd' or ''
 *
 * @returns true if currently is development phase
 */
export const isDevelopment = (): boolean => {
  return check("development", "develop", "dev", "d", "");
};

/**
 * Check ENV must be either 'testing' or 'tested' or 'test' or 't'
 *
 * @returns true if currently is testing phase
 */
export const isTesting = (): boolean => {
  return check("testing", "tested", "test", "t");
};

/**
 * Check ENV must be either 'staging' or 'stage' or 'stag' or 's'
 *
 * @returns true if currently is staging phase
 */
export const isStaging = (): boolean => {
  return check("staging", "stage", "stag", "s");
};

/**
 * Check ENV must be either 'production' or 'product' or 'prod' or 'prd' or 'p'
 *
 * @returns true if currently is production phase
 */
export const isProduction = (): boolean => {
  return check("production", "product", "prod", "prd", "p");
};

/**
 * Check is currently env is in CI
 *
 * @returns true if currently run in CI mode
 */
export const isCI = (): boolean => {
  return process.env.CI === "true";
};

/**
 * Set environment and return old (for rollback if needed)
 *
 * @param name environment name
 * @param value environment value
 * @returns old value if exist
 */
export const setEnv = (
  name: string,
  value: string | undefined
): string | undefined => {
  const old = process.env[name];
  process.env[name] = value;
  return old;
};

/**
 * Read environment with default value if value not exist
 *
 * @param name environment name
 * @param def default value if environment is not exist
 * @returns output
 */
export const read = (name: string, def: string): string => {
  const env = process.env[name];
  if (isExist(env)) return env;
  else return def;
};
