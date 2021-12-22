const { toNamespace, toPackageName } = require("../constants/name");
const { buildHomepage, url, buildPackagePath } = require("../utils/location");
const { isPrivate } = require("../utils/package");

/**
 * build tsconfig.json content
 *
 * @param {{
 *    compiler: "tsc" | "rollup",
 *    mode?: "production"
 * }} option parameters from cli
 * @returns tsconfig.json content
 */
const build = (option) => {
  const compilerOptions = {
    outDir: "lib",
  };
  // This require in order to let rollup know which directory to generate declaration
  if (option.compiler === "rollup") {
    compilerOptions.declarationDir = ".";
  }

  const exclude = ["lib"];
  if (option.compiler === "tsc" && option.mode === "production") {
    exclude.push("test");
  }

  const pkg = {
    extends: "@kcconfig/ts-config/includes/default.json",
    exclude,
    compilerOptions,
  };

  if (option.compiler === "rollup") {
    pkg.include.push("**/*.ts", "package.json");
  }

  return JSON.stringify(pkg, null, "  ");
};

module.exports = { build };
