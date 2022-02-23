const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

module.exports = config.initial(
  config.buildCommonJSModuleJS(pkg)
  
);
