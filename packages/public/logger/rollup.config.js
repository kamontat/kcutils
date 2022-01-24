const config = require("@kcconfig/rollup-config");
const pkg = require("./package.json");

const globals = {
  path: "path",
  stream: "stream",
  util: "util",
  readline: "readline",
  os: "os",
  tty: "tty",
};

module.exports = config.dinitial(
  { external: ["path", "stream", "util", "readline", "os", "tty"] },
  config.buildCommonJSModuleJS(pkg, { globals }),
  config.buildBrowser(pkg, { globals })
);
