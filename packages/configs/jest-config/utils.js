const baseConfig = require(".");

/**
 *
 * @param {import('ts-jest/dist/types').InitialOptionsTsJest} override override value
 * @returns {import('ts-jest/dist/types').InitialOptionsTsJest} configuration with override value
 */
module.exports = (override) => {
  return Object.assign(baseConfig, override);
};
