import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

interface JestConfig {
  verbose: boolean;
  rootDir: string;
  preset: string;
  testEnvironment: string;
  reporters: string[];
  snapshotSerializers: string[];
  testMatch: string | string[];
  testPathIgnorePatterns: string[];
  collectCoverage: boolean;
  collectCoverageFrom: string[];
  coveragePathIgnorePatterns: string[];
  coverageReporters: string[];
}

const defaultConfig = {
  /**
   * mark this as root configuration
   */
  root: false,
};

type Setting = typeof defaultConfig;

const jest: ConfigBuilder<Setting, JestConfig> = {
  default: defaultConfig,
  transformer: ({ data, helper }) => {
    const collectCoverageFrom = data.root
      ? ["packages/**/*.{ts,tsx}", "!packages/_*/**/*.{ts,tsx}"]
      : ["**/*.{ts,tsx}", "!_*/**/*.{ts,tsx}"];

    return {
      verbose: true,
      rootDir: helper.parent.pwd,
      preset: "ts-jest",
      testEnvironment: "node",
      reporters: ["default", "jest-junit"],
      snapshotSerializers: [],
      testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
      testPathIgnorePatterns: ["/node_modules/"],
      collectCoverage: true,
      collectCoverageFrom,
      coveragePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
      coverageReporters: ["json", "lcov", "text", "clover"],
    };
  },
};

export default (dir?: string, input?: Partial<Setting>): Config<Setting, JestConfig> => new Config(jest, input, dir);
