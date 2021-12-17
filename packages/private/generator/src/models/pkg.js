const { toNamespace, toPackageName } = require("../constants/name");
const { buildHomepage, url, buildPackagePath } = require("../utils/location");
const { isPrivate } = require("../utils/package");

/**
 * build package.json content
 *
 * @param {{
 *    type: string,
 *    name: string,
 *    description: string,
 *    version: string,
 *    keywords: string[],
 * }} option parameters from cli
 * @returns package.json content
 */
const build = (option) => {
  const contact = {
    name: "Kamontat Chantrachirathumrong",
    email: "developer@kamontat.net",
  };
  const keywords = ["kcmono"];
  keywords.push(...option.keywords);
  const files = [
    "package.json",
    "CHANGELOG.md",
    "README.md",
    "lib/**/*.js",
    "lib/**/*.js.map",
    "lib/**/*.d.ts",
    "lib/**/*.d.ts.map",
  ];

  return JSON.stringify(
    {
      name: toPackageName(option.type, option.name),
      version: option.version,
      description: option.description,
      private: isPrivate(option.type),
      typedocMain: "index.ts",
      main: "lib/index.cjs.js",
      module: "lib/index.esm.js",
      browser: "lib/index.umd.js",
      types: "lib/index.d.ts",
      license: "SEE LICENSE IN LICENSE",
      homepage: buildHomepage(option.type, option.name),
      repository: {
        type: "git",
        url: url.GITHUB_REPO,
        directory: buildPackagePath(option.type, option.name),
      },
      bugs: {
        email: contact.email,
        url: `${url.GITHUB_REPO}/issues`,
      },
      author: {
        name: contact.name,
        email: contact.email,
        url: url.GITHUB,
      },
      keywords,
      files,
      scripts: {
        build: "rollup --config",
        clean: "rimraf reports lib coverage junit.xml temp dist .rollup.cache",
        lint: "eslint .",
        start: "node lib/index.js",
        test: "jest",
        "test:mutator": "stryker run",
      },
      devDependencies: {
        "@kcconfig/eslint-config": "0.0.1",
        "@kcconfig/jest-config": "0.0.1",
        "@kcconfig/rollup-config": "0.0.1",
        "@kcconfig/stryker-config": "0.0.1",
        "@kcconfig/ts-config": "0.0.1",
        "@stryker-mutator/core": "5.5.1",
        "@stryker-mutator/jest-runner": "5.5.1",
        "@stryker-mutator/typescript-checker": "5.5.1",
        "@types/jest": "27.0.2",
        "@types/node": "16.11.7",
        "@typescript-eslint/eslint-plugin": "5.7.0",
        "@typescript-eslint/parser": "5.3.1",
        eslint: "8.2.0",
        "eslint-plugin-tsdoc": "0.2.14",
        jest: "27.3.1",
        "jest-junit": "13.0.0",
        rollup: "2.59.0",
        "ts-jest": "27.0.7",
        typescript: "4.4.4",
      },
    },
    null,
    "  "
  );
};

module.exports = { build };
