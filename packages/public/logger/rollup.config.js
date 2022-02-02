const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

const globals = {
  path: "path",
  readline: "readline",
  os: "os",
  tty: "tty",
};

module.exports = config.dinitial(
  { external: ["path", "readline", "os", "tty"] },
  config.buildCommonJSModuleJS(pkg, { globals }),
  config.buildBrowser(pkg, { globals })
);
