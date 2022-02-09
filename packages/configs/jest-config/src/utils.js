const baseConfig = require("./constants");

/**
 *
 * @param {import('ts-jest/dist/types').InitialOptionsTsJest} override override value
 * @returns {import('ts-jest/dist/types').InitialOptionsTsJest} configuration with override value
 */
module.exports = (override) => {
  const output = Object.assign(baseConfig, override);

  const pwd = process.cwd();
  if (pwd.includes(".stryker-tmp")) {
    return output;
  }

  // This option should add only if jest is not stryker mode
  output.rootDir = pwd;
  output.roots = ["<rootDir>/src/", "<rootDir>/test/"];
  return output;
};
