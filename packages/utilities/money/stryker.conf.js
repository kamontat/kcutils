const config = require("@kcconfig/stryker-config");
const pkg = require("./package.json");

module.exports = config.initial(pkg.name);
