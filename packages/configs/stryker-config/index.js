/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
const config = {
  packageManager: "yarn",
  checkers: ["typescript"],
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  ignorePatterns: ["lib/**/*"],
  tsconfigFile: "tsconfig.json",
  jest: {
    config: {
      coveragePathIgnorePatterns: [
        "<rootDir>/lib/",
        "<rootDir>/node_modules/",
        "<rootDir>/test/",
      ],
      testPathIgnorePatterns: ["/node_modules/", "/lib/", "/coverage/"],
    },
  },
  dashboard: {
    module: "@kcinternal/runners",
  },
};

module.exports = config;
