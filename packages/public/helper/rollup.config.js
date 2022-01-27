const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

const nodeMode = {
  input: "node.ts",
  main: "lib/node.cjs.js",
  module: "lib/node.esm.js",
  browser: "lib/node.umd.js",
};

module.exports = config.initial(
  config.buildCommonJSModuleJS(pkg),
  config.buildBrowser(pkg),
  config.buildCommonJSModuleJS(config.customPackage(pkg, nodeMode))
);
