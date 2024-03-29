type SupportedCompiler = "tsc" | "rollup";
type BuildOption = {
  compiler: SupportedCompiler;
  mode?: "production";
};

export const build = (option: BuildOption) => {
  const compilerOptions: Record<string, unknown> = {
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

  const include = [];
  if (option.compiler === "rollup") {
    include.push("**/*.ts", "package.json");
  }

  const pkg: Record<string, unknown> = {
    extends: "@kcconfig/ts-config/includes/default.json",
    exclude,
    compilerOptions,
  };

  if (include.length > 0) pkg.include = include;

  return JSON.stringify(pkg, null, "  ");
};
