import checkEnv from "./checkEnv";

/**
 * Check ENV must be either 'testing' or 'tested' or 'test' or 't'
 *
 * @returns true if currently is testing phase
 */
const isTesting = (): boolean => {
  return checkEnv("testing", "tested", "test", "t");
};

export default isTesting;
