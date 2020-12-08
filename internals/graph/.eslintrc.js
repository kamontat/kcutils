module.exports = {
  ignorePatterns: ["**/lib/**", "**/*.d.ts"],
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
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
