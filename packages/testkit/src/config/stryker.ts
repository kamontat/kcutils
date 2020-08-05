import { Config } from "@kcinternal/configuration";
import { ConfigBuilder } from "@kcinternal/configuration";
import { StrykerOptions, LogLevel } from "@stryker-mutator/api/core";

const defaultConfig = {};

type Setting = Partial<typeof defaultConfig>;
const stryker: ConfigBuilder<Setting, Partial<StrykerOptions>> = {
  default: defaultConfig,
  transformer: () => {
    // const webpack = helper.path.searchPackageJsonSync("dependencies", "webpack");
    // const config = helper.general.byDefault(defaultConfig, { webpack }, data);

    const initial: Partial<StrykerOptions> = {
      logLevel: "info" as LogLevel,
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

    return initial;
  },
};

export default (dir?: string, input?: Setting): Config<Setting, Partial<StrykerOptions>> =>
  new Config(stryker, input, dir);
