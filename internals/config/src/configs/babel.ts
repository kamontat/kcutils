import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

type BabelStringPluginConfig<K extends string = string> = K;
type BabelObjectPluginConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> = [K, T];

type BabelPluginConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> =
  | BabelStringPluginConfig<K>
  | BabelObjectPluginConfig<K, T>;

interface BabelConfig {
  presets: string[];
  plugins: BabelPluginConfig[];
}

const defaultConfig = {};

type Setting = Partial<typeof defaultConfig>;

const babel: ConfigBuilder<Setting, BabelConfig> = {
  default: defaultConfig,
  transformer: ({ helper }) => {
    const babelEnv = helper.path.searchPackageJsonSync("devDependencies", "@babel/preset-env");
    const babelTypescript = helper.path.searchPackageJsonSync("devDependencies", "@babel/preset-typescript");
    const babelReact = helper.path.searchPackageJsonSync("devDependencies", "@babel/preset-react");

    const presets = [];

    if (babelEnv) presets.push("@babel/env");
    if (babelTypescript) presets.push("@babel/typescript");
    if (babelReact) presets.push("@babel/preset-react");

    return {
      presets,
      plugins: [],
    };
  },
};

export default (dir?: string, input?: Partial<Setting>): Config<Setting, BabelConfig> => new Config(babel, input, dir);
