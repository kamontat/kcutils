/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
const config = {
  verbose: true,
  preset: "ts-jest",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib/",
    "/.stryker-tmp/",
    "/coverage/",
  ],
  testEnvironment: "node",
  reporters: ["default", "jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,tsx}", "!_*/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
    "<rootDir>/.stryker-tmp/",
    "<rootDir>/test/",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};

module.exports = config;