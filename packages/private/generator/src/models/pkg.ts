import type { Package } from "package_json";
import pjson from "../../package.json";

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
  browser: boolean;
};

const internalPackageVersion = (category: string, version: string) =>
  isPrivate(category) ? "*" : version;

const getDevDeps = (category: string, compiler: SupportedCompiler) => {
  const base: Record<string, string> = {};

  base["@kcconfig/eslint-config"] = internalPackageVersion(category, "0.1.2");
  base["@kcconfig/jest-config"] = internalPackageVersion(category, "0.1.2");
  base["@kcconfig/stryker-config"] = internalPackageVersion(category, "0.1.2");
  base["@kcconfig/ts-config"] = internalPackageVersion(category, "0.1.2");
  if (compiler === "rollup") {
    base["@kcconfig/rollup-config"] = internalPackageVersion(category, "0.1.2");
  }
  base["@kcinternal/commandline"] = internalPackageVersion(category, "0.22.2");

  base["@stryker-mutator/core"] = "5.6.0";
  base["@stryker-mutator/jest-runner"] = "5.6.0";
  base["@stryker-mutator/typescript-checker"] = "5.6.0";

  base["@types/jest"] = "27.4.0";
  base["@types/node"] = "17.0.10";

  base["@typescript-eslint/eslint-plugin"] = "5.10.0";
  base["@typescript-eslint/parser"] = "5.10.0";

  base["eslint"] = "8.7.0";
  base["eslint-plugin-tsdoc"] = "0.2.14";

  base["jest"] = "27.4.7";
  base["jest-junit"] = "13.0.0";
  base["ts-jest"] = "27.1.3";

  if (compiler === "rollup") {
    base["rollup"] = "2.59.0";
  }

  base["typescript"] = "4.5.5";

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
    if (option.browser) {
      pkg["browser"] = "lib/index.umd.js";
    }
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
    "includes/**/*",
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
  pkg["_generator"] = {
    name: pjson.name,
    version: pjson.version,
  };

  return JSON.stringify(pkg, null, "  ");
};
