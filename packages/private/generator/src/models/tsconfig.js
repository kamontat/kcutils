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

  return JSON.stringify(
    {
      extends: "@kcconfig/ts-config/includes/default.json",
      include: ["**/*.ts", "package.json"],
      exclude,
      compilerOptions,
    },
    null,
    "  "
  );
};

module.exports = { build };
