/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
  preset: "ts-jest",
  rootDir: process.cwd(),
  roots: ["<rootDir>/src/", "<rootDir>/test/"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/.stryker-tmp/",
    "<rootDir>/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/coverage/",
  ],
  testEnvironment: "node",
  reporters: ["default", "jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,tsx}", "!_*/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "<rootDir>/.stryker-tmp/",
    "<rootDir>/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/coverage/",
    "<rootDir>/test/",
  ],
  coverageReporters: ["text", "lcov"],
};
