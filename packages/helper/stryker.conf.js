/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  logLevel: "info",
  timeoutMS: 60000,
  coverageAnalysis: "off",

  packageManager: "yarn",

  mutator: "typescript",
  mutate: ["src/**/*.ts"],
  transpilers: [],
  testRunner: "jest",

  tsconfigFile: "tsconfig.json",

  reporters: ["html", "clear-text", "progress", "dashboard"],
};
