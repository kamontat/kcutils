import read from "./read";

/**
 * Check is currently env is in CI
 *
 * @returns true if currently run in CI mode
 */
const isCI = (): boolean => {
  return read("CI", "false") === "true";
};

export default isCI;
