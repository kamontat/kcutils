const path = require("path");

const helpers = require("./lib/src");
helpers.pkg.data = require("./package.json");

module.exports = {
  helpers,
};
