const { stryker } = require("@kcutils/testkit");
const config = stryker(__dirname).build();
module.exports = config;
