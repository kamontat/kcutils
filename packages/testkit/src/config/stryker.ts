import { Config } from "@kcinternal/configuration";
import { ConfigBuilder } from "@kcinternal/configuration";
import { StrykerOptions } from "@stryker-mutator/api/core";

const defaultConfig = {
  /**
   * enable webpack transformer on this project
   */
  webpack: false,
};

type Setting = Partial<typeof defaultConfig>;
const stryker: ConfigBuilder<Setting, Partial<StrykerOptions>> = {
  default: defaultConfig,
  transformer: ({ data, helper }) => {
    const webpack = helper.path.searchPackageJsonSync("dependencies", "webpack");
    const config = helper.general.byDefault(defaultConfig, { webpack }, data);

    const initial: Partial<StrykerOptions> = {
      mutator: "typescript",
      packageManager: "yarn",
      reporters: ["html", "clear-text", "progress", "dashboard"],
      transpilers: ["typescript"],
      testRunner: "jest",
      coverageAnalysis: "off",
      tsconfigFile: "tsconfig.json",
      mutate: ["src/**/*.ts"],
    };

    if (config.webpack) {
      initial.transpilers && initial.transpilers.push("webpack");
      initial.webpack = {
        configFile: "webpack.config.js",
      };
    }

    return initial;
  },
};

export default (dir?: string, input?: Setting): Config<Setting, Partial<StrykerOptions>> =>
  new Config(stryker, input, dir);
