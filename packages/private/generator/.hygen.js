const path = require("path");

const local = require("./package.json");

const pkg = require("./src/models/pkg");
const tsconfig = require("./src/models/tsconfig");

const location = require("./src/utils/location");
const package = require("./src/utils/package");
const array = require("./src/utils/array");

const name = require("./src/constants/name");

module.exports = {
  helpers: {
    local,
    pkg,
    tsconfig,
    location,
    name,
    package,
    array,
  },
};
