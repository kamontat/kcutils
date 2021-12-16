const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

module.exports = config.initial(
  config.buildCommonJSModuleJS(pkg),
  // because this use "path" module, so browser is not a option
  // config.buildBrowser(pkg)
);
