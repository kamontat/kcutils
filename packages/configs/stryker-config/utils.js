const baseConfig = require(".");

/**
 *
 * @param {string} moduleName name of module or empty if not monorepository
 * @param {import('@stryker-mutator/api/core').StrykerOptions} override override value
 * @returns {import('@stryker-mutator/api/core').StrykerOptions} configuration with override value
 */
module.exports = (moduleName, override) => {
  const overridedConfig = Object.assign(baseConfig, override);
  if (moduleName !== "") {
    overridedConfig.dashboard.module = moduleName;
  }

  return overridedConfig;
};
