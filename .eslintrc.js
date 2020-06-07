// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##      This configuration is for text-editor to format the code      ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

module.exports = {
  ignorePatterns: ["packages/**/lib/**", "internals/**/lib/**", "**/*.d.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier/standard",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
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
