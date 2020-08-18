import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

type BabelStringPluginConfig<K extends string = string> = K;
type BabelObjectPluginConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> = [K, T];

type BabelPluginConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> =
  | BabelStringPluginConfig<K>
  | BabelObjectPluginConfig<K, T>;

type BabelStringPresetConfig<K extends string = string> = K;
type BabelObjectPresetConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> = [K, T];

type BabelPresetConfig<K extends string = string, T extends Record<string, any> = Record<string, any>> =
  | BabelStringPresetConfig<K>
  | BabelObjectPresetConfig<K, T>;

interface BabelConfig {
  presets: BabelPresetConfig[];
  plugins: BabelPluginConfig[];
}

const defaultConfig = {};

type Setting = Partial<typeof defaultConfig>;

const babel: ConfigBuilder<Setting, BabelConfig> = {
  default: defaultConfig,
  transformer: ({ helper }) => {
    const babelEnv = helper.path.searchPackageJsonSync("all", "@babel/preset-env");
    const babelTypescript = helper.path.searchPackageJsonSync("all", "@babel/preset-typescript");
    const babelReact = helper.path.searchPackageJsonSync("all", "@babel/preset-react");
    const babelRuntime = helper.path.searchPackageJsonSync("all", "@babel/runtime");
    const babelRuntimePlugin = helper.path.searchPackageJsonSync("all", "@babel/plugin-transform-runtime");

    const presets: BabelPresetConfig[] = [];
    const plugins: BabelPluginConfig[] = [];

    if (babelEnv) presets.push(["@babel/preset-env", {}]);
    if (babelTypescript) presets.push("@babel/typescript");
    if (babelReact) presets.push("@babel/preset-react");
    if (babelRuntime && babelRuntimePlugin)
      plugins.push([
        "@babel/transform-runtime",
        {
          regenerator: true,
        },
      ]);

    return {
      presets,
      plugins,
    };
  },
};

export default (dir?: string, input?: Partial<Setting>): Config<Setting, BabelConfig> => new Config(babel, input, dir);
