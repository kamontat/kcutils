const path = require("path");

const pkg = require("./src/models/pkg");
const location = require("./src/utils/location");
const package = require("./src/utils/package");
const array = require("./src/utils/array");
const name = require("./src/constants/name");

module.exports = {
  helpers: {
    local: require("./package.json"),
    pkg,
    location,
    name,
    package,
    array,
  },
};
