import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

interface JestConfig {
  verbose: boolean;
  rootDir: string;
  preset: string;
  transform: Record<string, string>;
  moduleNameMapper: Record<string, string>;
  globals: Record<string, string>;
  moduleFileExtensions: string[];
  testEnvironment: string;
  reporters: string[];
  snapshotSerializers: string[];
  transformIgnorePatterns: string[];
  setupFiles: string[];
  setupFilesAfterEnv: string[];
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

  setupName: undefined as string | undefined,

  setupEachName: undefined as string | undefined,
};

type Setting = typeof defaultConfig;

const jest: ConfigBuilder<Setting, JestConfig> = {
  default: defaultConfig,
  transformer: ({ data, helper }) => {
    const collectCoverageFrom = data.root
      ? ["packages/**/*.{ts,tsx}", "!packages/_*/**/*.{ts,tsx}"]
      : ["**/*.{ts,tsx}", "!_*/**/*.{ts,tsx}"];

    const initial: JestConfig = {
      verbose: true,
      rootDir: helper.on("parent").pwd,
      preset: "ts-jest",
      transform: {},
      globals: {},
      moduleNameMapper: { ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy" },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      testEnvironment: "node",
      setupFiles: [],
      setupFilesAfterEnv: [],
      reporters: ["default", "jest-junit"],
      snapshotSerializers: [],
      testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
      transformIgnorePatterns: [],
      testPathIgnorePatterns: ["/node_modules/"],
      collectCoverage: true,
      collectCoverageFrom,
      coveragePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
      coverageReporters: ["json", "lcov", "text", "clover"],
    };

    if (data.setupName) {
      const defaultSetupFile = helper.on("current").path("includes", data.setupName);
      const parentSetupFile = helper.on("parent").pathEnsureSync("test", data.setupName);
      const setupFile = helper.general.getOrElse(parentSetupFile, defaultSetupFile);
      initial.setupFiles.push(setupFile);
    }

    if (data.setupEachName) {
      const defaultSetupEachFile = helper.on("current").path("includes", data.setupEachName);
      const parentSetupEachFile = helper.on("parent").pathEnsureSync("test", data.setupEachName);
      const setupEachFile = helper.general.getOrElse(parentSetupEachFile, defaultSetupEachFile);
      initial.setupFilesAfterEnv.push(setupEachFile);
    }

    return initial;
  },
};

export default (dir?: string, input?: Partial<Setting>): Config<Setting, JestConfig> => new Config(jest, input, dir);
