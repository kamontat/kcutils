module.exports = {
  ignorePatterns: ["**/lib/**", "**/*.d.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-tabs": [
      "error",
      {
        allowIndentationTabs: false,
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
