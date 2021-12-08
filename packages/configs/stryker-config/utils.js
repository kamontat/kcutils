const baseConfig = require(".");

/**
 *
 * @param {import('@stryker-mutator/api/core').StrykerOptions} override override value
 * @returns {import('@stryker-mutator/api/core').StrykerOptions} configuration with override value
 */
module.exports = (override) => {
  return Object.assign(baseConfig, override);
};
