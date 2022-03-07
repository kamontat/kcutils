import type { Package as LernaPackage } from "@lerna/package";
import type { Package as PackageJson } from "package_json";

import { readFileSync } from "fs";
import { resolve } from "path";
import { Project } from "@lerna/project";

const project = new Project(process.cwd());
const packages = project.getPackagesSync();

export interface Package extends LernaPackage {
  pjson: PackageJson;
}

export const listPackages = (): string[] => {
  return packages.map((p) => p.name);
};

export const getPackage = (name: string): Package | undefined => {
  const pkg = packages.find((p) => p.name === name);
  if (pkg) {
    const pjson: PackageJson = JSON.parse(
      readFileSync(resolve(pkg.location, "package.json"), { encoding: "utf8" })
    );

    return Object.assign({}, pkg, { pjson });
  }

  return undefined;
};
