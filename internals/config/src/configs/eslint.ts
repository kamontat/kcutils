import { Linter } from "eslint";

import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

const defaultConfig = {
  /**
   * mark this as root configuration
   */
  root: false,

  /**
   * enabled debug log the content of eslint config
   */
  debug: false,
};

type Setting = Partial<typeof defaultConfig>;

const eslint: ConfigBuilder<Setting, Linter.Config> = {
  default: defaultConfig,
  transformer: ({ data, helper }) => {
    const options = Object.assign(
      {},
      defaultConfig,
      {
        prettier: helper.path.searchPackageJsonSync("all", "prettier"),
        react: helper.path.searchPackageJsonSync("all", "react"),
        ts: helper.path.searchPackageJsonSync("all", /@typescript-eslint/),
        tsdoc: helper.path.searchPackageJsonSync("all", "eslint-plugin-tsdoc"),
      },
      data
    );

    const plugins = [];
    const extend = ["eslint:recommended"];
    const settings: { [name: string]: any } = {};
    const rules: Linter.RulesRecord = {
      "no-tabs": [
        "error",
        {
          allowIndentationTabs: false,
        },
      ],
      "arrow-parens": ["error", "as-needed"],
    };

    let parser: string | undefined = undefined;

    if (options.prettier) {
      plugins.push("prettier");
      extend.push("plugin:prettier/recommended");
      rules["prettier/prettier"] = [
        "error",
        {
          semi: true,
          trailingComma: "es5",
          singleQuote: false,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          arrowParens: "avoid",
          endOfLine: "lf",
        },
      ];
    }

    if (options.ts) {
      plugins.push("@typescript-eslint");
      parser = "@typescript-eslint/parser";
      extend.push("plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended");

      rules["@typescript-eslint/explicit-function-return-type"] = "off";
      rules["@typescript-eslint/no-var-requires"] = "off";
      rules["@typescript-eslint/no-non-null-assertion"] = "off";
      rules["@typescript-eslint/no-inferrable-types"] = "off";
      rules["@typescript-eslint/no-explicit-any"] = "off";
      rules["@typescript-eslint/no-unused-vars"] = [
        "error",
        {
          vars: "local",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ];
      rules["@typescript-eslint/naming-convention"] = [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
        },
        {
          selector: "class",
          format: ["PascalCase"],
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeParameter",
          format: ["UPPER_CASE"],
        },
        {
          selector: "parameterProperty",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "property",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
        {
          selector: "enum",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE", "PascalCase"],
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
      ];
    }

    if (options.prettier && options.ts) {
      extend.push("prettier/@typescript-eslint", "prettier/standard");
    }

    if (options.react) {
      plugins.push("react");
      extend.push("plugin:react/recommended", "prettier/react");
      settings.react = {
        version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
      };
    }

    if (options.tsdoc) {
      plugins.push("eslint-plugin-tsdoc");
      rules["tsdoc/syntax"] = "warn";
    }

    const config: Linter.Config = {
      ignorePatterns: options.root ? ["packages/**/lib/**", "internals/**/lib/**", "**/*.d.ts"] : ["**/*.d.ts"],
      parser,
      plugins,
      extends: extend,
      parserOptions: {
        tsconfigRootDir: helper.on("parent").pwd,
        ecmaFeatures: {
          jsx: options.react, // Allows for the parsing of JSX
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
      },
      settings,
      rules,
      env: {
        browser: true,
        node: true,
        es6: true,
      },
    };

    if (options.debug) console.debug(config);
    return config;
  },
};

export default (dir?: string, input?: Setting): Config<Setting, Linter.Config> => new Config(eslint, input, dir);
