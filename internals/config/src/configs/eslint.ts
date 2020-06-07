import { Linter } from "eslint";

import { ConfigBuilder } from "../models/ConfigBuilder";
import { byDefault } from "../utils/helper";
import { Config } from "../models/Config";

const defaultConfig = {
  /**
   * add config to support react
   * @default false
   */
  react: false,
};

type Setting = Partial<typeof defaultConfig>;

const eslint: ConfigBuilder<Setting, Linter.Config> = {
  default: defaultConfig,
  transformer: ({ data, helper }) => {
    const autoDetect: Setting = {};
    autoDetect.react = helper.parent.searchPackageJsonSync("dependencies", "react");

    const options = byDefault(defaultConfig, autoDetect, data);

    const plugins = ["prettier", "@typescript-eslint"];
    const extend = [
      "eslint:recommended",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "prettier/standard",
    ];
    const settings: { [name: string]: any } = {};

    if (options.react) {
      plugins.push("react");
      extend.push("plugin:react/recommended", "prettier/react");
      settings.react = {
        version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
      };
    }

    return {
      ignorePatterns: ["packages/**/lib/**", "internals/**/lib/**", "**/*.d.ts"],
      parser: "@typescript-eslint/parser",
      plugins,
      extends: extend,
      parserOptions: {
        tsconfigRootDir: helper.parent.pwd,
        ecmaFeatures: {
          jsx: options.react, // Allows for the parsing of JSX
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
      },
      settings,
      rules: {
        "no-tabs": [
          "error",
          {
            allowIndentationTabs: false,
          },
        ],
        "arrow-parens": ["error", "as-needed"],
        "prettier/prettier": [
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
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "local",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/class-name-casing": [
          "warn",
          {
            allowUnderscorePrefix: true,
          },
        ],
        "@typescript-eslint/naming-convention": [
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
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
          },
        ],
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
    };
  },
};

export default (dir?: string, input?: Setting) => new Config(eslint, input, dir);
