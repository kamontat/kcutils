import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

interface JestConfig {
  verbose: boolean;
  rootDir: string;
  preset: string;
  testEnvironment: string;
  reporters: string[];
  snapshotSerializers: string[];
  collectCoverage: boolean;
  collectCoverageFrom: string[];
  coveragePathIgnorePatterns: string[];
  coverageReporters: string[];
}

const jest: ConfigBuilder<void, JestConfig> = {
  default: void 0,
  transformer: ({ helper }) => {
    // const snapshot = [];

    // const pjson = helper.loadParentPackageJsonSync();
    // if (Object.keys(pjson.devDependencies ?? {}).includes("@internal/testkit")) {
    //   snapshot.push("enzyme-to-json/serializer");
    // }

    return {
      verbose: true,
      rootDir: helper.parent.pwd,
      preset: "ts-jest",
      testEnvironment: "node",
      reporters: ["default", "jest-junit"],
      snapshotSerializers: [],
      collectCoverage: true,
      collectCoverageFrom: ["**/*.{ts,tsx}"],
      coveragePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
      coverageReporters: ["json", "lcov", "text", "clover"],
    };
  },
};

export default (dir?: string, input?: void) => new Config(jest, input, dir);
