import { Config } from "@kcinternal/configuration";
import { ConfigBuilder } from "@kcinternal/configuration";
import { StrykerOptions, LogLevel } from "@stryker-mutator/api/core";

const defaultConfig = {
  /**
   * enabled debug mode
   */
  debug: false,

  /**
   * enabled trace mode
   */
  trace: false,

  /**
   * jest timeout in millisecond
   */
  timeout: 60000,
};

type Setting = Partial<typeof defaultConfig>;
const stryker: ConfigBuilder<Setting, Partial<StrykerOptions>> = {
  default: defaultConfig,
  transformer: ({ helper, data }) => {
    const config = helper.general.byDefault(defaultConfig, data);

    const level = config.trace ? ("trace" as LogLevel) : config.debug ? ("debug" as LogLevel) : ("info" as LogLevel);

    const initial: Partial<StrykerOptions> = {
      logLevel: level,
      timeoutMS: config.timeout,
      coverageAnalysis: "off",

      packageManager: "yarn",

      mutator: "typescript",
      mutate: ["src/**/*.ts"],
      transpilers: [],
      testRunner: "jest",

      tsconfigFile: "tsconfig.json",

      reporters: ["html", "clear-text", "progress"],
    };

    return initial;
  },
};

export default (dir?: string, input?: Setting): Config<Setting, Partial<StrykerOptions>> =>
  new Config(stryker, input, dir);
