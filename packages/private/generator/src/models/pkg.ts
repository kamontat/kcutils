import type { Package } from "package_json";

import { BASE_KEYWORDS, AUTHOR_NAME, AUTHOR_EMAIL } from "../constants/pkg";
import { GH_USERLINK, GH_REPOLINK, GH_ISSUELINK } from "../constants/location";

import { toPackageName } from "../utils/name";
import { buildPackageUrl, buildPackagePath } from "../utils/location";
import { isPrivate } from "../utils/pkg";

type SupportedCompiler = "tsc" | "rollup";
type BuildOption = {
  compiler: SupportedCompiler;
  category: string;
  name: string;
  description: string;
  version: string;
  keywords: string[];
};

const internalPackageVersion = (category: string, version: string) =>
  isPrivate(category) ? "*" : version;

const getDevDeps = (category: string, compiler: SupportedCompiler) => {
  const base: Record<string, string> = {
    "@kcconfig/eslint-config": internalPackageVersion(category, "0.1.2"),
    "@kcconfig/jest-config": internalPackageVersion(category, "0.1.2"),
    "@kcconfig/stryker-config": internalPackageVersion(category, "0.1.2"),
    "@kcconfig/ts-config": internalPackageVersion(category, "0.1.2"),
    "@kcinternal/commandline": internalPackageVersion(category, "0.22.2"),
    "@stryker-mutator/core": "5.6.0",
    "@stryker-mutator/jest-runner": "5.6.0",
    "@stryker-mutator/typescript-checker": "5.6.0",
    "@types/jest": "27.4.0",
    "@types/node": "17.0.10",
    "@typescript-eslint/eslint-plugin": "5.10.0",
    "@typescript-eslint/parser": "5.10.0",
    eslint: "8.7.0",
    "eslint-plugin-tsdoc": "0.2.14",
    jest: "27.4.7",
    "jest-junit": "13.0.0",
    "ts-jest": "27.1.3",
    typescript: "4.5.5",
  };

  if (compiler === "rollup") {
    base["@kcconfig/rollup-config"] = "0.1.2";
    base["rollup"] = "2.59.0";
  }

  return base;
};

/**
 * build package.json content
 * @param option build option
 * @returns package.json content
 */
export const build = (option: BuildOption) => {
  const keywords = BASE_KEYWORDS.concat(...option.keywords);
  const pkg: Package = {
    name: toPackageName(option.category, option.name),
    version: option.version,
    description: option.description,
    private: isPrivate(option.category),
    typedocMain: "index.ts",
  };

  if (option.compiler === "rollup") {
    pkg["main"] = "lib/index.cjs.js";
    pkg["module"] = "lib/index.esm.js";
    pkg["browser"] = "lib/index.umd.js";
    pkg["types"] = "lib/index.d.ts";
  } else if (option.compiler === "tsc") {
    pkg["main"] = "lib/index.js";
    pkg["types"] = "lib/index.d.ts";
  }

  pkg["license"] = "SEE LICENSE IN LICENSE";
  pkg["homepage"] = buildPackageUrl(option.category, option.name);
  pkg["repository"] = {
    type: "git",
    url: GH_REPOLINK,
    directory: buildPackagePath(option.category, option.name),
  };
  pkg["bugs"] = {
    email: AUTHOR_EMAIL,
    url: `${GH_ISSUELINK}`,
  };
  pkg["author"] = {
    name: AUTHOR_NAME,
    email: AUTHOR_EMAIL,
    url: GH_USERLINK,
  };
  pkg["publishConfig"] = {
    access: "public",
  };
  pkg["keywords"] = keywords;
  pkg["files"] = [
    "package.json",
    "CHANGELOG.md",
    "README.md",
    "lib/**/*.js",
    "lib/**/*.js.map",
    "lib/**/*.d.ts",
    "lib/**/*.d.ts.map",
  ];
  pkg["scripts"] = {
    build: "kc-build",
    clean: "kc-clean",
    lint: "kc-lint",
    test: "kc-test",
    "test:mutator": "kc-test --mutator",
  };
  pkg["dependencies"] = {};
  pkg["devDependencies"] = getDevDeps(option.category, option.compiler);

  return JSON.stringify(pkg, null, "  ");
};
