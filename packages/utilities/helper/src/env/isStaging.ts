import checkEnv from "./checkEnv";

/**
 * Check ENV must be either 'staging' or 'stage' or 'stag' or 's'
 *
 * @returns true if currently is staging phase
 */
const isStaging = (): boolean => {
  return checkEnv("staging", "stage", "stag", "s");
};

export default isStaging;
