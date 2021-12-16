const path = require("path");

const isPrivate = (type) => type === "private"

const location = require("./src/utils/location")
const package = require("./src/utils/package")
const name = require("./src/constants/name")

module.exports = {
  helpers: {
    location,
    name,
    package,
  },
};
