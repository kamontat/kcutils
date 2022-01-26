import checkEnv from "./checkEnv";

/**
 * Check ENV must be either 'development' or 'develop' or 'dev' or 'd' or ''
 *
 * @returns true if currently is development phase
 */
const isDevelopment = (): boolean => {
  return checkEnv(
    "development",
    "develop",
    "dev",
    "d",
    "undefined",
    "null",
    ""
  );
};

export default isDevelopment;
