// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##            This configuration is for CI to run the test            ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

// for ci to run test
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    "jest-junit",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports/jest",
        filename: "index.html",
        expand: true,
        pageTitle: "Reporter",
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.{ts,tsx}",
    "!packages/_*/**/*.{ts,tsx}",
    "!internals/**/*.{ts,tsx}",
    "!typings/**/*.{ts,tsx}",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/lib/"],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
