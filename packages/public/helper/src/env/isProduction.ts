import checkEnv from "./checkEnv";

/**
 * Check ENV must be either 'production' or 'product' or 'prod' or 'prd' or 'p'
 *
 * @returns true if currently is production phase
 */
export const isProduction = (): boolean => {
  return checkEnv("production", "product", "prod", "prd", "p");
};

export default isProduction;
