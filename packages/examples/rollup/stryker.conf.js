const config = require("@kcconfig/stryker-config/utils");
const pkg = require("./package.json");

module.exports = config(pkg.name);
