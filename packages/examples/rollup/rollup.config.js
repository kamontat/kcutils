const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

module.exports = config.defineConfigs(
  config.buildCommonJSModuleJS(pkg),
  config.buildBrowser(pkg)
);
