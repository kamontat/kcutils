const { stryker } = require("@kcutils/testkit");
const config = stryker(__dirname, { debug: true }).build();
module.exports = config;
