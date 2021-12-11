const baseConfig = require("./constants");

/**
 *
 * @param {string} moduleName name of module or empty if not monorepository
 * @param {import('@stryker-mutator/api/core').StrykerOptions} override override value
 * @returns {import('@stryker-mutator/api/core').StrykerOptions} configuration with override value
 */
module.exports = (moduleName, override) => {
  const overridedConfig = Object.assign(baseConfig, override);
  if (moduleName !== "") {
    if (!overridedConfig.dashboard) overridedConfig.dashboard = {};
    overridedConfig.dashboard.module = moduleName;
  }

  return overridedConfig;
};
